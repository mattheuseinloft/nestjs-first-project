import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'

import githubAPI from '../../config/githubAPI'
import viacepAPI from '../../config/viacepAPI'
import { User } from '../models/User'
import IGithubData from '../dtos/IGithubData'
import IUserData from '../dtos/IUserData'
import IAddress from '../dtos/IAddress'

interface IGithubResponse {
    total_count: number
    incomplete_results: boolean
    items: IGithubData[]
}

@Injectable()
export class UsersService {

    users: User[] = [];

    getAll(): User[] {
        return this.users
    }

    getById(id: string): User {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw Error('User does not exists!')
        }

        return user
    }

    async create({ name, age, github_user, cep }: IUserData): Promise<User> {
        const responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)

        if (responseGithub.data.total_count === 0) {
            throw Error('Github username is invalid!')
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        if (cep.length > 8 || cep.length === 0) {
            throw Error('CEP has more than 8 digits or is empty!')
        }

        if (!RegExp('^[0-9]*$').test(cep)) {
            throw Error('CEP has a non-numeric character!')
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            throw Error('Unexpected error in ViaCEP!')
        }

        if (responseViacep.data.erro === true) {
            throw Error('CEP is invalid!')
        }

        const user: User = {
            id: uuid(),
            name,
            age,
            github_data: {
                login,
                avatar_url,
                repos_url
            },
            address: responseViacep.data
        }

        this.users.push(user)

        return user
    }

    async update(id: string, { name, age, github_user, cep }: IUserData): Promise<User> {
        const userFromArray = this.getById(id)

        if (!userFromArray) {
            throw Error('User does not exists!')
        }

        const responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)

        if (responseGithub.data.total_count === 0) {
            throw Error('Github username is invalid!')
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        if (cep.length > 8 || cep.length === 0) {
            throw Error('CEP has more than 8 digits or is empty!')
        }

        if (!RegExp('^[0-9]*$').test(cep)) {
            throw Error('CEP has a non-numeric character!')
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            throw Error('Unexpected error in ViaCEP!')
        }

        if (responseViacep.data.erro === true) {
            throw Error('CEP is invalid!')
        }

        Object.assign(userFromArray, {
            name,
            age,
            github_data: { login, avatar_url, repos_url },
            address: responseViacep.data
        })

        return userFromArray
    }

    delete(id: string): null {
        const index = this.users.findIndex(user => user.id === id)

        if (index === -1) {
            throw Error('User does not exists!')
        }

        this.users.splice(index, 1)

        return null
    }

}
