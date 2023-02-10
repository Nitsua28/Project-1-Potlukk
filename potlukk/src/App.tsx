import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from './pages/home-page';
import { SignIn } from './pages/signin-page';
import { RegisterPage } from './pages/register-page';
import { PotlukkDetailHost } from './pages/potlukk-detail-host-page';
import { PotlukkDetailGuest} from './pages/potlukk-detail-guess-page'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/registration' element={<RegisterPage/>}/>
        <Route path='/guest' element={<PotlukkDetailGuest/>}/>
        <Route path='/host' element={<PotlukkDetailHost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
