import API from '../config'

const Restaurant = {
    async get () {
        const response = await API.get('/restaurant')
        return response.data
    },

    async getOne (id) {
        const response = await API.get(`/restaurant/${id}`)
        return response.data
    },

    async getByUser (user_id) {
        const response = await API.get(`/restaurant/user/${user_id}`)
        return response.data
    },

    async create (name, description, address, email, capacity) {
        const response = await API.post('/restaurant', {
            name: name,
            description: description,
            address: address,
            email: email,
            capacity: capacity
        })
        return response.data
    },

    async update (id, name, description, address, email, capacity) {
        const response = await API.put(`/restaurant/${id}`, {
            name: name,
            description: description,
            address: address,
            email: email,
            capacity: capacity
        })
        return response.data
    },

    async delete (id) {
        const response = await API.delete(`/restaurant/${id}`)
        return response.data
    },
}

export default Restaurant