// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useCallback,useEffect, useState } from "react";
import { useNavigate ,useLocation  } from 'react-router-dom';
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
import { MdSystemSecurityUpdate } from 'react-icons/md';


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


// const StyledTable = styled.table`
//     text-align: center;
//     border-collapse: collapse;
//     thead{
//         tr{
//         th{
//             padding: 10px 15px;
//             background-color: #888;
//             color: #fff;
//             font-weight: 700;
//         }
//         }
//     }
//     tbody{
//         tr{
//         td{
//             padding: 7px 15px;
//             border-bottom: 1px solid #eee;
//         }
//         }
//     }
//     .second-row{
//         width: 150px;
//     }
// `;
// ----------------------------------------------------------------------
function Portfolioviewer() {

    const { state } = useLocation();
    const [, updateState] = useState();
	let [school, setSchool] = useState(null);
    let [tech, setTech] = useState(null);
    const [show, setShow] = useState(false);

    let userDto = new Object();

    
    
    
    const forceUpdate = useCallback(() => updateState({}, []));
    const userHandler = useSetRecoilState(userState);
    let navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');
    let history = useNavigate(); 
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const [tag, setTag] = useState([]);
    const [comment,setComment] = useState();

    const [username, setUsername] = useState("");
    const [profileImag, setProfileImg] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [portname, setPortname] = useState("");
    const [portsave, setPortsave] = useState("");
    const [gender, setGender] = useState("");

    var images = []
    var filename = "";

    // useEffect(() => {
    //     setTimeout(function () {
    //         getPortInfo();
    //     }, 1000);

    // }, [])
    
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


    const userChange = (users) => {
        window.location.reload();
      };

    const handleChange = (file) => {
      setFile(file);
      filename = file.name;
      console.log(filename);
      console.log(file);
    };

    let refresh_check = false;


    function getPortInfo(){
        axios.get(`/api/user/info/${1}`)
			.then((response) => {
                console.log('getgetgetdata.data.token', "-", response, "-");
                console.log(filename);
                setUsername(response.data.user_name);
                setProfileImg(response.data.user_image);
                setAge(response.data.user_age);
                setSchool(response.data.school);
                setTech(response.data.tech);
                
                userDto.profileImg = response.data.user_image;
                userDto.email = response.data.user_email;
                userDto.age = response.data.user_age;
                userDto.gender = response.data.user_gender;
                userDto.school = response.data.school;
                userDto.tech =  response.data.tech;
                userDto.portname = response.data.port;
                userDto.portsave = response.data.portsave_name;
                console.log(userDto);
                
            })
            .catch((error) => {
                console.log(error);
                console.log('실패');
                return "error";
            })
            
        }

    
    const onClick = (event) => {
		const id = event.target.id;
		switch(id){
            case 'download':
                navigate('/portfolioview');  
                if ( window.location == 'http://localhost:3000/api/portfolioview' ) {
                     window.location.href='http://localhost:8080/api/user/attached/'+userDto.portsave;
                }
                
                navigate('/portfolioview');


                forceUpdate();
				break
        }
    
    }
    

    return (
        <>
            <div className="my-5 flex mx-auto max-w-7xl sm:px-6">
                {/* <img src={logo}
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                /> */}

                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}님
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={state.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        
                        <Typography variant="h6" gutterBottom>
                            {state.name} 님의 포트폴리오🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={state.username} inputProps={{ readOnly: true }}/>
                            <TextField label="성별" defaultValue={state.gender} inputProps={{ readOnly: true }}/>
                            <TextField label="연령대" defaultValue={state.age} inputProps={{ readOnly: true }}/>
                            <TextField label="학교" defaultValue={state.school}  inputProps={{ readOnly: true }}> </TextField> 
                            <TextField label="기술 스택" defaultValue={state.tech} style={{marginBottm:20}} inputProps={{ readOnly: true }}></TextField>
                        </Stack>
                        {/* <table border={10} width = "90%" marginTop="502x" >
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
                        </table> */}
                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">알림 수신</Typography>
                            <Checkbox name="push" />
                        </Stack> */}
                    <Typography variant="h6" gutterBottom style={{ marginTop: 50}}>
                            포트폴리오 파일
                        </Typography>
                    {userDto.portname != "" &&<Button id="download" onClick= {onClick} variant="h9" style={{ marginTop: 10}}>
                        {userDto.portname}
                    </Button>}

                    <a thhref="|/attached/${filename}|" thtext="dddd"/>
                    {userDto.portname == ""&&<Typography variant="h9" style={{ marginTop: 50}}>
                        {filename}
                    
                    </Typography>}
                    
                    {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> */}
                    </StyledContent>
					
                    
                </Container>
            </div>
            
         
        

           
        </>
    );
}

export { Portfolioviewer };

