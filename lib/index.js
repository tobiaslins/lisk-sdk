const request = require('request-promise-native')

class Lisk {
  constructor(address, secret) {
    this.request = request.defaults({
      baseUrl: 'https://node01.lisk.io',
      timeout: 30000,
      json: true
    })
  }
  handleRequest(config, selector) {
    return new Promise((resolve, reject) => {
      this.request(config)
        .then(res => {
          if (res.success) {
            const data = selector ? res[selector] : res
            resolve(data)
          } else reject(res)
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
  voteDelegates(body) {
    return this.handleRequest({
      url: `/api/accounts/delegates`,
      method: 'put',
      body
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
      body: {
        secret,
        amount,
        receipientId,
        secondSecret
      }
    })
  }
}

module.exports = Lisk
