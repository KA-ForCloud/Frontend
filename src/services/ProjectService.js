import axios from 'axios';

// 프로젝트의 모든 파일 가져오기
export async function getAllFiles(roomId){
    const response=await axios.get(`/chat/file/${roomId}`);
    console.log("response",response);
    // const lastReadNum=await axios.get(`/api/member/${memberId}/`)
    return response;
}