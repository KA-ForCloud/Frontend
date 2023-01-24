// import MainPage from './components/pages/community/MainPage';
// import MyPage from './components/pages/mypage/MyPage';
// import ManageSurvey from './components/pages/management/ManageSurvey';
// // import ManageSurvey from './components/pages/management/ManageSurveyPage';
// import ViewPostPage from './components/pages/community/ViewPostPage';
// import CreatePostPage from './components/pages/community/CreatePostPage';
// import SelectSurveyPage from './components/pages/community/SelectSurveyPage';
// // import StoreSurveyPage from './components/pages/management/StoreSurveyPage';
import NotFound from './components/common/NotFound';
import { KakaoLogin } from '../src/components/route/KakaoLogin'
import { KakaoLogout } from './components/route/KakaoLogout'
import { userState } from '../src/atom'
import Home from './components/pages/home/Home';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RecoilRoot } from "recoil";
import { LandingPage } from '../src/components/route/LandingPage'
import {MyPage} from '../src/components/route/MyPage'
import {Portfolio} from '../src/components/route/Portfolio'
import { Portfolioview } from './components/route/Portfolioview';
import { Provider } from "react-redux";
import ChattingPage from "../src/components/pages/chatting/ChattingPage";
import ChattingRoom from "../src/components/pages/chatting/ChattingRoom";
import MainPage from "../src/components/pages/post/MainPage";
import ViewPost from "../src/components/pages/post/ViewPost";
import ProjectManage from "../src/components/pages/post/PostManage";
import PostManage from "../src/components/pages/post/PostManage";
import ViewProject from "../src/components/pages/post/ViewProject";

// import CreateSurvey, { SurveyShared } from './components/pages/create/CreateSurvey';
// import TemporarySurvey from './components/pages/management/TemporarySurvey';
// import ResultSurvey from './components/pages/result/ResultSurvey';
import React from 'react';
// import RespondentSurvey, { RespondentClose, RespondentComplete, RespondentNotOpen } from './components/pages/create/RespondentSurvey';
import { styled } from '@mui/material/styles';





import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CreatePost } from './components/route/CreatePost';
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflowX: 'hidden',
  minHeight: '100%',
  // paddingTop: APP_BAR_MOBILE + 5,
  // paddingBottom: theme.spacing(3),
  // paddingLeft: theme.spacing(3),
  // paddingRight: theme.spacing(3),
  // [theme.breakpoints.up('lg')]: {
  //   // paddingTop: APP_BAR_DESKTOP + 15,
  // },
}));


function App() {
  const users = useRecoilValue(userState);
  return (
     //<Provider store={store}>
     <>
      
      
      <div className='min-h-screen'>
        <RecoilRoot>
        <BrowserRouter>
        <Header />
                <Routes>
                      
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/main" element={<LandingPage />} />
                      <Route path="/kakaologin" element={<KakaoLogin />} />
                      <Route path="/kakaologout" element={<KakaoLogout />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/portfolio" element = {<Portfolio/>}/>
                      <Route path="/createpost" element= {<CreatePost/>}/>
                      <Route path="/portfolioview" element = {<Portfolioview/>}/>
                      <Route path="/user/attached" />
                      
                    
                      <Route path="rooms/*" element={<ChattingPage/>}/>
                      <Route path="member/:memberId/rooms/:roomId" element={<ChattingRoom />} />
                      <Route path="/mainPage" element={<MainPage />} />
                      <Route path="/viewPost/:postId" element={<ViewPost />} />
                      <Route path="/projectManage" element={<ProjectManage />} />
                      <Route path="/postManage" element={<PostManage />} />
                      <Route path="/viewProject/:postId" element={<ViewProject />} />
                      <Route path="*" element={<NotFound />}></Route>
                  </Routes>
            
        </BrowserRouter>
        </RecoilRoot>
      </div>
      <Footer />
     </>
  );
}

export default App;
