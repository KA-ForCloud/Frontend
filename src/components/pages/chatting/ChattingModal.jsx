import React from 'react'
import { useNavigate } from "react-router-dom";
import { enter } from '../../../services/ChattingService';
import { createApplicant, createParticipant, deleteApplicant, getApplicant, getCurrentPostCategory, updateCurrentCategory } from '../../../services/PostService';
import {connect, getRooms, subscribe,getClient,deleteRoom,exitRoom, publish, endRoom} from '../../../services/ChattingService';
import { getDate } from '../chatting/Date';
import { useDispatch,useSelector } from 'react-redux';


import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom';

function ChattingModal(props) {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const users = useRecoilValue(userState);
    let socket=useSelector(state=>state.socket.socket);
    let subscriptions=useSelector(state=>state.socket.subscriptions);
    const {open,modalCase,roomId} = props;

    // 채팅방 삭제에 대한 메세지 발행
    const remove= (roomId,msg) => {
        const msg="remove";
        publish(socket,roomId,msg,users.id,users.name,getDate(),"remove");
    }
    // 채팅방 나가기에 대한 메세지 발행
    const exit= (roomId,msg) => {
        const msg="exit";
        publish(socket,roomId,msg,users.id,users.name,getDate(),"exit");
    }
    // 채팅방 종료 대한 메세지 발행
    const end= (roomId,msg) => {
        const msg="end";
        publish(socket,roomId,msg,users.id,users.name,getDate(),"end");
    }

    if(modalCase===1){ // 종료
        end(roomId,)
    }
    else if(modalCase===2){ // 삭제

    }
    else if(modalCase===3){ // 나가기

    }
    
  return (
    <div className = {open ? 'flex justify-center animate-modalBgShow fixed inset-0 z-99 bg-gray-800 bg-opacity-60': 'hidden fixed inset-0 z-99 bg-gray-600'}>
        {open ? (
            <div className ="w-11/12 max-w-2xl m-auto border rounded-md bg-white overflow-hidden">
                <div className='flex relative p-4 bg-white font-bold'>
                    {header}
                    <button className='close absolute top-4 right-4 w-8 text-xl font-bold text-center bg-sky-100 border rounded-md text-black' onClick = {close}>
                        &times;
                    </button>
                </div>
                <div className ="p-4 border-y border-y-fuchsia-300">{props.children}</div>
                <div className ="p-3 text-right">
                    <button className='p-2 bg-sky-100 border rounded-md text-sm' onClick={() => {Register();}}>
                        예
                    </button>
                    <button className='p-2 bg-sky-100 border rounded-md text-sm' onClick={() => {Register();}}>
                        아니오
                    </button>
                    
                </div>
            </div>
        ) : null}
    </div>
  );
};

export default ChattingModal;