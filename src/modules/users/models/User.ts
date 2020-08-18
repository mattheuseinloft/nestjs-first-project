import IGithubData from '../dtos/IGithubData'
import IAddress from '../dtos/IAddress'

export class User {

    id: string;
    name: string;
    age: number;
    github_data: IGithubData;
    address: IAddress;

}
