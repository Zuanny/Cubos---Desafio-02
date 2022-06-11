# Cubos - Desafio-02

Desafio feito pela Cubos Academy - Com o objetivo de criar uma RESTful API em Node.js com transações e persistência de Dados, utilizando a biblioteca FS para manipulação de arquivos js

### Tecnologias Utilizadas
 - Node.js
 - Express
 - date-fsn
 - Nodemon
    

### Endpoint's
 - GET Listar Contas (http://localhost:3000/contas?senha_banco=Cubos123Bank)
   - Precisa da Senha de administrador como Query = "senha_banco ="
   - Retorna: A lista de todas as contas.

 - POST Criar conta (http://localhost:3000/contas)
   - Precisa os dados cadastrais no body como no exemplo abaixo:
     - {
          "nome": "senhor",
          "cpf": "DADO UNICO",   
          "data_nascimento": "2021-03-15",
          "telefone": "71999998888",
          "email": "DADO UNICO", 
          "senha": "12345"}
          
   - Sem retorno algum, Cria a conta no banco.
 
 - PUT Atualizar Conta (http://localhost:3000/contas/1/usuario)
   - Precisa ser passado um id da conta válido, Conteudo do body referente a atualização
   - Não possui retorno

 - DELETE Deletar Conta (http://localhost:3000/contas/2)
   - Deleta usuario com a ID passada como params
   - Não possui retorno.

 - POST Depositar Saldo em Conta (http://localhost:3000/transacoes/depositar)
   - Passar no body número da conta e Valor depositado.
     - Ex: {"numero_conta":1,"valor":10000}
   - Não possui retorno.

 - POST Sacar Saldo em Conta (http://localhost:3000/transacoes/sacar)
   - Passar no body número da conta e Valor sacado e senha da conta.
     - Ex: { "numero_conta":2, "valor":10,"senha": "12345"}
   - Necessário usuario possuir valor maior ou igual do Saque solicitado.
   - Não possui retorno.

 - POST Transferencia entre Contas (http://localhost:3000/transacoes/transferir)
   - Passar no body número da conta origem, número da conta destino,  Valor e senha.
     - Ex:  {"numero_conta_origem": "1", "numero_conta_destino": "2", "valor": 10, "senha": "12345"}
   - Necessário Conta de origem possuir saldo maior ou igual a transferencia.
   - Não possui retorno.

 - GET Demonstrar Saldo (http://localhost:3000/contas/saldo?numero_conta=2&senha=12345)
   - Passar numero da conta e senha na query.
   - Retorna o saldo da conta.

 - GET Demonstrar Extrato (http://localhost:3000/contas/extrato?numero_conta=2&senha=12345)
   - Passar numero da conta e senha na query.
   - Retorna Detalhadament um objeto com essas arrays depositos , saques, transferencia recebida e transferencia executada.
 
   

 
    
