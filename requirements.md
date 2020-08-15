# Cadastro de usuário (Create)

## RF (Requisitos Funcionais)
- [] O usuário deve poder se cadastrar informando os seguintes dados: Nome, Senha, Idade, Github User e CEP

## RNF (Requisitos Não Funcionais)
- [] Utilizar UUID para geração do ID do usuário.
- [] Utilizar axios para consumir dados das APIs do GitHub e do ViaCEP
- [] Criar modelo "User" da seguinte forma:
  name: string
  password: string
  age: number
  github_data: {
    login,
    avatar_url,
    html_url,
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
- [] O usuário deve ter um ID único.
- [] (opcional) O usuário deve informar uma senha com no mínimo 6 dígitos.
- [] O usuário deve informar um Github User existente.
- [] O usuário deve informar um CEP existente.

---------------------------------------------------------------------

# Listagem de informações do usuário (Read)

## RF (Requisitos Funcionais)
- [] O usuário deve poder visualizar seus dados (Nome, Idade, Dados do Github e Endereco)

## RN (Regras de Negócio)
- [] O usuário não pode visualizar dados de outros usuários.

---------------------------------------------------------------------

# Atualização de usuário (Update)

## RF (Requisitos Funcionais)
- [] O usuário deve poder alterar seu nome.
- [] O usuário deve poder alterar sua senha.
- [] O usuário deve poder alterar sua idade.
- [] O usuário deve poder alterar seu Github User.
- [] O usuário deve poder alterar seu Endereço, informando um novo CEP.

## RN (Regras de Negócio)
- [] O usuário não pode alterar seu Github User para um username inválido.
- [] O usuário não pode alterar seu Endereço para um CEP inválido.

---------------------------------------------------------------------

# Remoção de usuário (Delete)

## RF (Requisitos Funcionais)
- [] O usuário deve poder deletar sua conta, informando sua senha.

## RN (Regras de Negócio)
- [] O usuário não pode deletar a conta de outros usuários.
- [] O usuário deve informar uma senha correta para deletar sua conta.