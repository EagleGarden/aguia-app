import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  
  // --- Lógica de Data Automática ---
  const date = new Date();
  
  // Calcula o último dia do mês atual (ex: 30 ou 31)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Lista de meses abreviados
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const currentMonth = monthNames[date.getMonth()];

  // Monta o texto: "01 a 30 de Nov"
  const periodo = `01 a ${lastDay} de ${currentMonth}`;

  return (
    <View style={styles.balanceCard}>
      
      {/* Título formatado exatamente como você pediu */}
      <Text style={styles.balanceTitle}>Total Ganho ({periodo})</Text> 
      
      <Text style={styles.balanceAmount}>R$ {parseFloat(summary.valor_total).toFixed(2)}</Text>
      
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Concluídos</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            {summary.concluidos}
          </Text>
        </View>
        
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Agendados</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.primary }]}>
             {summary.agendados}
          </Text>
        </View>
      </View>
    </View>
  );
};