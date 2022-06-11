const bancodedados = require('../bancodedados')
const utils = require('../utils/utils')

const verificarSenhaBanco = (req, res, next) => {
  const { senha_banco } = req.query
  const senha = bancodedados.banco.senha
  if (senha_banco == senha) {
    return next()
  }
  return res
    .status(401)
    .json({ mensagem: 'A senha do banco informada é inválida!' })
}

const verificarExistenciaDeCampos = (req, res, next) => {
  let { nome, cpf, data_nascimento, telefone, email, senha } = req.body

  if (!nome) {
    return res.status(400).json({
      mensagem: 'O Nome e obrigatório!'
    })
  }
  if (!cpf) {
    return res.status(400).json({
      mensagem: 'O CPF e obrigatório!'
    })
  }
  if (!data_nascimento) {
    return res.status(400).json({
      mensagem: 'A data de Nascimento e obrigatória!'
    })
  }
  if (!telefone) {
    return res.status(400).json({
      mensagem: 'O Telefone e obrigatório!'
    })
  }
  if (!email) {
    return res.status(400).json({ message: 'O email e obrigatorio!' })
  }
  if (!senha) {
    return res.status(400).json({ message: 'A senha e obrigatoria!' })
  }
  return next()
}

const emailEhUnico = (req, res, next) => {
  let { email } = req.body

  if (
    bancodedados.contas.find(obj => {
      return obj.usuario.email === email
    })
  ) {
    return res.status(400).json({
      mensagem: 'Já existe uma conta com  e-mail informado!'
    })
  }

  return next()
}
const cpfEhUnico = (req, res, next) => {
  const { cpf } = req.body

  if (
    bancodedados.contas.find(obj => {
      return obj.usuario.cpf === cpf
    })
  ) {
    return res.status(400).json({
      mensagem: 'Já existe uma conta com o cpf informado!'
    })
  }

  return next()
}

const numeroContaExiste = (req, res, next) => {
  const { numeroConta } = req.params
  if (numeroConta) {
    if (utils.encontrarConta(numeroConta)) {
      return next()
    }
    return res.status(404).json({
      mensagem: 'Conta bancária não encontada!'
    })
  }
  return res.status(400).json({ message: 'O numero da conta e Obrigatorio!' })
}
const saldoZero = (req, res, next) => {
  const { numeroConta } = req.params

  let contaUsuario = utils.encontrarConta(numeroConta)

  if (contaUsuario.saldo == 0) {
    return next()
  }
  return res.status(400).json({
    mensagem: 'A conta só pode ser removida se o saldo for zero!'
  })
}

const numeroContaExisteBody = (req, res, next) => {
  const { numero_conta } = req.body
  if (numero_conta) {
    if (utils.encontrarConta(numero_conta)) {
      return next()
    }
    return res.status(404).json({
      mensagem: 'Conta bancária não encontada!'
    })
  }
  return res.status(400).json({ message: 'O numero da conta e Obrigatorio!' })
}
const verificarCamposDeposito = (req, res, next) => {
  const { numero_conta, valor } = req.body
  if (numero_conta && valor) {
    return next()
  }
  return res.status(400).json({
    message: 'O valor e o Numero da conta sao obrigatorios!'
  })
}

const depositoPositivo = (req, res, next) => {
  const { valor } = req.body
  if (valor > 0) {
    return next()
  }
  return res
    .status(400)
    .json({ message: 'Valor depositado deve ser maior que 0' })
}

const verificarCampoSaque = (req, res, next) => {
  const { numero_conta, valor, senha } = req.body
  if (numero_conta && valor && senha) {
    return next()
  }
  return res
    .status(400)
    .json({ message: 'O numero da conta, valor e a senha sao obrigatorios!' })
}

const verificarSenha = (req, res, next) => {
  const { numero_conta, senha } = req.body

  if (utils.verificarSenha(numero_conta, senha)) {
    return next()
  }
  return res.status(404).json({ message: 'Senha incorreta' })
}

const saquePositivo = (req, res, next) => {
  const { numero_conta, valor } = req.body

  if (utils.saldoDisponivelSaque(numero_conta, valor)) {
    return next()
  }
  return res.status(400).json({ message: 'Saldo insuciente ' })
}

const verificarCamposTransferencia = (req, res, next) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
  if (numero_conta_origem && numero_conta_destino && valor && senha) {
    return next()
  }
  return res.status(400).json({
    message:
      'O numero da conta de origem, numero da conta de destino, valor e senha sao obrigatorios!'
  })
}

const contaEnvioEDestinoExiste = (req, res, next) => {
  const { numero_conta_origem, numero_conta_destino } = req.body
  if (!utils.encontrarConta(numero_conta_origem)) {
    return res.status(404).json({ message: 'conta origem nao encontrada' })
  }

  if (!utils.encontrarConta(numero_conta_destino)) {
    return res.status(404).json({ message: 'conta destino nao encontrada' })
  }
  return next()
}

const verificarSenhatransferencia = (req, res, next) => {
  const { numero_conta_origem, senha } = req.body
  if (utils.verificarSenha(numero_conta_origem, senha)) {
    return next()
  }
  return res.status(400).json({ message: 'Senha incorreta' })
}

const saldoParaTransferencia = (req, res, next) => {
  const { numero_conta_origem, valor } = req.body
  if (valor <= 0) {
    return res
      .status(400)
      .json({ message: 'Nao pode ser transferidos valores nulos' })
  }

  if (utils.saldoDisponivelSaque(numero_conta_origem, valor)) {
    return next()
  }
  return res.status(401).json({
    mensagem: 'Saldo insuficiente!'
  })
}

const verificarCamposDemonstraSaldo = (req, res, next) => {
  const { numero_conta, senha } = req.query
  if (numero_conta && senha) {
    return next()
  }
  return res
    .status(400)
    .json({ message: 'Numero da conta e Senha sao obrigatorios!' })
}
const verificarSenhaQuery = (req, res, next) => {
  const { numero_conta, senha } = req.query
  if (utils.verificarSenha(numero_conta, senha)) {
    return next()
  }
  return res.status(400).json({ message: 'senha incorreta' })
}

const numeroContaQuery = (req, res, next) => {
  const { numero_conta } = req.query
  if (utils.encontrarConta(numero_conta)) {
    return next()
  }
  return res.status(404).json({
    mensagem: 'Conta bancária não encontada!'
  })
}

module.exports = {
  verificarSenhaBanco,
  emailEhUnico,
  cpfEhUnico,
  verificarExistenciaDeCampos,
  numeroContaExiste,
  saldoZero,
  verificarCamposDeposito,
  numeroContaExisteBody,
  depositoPositivo,
  verificarCampoSaque,
  verificarSenha,
  saquePositivo,
  verificarCamposTransferencia,
  contaEnvioEDestinoExiste,
  verificarSenhatransferencia,
  saldoParaTransferencia,
  verificarSenhaQuery,
  numeroContaQuery,
  verificarCamposDemonstraSaldo
}
