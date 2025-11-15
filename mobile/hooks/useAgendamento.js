import { useCallback, useState } from "react";
import { Alert } from 'react-native';

const API_URL = "https://aguia-app-backend.onrender.com/api";

export const useAgendamento = (servicoTipoId) => { 
    const [agendamentos, setAgendamentos] = useState([]);
    const [summary, setSummary] = useState({
        concluidos: 0,
        valor_total: 0,
        agendados: 0,
        andamento: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/agendamento/summary/geral`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, []);

    const fetchAgendamentos = useCallback(async () => {
        try {
            const url = servicoTipoId
                ? `${API_URL}/agendamento/${servicoTipoId}`
                : `${API_URL}/agendamento`;

            const response = await fetch(url);
            const data = await response.json();
            setAgendamentos(data);
        } catch (error) {
            console.error("Error fetching agendamentos:", error);
        }
    }, [servicoTipoId]);

    const loadData = useCallback(async () => {
        
        setIsLoading(true);
        try {
            await Promise.all([fetchAgendamentos(), fetchSummary()]);
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setIsLoading(false);
        }
    }, [fetchAgendamentos, fetchSummary]);

    const deleteAgendamento = async (id) => {
        try {
            const response = await fetch(`${API_URL}/agendamento/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete agendamento');
            
            loadData();
            Alert.alert('Sucesso', 'Agendamento deletado com sucesso');
        } catch (error) {
            console.error('Error deleting agendamento:', error);
            Alert.alert('Error', 'Falha ao deletar agendamento');
        }
    }

    return { agendamentos, summary, isLoading, loadData, deleteAgendamento }
}