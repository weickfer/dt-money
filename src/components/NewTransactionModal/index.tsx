import { useState, FormEvent } from 'react'
import ReactModal, { Props as ReactModalProps } from "react-modal";

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api';

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

ReactModal.setAppElement('#root')

interface NewTransactionModalProps extends ReactModalProps { }

type TransactionType = 'deposit' | 'withdraw'

export function NewTransactionModal(props: NewTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')


  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      type,
      title,
      amount,
      category
    }

    await api.post('/transactions', data)
  }

  return (
    <ReactModal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      {...props}
    >
      <button onClick={props.onRequestClose} className="react-modal-close" >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit" >Cadastrar</button>
      </Container>
    </ReactModal>
  )
}