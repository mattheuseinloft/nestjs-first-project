export default interface IAddress {
    erro?: boolean

    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
}
