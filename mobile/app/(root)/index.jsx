import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useAgendamento } from '../../hooks/useAgendamento'
import { useEffect } from 'react'

export default function Page() {
  const { user } = useUser()
  const { agendamentos, summary, isLoading, loadData, deleteTransaction } = useAgendamento(user.id)

  useEffect(() => {
    loadData()
  }, [loadData])

  console.log('user', user?.emailAddresses[0].emailAddress)
  console.log('agendamentos:', agendamentos)
  console.log('summary:', summary)


  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
        <Text>Resumo:</Text>
        <Text>Concluídos: {summary.concluidos} (Valor: {summary.valor_total}) </Text>
        <Text>Agendados: {summary.agendados}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}