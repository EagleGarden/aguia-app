import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  
  // Lógica para pegar o primeiro e último dia do mês atual
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // Formatando para "01/11 a 30/11"
  const formatDateSimple = (d) => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}`;
  const periodo = `${formatDateSimple(firstDay)} a ${formatDateSimple(lastDay)}`;

  return (
    <View style={styles.balanceCard}>
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