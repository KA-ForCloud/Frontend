
import NotFound from './components/common/NotFound';
import Home from './components/pages/Home';
import MainPage from './components/pages/post/MainPage';
import ViewPost from './components/pages/post/ViewPost';
import ProjectManage from './components/pages/post/ProjectManage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RecoilRoot } from "recoil";


import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ChattingPage from './components/pages/chatting/ChattingPage';
import ChattingRoom from './components/pages/chatting/ChattingRoom';


function App() {
  return (
     //<Provider store={store}>
     <>
      <Header />
      <div className='min-h-screen'>
        <BrowserRouter>
            
                <Routes>
                     
                      {/* <Route path="/" element={<RoutePage />} /> */}

                      <Route path="rooms/*" element={<ChattingPage/>}/>
                      <Route path="member/:memberId/rooms/:roomId" element={<ChattingRoom />} />
                      <Route path="/" element={<MainPage />} />
                      {/* <Route path="/main" element={<MainPage />} />
                      <Route path="/kakaologin" element={<KakaoLogin />} />
                      <Route path="/kakaologout" element={<KakaoLogout />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/portfolio" element = {<Portfolio/>}/>
                      <Route path="/createpost" element= {<CreatePost/>}/> */}

                      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                      
            
                      <Route path="*" element={<NotFound />}></Route>
                  </Routes>
            
        </BrowserRouter>
      </div>
      <Footer />
     </>
  );
}

export default App;
