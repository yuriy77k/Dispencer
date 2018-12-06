#!/usr/bin/env node

var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new Web3.providers.HttpProvider("https://clo-testnet3.0xinfra.com/"));

const privateKey = "0x08e62263c1aa088beeb31b7d6763a21672349529e39d71908f2b10232e4fa726";
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
    to: '0xd2acF96E3325D85fc60dc6B6057621130e890Ceb',
    value: '0x1000000000',
    gas: 100000,
    chainId: 20729
    //chainId: 820
})
.then(function (tx) {
  web3.eth.sendSignedTransaction(tx.rawTransaction)
  .on('receipt', console.log);
});
