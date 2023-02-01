import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import { ms } from 'date-fns/locale';
import { useRef } from 'react';
import { saveBeforeMsg } from '../../../../modules/socket';

function MessageListItem(props) {
    const {item,memberId,idx,beforeMsg}=props;

    const time=item.timestamp.substr(8,2)+":"+item.timestamp.substr(10,2);
    const [checkType,setCheckType]=useState(false);
    const [dateChanged,setDateChanged]=useState(false);
    const [msgType,setMsgType]=useState();
    const [my,setMy]=useState(true);

    useEffect(() => {
        if(idx===0) {
            setDateChanged(true);
        }
        else{
            if(beforeMsg.timestamp.substr(0,8)!==item.timestamp.substr(0,8)) setDateChanged(true);
        }

        if(item.msg==="remove") setMsgType(2);
        else if(item.msg==="exit") setMsgType(1);
        else setMsgType(3);
        
        if(Number(memberId)===item.memberId) setMy(true);
        else setMy(false);
    }, [])
   
    
    // TODO: memberId number로 형변환한거 삭제
    return (
        <div>
            {dateChanged&&<div className="rounded-lg text-center bg-slate-500 text-white text-sm font-medium">{item.timestamp.substr(0,4)+"년 "+item.timestamp.substr(4,2)+"월 "+item.timestamp.substr(6,2)+"일"}</div>}
            {/* 퇴장 메세지 */}
            {msgType==2&&
                <div className="rounded-lg text-center bg-teal-400 text-white text-sm font-medium md:w-2/5 m-auto">{item.nickName+"님이 퇴장하셨습니다."}</div>
            }
            {/* 채팅 내용 메세지이며 발신자 닉네임 */}
            {msgType==3&&
                <div className={"font-normal w-20 " + (Number(memberId)!==item.memberId ? "ml-2":"ml-auto text-end mr-2") }>
                    {item.nickName}
                </div>
            }
            {/* 채팅 내용 메세지이며 내가 보낸 메세지 */}
            {msgType==3&&my&&
                <div className='flex ml-auto'>
                    <div className={"text-xs font-thin text-gray-600 pt-4 ml-auto pr-1"}>
                        {time}
                    </div>
                    <div className='rounded-sm w-fit h-full text-sm font-bold bg-sky-200 text-black mr-2 py-1 px-2'>
                        {item.msg}
                    </div>
                </div>
            }
            {/* 채팅 내용 메세지이며 남이 보낸 메세지 */}
            {msgType==3&&!my&&
                <div className='flex'>
                    <div className='rounded-sm w-fit min-w-fit h-full text-sm font-bold bg-blue-300 text-black ml-2 py-1 px-2'>
                        {item.msg}
                    </div>
                    <div className={"text-xs font-thin text-gray-600 pt-4 pl-1"}>
                        {time}
                    </div>
                </div>
            }
            
            
        </div>
    )
}

export default MessageListItem;