// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useCallback,useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import Carousel from 'react-bootstrap/Carousel'
// components
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState  } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./MyPage.css";
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
// const StyledSection = styled('div')(({ theme }) => ({
//     width: '100%',
//     maxWidth: 480,
//     marginRight:'20px',
//     display: 'flex',
//     marginTop:'20px',
//     flexDirection: 'column',
//     boxShadow: theme.customShadows,
//     backgroundColor: theme.palette.background.default,
// }));
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
function MyPage() {


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
    useEffect(() => {
        
        // console.log(users.tech);
        
        // forceUpdate();
        // if (!users.login) {
        //     window.location.href = KAKAO_AUTH_URL;
        // }

    }, [])


    
    const onClick = (event) => {
		const id = event.target.id;
		switch(id){
            case 'download':
                navigate('/portfolioview');
                console.log(users.portsave);    
                if ( window.location == 'http://localhost:3000/portfolioview' ) {
                     window.location.href='http://localhost:8080/api/user/attached/'+users.portsave;
                }
                
                navigate('/portfolioview');


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
            <Sidebar />
            <div className="my-5 flex mx-auto max-w-7xl sm:px-6" style={{marginRight : 40}}>

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
                        <div className="box" style={{ background: "#BDBDBD" ,marginTop: 152 }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm" >
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 30}}>
                            안녕하세요. <strong>{users.name}</strong>님
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            마이페이지🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={users.email} inputProps={{ }} />
                            <TextField label="성별" defaultValue={users.gender} inputProps={{ }} />
                            <TextField label="연령대" defaultValue={users.age} inputProps={{ }} />
                            
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
                   
                    </StyledContent>
					
                </Container>
            </div>
            
         
        

           
        </>
    );
}

export { MyPage };




// // @mui
// import { Container, Stack, TextField, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// // hooks
// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import useResponsive from '../../hooks/useResponsive';
// // components

// import { Button, Modal } from 'react-bootstrap';
// import { useRecoilValue } from 'recoil';
// import { KAKAO_AUTH_URL } from '../../OAuth';
// import { userState } from '../../atom';
// import "./MyPage.css";
// import Sidebar  from './Sidebar';
// import { Outlet } from "react-router-dom";
// // @mui

// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//     [theme.breakpoints.up('md')]: {
//         display: 'flex',
//     },
// }));
// const fileTypes = ["PDF", "PPTX"];

// const StyledSection = styled('div')(({ theme }) => ({
//     width: '100%',
//     maxWidth: 480,
//     marginRight:'20px',
//     display: 'flex',
//     marginTop:'20px',
//     flexDirection: 'column',
//     boxShadow: theme.customShadows,
//     backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//     maxWidth: 480,
//     margin: 'auto',
//     // minHeight: '85vh',
//     display: 'flex',
//     justifyContent: 'center',
//     textAlign: 'center',
//     flexDirection: 'column',
//     padding: theme.spacing(5, 0),
// }));

// // ----------------------------------------------------------------------
// function MyPage() {

//     const [show, setShow] = useState(false);
//     const users = useRecoilValue(userState);

//     let navigate = useNavigate();

//     const mdUp = useResponsive('up', 'md');

//     useEffect(() => {
//         // if (!users.login) {
//         //     window.location.href = KAKAO_AUTH_URL;
//         // }

//     }, [])

//     return (
//         <>

//             <div className='flex mx-auto max-w-5xl mr-72'>
//                 {/* <img src={logo}
//                     sx={{
//                         position: 'fixed',
//                         top: { xs: 16, sm: 24, md: 40 },
//                         left: { xs: 16, sm: 24, md: 40 },
//                     }}
//                 /> */}

        
//                 <Sidebar />
//                 <Outlet />
//                 {mdUp && (
//                     <StyledSection>
//                         {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//                             {users.name}님
//                         </Typography> */}
//                         <div className="box" style={{ background: "#BDBDBD", marginTop: 50}}>
//                             {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
//                             <img className="profile" src={users.profileImg} />
//                         </div>
//                     </StyledSection>
//                 )}

//                 <Container>
//                     <StyledContent>
//                         <Typography variant="h4" gutterBottom style={{ marginTop: 30 }}>
//                             안녕하세요. <strong>{users.name}</strong>님
//                         </Typography>
//                         <Typography variant="h6" gutterBottom>
//                             오늘도 좋은 하루 되세요 🤗
//                         </Typography>

//                         <hr style={{ marginBottom: 50 }}></hr>

//                         <Stack spacing={3}>
//                             <TextField label="이메일" defaultValue={users.email} inputProps={{ readOnly: true }} />
//                             <TextField label="성별" defaultValue={users.gender} inputProps={{ readOnly: true }} />
//                             <TextField label="연령대" defaultValue={users.age} inputProps={{ readOnly: true }} />
//                         </Stack>

//                         {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
//                             <Typography variant="h6">알림 수신</Typography>
//                             <Checkbox name="push" />
//                         </Stack> */}

//                         <button className="mx-auto mt-10 border-2 rounded-md p-1 border-sky-200 my-4 text-2xl font-bold hover:bg-sky-200" onClick={() => { setShow(true); navigate('/kakaologout')}}>
//                             로그아웃
//                         </button>
//                     </StyledContent>
//                 </Container>
//             </div>

//             {/* <Modal show={show} onHide={() => { setShow(false) }}  >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Logout</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body style={{ textAlign: "center" }}>
//                     <h3>로그아웃 하시겠습니까? 😢<br /></h3>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => { setShow(false); navigate('/kakaologout') }}>확인</Button>
//                     <Button variant="light" onClick={() => { setShow(false) }}>취소</Button>
//                 </Modal.Footer>
//             </Modal> */}
//         </>
//     );
// }

// export { MyPage };

