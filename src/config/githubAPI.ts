import axios from 'axios'

const githubAPI = axios.create({
    baseURL: 'https://api.github.com/'
})

export default githubAPI
