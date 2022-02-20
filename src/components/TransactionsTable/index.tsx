import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(response => {
        console.log(response)
      })
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Dione Compras</td>
            <td className="deposit">R$14.000,00</td>
            <td>Start-Up</td>
            <td>07/02/2022</td>
          </tr>
          <tr>
            <td>Dione Hospedagem</td>
            <td className="withdraw">- R$2.000,00</td>
            <td>Start-Up</td>
            <td>09/02/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
} 