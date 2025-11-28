import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

// --- 1. Ícones Automáticos ---
const getIconName = (nomeServico) => {
  const nome = nomeServico ? nomeServico.toLowerCase() : '';

  if (nome.includes('corte') || nome.includes('grama')) return 'cut-outline';
  if (nome.includes('poda') || nome.includes('arvore') || nome.includes('árvore')) return 'leaf-outline';
  if (nome.includes('limpeza')) return 'brush-outline';
  if (nome.includes('paisagismo') || nome.includes('jardim')) return 'flower-outline';
  if (nome.includes('veneno') || nome.includes('praga')) return 'flask-outline';
  
  return 'construct-outline';
};

// --- 2. Formatação de Data Automática (Nov 28, 2025) ---
const formatDateSmart = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  
  // Ajuste de fuso horário simples para garantir o dia certo
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const day = date.getDate();
  const year = date.getFullYear();
  
  // Lista de meses abreviados
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const month = monthNames[date.getMonth()];

  // Retorna: "Nov 28, 2025"
  return `${month} ${day}, ${year}`;
};

export const AgendamentoItem = ({ item, onComplete }) => {
  const isConcluido = item.status === 'Concluído';
  const statusColor = COLORS.textLight; 
  const iconName = getIconName(item.servico_nome);

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        
        {/* Ícone */}
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={COLORS.primary} />
        </View>
        
        {/* Título e Status */}
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.servico_nome}</Text>
          <Text style={{ color: statusColor, fontSize: 14 }}>{item.status}</Text>
        </View>
        
        {/* Preço e Data */}
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { color: statusColor }]}>
            {item.valor > 0 ? `R$ ${item.valor}` : item.hora_servico.slice(0,5)}
          </Text>
          
          {/* AQUI ESTÁ A MÁGICA DA DATA */}
          <Text style={styles.transactionDate}>{formatDateSmart(item.data_servico)}</Text>
        
        </View>
      </TouchableOpacity>

      {/* Botão de Concluir (Check) */}
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