import { Injectable, Inject } from '@nestjs/common'

import githubAPI from '../../config/githubAPI'
import viacepAPI from '../../config/viacepAPI'
import { User } from '../models/User'
import IGithubData from '../dtos/IGithubData'
import IAddress from '../dtos/IAddress'
import IUsersRepository from '../repositories/IUsersRepository'

interface IGithubResponse {
    total_count: number
    incomplete_results: boolean
    items: IGithubData[]
}

interface IRequest {
    name: string
    age: number
    github_user: string
    cep: string
}

@Injectable()
export class UsersService {

    @Inject('UsersRepository')
    private repository: IUsersRepository

    getAllUsers(): User[] {
        return this.repository.findAll()
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.repository.findById(id)

        if (!user) {
            throw Error('User does not exists!')
        }

        return user
    }

    async createUser({ name, age, github_user, cep }: IRequest): Promise<User> {
        let responseGithub
        try {
            responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)
        } catch (err) {
            throw Error('Unexpected error from GitHub!')
        }

        if (responseGithub.data.total_count === 0) {
            throw Error('Github username does not exists!')
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        if (cep.length !== 8) {
            throw Error('CEP must have 8 digits!')
        }

        if (!RegExp('^[0-9]*$').test(cep)) {
            throw Error('CEP has a non-numeric character!')
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            throw Error('Unexpected error from ViaCEP!')
        }

        if (responseViacep.data.erro === true) {
            throw Error('CEP does not exists!')
        }

        const user = await this.repository.create({
            name,
            age,
            github_data: {
                login,
                avatar_url,
                repos_url
            },
            address: responseViacep.data
        })

        return user
    }

    async updateUser(id: string, { name, age, github_user, cep }: IRequest): Promise<User> {
        const user = await this.repository.findById(id)

        if (!user) {
            throw Error('User does not exists!')
        }

        let responseGithub
        try {
            responseGithub = await githubAPI.get<IGithubResponse>(`search/users?q=${github_user}`)
        } catch (err) {
            throw Error('Unexpected error from GitHub!')
        }

        if (responseGithub.data.total_count === 0) {
            throw Error('Github username does not exists!')
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = responseGithub.data.items[0]

        if (cep.length !== 8) {
            throw Error('CEP must have 8 digits!')
        }

        if (!RegExp('^[0-9]*$').test(cep)) {
            throw Error('CEP has a non-numeric character!')
        }

        let responseViacep
        try {
            responseViacep = await viacepAPI.get<IAddress>(`${cep}/json/`)
        } catch (err) {
            throw Error('Unexpected error from ViaCEP!')
        }

        if (responseViacep.data.erro === true) {
            throw Error('CEP does not exists!')
        }

        Object.assign(user, {
            id,
            name,
            age,
            github_data: { login, avatar_url, repos_url },
            address: responseViacep.data
        })

        return this.repository.save(user)
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async deleteUser(id: string): Promise<null> {
        const user = await this.repository.findById(id)

        if (!user) {
            throw Error('User does not exists!')
        }

        return this.repository.remove(id)
    }

}
