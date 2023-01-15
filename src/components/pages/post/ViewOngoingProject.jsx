import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
function ViewOngoingProject(props){
    const navigate = useNavigate();
    const location = useLocation();
    // const postId=location.state.postId;

    const [post,setPost]=useState({});
    const [member,setMember]=useState([]); // 회원==true, 비회원==false
    const [myPost,setMyPost]=useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false

    //프로젝트 진행중일 때는 데일리 회고록/파일 저장 칸 만들면 될듯?


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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min ">  
            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
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

            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl min-h-max'>
                <p>프로젝트 세부내용</p>
                <hr class="h-px my-2 border-2 border-indigo-100"></hr>
                <div className ="flex-column">
                    <p className="mb-3">1. 프로젝트 아이디어</p>
                    <p>바쁜 현대인들이 쉽게 점심 메뉴를 선택할 수 있는 획기적인 서비스 개발에 같이 참여하실 여러분들 모십니다.</p>
                </div>
            </div>

            <div className='mx-40 my-7 flex-column border-4 border-sky-200  rounded-2xl p-5 font-bold text-2xl min-h-max'>
                <p>프로젝트 파일관리</p>
                <hr class="h-px my-2 border-2 border-indigo-100 "></hr>
                <div className="my-2 grid grid-cols-2 gap-x-10">
                    <div className="flex-column">
                        <p className="mx-2">데일리 회의록</p>
                        <div className ="my-2 text-xl min-w-max grid grid-cols-2 text-center h-36 overflow-y-auto border-4 border-indigo-100 rounded-md">
                            <p> 2023-01-01 회의록</p>
                            <p> 2023-01-02 회의록</p>
                            <p> 2023-01-03 회의록</p>
                            <p> 2023-01-04 회의록</p>
                            <p> 2023-01-05 회의록</p>
                            <p> 2023-01-06 회의록</p>
                            <p> 2023-01-07 회의록</p>
                            <p> 2023-01-06 회의록</p>
                        </div>
                    </div>
                    <div className="flex-column">
                        <p className="mx-2">업로드된 파일</p>
                        <div className ="my-2 px-2 text-xl grid grid-cols-1 h-36 overflow-y-auto border-4 border-indigo-100 rounded-md">
                            <p>소프트웨어 개발 프로세스 엔지니어링 보고서</p>
                            <p>ForCloud 요구사항 분석 보고서</p>
                            <p>사진3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ViewOngoingProject;