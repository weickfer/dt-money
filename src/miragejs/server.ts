import { createServer, Model } from "miragejs"

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Backend Freelance',
          type: 'deposit',
          category: 'Dev',
          amount: 8000,
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Dione Hospedagem',
          type: 'withdraw',
          category: 'Hospedagem',
          amount: 200,
          createdAt: new Date()
        },
        {
          id: 3,
          title: 'Dione Lucro',
          type: 'deposit',
          category: 'Start-Up',
          amount: 2000,
          createdAt: new Date()
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      const transaction = Object.assign(data, {
        createdAt: new Date()
      })

      return schema.create('transaction', transaction)
    })
  }
})