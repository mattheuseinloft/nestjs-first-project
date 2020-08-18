import { User } from '../models/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

import IUsersRepository from './IUsersRepository'

export default class UsersRepository implements IUsersRepository {

    private fakeOrmRepository: FakeUsersRepository

    constructor() {
        this.fakeOrmRepository = new FakeUsersRepository()
    }

    public findAll(): User[] {
        return this.fakeOrmRepository.findAll()
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async findById(id: string): Promise<User | undefined> {
        return this.fakeOrmRepository.findById(id)
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async create(userData: ICreateUserDTO): Promise<User> {
        return this.fakeOrmRepository.create(userData)
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async save(user: User): Promise<User> {
        return this.fakeOrmRepository.save(user)
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async remove(id: string): Promise<null> {
        return this.fakeOrmRepository.remove(id)
    }

}
