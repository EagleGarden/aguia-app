// components/BalanceCard.jsx

import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Ganho</Text>
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