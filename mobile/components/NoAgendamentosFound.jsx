// components/NoAgendamentosFound.jsx

import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";

const NoAgendamentosFound = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="leaf-outline" // Ícone de folha
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>Nenhum serviço ainda</Text>
      <Text style={styles.emptyStateText}>
        Comece agendando seu primeiro serviço de jardinagem
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Agendar Serviço</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoAgendamentosFound;