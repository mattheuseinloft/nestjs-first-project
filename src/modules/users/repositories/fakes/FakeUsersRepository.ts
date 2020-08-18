import { uuid } from 'uuidv4'
import { Injectable } from '@nestjs/common'

import { User } from '../../models/User'
import IUsersRepository from '../IUsersRepository'
import ICreateUserDTO from '../../dtos/ICreateUserDTO'

@Injectable()
export default class FakeUsersRepository implements IUsersRepository {

    private users: User[] = [];

    // eslint-disable-next-line @typescript-eslint/require-await
    public async findAll(): Promise<User[]> {
        return this.users
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id)

        return user
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User()

        Object.assign(user, { id: uuid() }, userData)

        this.users.push(user)

        return user
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

        this.users[findIndex] = user

        return user
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async remove(id: string): Promise<null> {
        const index = this.users.findIndex(user => user.id === id)

        this.users.splice(index, 1)

        return null
    }

}
