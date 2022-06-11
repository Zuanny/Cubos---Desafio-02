const bancodedados = require('../bancodedados')
const utils = require('../utils/utils')

const listarContas = (req, res) => {
  res.status(201).json(bancodedados.contas)
}

const addConta = (req, res) => {
  try {
    bancodedados.banco.contas++
    let novaConta = {
      numero: bancodedados.banco.contas,
      saldo: 0,
      usuario: req.body
    }

    bancodedados.contas.push(novaConta)

    utils.InsertBanco(bancodedados)

    return res.status(201).json()
  } catch (erro) {
    if (erro) {
      res.status(400).json({ message: erro.message })
    }
  }
}

const atulizarUsuarioAcc = (req, res) => {
  try {
    const { numeroConta } = req.params

    let conta = utils.encontrarConta(numeroConta)

    conta.usuario = { ...req.body }

    utils.InsertBanco(bancodedados)
    // bancodedados.contas.push(conta)
    return res.status(204).json()
  } catch (erro) {
    if (erro) {
      return res.status(500).json({ message: erro.message })
    }
  }
}

const deletarConta = (req, res) => {
  try {
    const { numeroConta } = req.params

    let novaLista = bancodedados.contas.filter(obj => {
      return obj.numero != numeroConta
    })
    bancodedados.contas = novaLista
    utils.InsertBanco(bancodedados)
    return res.status(204).json()
  } catch (erro) {
    if (erro) {
      res.status(500).json({ message: erro.message })
    }
  }
}

module.exports = {
  listarContas,
  addConta,
  atulizarUsuarioAcc,
  deletarConta
}
