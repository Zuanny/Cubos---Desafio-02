const { format } = require('date-fns')
const bancodedados = require('../bancodedados')
const caminhoBancodedados = './src/bancodedados.js'
const fs = require('fs')
const { nextTick } = require('process')

//divisor

const InsertBanco = bancodedados => {
  let contasToString = JSON.stringify(bancodedados)

  fs.writeFileSync(caminhoBancodedados, 'module.exports =')
  fs.appendFileSync(caminhoBancodedados, contasToString)
}

const encontrarConta = conta => {
  let contaDestino = bancodedados.contas.find(obj => {
    return obj.numero == conta
  })
  if (contaDestino) {
    return contaDestino
  }
  return false
}

const verificarSenha = (conta, senha) => {
  let usuarioConta = encontrarConta(conta)

  if (usuarioConta.usuario.senha == senha) {
    return true
  }
  return false
}

const saldoDisponivelSaque = (conta, valor) => {
  let Conta = encontrarConta(conta)

  if (Conta.saldo - valor >= 0) {
    return true
  }
  return false
}

const formatarData = data => {
  return format(data, 'yyyy-MM-dd hh:mm:ss')
}
//Divisor
module.exports = {
  InsertBanco,
  encontrarConta,
  verificarSenha,
  saldoDisponivelSaque,
  formatarData
}
