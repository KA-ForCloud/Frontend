
import NotFound from './components/common/NotFound';
import Home from './components/pages/home/Home';
=======
import MainPage from './components/pages/post/MainPage';
import ViewPost from './components/pages/post/ViewPost';
import ProjectManage from './components/pages/post/ProjectManage';

import NotFound from './components/common/NotFound';
import Home from './components/pages/Home';


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
                      {/* <Route path="respondent/:surveyId" element={<RespondentSurvey mode={2}/>} />
                      <Route path="respondent/answer/:surveyId/:submitId" element={<RespondentSurvey mode={3}/>} />
                      <Route path="respondentcomplete" element={<RespondentComplete />} />
                      <Route path="respondentclose" element={<RespondentClose />} />
                      <Route path="respondentnotopen" element={<RespondentNotOpen />} /> */}
                      <Route path="/" element={<Home />} />

                      <Route path="chatting" element={<ChattingPage/>}/>
                      <Route path="member/:memberId/rooms/:roomId" element={<ChattingRoom />} />
                      {/* <Route path="community" element={<MainPage />} />
                      <Route path="mypage" element={<MyPage />} />

                      <Route path="/mainPage" element={<MainPage />} />
                      <Route path="/viewPost/:postId" element={<ViewPost />} />
                      <Route path="/projectManage" element={<ProjectManage />} />
                      {/* <Route path="mypage" element={<MyPage />} />

                      <Route path="post/:postId" element={<ViewPostPage />} />
                      <Route path="selectSurvey" element={<SelectSurveyPage />} />
                      <Route path="post/createPost/:surveyId" element={<CreatePostPage />} />
                      <Route path="manage" element={<ManageSurvey />} />
                      <Route path="temporary" element={<TemporarySurvey />}/>
                      <Route path="survey" element={<CreateSurvey />} />
                      <Route path="survey/:surveyId" element={<CreateSurvey load={"yes"}/>} />
                      <Route path="survey" element={<CreateSurvey />} />
                      <Route path="comfysurvey" element={<CreateSurveyTemplates />} />
                      <Route path="surveyshared" element={<SurveyShared />} />
                      <Route path="/resultSurvey/:surveyId" element={<ResultSurvey />}/>
                      <Route path="/manage/survey/:surveyId" element={<RespondentSurvey mode={0}/>} /> */}
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
