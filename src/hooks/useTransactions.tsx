import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

export type Transaction = {
  id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  category: string;
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionsContextUtils = {
  formatMoneyAmount(amount: number): string
  formatDate(date: string): string
}

type TransactionsContextData = {
  transactions: Array<Transaction>
  createTransaction(transaction: TransactionInput): Promise<void>
  utils: TransactionsContextUtils
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

type TransactionsProviderProps = {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(response => {
        setTransactions(response.data.transactions)
      })
  }, [])

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post('/transactions', transactionInput)

    setTransactions(transactions => [...transactions, response.data.transaction])
  }

  /* Utils */
  const formatDate = (date: string) => new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  const formatMoneyAmount = (amount: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)


  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      utils: {
        formatDate,
        formatMoneyAmount
      }
    }} >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
