import NotFound from './components/common/NotFound';
import Home from './components/pages/home/Home';
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
                      <Route path="rooms/*" element={<ChattingPage/>}/>
                     
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
