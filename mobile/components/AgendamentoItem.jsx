// components/AgendamentoItem.jsx

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils"; 

// Função inteligente para escolher o ícone baseado no nome
const getIconName = (nomeServico) => {
  const nome = nomeServico.toLowerCase();

  if (nome.includes('corte') || nome.includes('grama')) return 'cut-outline';
  if (nome.includes('poda') || nome.includes('arvore') || nome.includes('árvore')) return 'leaf-outline';
  if (nome.includes('limpeza')) return 'brush-outline'; // Mudei de lixeira para vassoura/escova
  if (nome.includes('paisagismo') || nome.includes('jardim')) return 'flower-outline';
  if (nome.includes('veneno') || nome.includes('praga')) return 'flask-outline'; // Ícone para veneno
  
  return 'construct-outline'; // Padrão
};

export const AgendamentoItem = ({ item, onDelete, onComplete }) => {
  const isConcluido = item.status === 'Concluído';
  const statusColor = isConcluido ? COLORS.income : COLORS.textLight;
  
  // Usa a função para pegar o ícone certo
  const iconName = getIconName(item.servico_nome);

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.servico_nome}</Text>
          <Text style={{ color: statusColor, fontSize: 14 }}>{item.status}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { color: statusColor }]}>
            {item.valor > 0 ? `R$ ${item.valor}` : item.hora_servico.slice(0,5)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.data_servico)}</Text>
        </View>
      </TouchableOpacity>

      {/* AÇÕES */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        {/* Botão de CONCLUIR (Só aparece se NÃO estiver concluído) */}
        {!isConcluido && (
            <TouchableOpacity 
                style={[styles.deleteButton, { borderLeftWidth: 0 }]} 
                onPress={() => onComplete(item.id)}
            >
                <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.income} />
            </TouchableOpacity>
        )}

        {/* Botão de DELETAR */}
        {/* PROTEÇÃO: Só mostramos a lixeira se o serviço NÃO estiver concluído */}
        {!isConcluido ? (
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
          </TouchableOpacity>
        ) : (
          // Opcional: Mostra um cadeado ou nada para indicar que está "travado" no histórico
          <View style={[styles.deleteButton, { opacity: 0.3 }]}>
             <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
          </View>
        )}

      </View>
    </View>
  );
};