import axios from 'axios'

const githubAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

export default githubAPI
