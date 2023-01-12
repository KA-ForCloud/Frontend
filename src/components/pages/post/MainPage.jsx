import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import List from '../../list/List';
import axios from 'axios';
// import {getPosts, getSearchedPosts} from '../../../services/PostService';
import { useCallback } from "react";

import Category from "./Category";
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
  
  const [category, setCatecory] = useState("all");
  const [postStatus, setPostStatus] = useState("모집중");
  const [checkedItems, setCheckedItems] = useState([]);

  const categories = [
    {
      name:"전체",
      value:"all"
    },
    {
      name:"프론트엔드",
      value:"frontend"
    },
    {
      name:"백엔드",
      value:"backend"
    },
    {
      name:"기타",
      value:"etc"
    },
  ];

  const post_status = [
    {
      name:"모집중",
      value:"모집중"
    },
    {
      name:"모집완료",
      value:"모집완료"
    }
  ]

  const tool = [
    {
      name:"Java",
      img: java,
      type: "backend"
    },
    {
      name:"Python",
      img: python,
      type: "backend"
    },
    {
      name:"React",
      img: react,
      type: "frontend"
    },
    {
      name:"Javascript",
      img: javascript,
      type: "frontend"
    },
    {
      name:"Spring",
      img: spring,
      type: "backend"
    },
    {
      name:"SpringBoot",
      img: springBoot,
      type: "backend"
    }
  ];

  const post = [
    {
      id:1,
      title: "오늘 뭐먹지",
      period: "2023-01-12",
      duration: "3",
      area:[
        {
          img: react,
          name: "React"
        },
        {
          img: springBoot,
          name: "SpringBoot"
        }
      ],
      writer: "호진",
      view: "20"
    },
    {
      id:2,
      title: "설문 시스템 개발",
      period: "2023-01-14",
      duration: "2",
      area: [
        {
          img: spring,
          name: "Spring"
        },
        {
          img: springBoot,
          name: "SpringBoot"
        }
      ],
      writer: "아무개",
      view: "26"
    },
    {
      id:3,
      title: "동영상 강의 플랫폼",
      period: "2023-01-13",
      duration: "3",
      area: [
        {
          img: react,
          name: "React"
        },
        {
          img: springBoot,
          name: "SpringBoot"
        },
        {
          img: javascript,
          name: "JavaScript"
        },
        {
          img: python,
          name: "Python"
        },
      ],
      writer: "호진",
      view: "20"
    }
  ]

  const makeCategories = () => {
    if (categories.length === 0) return;
    return categories.map((item, idx) => (
      <div
        key={idx}
        className={item.value === category ? "ml-4 focus:text-black underline underline-offset-8 decoration-sky-300 decoration-4" : "ml-4 text-gray-500" }
        onClick={() => {
          setCatecory(item.value);
        }}>
        {item.name}
      </div>
    ));
  };

  const makePostStatus = () => {
    if (post_status.length === 0) return;
    return post_status.map((item, idx) => (
      <div
        key={idx}
        className={item.value === postStatus ? "ml-4 focus:text-black underline underline-offset-8 decoration-sky-300 decoration-4" : "ml-4 text-gray-500" }
        onClick={() => {
          setPostStatus(item.value);
        }}>
        {item.name}
      </div>
    ));
  };


  const checkedItemHandler = (value, isChecked) => {
    if(isChecked){
      setCheckedItems([...checkedItems, value])
    }else if(!isChecked && checkedItems.find(one => one === value)){
      const items = checkedItems.filter(one => one !== value)
      setCheckedItems([...items])
    }
    console.log(checkedItems);
  }

  const makeToolfilter = () =>{
    if(tool.length === 0) return;
    const filter = category === "all" ? [...tool] : tool.filter(value => value.type.includes(category))
    return filter.map((item, idx) => (
      <Category key = {idx} data = {item} checkedItems = {checkedItems} checkedItemHandler = {checkedItemHandler} /> 
    ))}

  const viewPostList = () => {
    if(post.length === 0 ) return;
    return post.map((item,idx) => (
      <div key ={idx} className="min-w-max rounded-2xl border py-10 flex-column hover:scale-105 transition cursor-pointer"
        onClick = {()=>{navigate(`/viewPost/${item.id}`)}}>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: {item.title}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: {item.period}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: {item.duration}개월</h3>
        <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>
        <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
          {item.area.map((i, key) => {
            return (
              <div key = {key} className= "flex border rounded-2xl">
                <img className="rounded-2xl w-9 h-10" src={i.img} alt={i.name} />
                <p className="m-auto">{i.name}</p>
              </div>
            );
          })}
        </div>
        <hr class="h-px mx-4 my-4 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex">
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: {item.writer}</h3>
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: {item.view}회</h3>
        </div>
      </div>
    ))
  }

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

    // const member=useSelector(state=>state.member);

  // 게시글 삭제 즉시 반영
  // const deletePost=(itemId)=>{
  //   const afterDeleteItemList=postList.filter((it)=>it.postId!==itemId);
  //   setpostList(afterDeleteItemList);
  // }


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

          <div>
            <div className="flex mt-10 mr-4 text-4xl font-bold">{makeCategories()}</div>
          </div>
          <hr class="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="min-w-max grid grid-cols-6 text-center gap-4">
            {makeToolfilter()}
          </div>

          <div className="flex min-w-max mt-40 mb-5">
            <div className="flex text-4xl font-bold">{makePostStatus()}</div>
            <button className="ml-auto mr-4 text-4xl font-bold tracking-tight">새 글 쓰기</button>
          </div>
          <hr class="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="min-w-max grid grid-cols-3 gap-x-4 gap-y-10 "> {viewPostList()} </div>

          <button type="button" className="min-w-max mb-8 rounded-2xl border flex" onClick={() => {navigate('/projectManage');}} >
            <h3 className="m-auto text-2xl font-weight-bold">프로젝트 관리</h3>
          </button>
      </div>
    )    
}

export default MainPage;