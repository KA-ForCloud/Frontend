// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useCallback,useEffect, useState } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import Carousel from 'react-bootstrap/Carousel'
// components
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState  } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./Portfolio.css";
import { sizeWidth } from '@mui/system';
import { upload } from '@testing-library/user-event/dist/upload';
// @mui
import { FileUploader } from "react-drag-drop-files";
import {FormControlLabel,Checkbox} from '@material-ui/core';
// ----------------------------------------------------------------------
import Sidebar  from './Sidebar';
import { Outlet } from "react-router-dom";
import axios from 'axios';
import { MdNavigateNext, MdSystemSecurityUpdate } from 'react-icons/md';
import SelectInput from '@mui/material/Select/SelectInput';
const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));
const fileTypes = ["PDF", "PPTX"];

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: theme.customShadows,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    // minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));


function Portfolio() {

    
    const [, updateState] = useState();
	let [school, setSchool] = useState(null);
    let [tech, setTech] = useState(null);
    const [show, setShow] = useState(false);
    const users = useRecoilValue(userState);

    let userDto = new Object();
    let userCategoryDto = new Object();

    userCategoryDto.spring = 0;
    userCategoryDto.java = 0;
    userCategoryDto.springboot = 0;
    userCategoryDto.javascript = 0;
    userCategoryDto.python = 0;
    userCategoryDto.react = 0;
    userCategoryDto.user_id = null;

    const forceUpdate = useCallback(() => updateState({}, []));
    const userHandler = useSetRecoilState(userState);
    let navigate = useNavigate();


    
    
    const mdUp = useResponsive('up', 'md');
    let history = useNavigate(); 
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const [tag, setTag] = useState([]);
    const [comment,setComment] = useState();
    var images = []
    var filename = "";

    var filecheck = false;


    
    const data = [
        {id: 0, title: 'Spring'},
        {id: 1, title: 'Springboot'},
        {id: 2, title: 'Python'},
        {id: 3, title: 'React'},
        {id: 4, title: 'JavaScript'},
        {id: 5, title: 'Java'}
      ];

      const [checkItems, setCheckItems] = useState([]);

      const handleSingleCheck = (checked, id) => {
        if (checked) {
          setCheckItems(prev => [...prev, id]);
        } else {
          setCheckItems(checkItems.filter((el) => el !== id));
        }
        console.log(checkItems);
      };
    
      const handleAllCheck = (checked) => {
        if(checked) {
          const idArray = [];
          data.forEach((el) => idArray.push(el.id));
          setCheckItems(idArray);
        }
        else {
          setCheckItems([]);
        }
        console.log(checkItems);
      }
    
      
    
    
    
    const [file, setFile] = useState(null);



    const handleChange = (file) => {
      setFile(file);
      filename = file.name;
      filecheck = true;
      console.log(filename);
      console.log(file);
    };

  
    useEffect(() => {
        if (!users.login) {
            window.location.href = KAKAO_AUTH_URL;
        }

    }, [])

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
      }
    function handlePostCreateButton() {

            if (school == null){
                school = users.school
            }
            if (tech == null){
                tech = users.tech
            }
            if (file != null){
                filename = file.name;
                filename = encodeURI(encodeURIComponent(filename));
                filename = decodeURI(filename);
            }
            
            const formData = new FormData();
            formData.append('multipartFile',file);
            console.log("formData",formData);
            
            
            
            if(filecheck){


            axios.post(`http://localhost:8082/user/upload/${users.id}`,formData)
			.then((response) => {
                console.log('response.data.token', "-", response, "-");
                console.log(filename);
                userHandler(
                    {   
                        kakaoToken: response.data.user_token,
                        kakaoRefreshToken: users.REFRESH_TOKEN,
                        id: response.data.user_id,
                        name: response.data.user_name,
                        profileImg: response.data.user_image,
                        email: response.data.user_email,
                        age: response.data.user_age,
                        gender: response.data.user_gender,
                        isFirst: users.isFirst,
                        school: response.data.school,
                        tech: response.data.tech,
                        portname: response.data.port,
                        portsave: response.data.portsave_name,
                        refresh: true,
                        push: false,
                        login: true,
                    }
                )
                console.log(users.portsave)
            })
            .catch((error) => {
                console.log(error);
                console.log('실패');
                return "error";
            })
        }
        else{
            filename = users.portname;
            filename = encodeURI(encodeURIComponent(filename));
            filename = decodeURI(filename);
            
        }
        
            userCategoryDto.user_id = users.id;
            checkItems.map(function (a){
                console.log(a);
                if(a == 0){
                    userCategoryDto.spring = 1;
                }
                else if(a == 1){
                    userCategoryDto.springboot = 1;
                }
                else if(a == 2){
                    userCategoryDto.python = 1;
                }
                else if(a == 3){
                    userCategoryDto.react = 1;
                }
                else if(a == 4){
                    userCategoryDto.javascript = 1;
                }
                else if(a == 5){
                    userCategoryDto.java = 1;
                }
            })
            userDto.school = school;
            userDto.userCategoryDto = userCategoryDto;
            userDto.tech = ""

            const userJson = JSON.stringify(userDto);

            
            console.log("userCategoryDto",userJson);
			axios.post(`http://localhost:8082/user/port/save/${users.id}?portname=${filename}`,userDto)
			.then((response) => {
                console.log('response.data.token', "-", response, "-");
                console.log(filename);
                userHandler(
                    {   
                        kakaoToken: response.data.user_token,
                        kakaoRefreshToken: users.REFRESH_TOKEN,
                        id: response.data.user_id,
                        name: response.data.user_name,
                        profileImg: response.data.user_image,
                        email: response.data.user_email,
                        age: response.data.user_age,
                        gender: response.data.user_gender,
                        isFirst: users.isFirst,
                        school: response.data.school,
                        tech: response.data.tech,
                        portname: response.data.port,
                        portsave: response.data.portsave_name,
                        refresh: false,
                        push: false,
                        login: true,
                    }
                )
                console.log(users.portsave)
            })
            .catch((error) => {
                console.log(error);
                console.log('실패');
                return "error";
            })
            .finally(() => {
                navigate('/portfolioview');
            });
            setTimeout(3000);

            console.log("user1",users.tech);
			forceUpdate();
		
	}
    const onClick = (event) => {
		const id = event.target.id;
		switch(id){
            case 'download':
                navigate('/portfolio');
                console.log(users.portsave);    
                if ( window.location == 'http://localhost:3000/portfolio' ) {
                     window.location.href='http://localhost:8082/user/attached/'+users.portsave;
                }
                
                navigate('/portfolio');


                forceUpdate();
				break
        }
    
    }
  
    // function getUserInfo(){

    //     axios.get('https://localhost:8080/user/get', headers)
    //     .then((response) => {
    //         console.log('get all survey ok');
    //         console.log(response.data)
    //         Surveys = JSON.stringify(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    // useEffect(() => {
    //     handleShow();
    //     setTimeout(function () {
    //         getKakaoToken();
    //     }, 1000);
    // }, []);

    return (
        
        <>

            <StyledRoot>
                {/* <img src={logo}
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                /> */}
              <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <Sidebar />
        <Outlet />
    </div>
                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}님
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 30}}>
                            안녕하세요. <strong>{users.name}</strong>님
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            포트폴리오 작성란 🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3} marginBottom = {5}>
                            <TextField label="이메일" defaultValue={users.email} inputProps={{ }} />
                            <TextField label="성별" defaultValue={users.gender} inputProps={{ }} />
                            <TextField label="연령대" defaultValue={users.age} inputProps={{ }} />
                            <TextField label="학교" defaultValue={users.school} inputProps={{ }} onChange={(e) => {
											setSchool(e.target.value);
										}}>{users.school} </TextField> 
                            <TextField label="기술 스택" defaultValue={users.tech} inputProps={{ }} style={{marginBottm:50}} onChange={(e) => {
											setTech(e.target.value);
										}}>{users.tech}</TextField>
                        </Stack>
                        <table border={10} width = "90%" marginTop="502x" >
                            <thead style={{ marginTop: 50 }}>
                                <tr>
                                
                                <th>
                                
                            <FormControlLabel control={
                                <Checkbox name='select-all'
                                    onChange={(e) => handleAllCheck(e.target.checked)}
                                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                    checked={checkItems.length === data.length ? true : false}/>}/>
                                </th>

                                <th className='second-row'>기술 스택</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((data, key) => (
                                <tr key={key}>
                                    <td>
                                    <FormControlLabel control={
                                    <Checkbox name={`select-${data.id}`}
                                        onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                        checked={checkItems.includes(data.id) ? true : false} />}/>
                                    </td>
                                    <td className='second-row'>{data.title}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">알림 수신</Typography>
                            <Checkbox name="push" />
                        </Stack> */}
                    <Typography variant="h6" gutterBottom style={{ marginTop: 50}}>
                            포트폴리오 파일 첨부
                        </Typography>
                    {users.portname != "" &&<Button id="download" onClick= {onClick} variant="h9" style={{ marginTop: 10}}>
                        {users.portname}
                    </Button>}

                    <a thhref="|/attached/${filename}|" thtext="dddd"/>
                    {users.portname == ""&&<Typography variant="h9" style={{ marginTop: 10}}>
                        {filename}
                    
                    </Typography>}
                    
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </StyledContent>
                    
									<Button variant="secondary" className="center"
										style={{ marginTop: '10px' }
                                    
                                    }
										onClick={() => {
											handlePostCreateButton();
                                            console.log(users.tech);
                                            
                                            console.log("user",users.tech);
										}}>수정완료</Button>
					
                </Container>
            </StyledRoot>
            
         
        

           
        </>
    );
}

export { Portfolio };

