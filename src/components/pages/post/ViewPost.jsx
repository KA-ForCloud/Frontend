import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import react from "../../../category_img/react.png";
import springBoot from "../../../category_img/springBoot.png";
function ViewPost(props){
    const navigate = useNavigate();
    const location = useLocation();
    // const postId=location.state.postId;

    const [post,setPost]=useState({});
    const [member,setMember]=useState([]); // 회원==true, 비회원==false
    const [myPost,setMyPost]=useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false
    //자신이 쓴 글이면 수정하기 버튼 + 신청하기 x
    //다른 사람이 쓴 글이면 + 신청하기 버튼만 ㅇ

    const [noLoop, setNoLoop] = useState(false);
    // useEffect(()=>{
    //     getPostInfo(postId).then((response)=>{
    //         console.log('view post page response',response);
            
    //         // 회원, 비회원 구분
    //         if(response.member_case===true){
    //             setMember(true);
    //         }
    //         else if(response.member_case===false){
    //             setMember(false);
    //         }

    //         // 자신이 쓴 글, 다른 사람이 쓴 글 구분
    //         console.log('localStorage: ',typeof(localStorage.getItem('memberId')));
    //         console.log('response id',response.authorId);
    //         if(response.authorId===Number(localStorage.getItem('memberId'))){
    //             setMyPost(true);
    //         }
    //         else if(response.authorId!==Number(localStorage.getItem('memberId'))){
    //             setMyPost(false);
    //         }
    //         setPost(response);
    //     })
    // },[]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min">  
            <div className='mx-40 my-7 border-2 border-gray-300 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 제목: 오늘 뭐먹지 개발</p>
                <div className ="mt-5 grid grid-cols-2">
                    <p>작성자: 호진</p>
                    <p>작성일자: 2023-01-11</p>
                </div>
                <div className ="mt-5 grid grid-cols-2">
                    <p>모집기한: 2023-01-12</p>
                    <p>진행기간: 3개월</p>
                </div>
            </div>

            <div className='mx-40 border-2 border-gray-300 rounded-2xl p-5 flex-column font-bold text-2xl'>
                모집분야
                <hr class="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className ='mt-4 flex'>
                    <img className="w-12 h-12" src={react} alt="" />
                    <p className="my-auto ml-2"> React </p>
                    <p className="my-auto ml-auto"> 0 / 2 명</p>
                    <button className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">신청하기</button>
                </div>
                <div className ='mt-4 flex'>
                    <img className="w-12 h-12" src={springBoot} alt="" />
                    <p className="my-auto ml-2">SpringBoot</p>
                    <p className="my-auto ml-auto"> 0 / 2 명</p>
                    <button className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">신청하기</button>
                </div>
            </div>

            <div className='mx-40 my-7 md: border-2 border-gray-300 rounded-2xl p-5 flex-column font-bold text-2xl min-h-screen'>
                <p>프로젝트 세부내용</p>
                <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className ="flex-column">
                    <p className="mb-3">1. 프로젝트 아이디어</p>
                    <p>바쁜 현대인들이 쉽게 점심 메뉴를 선택할 수 있는 획기적인 서비스 개발에 같이 참여하실 여러분들 모십니다.</p>
                </div>
            </div>
        </div>
    );

}
export default ViewPost;