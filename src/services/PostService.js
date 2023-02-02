import axios from 'axios';
import { userState } from '../atom';
import { useRecoilValue } from 'recoil';

const BACKEND_API_BASE_URL="http://localhost:8080";



export async function getPosts(){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/api/post`)
    return response.data.result;
}

export async function getMyPost(userId){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/api/post/${userId}`)
    return response.data.result;
}

export async function getProject(userId){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/api/project/${userId}`)
    return response.data.result;
}

export async function getRequestedPost(userId){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/api/requestedPost/${userId}`)
    return response.data.result;
}

export async function getTemperatures(){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/temperature`)
    return response.data.result;
}

export async function getApplicant(postId){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/applicant/${postId}`)
    return response.data.result;
}

export async function getCurrentPostCategory(postId){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/currentParticipant/${postId}`)
    return response.data.result;
}

export async function createApplicant(postId,request){
    const response = await axios.post(`${BACKEND_API_BASE_URL}/api/registerApplicant`, {
        postId: postId,
        userId: localStorage.getItem('memberId'),
        request: request
    })
    return response.data.code;
}

export async function createParticipant(postId,name){
    const response = await axios.post(`${BACKEND_API_BASE_URL}/api/registerParticipant`, {
        postId: postId,
        name: name
    })
    return response.data.code;
}

export async function deleteApplicant(postId,name){
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/applicant/${postId}/${name}`)
    return response.data.code;
}

export async function getParticipant(postId,category){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/applicant/${postId}/${category}`)
    return response.data.result;
}

export async function deleteMyPost(postId){
    const userId = localStorage.getItem("memberId")
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/post/${postId}/${userId}`)
    return response.data.code;
}

export async function updatePostView(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/post/${postId}`)
    return response.data.result;
}

export async function updateCurrentCategory(postId, name){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/postCategory/${postId}/${name}`)
    return response.data.code;
}

export async function updatePostStatus(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/postStatus/${postId}`)
    return response.data.result;
}



