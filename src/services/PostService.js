import axios from 'axios';


export const BACKEND_API_BASE_URL="https://teamchat.shop";




export async function getPosts(){
    const response=await axios.get(`http://172.16.48.118:8080/api/post`);
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

export async function getPopularCategorys(){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/popularCategory`)
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

// 신청하기 클릭 시 api
export async function createApplicant(postId,request,userId){
    const response = await axios.post(`${BACKEND_API_BASE_URL}/api/registerApplicant`, {
        postId: postId,
        request: request,
        userId: userId
    })
    return response;
}


// 승인하기 클릭 시-> 채팅방 참여 메세지 발송되어야 함.

export async function createParticipant(postId,userId){

    const response = await axios.post(`${BACKEND_API_BASE_URL}/api/registerParticipant`, {
        postId: postId,
        userId: userId
    })
    console.log("response",response);
    return response;
}

export async function deleteApplicant(postId,userId){
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/applicant/${postId}/${userId}`)
    return response.data.code;
}

export async function deleteAllApplicant(postId,category){
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/allApplicant/${postId}/${category}`)
    return response;
}

export async function getParticipant(postId,category){
    const response = await axios.get(`${BACKEND_API_BASE_URL}/api/applicant/${postId}/${category}`)
    return response.data.result;
}

export async function deleteMyPost(postId, userId){
    const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/post/${postId}/${userId}`)
    return response.data.code;
}

export async function updatePostView(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/post/${postId}`)
    return response.data.result;
}

export async function updateCurrentCategory(postId, userId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/postCategory/${postId}/${userId}`)
    return response.data.code;
}

export async function updatePostStatus(postId){
    const response = await axios.patch(`${BACKEND_API_BASE_URL}/api/postStatus/${postId}`)
    return response.data.result;
}

export async function savePost(userId,postDto){
    const response=await axios.post(`${BACKEND_API_BASE_URL}/api/post/save/${userId}`,postDto);
    console.log("response: ",response);
    return response;
}

