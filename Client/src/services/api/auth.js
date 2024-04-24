import API from '../config'

const Auth = {
    async login (email, password) {
        API.post('/user/auth', {
            email: email,
            password: password
        })
        .then(response => {
            localStorage.setItem('silvermicro_token', response.data.token)
        
        })
    },

    async register (username, email, password) {
        API.post('/user/register', {
            username: username,
            email: email,
            password: password
        })
        .then(response => {
            console.log(response.data)
        })
    }
}

export default Auth