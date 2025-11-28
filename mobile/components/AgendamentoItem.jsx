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

export const AgendamentoItem = ({ item, onComplete }) => {
  // Como a lista agora só mostra pendentes, o status nunca será 'Concluído' aqui.
  // Mas mantemos a cor para garantir.
  const isConcluido = item.status === 'Concluído';
  const statusColor = COLORS.textLight; // Sempre cinza/neutro pois ainda não foi pago
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
          {/* Mostra o valor ou a hora */}
          <Text style={[styles.transactionAmount, { color: statusColor }]}>
            {item.valor > 0 ? `R$ ${item.valor}` : item.hora_servico.slice(0,5)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.data_servico)}</Text>
        </View>
      </TouchableOpacity>

      {/* AÇÕES: Apenas o botão de Concluir */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        <TouchableOpacity 
            style={[styles.deleteButton, { borderLeftWidth: 1 }]} 
            onPress={() => onComplete(item.id)}
        >
            <Ionicons name="checkmark-circle-outline" size={28} color={COLORS.income} />
        </TouchableOpacity>

      </View>
    </View>
  );
};