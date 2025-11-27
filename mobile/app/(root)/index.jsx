import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SignOutButton } from '@/components/SignOutButton'
import { useAgendamento } from '../../hooks/useAgendamento'
import PageLoader from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { BalanceCard } from '../../components/BalanceCard'
import NoAgendamentosFound from '../../components/NoAgendamentosFound'
import { AgendamentoItem } from '../../components/AgendamentoItem'

// TEM QUE TER "export default" AQUI
export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const [refreshing, setRefreshing] = React.useState(false);

  const { agendamentos, summary, isLoading, loadData, deleteAgendamento } = useAgendamento()

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = (id) => {
    Alert.alert('Deletar Serviço', 'Tem certeza que deseja deletar este agendamento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Deletar', style: 'destructive', onPress: () => deleteAgendamento(id) },
    ])
  }

  if (isLoading && !refreshing) return <PageLoader />

  return (
    <View style={styles.container} >
      <View style={styles.content} >
        {/*HEADER*/}
        <View style={styles.header} >
          {/*LEFT*/}
          <View style={styles.headerLeft}>
            {/* Se não tiver a imagem logo.png, comente a linha abaixo */}
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Bem vindo,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
              </Text>
            </View>
          </View>

          {/*RIGHT*/}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Ionicons name='add' size={20} color='#FFF' />
              <Text style={styles.addButtonText}>Novo</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Próximos Serviços</Text>
        </View>

      </View>

      <FlatList
        style={styles.transactionList}
        contentContainerStyle={styles.transactionListContent}
        data={agendamentos}
        renderItem={({ item }) => <AgendamentoItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoAgendamentosFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </View>
  )
}