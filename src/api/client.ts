import axios, { AxiosRequestHeaders } from 'axios'

const token = localStorage.getItem('token') || ''

const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
}

if (token) {
  headers.Authorization = `Bearer ${token}`
}

export const client = axios.create({
  baseURL: 'http://localhost:3000/',
  headers,
})
