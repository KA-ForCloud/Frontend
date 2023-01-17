import axios from 'axios';

const BACKEND_API_BASE_URL="http://localhost:8080";

export async function getPosts(){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/post`)
    return response.data.result;
}

export async function getPostInfo(postId){
    const response=await axios.get(`${BACKEND_API_BASE_URL}/post/${postId}`)
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