import { set } from "date-fns/esm";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import react from "../../../category_img/react.png";
import springBoot from "../../../category_img/springBoot.png";
import { getApplicant } from "../../../services/PostService";
import Modal from "./Modal";
function ViewPost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { postId } = useParams();
    const [member, setMember] = useState([]); // 회원==true, 비회원==false
    const [myPost, setMyPost] = useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false
    const [applicant, setApplicant] = useState([]);
    const [clickedCategory, setClickedCategory] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalButton, setModalButton] = useState([]);
    const openModal = (value) => {
        setClickedCategory(value.target.value)
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    //자신이 쓴 글이면 수정하기 버튼 + 신청하기 x
    //다른 사람이 쓴 글이면 + 신청하기 버튼만 ㅇ
    useEffect(() => {
        // // 회원, 비회원 구분
        // if(response.member_case===true){
        //     setMember(true);
        // }
        // else if(response.member_case===false){
        //     setMember(false);
        // }

        // 자신이 쓴 글, 다른 사람이 쓴 글 구분
        if (state.name === localStorage.getItem('name')) {
            setMyPost(true);
            getApplicant(postId).then((response) => {
                setApplicant(response);
            })
        }
        else if (state.id !== localStorage.getItem('name')) {
            setMyPost(false);
        }
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min">
            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 제목: {state.title}</p>
                <div className="mt-5 grid grid-cols-2">
                    <p>작성자: {state.name}</p>
                    <p>작성일자: {state.date}</p>
                </div>
                <div className="mt-5 grid grid-cols-2">
                    <p>모집기한: {state.period}</p>
                    <p>진행기간: {state.duration}개월</p>
                </div>
            </div>

            <div className='mx-40 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                모집분야
                <hr className="h-px mt-4 border-2 border-indigo-100"></hr>
                <div className='mt-4 flex-column'>
                    {state.area.map((k, key) => {
                        return (
                            <div key={key} className="flex mb-1">
                                <div className="flex">
                                    <img className="mr-1 rounded-2xl w-10 h-11" src={k.img} alt={k.name} />
                                    <p className="m-auto">{k.name}</p>
                                </div>
                                <p className="my-auto ml-auto"> 0 / 2 명</p>
                                {!myPost && <button
                                    key={key}
                                    onClick={openModal}
                                    value={k.name}
                                    className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">신청하기</button>}
                                {modalOpen===0 && <Modal open={modalOpen} close={closeModal} header="모집분야" postId ={postId} category={clickedCategory}>
                                    해당 모집분야에 신청하시겠습니까?
                                </Modal>}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='mx-40 mt-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl h-auto'>
                <p>프로젝트 세부내용</p>
                <hr className="h-px my-4 border-2 border-indigo-100"></hr>
                <div className="flex-column">
                    <p className="mb-3">1. 프로젝트 아이디어</p>
                    <p>{state.contents}</p>
                </div>
            </div>

            {myPost && <div className='mx-40 mt-7 mb-4 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl max-h-96'>
                <p>신청자 리스트</p>
                <hr className="h-px my-4 border-2 border-indigo-100 "></hr>
                <div className="flex-column max-h-72 overflow-y-auto scrollbar-hide">
                    {applicant.map((item, idx) => {
                        return (
                            <div key={idx} className="flex my-2 pb-1 border-b border-b-cyan-100">
                                <p className="ml-1">이름: {item.name}</p>
                                <p className="ml-4">신청: {item.requested}</p>
                                <div className ="ml-auto">
                                    <button
                                        key={1}
                                        onClick = {openModal}
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">승인</button>
                                       
                                    {modalButton===1 && <Modal open={modalOpen} close={closeModal} header="승인하기" postId ={postId} category={clickedCategory}>
                                        해당 인원을 승인시키겠습니까?
                                    </Modal>}

                                    <button
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">포트폴리오</button>
                                        
                                    <button
                                        key={3}
                                        onClick = {openModal}
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">거절</button>
                                        
                                    {modalButton===2&&<Modal open={modalOpen} close={closeModal} header="거절하기" postId ={postId} category={clickedCategory}>
                                        해당 신청을 거절하시겠습니까?
                                    </Modal>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );

}
export default ViewPost;