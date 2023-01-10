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

          <button className="mt-40 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">모집중</button>
          <button className="mt-40 ml-4 mr-4 text-4xl font-bold tracking-tight text-gray-500 focus:text-black focus:underline underline-offset-8 decoration-sky-300 decoration-4">모집완료</button>
          <hr class="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="min-w-max mb-4 grid grid-cols-3 gap-x-4 gap-y-10 text-center">
              <div className="min-w-max rounded-2xl border py-40 flex-column bg-sky-100 hover:scale-105 transition" >
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글1</h3>
              </div>

              <div className="min-w-max rounded-2xl border py-40 flex-column bg-sky-100 hover:scale-105 transition">
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글2</h3>
              </div>

              <div className="min-w-max rounded-2xl border py-40 flex-column bg-sky-100 hover:scale-105 transition">
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글3</h3>
              </div>

              <div className="min-w-max rounded-2xl border py-40 flex-column bg-red-100 ">
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글4</h3>
              </div>

              <div className="min-w-max rounded-2xl border py-40 flex-column bg-red-100 ">
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글5</h3>
              </div>

              <div className="min-w-max rounded-2xl border py-40 flex-column bg-red-100 ">
                <h3 className="m-2 text-dark text-2xl font-weight-bold">게시글6</h3>
              </div>

            {/* <div className="flex items-center"> */}
              {/* {postList&&<List items={postList} case_={1} type='post' deletePost={deletePost}/>} */}
            {/* </div> */}
          </div>
      </div>
    )    
}

export default MainPage;