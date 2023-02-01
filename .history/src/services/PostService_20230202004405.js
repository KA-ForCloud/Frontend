import axios from 'axios';

const BACKEND_API_BASE_URL="http://localhost:8080/api";

export async function getPosts(){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/post`)
    return response.data.result;
}

export async function getMyPost(){
    const userId = localStorage.getItem('memberId');
    const response=await axios.get(`${BACKEND_API_BASE_URL}/post/${userId}`)
    return response.data.result;
}

export async function getProject(){
    const userId = localStorage.getItem('memberId');
    const response=await axios.get(`${BACKEND_API_BASE_URL}/project/${userId}`)
    return response.data.result;
}

export async function getRequestedPost(){
    const userId = localStorage.getItem('memberId');
    const response=await axios.get(`${BACKEND_API_BASE_URL}/requestedPost/${userId}`)
    return response.data.result;
}

export async function getTemperatures(){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/temperature`)
    return response.data.result;
}

export async function getApplicant(postId){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/applicant/${postId}`)
    return response.data.result;
}

export async function getCurrentPostCategory(postId){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/currentParticipant/${postId}`)
    return response.data.result;
}

export async function createApplicant(postId,request){
    const response = await axios.post(`${BACKEND_API_BASE_URL}/registerApplicant`, {
        postId: postId,
        userId: localStorage.getItem('memberId'),
        request: request
    })
    return response.data.code;
}

export async function createParticipant(postId,name){
    const response = await axios.post(`${BACKEND_API_BASE_URL}/registerParticipant`, {
        postId: postId,
        name: name
    })
    return response.data.code;
}

export async function deleteApplicant(postId,name){
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/applicant/${postId}/${name}`)
    return response.data.code;
}

export async function getParticipant(postId,category){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/applicant/${postId}/${category}`)
    return response.data.result;
}

export async function deleteMyPost(postId){
    const userId = localStorage.getItem("memberId")
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/post/${postId}/${userId}`)
    return response.data.code;
}

export async function updatePostView(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/post/${postId}`)
    return response.data.result;
}

export async function updateCurrentCategory(postId, name){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/postCategory/${postId}/${name}`)
    return response.data.code;
}

export async function updatePostStatus(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/postStatus/${postId}`)
    return response.data.result;
}



