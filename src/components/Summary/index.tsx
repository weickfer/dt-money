import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  const { transactions, utils } = useTransactions()

  const deposits = transactions
    .filter(transaction => transaction.type === 'deposit')
    .reduce((acc, { amount }) => {
      return acc + amount
    }, 0)

  const withdraws = transactions
    .filter(transaction => transaction.type === 'withdraw')
    .reduce((acc, { amount }) => {
      return acc + amount
    }, 0)

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{utils.formatMoneyAmount(deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- ${utils.formatMoneyAmount(withdraws)}</strong>
      </div>
      <div className="green-background" >
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>${utils.formatMoneyAmount(deposits - withdraws)}</strong>
      </div>
    </Container>
  )
}