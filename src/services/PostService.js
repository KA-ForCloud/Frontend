import axios from 'axios';
import { userState } from '../atom';
import { useRecoilValue } from 'recoil';

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

export async function createApplicant(postId,request,userId){
    const response = await axios.post(`/api/registerApplicant`, {
        postId: postId,
        userId: userId,
        request: request
    })
    return response.data.code;
}

export async function createParticipant(postId,name){
    const response = await axios.post(`/api/registerParticipant`, {
        postId: postId,
        name: name
    })
    return response.data.code;
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



