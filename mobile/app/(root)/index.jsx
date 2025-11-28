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

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const [refreshing, setRefreshing] = React.useState(false);

  const { agendamentos, summary, isLoading, loadData, deleteAgendamento, markAsCompleted } = useAgendamento()

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  // Função para CONCLUIR
  const handleComplete = (id) => {
    Alert.alert(
      'Concluir Serviço',
      'Deseja marcar este serviço como concluído? O valor será somado à carteira.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Concluir', onPress: () => markAsCompleted(id) },
      ]
    )
  }

  // Função para DELETAR (Com mensagem diferente se já foi pago)
  const handleDelete = (id, isConcluido) => {
    const titulo = isConcluido ? 'Apagar Histórico?' : 'Cancelar Serviço?';
    const mensagem = isConcluido 
        ? 'Este serviço já foi concluído. Se você apagar, o valor será REMOVIDO do total ganho. Tem certeza?'
        : 'Tem certeza que deseja cancelar este agendamento?';

    Alert.alert(titulo, mensagem, [
      { text: 'Não, manter', style: 'cancel' },
      { 
        text: isConcluido ? 'Sim, apagar' : 'Sim, cancelar', 
        style: 'destructive', 
        onPress: () => deleteAgendamento(id) 
      },
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
            {/* LOGO ATIVA NOVAMENTE AQUI 👇 */}
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
        renderItem={({ item }) => (
          <AgendamentoItem 
            item={item} 
            onDelete={handleDelete} 
            onComplete={handleComplete} 
          />
        )}
        ListEmptyComponent={<NoAgendamentosFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </View>
  )
}