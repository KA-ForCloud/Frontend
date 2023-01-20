import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import { ms } from 'date-fns/locale';

function MessageListItem(props) {
    const {item}=props;
    const memberId=1;
    const time=item.timestamp.substr(8,2)+":"+item.timestamp.substr(10,2);
    const [checkType,setCheckType]=useState(false);
    // if(memberId!==item.memberId){ // 왼쪽 정렬
    //     setCheckType(false);
    // }
    // else setCheckType(true);
    // console.log("msg",item.msg);
    return (
        <div>
            <div className={"font-normal w-20 " + (memberId!==item.memberId ? "ml-2":"ml-auto text-end mr-2") }>
                {item.nickName}
            </div>
            {memberId!==item.memberId?
                <div className='flex'>
                    <div className='rounded-xl md:w-20 h-full text-sm font-bold bg-indigo-700 text-white ml-3 pl-1'>
                        {item.msg}
                    </div>
                    <div className={"text-xs font-thin text-gray-600 pt-2 pl-1"}>
                        {time}
                    </div>
                </div>
                :
                <div className='flex ml-auto'>
                    <div className={"text-xs font-thin text-gray-600 pt-2 ml-auto pr-2"}>
                        {time}
                    </div>
                    <div className='rounded-xl md:w-20 h-full text-sm font-bold bg-neutral-300 text-black mr-3 pl-1'>
                        {item.msg}
                    </div>
                </div>
            }
           
            
        </div>
    )
}

export default MessageListItem;