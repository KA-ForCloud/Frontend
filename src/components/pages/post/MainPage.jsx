import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import List from '../../list/List';
import axios from 'axios';
// import {getPosts, getSearchedPosts} from '../../../services/PostService';
import { useCallback } from "react";

import { getPosts, getTemperatures } from "../../../services/PostService";
import java from "../../../category_img/java.png";
import javascript from "../../../category_img/javascript.png";
import python from "../../../category_img/python.jpg";
import react from "../../../category_img/react.png";
import spring from "../../../category_img/spring.png";
import springboot from "../../../category_img/springBoot.png";

function MainPage(props) {
  // const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [postList, setpostList] = useState([]);
  const [temperatureList, setTemperatureList] = useState([]);
  useEffect(() => {
    getPosts().then((response) => {
      console.log('postList response', response);
      setpostList(response);

      //   if(localStorage.getItem('memberId')==='0') {
      //     setNewPostButton(false);
      //   }
      //   else setNewPostButton(true);
      // });

      getTemperatures().then((response) => {
        console.log('temperatureList response', response);
        setTemperatureList(response);
      })
    });
  }, []);

  const [category, setCatecory] = useState("all");
  const [postStatus, setPostStatus] = useState("recruiting");
  const [checkedItems, setCheckedItems] = useState([]);
  const categories = [
    {
      name: "전체",
      value: "all"
    },
    {
      name: "프론트엔드",
      value: "frontend"
    },
    {
      name: "백엔드",
      value: "backend"
    },
    {
      name: "기타",
      value: "etc"
    },
  ];

  const post_status = [
    {
      name: "모집중",
      value: "recruiting"
    },
    {
      name: "모집완료",
      value: "completed"
    }
  ]

  const tool = [
    {
      name: "Java",
      img: java,
      type: "backend"
    },
    {
      name: "Python",
      img: python,
      type: "backend"
    },
    {
      name: "React",
      img: react,
      type: "frontend"
    },
    {
      name: "JavaScript",
      img: javascript,
      type: "frontend"
    },
    {
      name: "Spring",
      img: spring,
      type: "backend"
    },
    {
      name: "SpringBoot",
      img: springboot,
      type: "backend"
    }
  ];

  const post = [
    {
      id: 1,
      post_name: "오늘 뭐먹지",
      end_time: "2023-01-12",
      duration: "3",
      area: [
        {
          img: react,
          name: "React"
        },
        {
          img: springboot,
          name: "SpringBoot"
        }
      ],
      name: "호진",
      views: "20",
      postType: "recruiting"
    },
    {
      id: 2,
      post_name: "오늘 뭐먹지",
      end_time: "2023-01-14",
      duration: "2",
      area: [
        {
          img: spring,
          name: "Spring"
        },
        {
          img: springboot,
          name: "SpringBoot"
        }
      ],
      name: "정호진",
      views: "26",
      postType: "recruiting"
    },
    {
      id: 3,
      post_name: "동영상 강의 플랫폼",
      end_time: "2023-01-13",
      duration: "3",
      area: [
        {
          img: react,
          name: "React"
        },
        {
          img: springboot,
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
      name: "호진",
      views: "20",
      postType: "completed"
    }
  ]

  const makeTemperatures = () => {
    if (temperatureList.length === 0) return;
    return temperatureList.map((item, idx) => (
      <div key={idx} className="flex justify-center">
        <h3 className="m-2 text-dark text-3xl">이름: {item.name}</h3>
        <h3 className="m-2 ml-7 text-dark text-3xl">온도: {item.temperature}</h3>
      </div>
    ))
  }

  const makeMaxViewPost = () => {
    if (post.length === 0) return;
    let maxView = post[0].views;
    for (let i = 1; i < post.length; i++) {
      if (maxView < post[i].views) {
        maxView = post[i].views;
      }
    }
    const maxViewPost = post.filter(el => el.views === maxView);

    return (
      <div className="min-w-max text-left rounded-2xl border-4 border-white hover:border-black flex-column cursor-pointer "
        onClick={() => { navigate(`/viewPost/${maxViewPost[0].id}`, {state: maxViewPost[0]}) }}>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: {maxViewPost[0].post_name}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: {maxViewPost[0].end_time}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: {maxViewPost[0].duration}개월</h3>
        <hr className="h-px mx-4 my-2 first-line:mt-4 border-white"></hr>

        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>
        <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
          {maxViewPost[0].area.map((i, key) => {
            return (
              <div key={key} className="flex border border-white rounded-2xl">
                <img className="rounded-2xl w-9 h-10" src={i.img} alt={i.name} />
                <p className="m-auto">{i.name}</p>
              </div>
            );
          })}
        </div>
        <hr className="h-px mx-4 my-4 first-line:mt-4 border-white"></hr>
        <div className="flex mb-4">
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: {maxViewPost[0].name}</h3>
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: {maxViewPost[0].views}회</h3>
        </div>
      </div>
    )
  }

  const makeCategories = () => {
    if (categories.length === 0) return;
    return categories.map((item, idx) => (
      <div
        key={idx}
        className={item.value === category ? "ml-4 focus:text-black underline underline-offset-8 decoration-sky-300 decoration-4" : "ml-4 text-gray-500"}
        onClick={() => {
          setCheckedItems([]);
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
        className={item.value === postStatus ? "ml-4 focus:text-black underline underline-offset-8 decoration-sky-300 decoration-4" : "ml-4 text-gray-500"}
        onClick={() => {
          setPostStatus(item.value);
        }}>
        {item.name}
      </div>
    ));
  };


  const checkedItemHandler = (name) => {
    if (checkedItems.includes(name)) {
      setCheckedItems(checkedItems.filter((el) => el !== name));
    } else {
      setCheckedItems([...checkedItems, name]);
    }
  }

  const makeToolfilter = () => {
    if (tool.length === 0) return;
    const filter = category === "all" ? [...tool] : tool.filter(value => value.type.includes(category))
    return filter.map((item, idx) => (
      <button
        key={idx}
        onClick={() => checkedItemHandler(item.name.toLowerCase())}
        className={`${checkedItems.includes(item.name.toLowerCase()) ? "ring ring-sky-300" : "bg-white"} min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition `}
      >
        <img className="m-auto w-12 h-12 " src={item.img} alt={item.name} />
        <span className="m-auto text-2xl font-weight-bold">{item.name}</span>
      </button>
    ))
  }

  const viewPostList = () => {
    if (postList.length === 0) return;
    const area = postList.map(data => {
      if (!data.area) {
        return {
          ...data, area: [

          ]
        }
      }
    })
    const modifiedPostList = area.map(data => {
      delete data.post_category[0].id;
      const abc = [];
      for (const [key, value] of Object.entries(data.post_category[0]).filter(([, count]) => count > 0)) {
        for(const [k, v] of Object.entries(data.post_category[1]).filter(([k, ]) => k === key)){
          const aaa = {
            img: `${k}`,
            name: `${k}`,
            value: `${value}`,
            current: `${v}`
          };
          abc.push(aaa);
        }
      }
      delete data.post_category;
      return {
        ...data,
        area: data.area.concat(abc)
      };
    })
    console.log(modifiedPostList)
    const filter = postStatus === "recruiting" ? modifiedPostList.filter(value => value.postType.includes("recruiting"))
      : modifiedPostList.filter(value => value.postType.includes("completed"))
    
    const fff = [];
    for(let i=0; i<filter.length; i++){
      const p = filter[i]
      for(let k=0; k<p.area.length; k++){
        for(let t=0; t<checkedItems.length; t++){
          if(p.area[k].name === checkedItems[t] && !fff.includes(p)){
            fff.push(p)
          }
        }
      }
    }
    const filteredPost = checkedItems.length === 0 ? filter : fff

    return filteredPost.map((item, idx) => (
      <div key={idx} className="min-w-max rounded-2xl border py-10 flex-column hover:scale-105 transition cursor-pointer"
        onClick={() => { navigate(`/viewPost/${item.id}`, {state: item}) }}>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">프로젝트 제목: {item.post_name}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">모집기한: {item.end_time}</h3>
        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold">진행기간: {item.duration}개월</h3>
        <hr className="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <h3 className="mx-5 my-2 text-dark text-2xl font-weight-bold text-center">모집분야</h3>
        <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
          {item.area.map((k, key) => {
            for(let i=0; i<tool.length; i++){
              if(tool[i].name.toLowerCase() === k.img.toLowerCase()){
                k.img = tool[i].img;
                k.name = tool[i].name;
                break;
              }
            }
            return (
              <div key={key} className="flex border rounded-2xl">
                <img className="rounded-2xl w-9 h-10" src={k.img} alt={k.name} />
                <p className="m-auto">{k.name}</p>
              </div>
            );
          })}
        </div>
        <hr className="h-px mx-4 my-4 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex">
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">작성자: {item.name}</h3>
          <h3 className="mx-auto text-dark text-2xl font-weight-bold">조회수: {item.views}회</h3>
        </div>
      </div>
    ))
  }

  return (
    <div className="mx-auto max-w-7xl my-4 px-4 sm:px-6">
      <div className="min-w-max my-7 grid grid-cols-2 gap-4 text-center">
        <div className="min-w-max rounded-2xl flex-column bg-sky-100" >
          <h3 className="m-2 text-dark text-3xl font-bold">😍 최다 조회수 모집 게시글 😍</h3>
          {makeMaxViewPost()}
        </div>
{/* 
        <div className="min-w-max rounded-2xl border flex-column bg-red-100">
          <h3 className="m-2 text-dark text-3xl font-weight-bold">asdb</h3>
        </div> */}

        <div className="min-w-max rounded-2xl border flex-column bg-purple-100 ">
          <h3 className="m-2 text-dark text-3xl font-bold">😍 마음의 온도 랭킹 게시판 😍</h3>
          <div className="mt-12">
            {makeTemperatures()}
          </div>
        </div>
      </div>

      <div>
        <div className="flex mt-10 mr-4 text-4xl font-bold">{makeCategories()}</div>
      </div>
      <hr className="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="min-w-max grid grid-cols-6 text-center gap-4">
        {makeToolfilter()}
      </div>

      <div className="flex min-w-max mt-40 mb-5">
        <div className="flex text-4xl font-bold">{makePostStatus()}</div>
        <button 
        onClick = {() => {navigate('/createpost')}}
        className="ml-auto mr-4 text-4xl font-bold tracking-tight">새 글 쓰기</button>
      </div>
      <hr className="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="min-w-max grid grid-cols-3 gap-x-4 gap-y-10 "> {viewPostList()} </div>
    </div>
  )
}

export default MainPage;