const express = require('express')
const intermediarios = require('./intermediarios/intermediarios')
const {
  listarContas,
  addConta,
  atulizarUsuarioAcc,
  deletarConta
} = require('./controladores/contasBancarias')

const {
  depositar,
  sacar,
  transferirValor,
  demonstarSaldo,
  demonstrarExtrato
} = require('./controladores/movimentacoesBancarias')

const router = express()

router.get('/contas', intermediarios.verificarSenhaBanco, listarContas)

router.post(
  '/contas',
  intermediarios.verificarExistenciaDeCampos,
  intermediarios.emailEhUnico,
  intermediarios.cpfEhUnico,
  addConta
)

router.put(
  '/contas/:numeroConta/usuario',
  intermediarios.verificarExistenciaDeCampos,
  intermediarios.numeroContaExiste,
  intermediarios.emailEhUnico,
  atulizarUsuarioAcc
)

router.delete(
  '/contas/:numeroConta',
  intermediarios.numeroContaExiste,
  intermediarios.saldoZero,
  deletarConta
)

router.post(
  '/transacoes/depositar',
  intermediarios.verificarCamposDeposito,
  intermediarios.numeroContaExisteBody,
  intermediarios.depositoPositivo,
  depositar
)

router.post(
  '/transacoes/sacar',
  intermediarios.verificarCampoSaque,
  intermediarios.numeroContaExisteBody,
  intermediarios.verificarSenha,
  intermediarios.saquePositivo,
  sacar
)

router.post(
  '/transacoes/transferir',
  intermediarios.verificarCamposTransferencia,
  intermediarios.contaEnvioEDestinoExiste,
  intermediarios.verificarSenhatransferencia,
  intermediarios.saldoParaTransferencia,
  transferirValor
)

router.get(
  '/contas/saldo',
  intermediarios.verificarCamposDemonstraSaldo,
  intermediarios.numeroContaQuery,
  intermediarios.verificarSenhaQuery,
  demonstarSaldo
)

router.get(
  '/contas/extrato',
  intermediarios.verificarCamposDemonstraSaldo,
  intermediarios.numeroContaQuery,
  intermediarios.verificarSenhaQuery,
  demonstrarExtrato
)

module.exports = router
