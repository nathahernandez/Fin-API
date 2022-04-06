## FinAPI - Fincanceira

## Requisitos
- [V] Deve ser possivel criar uma conta
- [V] Deve ser possivel buscar o extrato bancário do Cliente
- [V] Deve ser possivel realizar um deposito
- [V] Deve ser possivel realizar um saque
- [V] Deve ser possivel buscar o extrato bancário do cliente por data
- [V] Deve ser possivel atualizar dados da conta do cliente
- [V] Deve ser possivel obter dados da conta do cliente
- [V] Deve ser possivel deletar uma conta
- [V] Deve ser possivel retornar o valor do balanço da conta

## Regras de negócio

- [V] Não deve ser possivel cadastrar uma conta com CPF já existente
- [V] Não deve ser possivel fazer deposito em uma conta não existente
- [V] Não deve ser possivel buscar extrato em uma conta não existente
- [V] Não deve ser possivel fazer saque em uma conta não existente
- [V] Não deve ser possivel excluir uma conta não existente
- [V] Não deve ser possivel fazer saque quando o saldo for insuficiente