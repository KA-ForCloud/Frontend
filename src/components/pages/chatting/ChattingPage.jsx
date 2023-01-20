import React, { useState,useEffect } from "react";
import {connect, getRooms, subscribe,getClient} from '../../../services/ChattingService';
import ChattingRoom from "./ChattingRoom";
import ChattingList from "./list/ChattingList";
import { useRef } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { connectSocket } from "../../../modules/socket";
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Link, Route, Routes,Router} from "react-router-dom";

export default function ChattingPage() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let socket=useSelector(state=>state.socket);

    const [roomList, setRoomList] = useState([]);
    const [roomId,setRoomId]=useState(0);
    const [room,setRoom]=useState(false);
    const [roomTitle,setRoomTitle]=useState();
    const [address, setAddress] = useState();
    const inRoom = (itemId,memberId) => setAddress(<ChattingRoom roomId={itemId} memberId={memberId}/>);

    ///////////////////////////////////// 테스트용 코드
    const [memberId,setMemberId]=useState();
    const handleOnChange = (e) => {
        setMemberId(e.target.value);
    };
    const handleSubmit = async (e) => {
        const input=e.target.value;
        const infos=input.split(" ");
        setMemberId(infos[0]);
        setNickname(infos[1]);
        // setMemberId(e.target.value);
        // e.preventDefault();
        // handleSubmit(msg);
        // setMemberId("");
    };
    const [nickname,setNickname]=useState();
    const handleOnChangeNN = (e) => {
        setNickname(e.target.value);
    };
    const handleSubmitNN = async (e) => {
        setNickname(e.target.value);
        // e.preventDefault();
        // handleSubmit(msg);
        // setMemberId("");
    };
    //////////////////////////////////////////////////////////////////


    // 채팅방 선택 시 우측 화면 상단에 채팅방 제목을 보여줌
    const selectRoom=(itemId,itemTitle)=>{
        console.log('chatting page - selected room id',itemId);
        console.log('chatting page - selected room title',itemTitle);
        setRoomId(itemId);
        setRoomTitle(itemTitle);

        inRoom(roomId,memberId);

        // inRoom(itemId,memberId);

    }

    useEffect(()=>{
    //    connect();
        const client=connect();
        dispatch(connectSocket(client));
        // console.log('chatting page socket',socket);
        getRooms(Number(memberId)).then((response)=>{
            if(response.data.code!==1000) console.log("SERVER ERROR");
            else{
                const data=response.data.result;
                if(data.length===0) console.log("no rooms");
                else{
                    setRoomList(data);
                    console.log("chatting page",roomList);

                }
            }
        });
    },[memberId]); // TODO: memberId 지워야행
    
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* TODO: input 지우기 */}
            <input type="text" id="memberId" value={memberId}
                        onKeyDown={(e)=>{
                            if(e.key==="Enter") {
                                console.log("ENTER");
                                handleSubmit(e);
                            }
                        }}
                        class="bg-gray-50 border md:w-48 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <div className="flex flex-row pt-5 md:h-full">
                <div className='md:h-full md:w-1/3'>
                    <p className="text-2xl font-bold text-gray-900">채팅방 리스트</p>
                    {roomList&&<ChattingList items={roomList} selectRoom={selectRoom}/>}
                </div>

                <div className='md:h-fit px-10 md:w-full'>
                    {roomId===0 ?
                        <div>
                            <p className="text-2xl font-bold text-gray-900">원하는 채팅방을 선택하세요!</p>
                        </div>
                        :
                        <div className="md:w-full md:h-full">
                            <p className="text-2xl font-bold text-gray-900">{roomTitle}</p>
                            <Routes>
                                <Route path="/:roomId" element={<ChattingRoom memberId={memberId}/>}/>
                            </Routes>
                        </div>
                    }
            </div>
            
            </div>
        </div>
    )
}