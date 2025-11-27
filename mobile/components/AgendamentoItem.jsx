// components/AgendamentoItem.jsx

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils"; // Certifique-se de ter essa função ou crie uma simples

// Mapeamento de ícones para serviços de jardinagem
const SERVICO_ICONS = {
  "Corte de Grama": "cut-outline", // ou 'leaf-outline'
  "Poda de Árvore": "leaf",
  "Limpeza": "trash-outline",
  "Paisagismo": "flower-outline",
  "Outro": "construct-outline",
};

export const AgendamentoItem = ({ item, onDelete }) => {
  // Define a cor baseada no status
  const isConcluido = item.status === 'Concluído';
  const statusColor = isConcluido ? COLORS.income : COLORS.textLight;

  // Define o ícone (usa o nome do serviço ou um padrão)
  const iconName = SERVICO_ICONS[item.servico_nome] || "leaf-outline";

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.servico_nome}</Text>
          <Text style={styles.transactionCategory}>{item.status}</Text>
        </View>
        <View style={styles.transactionRight}>
          {/* Se tiver valor > 0 e concluído, mostra o valor. Se não, mostra a hora */}
          <Text
            style={[styles.transactionAmount, { color: statusColor }]}
          >
            {item.valor > 0 ? `R$ ${item.valor}` : item.hora_servico.slice(0, 5)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.data_servico)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};