import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
 
import AppNavbar from './components/Navbar/Navbar';
 
import { TestResults } from './components/TestResults/TestResults';
import { ViewingCard } from './components/ViewingCard/ViewingCard';
import LoginForm from './components/LoginForm/LoginForm';
import ConfirmForm from './components/ConfirmForm/ConfirmForm';
 
 
import TestScreen from './components/TestScreen/TestScreen';
import { Home } from './components/Home/Home';
import { handleToken } from './tools/lookups';
import { Logout } from './components/Logout/Logout';
import { SignUp } from './components/SignUp/SignUp';
import { Profile } from './components/Profile/Profile';
import { useEffect } from 'react';
import { HelloScreen } from './components/HelloScreen/HelloScreen';
import { GuideCardScreen } from './components/GuideCardScreen/GuideCardScreen';
import { API_URLS } from './components/Utils/constants';
import { GuideCard } from './components/GuideCard/GuideCard';



const App = () => {
  useEffect(() => {
    handleToken()
  }, [])
  setInterval(() => handleToken(), 100000)
  return (
    <div className='app-wrapper container'>
      <BrowserRouter>
         

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/card/:testID/:id" element={<TestScreen />} />
          <Route path="/results/" element={<TestResults />} />
          <Route path="/viewing/:attemptID/:id/" element={<ViewingCard />} />

          <Route path="/login/" element={<LoginForm />} />
          <Route path="/login/check/" element={<ConfirmForm />} />
          <Route path="/logout/" element={<Logout />} />

          <Route path="/signup/" element={<SignUp />} />
          <Route path="/signup/confirm/" element={<ConfirmForm apiUrl={API_URLS.CREATE_CONFIRM}/>} />

          <Route path='/profile/' element={<Profile/>}/>
          
          <Route path='/start/' element={<HelloScreen/>}/>
          <Route path='/guide-cards/' element={<GuideCardScreen/>}/>
          <Route path='/guide-card/:id/' element={<GuideCard/>}/> 




        </Routes>

      </BrowserRouter>

    </div>



  );
}



export default App;