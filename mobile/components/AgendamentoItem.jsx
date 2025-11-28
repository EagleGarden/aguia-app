import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils"; 

const getIconName = (nomeServico) => {
  const nome = nomeServico ? nomeServico.toLowerCase() : '';

  if (nome.includes('corte') || nome.includes('grama')) return 'cut-outline';
  if (nome.includes('poda') || nome.includes('arvore') || nome.includes('árvore')) return 'leaf-outline';
  if (nome.includes('limpeza')) return 'brush-outline';
  if (nome.includes('paisagismo') || nome.includes('jardim')) return 'flower-outline';
  if (nome.includes('veneno') || nome.includes('praga')) return 'flask-outline';
  
  return 'construct-outline';
};

export const AgendamentoItem = ({ item, onDelete, onComplete }) => {
  const isConcluido = item.status === 'Concluído';
  const statusColor = isConcluido ? COLORS.income : COLORS.textLight;
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
        
        {/* 1. Botão de CONCLUIR (Só aparece se NÃO estiver concluído) */}
        {!isConcluido && (
            <TouchableOpacity 
                style={[styles.deleteButton, { borderLeftWidth: 0 }]} 
                onPress={() => onComplete(item.id)}
            >
                <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.income} />
            </TouchableOpacity>
        )}

        {/* 2. Botão de DELETAR (LIXEIRA) */}
        {/* AQUI ESTAVA O PROBLEMA: Agora ele aparece SEMPRE, não tem 'if' bloqueando */}
        <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onDelete(item.id, isConcluido)}
        >
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>

      </View>
    </View>
  );
};