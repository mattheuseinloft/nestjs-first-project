import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'

import githubAPI from '../../config/githubAPI'
import { User } from '../models/User'
import IGithubData from '../dtos/IGithubData'
import IUserData from '../dtos/IUserData'

interface IGithubResponseDTO {
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

    async create({ name, age, github_user, address }: IUserData): Promise<User | null> {
        const response = await githubAPI.get<IGithubResponseDTO>(`search/users?q=${github_user}`)

        // Username does not exists in Github
        if (response.data.total_count !== 1) {
            return null
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = response.data.items[0]

        const user: User = {
            id: uuid(),
            name,
            age,
            github_data: {
                login,
                avatar_url,
                repos_url
            },
            address
        }

        this.users.push(user)

        return user
    }

    async update(id: string, { name, age, address, github_user }: IUserData): Promise<User | null> {
        const userFromArray = this.getById(id)

        // User with given id does not exists
        if (!userFromArray) {
            return null
        }

        const response = await githubAPI.get<IGithubResponseDTO>(`search/users?q=${github_user}`)

        // Username does not exists in Github
        if (response.data.total_count === 0) {
            return null
        }

        const {
            login,
            avatar_url,
            repos_url
        }: IGithubData = response.data.items[0]

        userFromArray.name = name
        userFromArray.age = age
        userFromArray.github_data = { login, avatar_url, repos_url }
        userFromArray.address = address

        return userFromArray
    }

    delete(id: string): void {
        const index = this.users.findIndex(user => user.id === id)

        if (index !== -1) {
            this.users.splice(index, 1)
        }
    }

}
