import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ChattingListItem from "./ChattingListItem";


function ChattingList(props) {
  
    const {items,seletedRoomTitle,onClickItem,selectRoom}=props;

    const selectedRoom=(itemId,itemTitle)=>{
        console.log('selected room id',itemId);
        console.log('selected room title',itemTitle);
        selectRoom(itemId,itemTitle);
    }
    return (
      <div class="mt-6 flex flex-col md:h-full">
          {items && items.map((item)=>{
            return(
              <ChattingListItem
                key={item.chattingId}
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