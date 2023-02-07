import axios from 'axios';
import { userState } from '../atom';
import { useRecoilValue } from 'recoil';

<<<<<<< Updated upstream
const BACKEND_API_BASE_URL="http://localhost:8080";
=======
const BACKEND_API_BASE_URL="http://210.109.62.6:8080";
// const BACKEND_API_BASE_URL="http://localhost:8080";

>>>>>>> Stashed changes



export async function getPosts(){
    const response=await axios.get(`/api/post`);
    
    return response.data.result;
}

export async function getMyPost(userId){
    const response=await axios.get(`/api/post/${userId}`)
    return response.data.result;
}

export async function getProject(userId){
    const response=await axios.get(`/api/project/${userId}`)
    return response.data.result;
}

export async function getRequestedPost(userId){
    const response=await axios.get(`/api/requestedPost/${userId}`)
    return response.data.result;
}

export async function getTemperatures(){
    const response = await axios.get(`/api/temperature`)
    return response.data.result;
}

export async function getApplicant(postId){
    const response = await axios.get(`/api/applicant/${postId}`)
    return response.data.result;
}

export async function getCurrentPostCategory(postId){
    const response = await axios.get(`/api/currentParticipant/${postId}`)
    return response.data.result;
}

// 신청하기 클릭 시 api
export async function createApplicant(postId,request,userId){
    const response = await axios.post(`/api/registerApplicant`, {
        postId: postId,
        userId: userId,
        request: request
    })
    return response.data.code;
}

// 승인하기 클릭 시-> 채팅방 참여 메세지 발송되어야 함.
export async function createParticipant(postId,name){
    const response = await axios.post(`/api/registerParticipant`, {
        postId: postId,
        name: name
    })
    console.log("response",response);
    return response;
}

export async function deleteApplicant(postId,name){
    const response = await axios.delete(`/api/applicant/${postId}/${name}`)
    return response.data.code;
}

export async function getParticipant(postId,category){
    const response = await axios.get(`/api/applicant/${postId}/${category}`)
    return response.data.result;
}

export async function deleteMyPost(postId, userId){
    const response = await axios.delete(`/api/post/${postId}/${userId}`)
    return response.data.code;
}

export async function updatePostView(postId){
    const response = await axios.patch(`/api/post/${postId}`)
    return response.data.result;
}

export async function updateCurrentCategory(postId, name){
    const response = await axios.patch(`/api/postCategory/${postId}/${name}`)
    return response.data.code;
}

export async function updatePostStatus(postId){
    const response = await axios.patch(`/api/postStatus/${postId}`)
    return response.data.result;
}

export async function savePost(userId,postDto){
    const response=await axios.post(`/api/post/save/${userId}`,postDto);
    console.log("response: ",response);
    return response;
}

