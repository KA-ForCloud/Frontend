import React, { useState,useEffect } from "react";
import {getRooms} from '../../../services/ChattingService';
import ChattingRoom from "./ChattingRoom";
import ChattingList from "./list/ChattingList";

export default function ChattingPage() {
    const [roomList, setRoomList] = useState([]);
    const [roomId,setRoomId]=useState(0);
    const [roomTitle,setRoomTitle]=useState();
    const [address, setAddress] = useState();

    // 채팅방 선택 시 우측 화면 상단에 채팅방 제목을 보여줌
    const selectRoom=(itemId,itemTitle)=>{
        console.log('chatting page - selected room id',itemId);
        console.log('chatting page - selected room title',itemTitle);
        setRoomId(itemId);
        setRoomTitle(itemTitle);
    }
    const inRoom = () => setAddress(<ChattingRoom />);

    useEffect(()=>{
        getRooms().then((response)=>{
            if(response.data.code!==1000) console.log("SERVER ERROR");
            else{
                const data=response.data.result;
                if(data.length===0) console.log("no rooms");
                else{
                    setRoomList(data);
                }
            }
        });
    },[]);
    


    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div class="px-5 flex flex-row pt-5 md:h-full">
            <div class='md:h-full md:w-1/3'>
                <p class="text-2xl font-bold text-gray-900">채팅방 리스트</p>
                {roomList&&<ChattingList items={roomList} selectRoom={selectRoom}/>}
            </div>

            <div class='md:h-fit px-10 md:w-full'>
                {roomId===0 ?
                    <div>
                        <p class="text-2xl font-bold text-gray-900">원하는 채팅방을 선택하세요!</p>
                    </div>
                    :
                    <div>
                        <p class="text-2xl font-bold text-gray-900">{roomTitle}</p>
                        <ChattingRoom item={roomId}/>
                    </div>
                }
            </div>
            
            </div>
        </div>
    )
}