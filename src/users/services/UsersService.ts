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

    getById(id: string): User | undefined {
        return this.users.find(user => user.id === id)
    }

    async create({ name, age, github_user, cep }: IUserData): Promise<User | null> {
        const responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)

        // Username does not exists in Github
        if (responseGithub.data.total_count !== 1) {
            // eslint-disable-next-line no-console
            console.log('Username does not exists in Github')

            return null
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        // Cep is undefined
        if (!cep) {
            // eslint-disable-next-line no-console
            console.log('Cep is undefined')

            return null
        }

        // Cep has more than 8 digits or is empty
        if (cep.length > 8 || cep.length === 0) {
            // eslint-disable-next-line no-console
            console.log('Cep has more than 8 digits or is empty')

            return null
        }

        // Cep has a non-numeric character
        if (!RegExp('^[0-9]*$').test(cep)) {
            // eslint-disable-next-line no-console
            console.log('Cep has a non-numeric character')

            return null
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error while trying to get data from ViaCEP')

            return null
        }

        // CEP is invalid
        if (responseViacep.data.erro === true) {
            // eslint-disable-next-line no-console
            console.log('CEP is invalid')

            return null
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

    async update(id: string, { name, age, github_user, cep }: IUserData): Promise<User | null> {
        if (!id) {
            // eslint-disable-next-line no-console
            console.log('Id is undefined')

            return null
        }

        const userFromArray = this.getById(id)

        // User with given id does not exists
        if (!userFromArray) {
            return null
        }

        const responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)

        // Username does not exists in Github
        if (responseGithub.data.total_count === 0) {
            return null
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        // Cep is undefined
        if (!cep) {
            // eslint-disable-next-line no-console
            console.log('Cep is undefined')

            return null
        }

        // Cep has more than 8 digits or is empty
        if (cep.length > 8 || cep.length === 0) {
            // eslint-disable-next-line no-console
            console.log('Cep has more than 8 digits or is empty')

            return null
        }

        // Cep has a non-numeric character
        if (!RegExp('^[0-9]*$').test(cep)) {
            // eslint-disable-next-line no-console
            console.log('Cep has a non-numeric character')

            return null
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error while trying to get data from ViaCEP')

            return null
        }

        // CEP is invalid
        if (responseViacep.data.erro === true) {
            // eslint-disable-next-line no-console
            console.log('CEP is invalid')

            return null
        }

        userFromArray.name = name
        userFromArray.age = age
        userFromArray.github_data = { login, avatar_url, repos_url }
        userFromArray.address = responseViacep.data

        return userFromArray
    }

    delete(id: string): void | null {
        if (!id) {
            // eslint-disable-next-line no-console
            console.log('Id is undefined')

            return null
        }

        const index = this.users.findIndex(user => user.id === id)

        if (index !== -1) {
            this.users.splice(index, 1)
        }
    }

}
