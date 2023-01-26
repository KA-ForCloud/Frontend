// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
// components

import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./MyPage.css";
import Sidebar  from './Sidebar';
import { Outlet } from "react-router-dom";
// @mui

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    marginRight: 30,
    display: 'flex',
    boxShadow: theme.customShadows,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------
function MyPage() {

    const [show, setShow] = useState(false);
    const users = useRecoilValue(userState);

    let navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');

    useEffect(() => {
        // if (!users.login) {
        //     window.location.href = KAKAO_AUTH_URL;
        // }

    }, [])

    return (
        <>

            <div className='flex mx-auto max-w-5xl mr-72'>
                {/* <img src={logo}
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                /> */}

        
                <Sidebar />
                <Outlet />
                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}님
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD", marginTop: 50}}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container>
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 30 }}>
                            안녕하세요. <strong>{users.name}</strong>님
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            오늘도 좋은 하루 되세요 🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={users.email} inputProps={{ readOnly: true }} />
                            <TextField label="성별" defaultValue={users.gender} inputProps={{ readOnly: true }} />
                            <TextField label="연령대" defaultValue={users.age} inputProps={{ readOnly: true }} />
                        </Stack>

                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">알림 수신</Typography>
                            <Checkbox name="push" />
                        </Stack> */}

                        <button className="mx-auto mt-10 border-2 rounded-md p-1 border-sky-200 my-4 text-2xl font-bold hover:bg-sky-200" onClick={() => { setShow(true); navigate('/kakaologout')}}>
                            로그아웃
                        </button>
                    </StyledContent>
                </Container>
            </div>

            {/* <Modal show={show} onHide={() => { setShow(false) }}  >
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <h3>로그아웃 하시겠습니까? 😢<br /></h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false); navigate('/kakaologout') }}>확인</Button>
                    <Button variant="light" onClick={() => { setShow(false) }}>취소</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export { MyPage };

