import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserServiceDelete = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data)
}
const getDetailInfoDoctor = (inputId) => {
    return axios.get(`api/get-detail-doctor-by-id/?id=${inputId}`)
}
export default { handleLoginApi, getAllUsers, createNewUserService, deleteUserServiceDelete, editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctor, saveDetailDoctor, getDetailInfoDoctor }