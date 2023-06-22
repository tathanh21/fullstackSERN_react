import axios from "../axios"
const handleLoginApi = (userEmail, UserPassword) => {
    return axios.post('/api/login', { email: userEmail, password: UserPassword })
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
export default { handleLoginApi, getAllUsers }