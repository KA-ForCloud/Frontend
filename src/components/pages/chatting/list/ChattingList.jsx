import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import ChattingListItem from "./ChattingListItem";
import {connect, getRooms, subscribe,client} from '../../../../services/ChattingService';


function ChattingList(props) {
  
    const {items,seletedRoomTitle,onClickItem,selectRoom}=props;
    const socket=useSelector(state=>state.socket);

    const selectedRoom=(itemId,itemTitle)=>{
        console.log('selected room id',itemId);
        console.log('selected room title',itemTitle);
        selectRoom(itemId,itemTitle);
    }
  //   useEffect(() => {
  //     socket.subscribe('/sub/chat/' + roomId, ({body}) => {
  //         console.log('subscribe - received message',body);
  //         const received=JSON.parse(body.body);
  //         setChatList(...chatList,received);
  //     });
  // }, [socket]);
    return (
      <div class="mt-6 flex flex-col md:h-full">
        {/* {items && items.map((item,index)=>{
            console.log("try to subscribe... roomId: ",item.chattingId);
            subscribe(item.chattingId);
            return(
              <ChattingListItem
                key={index+1}
                item={item}
                selectedRoom={selectedRoom}
                onClick={()=>{
                  onClickItem(item);
                }}/>
            );
          })} */}
        {items && items.map((item,idx)=>{
          // console.log("chattingList socket: ",socket);
          //   // console.log("try to subscribe... roomId: ",item.chattingId);
          //   // subscribe(socket,item.chattingId);
          //   socket.subscribe(`/sub/chat/${item.chattingId}`,function(body){

          //   })
            return(
              <ChattingListItem
                key={idx}
                item={item}
                selectedRoom={selectedRoom}
                onClick={()=>{
                  onClickItem(item);
                }}/>
            );
          })}
       
          
        </div>
    );
    
}

export default ChattingList;