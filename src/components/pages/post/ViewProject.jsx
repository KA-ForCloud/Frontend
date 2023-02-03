import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
function ViewOngoingProject(){
    const { state } = useLocation();
    return (
        <div className="mx-auto w-9/12 px-4 mb-7 ">  
            <div className='my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 제목: {state.post_name}</p>
                <div className="mt-5 grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-y-4">
                    <p>작성자: {state.name}</p>
                    <p>작성일자: {state.start_time}</p>
                    <p>진행기간: {state.duration}개월</p>
                    <p>모집기한: {state.end_time}</p>
                </div>
            </div>

            <div className='mt-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 세부내용</p>
                <hr className="h-px my-4 border-2 border-indigo-100"></hr>
                <div className="break-words">
                    <p>{state.contents}</p>
                </div>
            </div>

            <div className='my-7 flex-column border-4 border-sky-200  rounded-2xl p-5 font-bold text-2xl'>
                <p>프로젝트 파일관리</p>
                <hr className="h-px my-2 border-2 border-indigo-100 "></hr>
                <div className="my-2 grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-x-10">
                    <div className="flex-column">
                        <p className="mx-2">데일리 회의록</p>
                        <div className ="my-2 text-xl grid grid-cols-2 text-center h-36 overflow-y-auto border-4 border-indigo-100 rounded-md">
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