import axios from 'axios'
import { MemberProps } from './Interface'
import { Member } from '@prisma/client'
const origin =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : ''

axios.defaults.baseURL = origin

export const getMember = async (id: string) => {
  const { data } = await axios.get<Member>(`/api/read/${id}`)
  return data
}

export const getAllMembers = async () => {
  const { data } = await axios.get<Member[]>(`/api/read/get-all`)
  return data
}

export const createMember = async (member: MemberProps) => {
  const response = await axios.post('/api/create', member)
  return response
}

export const updateMember = async (id: string, member: MemberProps) => {
  const response = await axios.put(`/api/edit/${id}`, member)
  return response
}

export const deleteMember = async (id: string) => {
  const { status } = await axios.delete(`/api/delete/${id}`)
  return { status }
}
