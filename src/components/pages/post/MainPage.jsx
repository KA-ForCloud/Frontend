import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import List from '../../list/List';
import axios from 'axios';
// import {getPosts, getSearchedPosts} from '../../../services/PostService';
import { useCallback } from "react";

import java from "../../../category_img/java.png";
import javascript from "../../../category_img/javascript.png";
import python from "../../../category_img/python.jpg";
import react from "../../../category_img/react.png";
import spring from "../../../category_img/spring.png";
import springBoot from "../../../category_img/springBoot.png";

function MainPage(props) {
  // const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [postList, setpostList] = useState([]);
  const [word,setWord]=useState([]);
  const [newPostButton,setNewPostButton]=useState([]);
  // const member=useSelector(state=>state.member);

  // 게시글 삭제 즉시 반영
  // const deletePost=(itemId)=>{
  //   const afterDeleteItemList=postList.filter((it)=>it.postId!==itemId);
  //   setpostList(afterDeleteItemList);
  // }

  // 검색
//   const search =() => {
//     getSearchedPosts(word).then((response)=>{
//       setpostList(response);
//       console.log('onSubmit',response);
//     })
//   };


//   useEffect(()=>{
//     getPosts().then((response)=>{
//       console.log('mainpage response',response);
//       setpostList(response);
//       if(localStorage.getItem('memberId')!==null) {
//         setNewPostButton(true);
        
//       }
//       else setNewPostButton(false);
//     });
//   },[member]);
  
  // const posts=useSelector(state=>state.post);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="min-w-max my-7 grid grid-cols-3 gap-4 text-center">
            <div className="min-w-max rounded-2xl border py-20 flex-column bg-sky-100" >
              <h3 className="m-2 text-dark text-2xl font-weight-bold">최다 조회수 팀 모집 게시글</h3>
            </div>

            <div className="min-w-max rounded-2xl border py-20 flex-column bg-red-100">
              <h3 className="m-2 text-dark text-2xl font-weight-bold">여기도 하나 더 추가해야 이쁠듯</h3>
            </div>

            <div className="min-w-max rounded-2xl border py-20 flex-column bg-purple-100 ">
              <h3 className="m-2 text-dark text-2xl font-weight-bold">마음의 온도 랭킹 게시판</h3>
            </div>
          </div>

          <button className="mt-10 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">인기</button>
          <button className="mt-10 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">프론트엔드</button>
          <button className="mt-10 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">백엔드</button>
          <button className="mt-10 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">기타</button>
          <hr class="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="min-w-max grid grid-cols-6 text-center gap-4">
            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={java} alt="" />
              <h3 className="m-auto text-2xl font-weight-bold">Java</h3>
            </button>

            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={python} alt="" />
              <h3 className="m-auto text-2xl font-weight-bold">Python</h3>
            </button>

            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={react} alt="" /> 
              <h3 className="m-auto text-2xl font-weight-bold">React</h3>
            </button>

            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={javascript} alt="" />
              <h3 className="m-auto text-2xl font-weight-bold">JavaScript</h3>
            </button>

            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={spring} alt="" />
              <h3 className="m-auto text-2xl font-weight-bold">Spring</h3>
            </button>

            <button className="min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300" >
              <img className="m-auto w-12 h-12" src={springBoot} alt="" />
              <h3 className="m-auto text-2xl font-weight-bold">SpringBoot</h3>
            </button>
            
          </div>

          <div className="min-w-max mt-40 mb-5">
            <button className="ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">모집중</button>
            <button className="ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">모집완료</button>
            <button className="ml-4 mr-4 float-right text-4xl font-bold tracking-tight">새 글 쓰기</button>
            <hr class="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>

          <div className="min-w-max grid grid-cols-3 gap-x-4 gap-y-10 ">
             <a href ="/viewPost">
              <div className="min-w-max rounded-2xl border py-10 flex-column hover:scale-105 transition">
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: 오늘 뭐먹지</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: 2023-01-12</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: 3개월</h3>
                
                <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>

                <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
                  <div className="flex border rounded-2xl ">
                    <img className="rounded-2xl w-9 h-10" src={react} alt="" />
                    <p className="m-auto">React</p>
                  </div>

                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={springBoot} alt="" />
                    <p className="m-auto">SpringBoot</p>
                  </div>
                </div>
                  <hr class="h-px mx-4 my-4 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                  <div className="flex">
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: 호진</h3>
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: 20회</h3>
                  </div>
               </div>
              </a>

              <a href ="/viewPost">
              <div className="min-w-max rounded-2xl border py-10 flex-column hover:scale-105 transition">
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: 동영상 강의 플랫폼</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: 2023-01-12</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: 3개월</h3>
                <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>

                <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
                  <div className="flex border rounded-2xl ">
                    <img className="rounded-2xl w-9 h-10" src={react} alt="" />
                    <p className="m-auto">React</p>
                  </div>

                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={springBoot} alt="" />
                    <p className="m-auto">SpringBoot</p>
                  </div>

                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={javascript} alt="" />
                    <p className="m-auto">JavaScript</p>
                  </div>

                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={python} alt="" />
                    <p className="m-auto">Python</p>
                  </div>

                </div>
                  <hr class="h-px mx-4 my-4 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                  <div className="flex">
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: 길동이</h3>
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: 20회</h3>
                  </div>
               </div>
              </a>

              <a href ="/viewPost">
              <div className="min-w-max rounded-2xl border py-10 flex-column hover:scale-105 transition">
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: 설문 시스템 개발</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: 2023-01-15</h3>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: 2개월</h3>
                <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>

                <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={springBoot} alt="" />
                    <p className="m-auto">SpringBoot</p>
                  </div>

                  <div className="flex border rounded-2xl">
                    <img className="rounded-2xl w-9 h-10" src={spring} alt="" />
                    <p className="m-auto">Spring</p>
                  </div>

                </div>
                  <hr class="h-px mx-4 my-4 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                  <div className="flex">
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: 아무개</h3>
                    <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: 26회</h3>
                  </div>
               </div>
              </a>

            {/* <div className="flex items-center"> */}
              {/* {postList&&<List items={postList} case_={1} type='post' deletePost={deletePost}/>} */}
            {/* </div> */}


              <button type="button" className="min-w-max mb-8 rounded-2xl border flex" onClick={() => {navigate('/projectManage');}} >
                <h3 className="m-auto text-2xl font-weight-bold">프로젝트 관리</h3>
              </button>
          </div>
      </div>
    )    
}

export default MainPage;