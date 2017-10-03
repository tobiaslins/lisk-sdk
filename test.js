const LiskClient = require('./lib')

const lisk = new LiskClient()

const testAccount = async () => {
  console.log(await lisk.getAccount('6687808873757044786L'))
  console.log(await lisk.getTransactions('6687808873757044786L'))
}

testAccount()
