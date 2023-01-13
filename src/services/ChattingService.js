import axios from 'axios';



// 채팅방 리스트 조회
export async function getRooms(){
    // var memberId=localStorage.getItem('memberId');
    var memberId=1;
    const response=await axios.get(`/member/${memberId}/rooms`);
    console.log('getRooms response: ',response);
    return response;
}

