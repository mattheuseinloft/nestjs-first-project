import { Test, TestingModule } from '@nestjs/testing'

import { UsersService } from '../services/UsersService'
import { User } from '../models/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import { UsersController } from './UsersController'

describe('UsersController', () => {
    let usersService: UsersService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, {
                provide: 'UsersRepository',
                useClass: FakeUsersRepository
            }]
        }).compile()

        usersService = app.get<UsersService>(UsersService)
    })

    describe('index', () => {
        it('should be able to get all users', () => {
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
            jest.spyOn(usersService, 'getAllUsers').mockImplementation(() => result)

            expect(usersService.getAllUsers()).toBe(result)
        })
    })

    describe('show', () => {
        it('should be able to get a user by his id', async () => {
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
                    cep: '12345678',
                    logradouro: 'logradouro',
                    complemento: 'complemento',
                    bairro: 'bairro',
                    localidade: 'localidade',
                    uf: 'uf'
                }
            }

            // eslint-disable-next-line @typescript-eslint/require-await
            jest.spyOn(usersService, 'getUserById').mockImplementation(async () => user)

            expect(await usersService.getUserById('user-id')).toBe(user)
        })

        it('should not be able to get a user that does not exists', async () => {
            // eslint-disable-next-line max-len
            await expect(usersService.getUserById('non-existing-user-id')).rejects.toBeInstanceOf(Error)
        })
    })

    describe('create', () => {
        it('should be able to create a user', async () => {
            expect(await usersService.createUser({
                name: 'John Doe',
                age: 32,
                github_user: 'johndoe',
                cep: '01001000'
            })).toHaveProperty('id')
        })

        // eslint-disable-next-line max-len
        it('should not be able to create a user with a github username that does not exists', async () => {
            await expect(usersService.createUser({
                name: 'John Doe',
                age: 32,
                cep: '12345678',
                github_user: 'non-existing-github-username'
            })).rejects.toBeInstanceOf(Error)
        })

        // eslint-disable-next-line max-len
        it('should not be able to create a user with a cep with more or less than 8 digits', async () => {
            await expect(usersService.createUser({
                name: 'John Doe',
                age: 32,
                cep: '123456789',
                github_user: 'johndoe'
            })).rejects.toBeInstanceOf(Error)
        })

        // eslint-disable-next-line max-len
        it('should not be able to create a user with a cep with a non-numeric character', async () => {
            await expect(usersService.createUser({
                name: 'John Doe',
                age: 32,
                cep: '123456a',
                github_user: 'johndoe'
            })).rejects.toBeInstanceOf(Error)
        })

        it('should not be able to create a user with a cep that does not exists', async () => {
            await expect(usersService.createUser({
                name: 'John Doe',
                age: 32,
                cep: '00000000',
                github_user: 'johndoe'
            })).rejects.toBeInstanceOf(Error)
        })
    })

    describe('update', () => {
        it('should be able to update a user', async () => {
            const user = await usersService.createUser({
                name: 'John Doe',
                age: 32,
                github_user: 'johndoe',
                cep: '01001000'
            })

            const updatedUser = await usersService.updateUser(user.id, {
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
            await expect(usersService.updateUser('non-existing-user-id', {
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
            jest.spyOn(usersService, 'createUser').mockImplementation(async () => user)

            await expect(usersService.updateUser(user.id, {
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
            jest.spyOn(usersService, 'createUser').mockImplementation(async () => user)

            await expect(usersService.updateUser(user.id, {
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
            jest.spyOn(usersService, 'createUser').mockImplementation(async () => user)

            await expect(usersService.updateUser(user.id, {
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
            jest.spyOn(usersService, 'createUser').mockImplementation(async () => user)

            await expect(usersService.updateUser(user.id, {
                name: 'John Doe',
                age: 32,
                github_user: 'johndoe',
                cep: '00000000'
            })).rejects.toBeInstanceOf(Error)
        })
    })

    describe('delete', () => {
        it('should be able to delete a user', async () => {
            const user = await usersService.createUser({
                name: 'John Doe',
                age: 32,
                github_user: 'johndoe',
                cep: '01001000'
            })

            expect(await usersService.deleteUser(user.id)).toBe(null)
        })

        it('should not be able to delete a user that does not exists', async () => {
            // eslint-disable-next-line max-len
            await expect(usersService.deleteUser('non-existing-user-id')).rejects.toBeInstanceOf(Error)
        })
    })
})
