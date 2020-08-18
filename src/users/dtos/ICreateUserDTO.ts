import IGithubData from './IGithubData'
import IAddress from './IAddress'

export default interface ICreateUserDTO {
    name: string
    age: number
    github_data: IGithubData
    address: IAddress
}
