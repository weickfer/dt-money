import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions, utils } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoría</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>{utils.formatMoneyAmount(transaction.amount)}</td>
                <td>{transaction.category}</td>
                <td>{utils.formatDate(transaction.createdAt)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  )
} 