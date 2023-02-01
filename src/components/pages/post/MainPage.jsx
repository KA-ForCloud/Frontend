import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getPosts, getTemperatures } from "../../../services/PostService";
import java from "../../../category_img/java.png";
import javascript from "../../../category_img/javascript.png";
import python from "../../../category_img/python.jpg";
import react from "../../../category_img/react.png";
import spring from "../../../category_img/spring.png";
import springboot from "../../../category_img/springBoot.png";
import { postState, categoryState, postStatusState, checkedItemsState } from "../../../atom";
import { useCallback } from "react";
import PostList from "./PostList";

function MainPage(props) {
  const navigate = useNavigate();
  const [postList, setpostList] = useRecoilState(postState);

  const [temperatureList, setTemperatureList] = useState([]);
  useEffect(() => {
    getPosts().then((response) => {
      setpostList(response);

      getTemperatures().then((response) => {
        setTemperatureList(response);
      })
      .catch(()=>{
        console.log("사용자 없음");
      })
    })
    .catch(()=>{
      console.log("게시글 없음");
    });
  }, []);

  const [category, setCatecory] = useRecoilState(categoryState);
  const [postStatus, setPostStatus] = useRecoilState(postStatusState);
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsState);

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

  const makeTemperatures = () => {
    if (temperatureList.length === 0) return;
    return temperatureList.map((item, idx) => (
      <div key={idx} className="flex justify-center">
        <h3 className="m-2 text-dark text-3xl">이름: {item.name}</h3>
        <h3 className="m-2 ml-7 text-dark text-3xl">온도: {item.temperature}</h3>
      </div>
    ))
  }

  const makeMaxViewPost = useCallback(() => {
    if (postList.length === 0) return;
    const area = postList.map(data => {
      if (!data.area) {
        return {
          ...data, area: [

          ]
        }
      }
    })

    const modifiedPostList = area.map((data) => {
      let tempCate;
      for(let i=0; i<2; i++){
        if(data.post_category[i].type.includes("recruits")){
            tempCate = data.post_category[i];
            break;
        }
      }
        const abc = [];
        for (const [key, value] of Object.entries(tempCate).filter(([, count]) => count > 0)) {
          if(key !== 'id'){
            const area_detail = {
              img: `${key}`,
              name: `${key}`,
              value: `${value}`,
            };
            abc.push(area_detail);
          }
        }
        delete data.post_category;
        return {
          ...data,
          area: data.area.concat(abc)
        };
    })

    let maxView = modifiedPostList[0].views;
    let maxViewPost;
    modifiedPostList.map(item => {
      if(item.views > maxView){
        maxView = item.views;
        maxViewPost = item;
      }
    },[postList])

    return (
      <div className=" min-w-max text-left rounded-2xl border-4 border-white hover:border-black flex-column cursor-pointer text-2xl"
        onClick={() => { navigate(`/viewPost/${maxViewPost.id}`, {state: maxViewPost}) }}>
        <h3 className="mx-5 my-2 text-dark font-weight-bold">프로젝트 제목: {maxViewPost.post_name}</h3>
        <h3 className="mx-5 my-2 text-dark font-weight-bold">모집기한: {maxViewPost.end_time}</h3>
        <h3 className="mx-5 my-2 text-dark font-weight-bold">진행기간: {maxViewPost.duration}개월</h3>
        <hr className="h-px mx-4 my-2 first-line:mt-4 border-white"></hr>

        <h3 className="mx-5 my-2 text-dark font-weight-bold text-center">모집분야</h3>
        <div className="min-w-max mx-2 grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-2">
        {maxViewPost.area.map((k, key) => {
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
        <hr className="h-px mx-4 my-4 first-line:mt-4 border-white"></hr>
        <div className="flex mb-4">
          <h3 className="mx-auto text-dark font-weight-bold">작성자: {maxViewPost.name}</h3>
          <h3 className="mx-auto text-dark font-weight-bold">조회수: {maxViewPost.views}회</h3>
        </div>
      </div>
    )
  })

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

  return (
    <div className="mx-auto 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg 
    md:max-w-screen-md w-auto my-4 px-4 min-h-screen">
      <div className="min-w-max mx-8 my-7 grid-cols-1 grid lg:grid-cols-2 gap-4 text-center ">
        <div className="rounded-2xl flex-column bg-sky-100" >
          <h3 className="m-2 text-dark text-3xl font-bold ">😍 최다 조회수 모집 게시글 😍</h3>
          {makeMaxViewPost()}
        </div>

        <div className="rounded-2xl flex-column bg-purple-100 ">
          <h3 className="m-2 text-dark text-3xl font-bold ">😍 마음의 온도 랭킹 게시판 😍</h3>
          <div className="mt-10">
            {makeTemperatures()}
          </div>
        </div>
      </div>

      <div className ="mx-8">
        <div className="flex mt-10 mr-4 text-4xl font-bold">{makeCategories()}</div>
      </div>
      <hr className="h-px mx-8 mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="min-w-max mx-8 grid grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 text-center gap-4 md:grid-cols-4">
        {makeToolfilter()}
      </div>

      <div className="flex min-w-max mt-40 mb-5 mx-8">
        <div className="flex text-4xl font-bold">{makePostStatus()}</div>
        <button 
          onClick = {() => {navigate('/createpost')}}
          className="ml-auto mr-4 text-4xl font-bold tracking-tight">새 글 쓰기</button>
      </div>
      <hr className="h-px mt-4 mb-5 mx-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="min-w-max mx-8 grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-2"> 
          {postList && <PostList postList = {postList} type ={"main"}/>} 
      </div>
    </div>
  )
}

export default MainPage;