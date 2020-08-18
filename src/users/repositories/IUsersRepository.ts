import { User } from '../models/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUsersRepository {
    findAll(): User[]
    findById(id: string): Promise<User | undefined>
    create(userData: ICreateUserDTO): Promise<User>
    save(user: User): Promise<User>
    remove(id: string): Promise<null>
}
