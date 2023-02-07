import React,{ useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Modal, Nav, Row } from 'react-bootstrap';
// import { Helmet } from 'react-helmet';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState} from 'recoil';
import styled, { css } from 'styled-components';
import axios from 'axios';
import {useImperativeHandle } from "react";
import { DateRange } from "react-date-range";
// import { defaultStaticRanges } from "./defaultRanges";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import PropTypes from "prop-types";
import { KAKAO_AUTH_URL } from '../../OAuth';
import { DateRangeSelector } from '../route/DateRangeSelector';
import { userState } from '../../atom';
// import { DropdownCmpt } from '../components/DropdownCmpt.js';
// import { Preview } from '../components/Survey/Preview.js';
// @css
import './UpdatePost.css';
import { TextField } from '@mui/material';
// @mui
// import { styled } from '@mui/material/styles';

// const Main = styled('div')(({ theme }) => ({
// 	paddingLeft: theme.spacing(2),
// 	paddingRight: theme.spacing(2),
// 	paddingBottom: theme.spacing(3),
//    // paddingRight: theme.spacing(3),
//    [theme.breakpoints.up('lg')]: {
//       paddingLeft: theme.spacing(6),
//       paddingRight: theme.spacing(6),
//    },
// }));

const Main = styled.div`
  paddingLeft: 10px;
  paddingRight: 10px;
  paddingBottom: 10px;
`

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0.0.0.0);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: rgba(0.0.0.0);
  }
  display: none;
`;

const ItemBlock = styled.div`

  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
	background-color: #535353;
    ${Remove} {
      display: initial;
    }
  }
`;

// const Text = styled.div`
//   flex: 1;
//   font-size: 18px;
//   color: white;
//   margin-bottom: 1%;
//   margin-left: 15px;
//   ${(props) =>
// 		props.done &&
// 		css`
//       color: #ced4da;
//     `}
// `;



function UpdatePost() {

	const childRef = useRef();
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));
	
	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [qsType, setQsType] = useState('');
	let [survey, setSurvey] = useState([]);
	let [viewSwitch, setViewSwitch] = useState('create');
	const [shareWay, setShareWay] = useState('null');
	let count = window.localStorage.getItem("count");

	//post에 사용
	let [postName, setpostName] = useState(null);
	let [postContents, setpostContents] = useState(null);
	let [endtime, setendtime] = useState("");
	let [starttime, setstarttime] = useState("");
	let [postId, setPostId] = useState(0);
	let postState = useRef(-1);
	window.localStorage.setItem("count", 1);

	//저장시 모달 보여주기에서 사용
	const [show, setShow] = useState(false);
	const [showCreate, setShowCreate] = useState(false);

	let navigate = useNavigate();

	// handleSurveySaveButton, handleSurveyCreateButton에서 사용 즉, PostSurvey, UpdateSurvey API에서 사용함
	let postJson = new Object();
	let postDto = new Object();
	let postCatDto = new Object();


	const location = useLocation();
	let post_id = location.state.id;

	// surveyDto
	postDto.status = null;
	postDto.end_time = '12:12:12 12:12:00';
	postDto.end_time = '12:12:12 12:12:00';
	postDto.post_name = "";
	postDto.contents = "";
	postDto.views= 0;

	// surveyDto.survey_id = null;
	// surveyDto.survey_url = null;


	// const link = useRecoilValue(linkState);
	const [link, setLink] = useState("");

	const myRef = useRef({});
	const users = useRecoilValue(userState);

	// //질문 등록 버튼
	// const [plusButton, setPlusButton] = useState("+");

	// const setPlusBtn = () => {
	// 	if (plusButton === "+") {
	// 		setPlusButton("질문 등록");
	// 	}
	// 	else if (plusButton === "질문 등록") {
	// 		myRef.current.createQuestion();
	// 		setPlusButton("+");
	// 	}
	// }

	useEffect(() => {
		// if (!users.login) {
		// 	window.location.href = KAKAO_AUTH_URL;
		// }
	}, [])

	useEffect(() => {
		setTimeout(function () {
			getPostInfo();
        }, 1000);
		setCurQs('');
		setCurQsItemList([]);
	}, [curSelectedType, makeQsSwitch, showCreate])





 
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });


    const orientation = window.matchMedia("(max-width: 500px)").matches
        ? "vertical"
        : "horizontal";

    function formatDateDisplay(date, defaultText) {
        if (!date) return defaultText;
        return format(date, "yyyy-MM-dd");
    }

    const handleSelect = (ranges) => {
        setSelectedDateRange(ranges.selection);
        console.log(ranges.selection);
    };

    const onClickClear = () => {
        setSelectedDateRange({
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        });
    //    setShow(false);
    };
	//체크박스 하나만 선택
	const checkOnlyOne = (checkThis) => {
		const checkboxes = document.getElementsByName('shareWay')
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== checkThis) {
				checkboxes[i].checked = false
			}
		}
	}

	//체크박스 체크 여부 확인
	//체크여부에 따라서 setShareWay()
	function is_checked() {

		const linkCheckbox = document.getElementById('linkCheckBox');
		const qrCheckBox = document.getElementById('qrCheckBox');

		// const link_checked = linkCheckbox.checked;
		const link_checked = true;
		const qr_checked = qrCheckBox.checked;

		if (qr_checked === true) {
			setShareWay("QR");
		} else {
			setShareWay("writer");
		}
		// else {
		// 	setShareWay("null");
		// }
	}

	//공유 시간 및 날짜
	//렌더링되는 시점의 날짜 및 시간 가져오기
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let nextMonth = ('0' + (today.getMonth() + 2)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);
	let hours = ('0' + today.getHours()).slice(-2);
	let minutes = ('0' + today.getMinutes()).slice(-2);
	let seconds = ('0' + today.getSeconds()).slice(-2);

	let dateString = year + '-' + month + '-' + day;
	let timeString = hours + ':' + minutes;
	let nextDateString = year + '-' + nextMonth + '-' + day;
	let current_time_temp = dateString + ' ' + timeString + ':' + seconds;



	postDto.starTime = timeString;
	postDto.endTime = timeString;
	// 설문 공유때 사용되는 시작 시간 및 종료 시간
	// start_time: 배포 시작 날짜 및 시간, 예시 "2022-12-11 12:00:00"
	let start_time_temp = dateString + ' ' + timeString + ':00';
	// 배포 마감 날짜 및 시간
	let end_time_temp = nextDateString + ' ' + timeString + ':00';

	const [startDate, setStartDate] = useState(dateString);
	const [startTime, setStartTime] = useState(timeString);
	const [endDate, setEndDate] = useState(nextDateString);
	const [endTime, setEndTime] = useState(timeString);
	

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [springbootCount, setspringbootCount] = useState(0);
	const [pythonCount, setpythonCount] = useState(0);
	const [springCount, setspringCount] = useState(0);
	const [reactCount, setreactCount] = useState(0);
	const [javaCount, setjavaCount] = useState(0);
	const [javascriptCount, setjavascriptCount] = useState(0);

	const [projectLengthCount, setprojectLengthCount] = useState(0);
	// const [javascriptCount, setjavascriptCount] = useState(0);
	// const [javascriptCount, setjavascriptCount] = useState(0);
	
	const onClick = (event) => {
		const id = event.target.id;
		switch(id){
			case 'springPlus':
				setspringCount(springCount+1)
				break
			case 'pythonPlus':
				setpythonCount(pythonCount+1)
				break
			case 'springMinus':
				setspringCount(springCount-1)
				break
			case 'pythonMinus':
				setpythonCount(pythonCount-1)
				break
			case 'springbootPlus':
				setspringbootCount(springbootCount+1)
				break
			case 'reactPlus':
				setreactCount(reactCount+1)
				break
			case 'springbootMinus':
				setspringbootCount(springbootCount-1)
				break
			case 'reactMinus':
				setreactCount(reactCount-1)
				break
			case 'javaPlus':
				setjavaCount(javaCount+1)
				break
			case 'javascriptPlus':
				setjavascriptCount(javascriptCount+1)
				break
			case 'javaMinus':
				setjavaCount(javaCount-1)
				break
			case 'javascriptMinus':
				setjavascriptCount(javascriptCount-1)
				break
			case 'projectMemPlus':
				setprojectLengthCount(projectLengthCount+1)
				break
			case 'projectMemMinus':
				setprojectLengthCount(projectLengthCount-1)
				break
				
			// case 'javaPlus':
			// 	setjavaCount(javaCount+1)
			// 	break
			// case 'javascriptPlus':
			// 	setjavascriptCount(javascriptCount+1)
			// 	break
			// case 'javaMinus':
			// 	setjavaCount(javaCount-1)
			// 	break
			// case 'javascriptMinus':
			// 	setjavascriptCount(javascriptCount-1)
			// 	break
		}
	}
	const [inputs, setInputs] = useState({
        userId: "",
        password: "",
        passwordConfirm: "",
        gender: "woman",
        year: 2022,
        month: 1,
        day: "",
        checkbox: {},
        content: "",
        errors: {},
    });


	function getPostInfo(){
		console.log("stateId"+location.state.id);
		post_id = location.state.id;

		console.log(post_id);
        axios.get(`/api/post/info/${post_id}`)
			.then((response) => {
                console.log('get data.data.token', "-", response, "-");
				postDto.post_name = response.data.post_name;
				postDto.contents = response.data.contents;
				postDto.start_time = response.data.start_time;
				postDto.end_time = response.data.end_time;
				const stimes = postDto.start_time.split(' ');
				const etimes = postDto.end_time.split(' ');
				postDto.startDate = stimes[0];
				postDto.startTime = stimes[1];
				postDto.id = response.data.id;
				postDto.endDate =  etimes[0];
				postDto.endTime = etimes[1];
				console.log(postDto)
				postCatDto.id = response.data.post_category[1].id;
				// setEndTime(formatDateDisplay(postDto.endTime));
				// setStartTime(formatDateDisplay(postDto.startTime));
				console.log(postDto)
				setSelectedDateRange({
					startDate: new Date(postDto.startDate),
					endDate: new Date(postDto.endDate),
					key: "selection"
				});

				
				setprojectLengthCount(response.data.duration);
				setspringCount(response.data.post_category[1].spring);
				setspringbootCount(response.data.post_category[1].springboot);
				setpythonCount(response.data.post_category[1].python);
				setreactCount(response.data.post_category[1].react);
				setjavaCount(response.data.post_category[1].java);
				setjavascriptCount(response.data.post_category[1].javascript);

            })
            .catch((error) => {
                console.log(error);
                console.log('실패');
                return "error";
            })
			.finally(() => {
				setpostName(postDto.post_name);
				setpostContents(postDto.contents);
				setstarttime(postDto.startTime.slice(0,5));
				setendtime(postDto.endTime.slice(0,5));
				console.log("ㅔㅐㄴㅇ"+postDto.id);
				console.log(postDto);
			});
        }

	const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setInputs((state) => ({
                ...state,
                checkbox: {
                    ...state.checkbox,
                    [name]: checked,
                },
            }));
        } else {
            setInputs((state) => ({
                ...state,
                [name]: value,
            }));
        }
    };


	// 설문 저장하기 버튼을 누를 때
	function handleSurveySaveButton() {
		// setShow(true);
		setViewSwitch('공유');
	}
	

	// 설문 제작 완료 버튼을 누를때 (공유탭))
	function handlePostCreateButton() {

		postDto.status = null;
		postDto.post_name = "";
		postDto.contents = "";
		postDto.views= 0;
		postDto.durations = projectLengthCount;
		start_time_temp = startDate + ' ' + startTime + ':00'
		end_time_temp = endDate + ' ' + endTime + ':00';

		postDto.start_time = start_time_temp;
		console.log('postdto의 시작시간', postDto.start_time);
		postDto.end_time = end_time_temp;
		
		// 아래의 세가지 변수는 설문 state 판별을 위한 조건문에 사용
		// 0: 진행중 1: 배포전 2: 종료
		let start_time = new Date(start_time_temp);
		let end_time = new Date(end_time_temp);
		let current_time = new Date(current_time_temp);
		
		// console.log('현재', surveyState.current);

		if (start_time > end_time) {
			alert("설문 종료 시간은 설문 시작 시간 이전일 수 없습니다.");
		} else {
			if (start_time <= current_time && current_time <= end_time) {
				postState.current = 0;

			} else if (start_time > current_time) {
				// 배포 전
				postState.current = 1;
			} else if (end_time < current_time) {
				// 종료된 설문
				postState.current = 2;
			} else {
			}
		}

		postDto.status = postState.current;

		console.log('설문 저장 시작', postDto.status);


		if (postState.current != -1) {

			

				// //객관식이면 객관식 질문 문항들을 함께 전송해야함
				// //객관식이면 객관식 질문 문항들을 함께 전송해야함
				

			// questionHandler(copy);
			postDto.post_name = postName;
			postDto.contents = postContents;

			postCatDto.spring = springCount;
			postCatDto.java = javaCount;
			postCatDto.springboot = springbootCount;
			postCatDto.javascript = javascriptCount;
			postCatDto.python = pythonCount;
			postCatDto.react = reactCount;

			postDto.spring = springCount;
			postDto.java = javaCount;
			postDto.springboot = springbootCount;
			postDto.javascript = javascriptCount;
			postDto.python = pythonCount;
			postDto.react = reactCount;
			postDto.postCategoryDto = postCatDto;
			postDto.id = location.state.id;

			console.log(users);
			console.log("postDto",postDto)
			axios.post(`/api/post/save/${users.id}`, postDto)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})

			console.log(postDto)

			forceUpdate();
		
		}
	}

	//자압구니
	


	return (
		<>
					
					<>
						<div className="mx-auto w-9/12 my-4 px-4">
							<div className="my-5">
								<h6 className ="font-bold my-2 text-2xl">프로젝트 명</h6>
								<Form.Control className="w-full border contents-area my-2" size="lg" as="textarea"
									cols= "120"
									defaultValue={postName}
									onChange={(e) => {
										setpostName(e.target.value);
									}}></Form.Control>
								<h6 className ="font-bold my-2 text-2xl">프로젝트 기간 설정</h6>
								<table className="w-full my-5 text-base border">
									<td>프로젝트 기간 설정</td>
									<td>{projectLengthCount} 개월</td>
									<td><button id = 'projectMemPlus' onClick= {onClick}>+</button></td>
									<td><button id = 'projectMemMinus' onClick= {onClick}>-</button></td>
								</table>
								<h6 className ="font-bold my-2 text-2xl">프로젝트 인원 지정</h6>
								<div>
								<table className="w-full my-5 text-base text-left border rounded-sm">
									<thead>
										<th>분야</th>
										<th>인원 수</th>
										<th colSpan={1}></th>
									</thead>
									<tbody>
										<tr>
											<td >React</td>
											<td>{reactCount} 명</td>
											<td><button id = 'reactPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'reactMinus' onClick= {onClick}>-</button></td>
										</tr>
										<tr>
											<td>Java</td>
											<td>{javaCount} 명</td>
											<td><button id = 'javaPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'javaMinus' onClick= {onClick}>-</button></td>
										</tr>
										<tr>
											<td>Javascript</td>
											<td>{javascriptCount} 명</td>
											<td><button id = 'javascriptPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'javascriptMinus' onClick= {onClick}>-</button></td>
										</tr>
										<tr>
											<td>Spring</td>
											<td>{springCount} 명</td>
											<td><button id = 'springPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'springMinus' onClick= {onClick}>-</button></td>
										</tr>
										<tr>
											<td>Springboot</td>
											<td>{springbootCount} 명</td>
											<td><button id = 'springbootPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'springbootMinus' onClick= {onClick}>-</button></td>
										</tr>
										<tr>
											<td>Python</td>
											<td>{pythonCount} 명</td>
											<td><button id = 'pythonPlus' onClick= {onClick}>+</button></td>
											<td><button id = 'pythonMinus' onClick= {onClick}>-</button></td>
										</tr>
									</tbody>
								</table>
								</div>
								<h6 className ="font-bold mb-5 text-2xl">프로젝트 기간 설정</h6>
								<h6 className ="font-bold mb-5 text-xl text-center">날짜를 드래그하거나 클릭하세요! 😉</h6>
								<div className="text-center p-4" >
								<React.Fragment style={{ width: "80%" }}>
            <div className="shadow d-inline-block" style={{marginBottom:'20px'}}>
                <DateRange
                    onChange={handleSelect}
                    defaultValue = {"Wed Feb 02 2023 00:00:00 GMT+0900"}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    color='#0d6efd'
                    rangeColors={['#0d6efd', 'red']}
                    ranges={[selectedDateRange]}
                    direction={orientation}
                    // orientation="horizontal"
                    autoFocus/>
                <div className="text-right position-relative rdr-buttons-position mt-2 mr-3" style={{ bottom: "0.3rem" }}>
                    <button
                        className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                        onClick={() => setShow(true)}
                    >
                        확인
                    </button>
                    <button
                        className="btn btn-transparent text-danger rounded-0 px-4"
                        onClick={onClickClear}
                    >
                        초기화
                    </button>
                </div>
            </div>

            
                <div className=" h-100 mt-3 alert alert-transparent" direction={orientation}>
                    <h6 className ="font-bold mb-5 text-2xl"><strong>⏰ 를 눌러서 시간을 조정할 수 있어요!</strong></h6>

                    <Card className='basicCard' key={"key"} style={{ display: "inline-block", margin: "2%", marginBottom: "3%", padding: "4%", border: "none", borderRadius: "20px", boxShadow: "1px 1px 4px 0px gray" }}>
                        <h5>
                            시작 일시
                        </h5>
                        <div style={{ fontWeight: "bold", marginTop: "2%", float: "left" }}>
                            
                            {formatDateDisplay(selectedDateRange.startDate)}
                            <Form.Control type="time"
                                style={{ marginBottom: "1%", background: "rgba(0,0,0,0)", color: "black", border: "none", boxShadow: "none", display: "inline-block" }}
                                defaultValue={starttime} onChange={(e) => setStartTime(e.target.value)}  />
                        </div>
                    </Card>
                    <Card className='basicCard' key={"key"} style={{ display: "inline-block", margin: "2%", marginBottom: "3%", padding: "4%", border: "none", borderRadius: "20px", boxShadow: "1px 1px 4px 0px gray" }}>
                        <h5>
                            마감 일시
                        </h5>
                        <div style={{ fontWeight: "bold", marginTop: "2%", float: "left" }}>
                        
                            {formatDateDisplay(selectedDateRange.endDate)}
                            <Form.Control type="time"
                                style={{ marginBottom: "1%", background: "rgba(0,0,0,0)", color: "black", border: "none", boxShadow: "none", display: "inline-block" }}
                                onChange={(e) => setEndTime(e.target.value)} defaultValue={endtime} />
                        </div>
                    </Card>
                    {/* <button
            className="mb-1 btn btn-transparent text-danger"
            onClick={() => setShow(false)}
            variant="outline-success"
          >
            {" "}
            Close
          </button> */}
                </div>

            
        </React.Fragment>
									{/* <div style={{ marginTop: '10px' }}>
										<input className="form-check-input" id="qrCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {
											checkOnlyOne(e.target)
											is_checked()
										}} /> QR코드 생성하기
									</div> */}
								<h6 className ="font-bold mb-5 text-2xl text-left">프로젝트 소개! 😉</h6>
									<Form.Group>
								<Form.Control className="border contents-area w-full" size="lg" as="textarea" placeholder="프로젝트 소개를 입력해주세요"
									rows = "5"
									cols= "120"
									defaultValue={postContents}	
									onChange={(e) => {
										setpostContents(e.target.value);
									}}></Form.Control>
	                            
                            <div className="auth__contentCount">
                                <span>{`${inputs.content.length} / 300`}</span>
                            </div>
                        </Form.Group>
								<div className='text-right'>
									<button className="font-bold my-5 text-2xl border-2 border-sky-200 hover:bg-sky-100 rounded-md p-1"
										onClick={() => {
											handlePostCreateButton()
										}}>게시글 게시</button>

										<button className="ml-2 font-bold my-5 text-2xl border-2 border-red-200 hover:bg-red-100 rounded-md p-1"
										onClick={() => {
											navigate('/mainPage')
										}}>작성 취소</button>
								</div>
								


							</div>

						</div>

						</div>

						
					</>
		</>

	);
}

export { UpdatePost };

