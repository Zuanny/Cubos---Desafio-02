module.exports = {
  banco: {
    nome: 'Cubos Bank',
    numero: 123,
    agencia: 1,
    senha: 'Cubos123Bank',
    contas: 7
  },
  contas: [
    {
      numero: 1,
      saldo: 52000,
      usuario: {
        nome: 'rods',
        cpf: '303555',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'chavosodmaisfamilia',
        senha: '1050'
      }
    },
    {
      numero: 2,
      saldo: 50790,
      usuario: {
        nome: 'Foo Bar 2',
        cpf: 123445,
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo@.sddaaassfss',
        senha: '12345'
      }
    },
    {
      numero: 3,
      saldo: 101210,
      usuario: {
        nome: 'rods',
        cpf: '3asd03555',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'chavosodmaisdasdsddfamilia',
        senha: '1050'
      }
    },
    {
      numero: 4,
      saldo: 0,
      usuario: {
        nome: 'rods2',
        cpf: '05505',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'rods@gmail',
        senha: '12345'
      }
    },
    {
      numero: 5,
      saldo: 0,
      usuario: {
        nome: 'rods2',
        cpf: '052505',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'rods@gmalil',
        senha: '12345'
      }
    },
    {
      numero: 6,
      saldo: 0,
      usuario: {
        nome: 'rods2',
        cpf: '0524505',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'rodas@gmalil',
        senha: '12345'
      }
    },
    {
      numero: 7,
      saldo: 0,
      usuario: {
        nome: 'rods2',
        cpf: '0524DSAD505',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'rodas@gmalASDASDil',
        senha: '12345'
      }
    }
  ],
  saques: [
    { data: '2022-04-27 10:30:07', numero_conta: 2, valor: 100 },
    { data: '2022-04-27 10:30:10', numero_conta: 2, valor: 100 },
    { data: '2022-04-28 09:10:02', numero_conta: 2, valor: 100 }
  ],
  depositos: [
    { data: '2022-04-27 10:31:08', numero_conta: 3, valor: 50000 },
    { data: '2022-04-27 10:31:11', numero_conta: 3, valor: 50000 },
    { data: '2022-04-28 09:10:08', numero_conta: 1, valor: 50000 },
    { data: '2022-04-28 09:11:01', numero_conta: 2, valor: 50000 }
  ],
  transferencias: [
    {
      data: '2022-04-27 10:31:21',
      numero_conta_origem: '2',
      numero_conta_destino: '3',
      valor: 900
    },
    {
      data: '2022-04-28 09:10:36',
      numero_conta_origem: '2',
      numero_conta_destino: '3',
      valor: 10
    }
  ]
}
