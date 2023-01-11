import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';

function ChattingListItem(props) {


    const {key,item,selectedRoom,onClick}=props;

    return (
        <div key={key} className='grid-rows-2 border rounded-xl mb-4 hover:bg-blue-100' onClick={()=>{
            selectedRoom(item.chattingId,item.title);
        }}>
            <div className='flex'>
                <div className='flex grow'>
                    <p className="text-lg text-black font-black pl-4 pt-2">{item.title}</p>
                    <p className="text-lg text-gray-700 font-thin pl-2 pt-2">{item.participantList.length}</p>
                </div>
                <p className='mr-4 pt-2 text-sm text-gray-500'>날짜</p>
            </div>
            <div className='flex'>
                <p className="text-sm font-extralight pl-6 grow mt-4 mb-2"> 마지막 메세지 </p>
                <p className='text-sm font-bold rounded-full md:w-6 md:h-6 mr-4 mt-4 text-center bg-indigo-300 text-white'>1</p>
            </div>
        </div>
    )
}

export default ChattingListItem