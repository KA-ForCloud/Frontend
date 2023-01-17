import { set } from "date-fns/esm";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import react from "../../../category_img/react.png";
import springBoot from "../../../category_img/springBoot.png";
import { getApplicant, getPostInfo } from "../../../services/PostService";
function ViewPost(){
    const navigate = useNavigate();
    const { postId } = useParams();

    const [post,setPost]=useState([]);
    const [member,setMember]=useState([]); // 회원==true, 비회원==false
    const [myPost,setMyPost]=useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false
    const [applicant, setApplicant] = useState([]);
    //자신이 쓴 글이면 수정하기 버튼 + 신청하기 x
    //다른 사람이 쓴 글이면 + 신청하기 버튼만 ㅇ
    useEffect(()=>{
        getPostInfo(postId).then((response)=>{
            console.log(response);
            
            // // 회원, 비회원 구분
            // if(response.member_case===true){
            //     setMember(true);
            // }
            // else if(response.member_case===false){
            //     setMember(false);
            // }

            // 자신이 쓴 글, 다른 사람이 쓴 글 구분
            console.log('response name',response.name);
            if(response.name===localStorage.getItem('name')){
                setMyPost(true);
                getApplicant(postId).then((response)=>{
                    console.log(response);
                    setApplicant(response);
                })
            }
            else if(response.authorId!==localStorage.getItem('name')){
                setMyPost(false);
            }
            setPost(response);
        })
        
    },[]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min">  
            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 제목: {post.title}</p>
                <div className ="mt-5 grid grid-cols-2">
                    <p>작성자: {post.name}</p>
                    <p>작성일자: {post.date}</p>
                </div>
                <div className ="mt-5 grid grid-cols-2">
                    <p>모집기한: {post.period}</p>
                    <p>진행기간: {post.duration}개월</p>
                </div>
            </div>

            <div className='mx-40 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                모집분야
                <hr class="h-px mt-4 border-2 border-indigo-100"></hr>
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

            <div className='mx-40 mt-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl h-auto'>
                <p>프로젝트 세부내용</p>
                <hr class="h-px my-4 border-2 border-indigo-100"></hr>
                <div className ="flex-column">
                    <p className="mb-3">1. 프로젝트 아이디어</p>
                    <p>{post.contents}</p>
                </div>
            </div>

            {myPost && <div className='mx-40 mt-7 mb-4 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl h-auto'>
                <p>신청자 리스트</p>
                <hr class="h-px my-4 border-2 border-indigo-100"></hr>
                <div className ="flex-column">
                        {applicant.map((item,idx) => {
                            return(
                                <div className= "flex">
                                    <p>{item.name}</p>
                                    <p className="ml-5">{item.requested}</p> 
                                </div>    
                            )
                        })}
                    </div>
            </div>}
        </div>
    );

}
export default ViewPost;