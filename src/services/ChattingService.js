import axios from 'axios';
import SockJS from 'sockjs-client';
// import Stomp from '@stomp/stompjs';


export const stomp = require('stompjs');
export let client;
// 채팅방 리스트 조회
export async function getRooms(memberId){
    // var memberId=localStorage.getItem('memberId');
   
    const response=await axios.get(`/api/member/${memberId}/rooms`);
    console.log('getRooms response: ',response);
    return response;
}
export async function getChattings(roomId){
    const response=await axios.get(`/chat/${roomId}`);
    console.log("[getChattings] ",response);
    return response;
}
// 채팅방 참여 - receive message
export function subscribe(socket,roomId){
    var response;
    console.log('subscribe: ',socket);
    socket.subscribe('/sub/chat/' + roomId, ({body}) => {
        console.log('subscribe - received message',body);
        response=body;
    // const json_body = JSON.parse(body.body);
    // setChatList((_chat_list) => [
    //     ..._chat_list, json_body
    // ]);
    });
    // client.subscribe(`http://localhost:8081/sub/room.${roomId}`, (body) => {
    //     console.log('subscribe - received message',body);
    // // const json_body = JSON.parse(body.body);
    // // setChatList((_chat_list) => [
    // //     ..._chat_list, json_body
    // // ]);
    // });
};

// 채팅방 참여 - send message TODO: memberId, nickname 수정 필요
export function publish(roomId,message,memberId,nickname,now){
    client.send(`/pub/chat.message.${roomId}`,{}, JSON.stringify({
        msg: message,
        nickName: nickname,
        roomId: roomId,
        timestamp: now,
        memberId: memberId
    }));
};

// 채팅방 참여 - enter 
export function enter(roomId,msg,sender){
    
    client.send('/pub/chat.enter.' + roomId, (body) => {
    // const json_body = JSON.parse(body.body);
    // setChatList((_chat_list) => [
    //     ..._chat_list, json_body
    // ]);
    });
};
// client 반환
export function getClient(){
    
    return client;
}
// 소켓 연결
export function connect(){ // 연결할 때
    let socket=new SockJS('http://localhost:8081/stomp/chat');
    client=stomp.over(socket);
    console.log("client ",client);
    client.connect({},function(){
        // var rooms=[];
        // rooms=getRooms().result;
        // for(let i=0;i<rooms.length;i++){
        //     subscribe(rooms[i].roomId);
        // }
        // subscribe();
    });
    // client.current.activate(); // 클라이언트 활성화
    return client;
};

export function disconnect(client){ // 연결이 끊겼을 때 
    client.current.deactivate();
};

