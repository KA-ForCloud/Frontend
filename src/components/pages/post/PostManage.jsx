import React from 'react'
import { useNavigate } from 'react-router-dom';
import java from "../../../category_img/java.png";
import javascript from "../../../category_img/javascript.png";
import python from "../../../category_img/python.jpg";
import react from "../../../category_img/react.png";
import spring from "../../../category_img/spring.png";
import springBoot from "../../../category_img/springBoot.png";

function PostManage() {
    const navigate = useNavigate();
    const post = [
        {
          id:1, //post id를 이용하여 신청한 게시물 확인?? -> 신청자 테이블에 자기 이름이 있는지 확인해서 비교??
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
          writer: "호진", //writer로 내가 작성한 게시물 확인
          view: "20",
          status: "recruiting"// 모집중 or 참여중(모집완료) or 완료된 상태 확인
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
          view: "26",
          status: "recruiting"
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
          view: "20",
          status: "ongoing"
        },
        {
            id:4,
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
            view: "20",
            status: "ongoing"
          },
          {
            id:5,
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
            view: "20",
            status: "completed"
          },
      ]

    const myPostList = () => {
        if(post.length === 0 ) return;
        return post.map((item,idx) => (
          <div key ={idx} className="min-w-max rounded-2xl mx-2 border flex-column hover:bg-sky-50 transition cursor-pointer"
            onClick = {()=>{navigate(`/viewPost/${item.id}`)}}>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">프로젝트 제목: {item.title}</h3>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">모집기한: {item.period}</h3>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">진행기간: {item.duration}개월</h3>
            <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3 className="mx-5 my-2 text-dark font-weight-bold text-center">모집분야</h3>
            <div className="mx-6 grid grid-rows-2 grid-cols-2 gap-x-2 gap-y-2">
              {item.area.map((i, key) => {
                return (
                  <div key = {key} className= "flex border rounded-2xl">
                    <img className="rounded-2xl w-7 h-8" src={i.img} alt={i.name} />
                    <h3 className="m-auto">{i.name}</h3>
                  </div>
                );
              })}
            </div>
            <hr class="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex my-2">
              <h3 className="mx-auto text-dark font-weight-bold">작성자: {item.writer}</h3>
              <h3 className="mx-auto text-dark font-weight-bold">조회수: {item.view}회</h3>
            </div>
          </div>
        ))
      }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 my-7 border-4 border-sky-200 rounded-2xl">
        <p class="text-2xl font-bold text-gray-900 m-4">내가 작성한 게시물</p>
        <div className="grid grid-cols-4 gap-y-4 h-3/6 overflow-auto"> {myPostList()} </div>
        <hr class="h-px my-4 border-2 border-indigo-100"></hr>

        <p class="text-2xl font-bold text-gray-900 m-4">신청한 게시물</p>
        <div className="mb-4 grid grid-cols-4 h-3/6 gap-y-4 overflow-auto"> {myPostList()} </div>
    </div>
  )
}

export default PostManage