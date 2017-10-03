const axios = require('axios')

class Lisk {
  constructor(address, secret) {
    this.request = axios.create({
      baseURL: 'https://node01.lisk.io',
      timeout: 1000,
      responseType: 'json'
    })
  }
  handleRequest(config, selector) {
    return new Promise((resolve, reject) => {
      this.request(config)
        .then(({ data }) => {
          if (data.success) {
            const res = selector ? data[selector] : data
            resolve(res)
          } else reject(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getBalance(address) {
    return this.handleRequest({
      url: `/api/accounts/getBalance?address=${address}`,
      method: 'get'
    })
  }
  getAccount(address) {
    return this.handleRequest(
      {
        url: `/api/accounts?address=${address}`,
        method: 'get'
      },
      'account'
    )
  }
  getActiveDelegates(limit = 5) {
    return this.handleRequest({
      url: `/api/accounts/getBalance?address=${address}`,
      method: 'get'
    })
  }
  voteDelegates(data) {
    return this.handleRequest({
      url: `/api/accounts/delegates`,
      method: 'put',
      data
    })
  }
  getTransactions(address, limit = 10, offset = 0) {
    return this.handleRequest(
      {
        url: `/api/transactions?senderId=${address}&recipientId=${address}&limit=${limit}&offset=${offset}&orderBy=timestamp:desc`,
        method: 'get'
      },
      'transactions'
    )
  }
  sendTransaction(secret, amount, recipientId, secondSecret) {
    return this.handleRequest({
      url: `/api/transactions`,
      method: 'put',
      data: {
        secret,
        amount,
        receipientId,
        secondSecret
      }
    })
  }
}

module.exports = Lisk
