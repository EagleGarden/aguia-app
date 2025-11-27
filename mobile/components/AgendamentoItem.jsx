import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils"; 

const SERVICO_ICONS = {
  "Corte de Grama": "cut-outline",
  "Poda de Árvore": "leaf",
  "Limpeza de Jardim": "trash-outline",
  "Paisagismo": "flower-outline",
};

// Recebemos a nova função 'onComplete' aqui
export const AgendamentoItem = ({ item, onDelete, onComplete }) => {
  const isConcluido = item.status === 'Concluído';
  const statusColor = isConcluido ? COLORS.income : COLORS.textLight;
  const iconName = SERVICO_ICONS[item.servico_nome] || "leaf-outline";

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

      {/* AÇÕES (BOTOES DO LADO DIREITO) */}
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
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>

      </View>
    </View>
  );
};