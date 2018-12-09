#!/usr/bin/env node

var Web3 = require('web3');
var web3 = new Web3();

//web3.setProvider(new Web3.providers.HttpProvider("https://clo-testnet3.0xinfra.com/"));
web3.setProvider(new Web3.providers.HttpProvider("https://clo-geth.0xinfra.com/"));

const privateKey = "private key for 0xd2acf96e3325d85fc60dc6b6057621130e890ceb";
var acc=web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = acc.address;

/*
console.log(web3.eth.defaultAccount);
web3.eth.getBalance(web3.eth.defaultAccount)
.then(function (balance) {
    console.log(balance);
});
*/

acc.signTransaction({
    to: '0x9751b8abeed3b599a4611726a7cc2edfa7f7d454',
    value: '0x0',
    gas: 100000,
    //chainId: 20729
    chainId: 820
})
.then(function (tx) {
  web3.eth.sendSignedTransaction(tx.rawTransaction);
  //.on('receipt', console.log);
});
