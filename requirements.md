# Cadastro de usuário (Create)

## RF (Requisitos Funcionais)
- [x] O usuário deve poder se cadastrar informando os seguintes dados: Nome, Idade, Github User e CEP

## RNF (Requisitos Não Funcionais)
- [x] Utilizar UUID para geração do ID do usuário.
- [x] Utilizar axios para consumir dados das APIs do GitHub e do ViaCEP
- [x] Criar modelo "User" da seguinte forma:
  name: string
  age: number
  github_data: {
    login,
    avatar_url,
    repos_url,
  }
  address: {
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
  }

## RN (Regras de Negócio)
- [x] O usuário deve ter um ID único.
- [x] O usuário deve informar um Github User existente.
- [x] O usuário deve informar um CEP existente.

---------------------------------------------------------------------

# Listagem de informações do usuário (Read)

## RF (Requisitos Funcionais)
- [x] O usuário deve poder visualizar seus dados (Nome, Idade, Dados do Github e Endereco)

## RN (Regras de Negócio)
- [x] O usuário não pode visualizar dados de uma conta que não existe.

---------------------------------------------------------------------

# Atualização de usuário (Update)

## RF (Requisitos Funcionais)
- [x] O usuário deve poder alterar seu nome.
- [x] O usuário deve poder alterar sua senha.
- [x] O usuário deve poder alterar sua idade.
- [x] O usuário deve poder alterar seu Github User.
- [x] O usuário deve poder alterar seu Endereço, informando um novo CEP.

## RN (Regras de Negócio)
- [x] O usuário não pode alterar seu Github User para um username inválido.
- [x] O usuário não pode alterar seu Endereço para um CEP inválido.

---------------------------------------------------------------------

# Remoção de usuário (Delete)

## RF (Requisitos Funcionais)
- [x] O usuário deve poder deletar sua conta.

## RN (Regras de Negócio)
- [x] O usuário não pode deletar uma conta que não existe.
