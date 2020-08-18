import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'
import { User } from '../models/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('UpdateUser', () => {
    let fakeUsersRepository: FakeUsersRepository
    let createUser: CreateUserService
    let updateUser: UpdateUserService

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()

        updateUser = new UpdateUserService(
            fakeUsersRepository
        )

        createUser = new CreateUserService(
            fakeUsersRepository
        )
    })

    it('should be able to update a user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '01001000'
        })

        const updatedUser = await updateUser.execute({
            user_id: user.id,
            name: 'John Trê',
            age: 33,
            github_user: 'johntre',
            cep: '80410000'
        })

        expect(updatedUser.name).toBe('John Trê')
        expect(updatedUser.age).toBe(33)
        expect(updatedUser.github_data.login).toBe('johntre')
        expect(updatedUser.address.cep).toBe('80410-000')
    })

    it('should not be able to update a user that does not exists', async () => {
        await expect(updateUser.execute({
            user_id: 'non-existing-user-id',
            name: 'John Doe',
            age: 32,
            cep: '12345678',
            github_user: 'johntre'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to update to a github username that does not exists', async () => {
        const user: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '01001000',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(createUser, 'execute').mockImplementation(async () => user)

        await expect(updateUser.execute({
            user_id: user.id,
            name: 'John Doe',
            age: 32,
            cep: '01001000',
            github_user: 'non-existing-github-username'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to update to a cep with more or less than 8 digits', async () => {
        const user: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '01001000',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(createUser, 'execute').mockImplementation(async () => user)

        await expect(updateUser.execute({
            user_id: user.id,
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '123456789'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to update to a cep with a non-numeric character', async () => {
        const user: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '01001000',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(createUser, 'execute').mockImplementation(async () => user)

        await expect(updateUser.execute({
            user_id: user.id,
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '123456a'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to update to a cep that does not exists', async () => {
        const user: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '01001000',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(createUser, 'execute').mockImplementation(async () => user)

        await expect(updateUser.execute({
            user_id: user.id,
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '00000000'
        })).rejects.toBeInstanceOf(Error)
    })
})
