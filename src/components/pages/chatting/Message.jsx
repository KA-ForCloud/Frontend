import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import { ms } from 'date-fns/locale';

function Message(props) {
    const {msg,sender}=props;
    const memberId=1;
    return (
        <div className='flex'>
            <div className="font-normal">
                {sender.nickname}
            </div>
            <div className={"rounded-xl "+(memberId!==sender.memberId ? "bg-indigo-700":"bg-neutral-300")}>
                <div className={"text-sm font-bold"+(memberId!==sender.memberId?"text-white":"text-black")}>
                    {msg}
                </div>   
            </div>
        </div>
    )
}

export default Message;