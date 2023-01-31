import React from 'react'
import { useState, useEffect } from 'react';
import { getMyPost, getRequestedPost } from '../../../services/PostService';
import Sidebar from '../../route/Sidebar';
import PostList from './PostList';
function PostManage() {

    const [myPost, setMyPost] = useState([]);
    const [requestedPost, setRequestedPost] = useState([]);

    useEffect(()=> {
      getMyPost().then((response) => {
        setMyPost(response);
      })

      getRequestedPost().then((response) => {
        setRequestedPost(response);
      })
    }, [])

  return (
    <>
      <Sidebar />
      <div className="mx-auto mr-72 max-w-5xl px-4 sm:px-6 my-10 border-4 border-sky-200 rounded-2xl">
          <p className="text-2xl font-bold text-gray-900 m-4">내가 작성한 게시물</p>
          <div className="grid grid-cols-4 gap-y-4 h-3/6 overflow-auto"> {myPost && <PostList postList ={myPost} type = {"my"} /> } </div>
          <hr className="h-px my-4 border-2 border-indigo-100"></hr>

          <p className="text-2xl font-bold text-gray-900 m-4">신청한 게시물</p>
          <div className="mb-4 grid grid-cols-4 h-3/6 gap-y-4 overflow-auto"> {requestedPost && <PostList postList ={requestedPost} type = {"requested"}/> } </div>
      </div>
    </>
  )
}

export default PostManage