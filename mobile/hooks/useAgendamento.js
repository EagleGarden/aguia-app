import { useCallback, useState } from "react"; // <--- O erro estava aqui (faltava importar)
import { Alert } from 'react-native';

// IMPORTANTE: Verifique se essa URL está certa (sem barra no final)
// Se estiver rodando no Render: "https://nome-do-app.onrender.com/api"
// Se estiver rodando local no celular: "http://SEU_IP_DO_PC:8000/api"
const API_URL = "https://aguia-backend.onrender.com/api";

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
            if (!response.ok) throw new Error("Falha ao buscar resumo");
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
                : `${API_URL}/agendamento`; // Rota para listar todos

            console.log("Tentando buscar na URL:", url);

            const response = await fetch(url);

            // Debug para ver se é HTML ou JSON
            const textoResposta = await response.text();

            try {
                const data = JSON.parse(textoResposta);
                setAgendamentos(data);
            } catch (e) {
                console.error("ERRO CRÍTICO: O servidor não retornou JSON.");
                console.error("Conteúdo recebido:", textoResposta);
                // Se aparecer HTML aqui no console, sabemos que a URL está errada
            }

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