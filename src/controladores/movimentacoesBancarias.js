const bancodedados = require('../bancodedados')
const utils = require('../utils/utils')

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body

  let conta = utils.encontrarConta(numero_conta)

  conta.saldo += valor

  let historicoDeposito = {
    data: utils.formatarData(new Date()),
    numero_conta,
    valor
  }
  bancodedados.depositos.push(historicoDeposito)

  utils.InsertBanco(bancodedados)

  return res.status(201).json()
}

const sacar = (req, res) => {
  const { numero_conta, valor } = req.body
  let conta = utils.encontrarConta(numero_conta)

  conta.saldo -= valor

  let historicoSaque = {
    data: utils.formatarData(new Date()),
    numero_conta,
    valor
  }
  bancodedados.saques.push(historicoSaque)

  utils.InsertBanco(bancodedados)
  return res.status(201).json()
}

const transferirValor = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor } = req.body

  let contaOrigem = utils.encontrarConta(numero_conta_origem)

  let contaDestino = utils.encontrarConta(numero_conta_destino)

  contaOrigem.saldo -= valor
  contaDestino.saldo += valor

  bancodedados.transferencias.push({
    data: utils.formatarData(new Date()),
    numero_conta_origem,
    numero_conta_destino,
    valor
  })
  utils.InsertBanco(bancodedados)
  return res.status(201).json()
}

const demonstarSaldo = (req, res) => {
  const { numero_conta } = req.query
  let Conta = utils.encontrarConta(numero_conta)

  return res.status(200).json({ Saldo: Conta.saldo })
}

const demonstrarExtrato = (req, res) => {
  const { numero_conta } = req.query

  let demonstrativoExtrato = {
    depositos: bancodedados.depositos.filter(Deposito => {
      return numero_conta == Deposito.numero_conta
    }),
    saques: bancodedados.saques.filter(saques => {
      return numero_conta == saques.numero_conta
    }),
    transferenciasEnviadas: bancodedados.transferencias.filter(
      Transferencia => {
        return numero_conta == Transferencia.numero_conta_origem
      }
    ),
    transferenciasRecebidas: bancodedados.transferencias.filter(
      Transferencia => {
        return numero_conta == Transferencia.numero_conta_destino
      }
    )
  }

  return res.status(200).json(demonstrativoExtrato)
}

module.exports = {
  depositar,
  sacar,
  transferirValor,
  demonstarSaldo,
  demonstrarExtrato
}
