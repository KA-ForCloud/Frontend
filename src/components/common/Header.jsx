import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition, Dialog } from '@headlessui/react'
import { KAKAO_AUTH_URL } from '../../OAuth'
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton} from '@mui/material';
import {
    Bars3Icon, 
    BookmarkSquareIcon,
    Cog8ToothIcon,
    CursorArrowRaysIcon,
    PhoneIcon,
    PlayIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../atom'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../../img/forCloud_logo.png'
import {BrowserRouter as Router} from 'react-router-dom';
import {MyPage} from '../route/MyPage'
// import GoogleLoginB from '../GoogleLoginB'


const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
};
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const solutions = [
    {
        name: '기본 설문지 제작',
        description: '기본 템플릿으로 설문을 제작합니다.',
        href: '/survey',
        icon: CursorArrowRaysIcon,
    },
    {
        name: 'Comfy 설문지 제작',
        description: "Commfy 템플릿으로 설문을 제작합니다.",
        href: '/comfysurvey',
        icon: Squares2X2Icon,
    }
]
const callsToAction = [
    { name: 'Watch Demo', href: '#', icon: PlayIcon },
    { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
   
    {
        name: '설문지 보관함',
        description: '임시저장된 설문지를 제작합니다.',
        href: '/temporary',
        icon: BookmarkSquareIcon,
    },
    {
        name: '설문지 관리',
        description: '설문 진행 중이거나 설문 완료된 설문지를 관리합니다.',
        href: '/manage',
        icon: Cog8ToothIcon,
    }
]


function Header() {
    const users = useRecoilValue(userState);
    let [isOpen, setIsOpen] = useState(false);
    let [isLogin, setIsLogin] = useState([false]);
    const [logoutAlert,setLogoutAlert]=useState([false]);
    let navigate = useNavigate();
    localStorage.setItem("memberId", 1);
    localStorage.setItem("name", "정호진")

    useEffect(()=>{
        console.log('header memberId is changed',typeof(localStorage.getItem('memberId')));
        if(!localStorage.getItem('memberId')) {
            setIsLogin(false);
            setLogoutAlert(true);
        }
        else {
            setIsLogin(true);
            setLogoutAlert(false);
        }
    },[localStorage.getItem('memberId')]);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    

    return (
            <div className="mx-auto max-w-screen-2xl px-4 ">
                <div className="flex items-center justify-between border-b-4 border-sky-200 py-3 md:justify-start md:space-x-10 ">
                    
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        {/* 로고 */}
                        <a href="/">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="py-2 max-h-24 w-28"
                                src={logo}
                                alt=""
                            />
                        </a>
                    </div>

                    <a href="/mainPage" className="text-2xl font-bold text-gray-500 hover:text-gray-900">
                        팀 모집
                    </a>

                    <a href="/rooms/*" className="text-2xl font-bold text-gray-500 hover:text-gray-900">
                        채팅
                    </a>

                    <a href="/mypage" className="text-2xl font-bold text-gray-500 hover:text-gray-900">
                        마이 페이지
                    </a>


                    {/* 로그인 */}
                    {/* 로그인 상태에 따라서 버튼 내용 바뀜 */}
                    {/* 로그아웃 alert */}
                    <>
                    
                    </>
                    <>
                    
                        {users.login ?
                            // 로그인 되어 있을 때

                            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                                <button
                                    onClick={() => {navigate('/kakaologout')}}
                                    className="hover:text-gray-500 px-4 py-2 text-2xl font-bold text-black"
                                >
                                    로그아웃
                                </button>
                            </div>
                            :
                            // 로그인 안되어 있을 때
                            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                                <button
                                    // type="button"
                                    onClick={handleLogin}
                                    className="hover:text-gray-500 px-4 py-2 text-2xl font-bold text-black"
                                >
                                    로그인
                                </button>
                            </div>
                        }
                    </>
                    {users.login &&
                        <IconButton
                        onClick={() => {navigate('/mypage')}}
                        sx={{
                          p: 0,
                          ...(open && {
                            '&:before': {
                              zIndex: 1,
                              content: "''",
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              position: 'absolute',
                              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                            },
                          }),
                        }}
                      >
                        { (users.login) && <Avatar src={users.profileImg} alt="photoURL" /> }
                        { (users.login===false) && <Avatar alt="photoURL" /> }
                
                      </IconButton>
                    }
                    {/* 로그인 false 일때 로그인 모달 창 열림 */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >

                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                구글 로그인
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Comfy에서 로그인하면 편안한 설문관리 서비스를 경험할 수 있어요.
                                                </p>
                                            </div>

                                            {/* <div className="mt-4">
                                                <GoogleLogin
                                                    // clientId={clientId}
                                                    render={renderProps => (
                                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                                        type="button"
                                                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                            로그인 할래요.</button>
                                                      )}
                                                    // onSuccess={onSuccess}
                                                    // onFailure={onFailure}
                        
                                                />
                                                <button
                                                    type="button"
                                                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    // 여기서 온클릭으로 구글로그인 화면 나오게 가능한가요?
                                                    onClick={() => {
                
                                                        closeModal();
                                                        // setIsLogin(true);
                                                    }
                                                    }
                                                >
                                                    로그인 할래요.
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    로그인 안할래요.
                                                </button>
                                            </div> */}
                                        </Dialog.Panel>


                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>


    )
}

export default Header