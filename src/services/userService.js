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
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
export default {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserServiceDelete,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctor,
    saveDetailDoctor, getDetailInfoDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInfoDoctorById
}