import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MessageListItem from "./MessageListItem";
import {connect, getRooms, subscribe} from '../../../../services/ChattingService';


function MessageList(props) {
  
    const {items}=props;
    const [chats,setChats]=useState([]);
    useEffect(() => {
        console.log("MessageList - chats",items);
        setChats(items);
    }, []);
   
    return (
      <div class="mt-6 flex-row md:h-fit overflow-auto md:w-full">
        {items && items.map((item,idx)=>{
            return(
              <MessageListItem
                key={idx}
                item={item}/>
            );
          })}
        </div>
    );
    
}

export default MessageList;