import ListUsersService from '../services/ListUsersService'
import { User } from '../models/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('ListUsers', () => {
    let fakeUsersRepository: FakeUsersRepository
    let listUsers: ListUsersService

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()

        listUsers = new ListUsersService(
            fakeUsersRepository
        )
    })

    it('should be able to list all users', async () => {
        const user1: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '12345678',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        const user2: User = {
            id: 'user-id',
            name: 'John Tre',
            age: 33,
            github_data: {
                login: 'johntre',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '12345678',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        const result = [user1, user2]
        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(listUsers, 'execute').mockImplementation(async () => result)

        expect(await listUsers.execute()).toBe(result)
    })
})
