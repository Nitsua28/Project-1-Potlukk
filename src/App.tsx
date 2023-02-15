import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from './pages/home-page';
import { SignIn } from './pages/signin-page';
import { RegisterPage } from './pages/register-page';
import { PotlukkDetailHost } from './pages/potlukk-detail-host-page';
import { PotlukkDetailGuest} from './pages/potlukk-detail-guess-page';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { InvitationStatus, lukkerUserReducer, Potlukk } from './reducers/potlukk-reducer';
import { rootSaga } from './sagas/potlukk-saga';
import { NavBar } from './pages/navbar';
import { RegisterFailed } from './pages/register-failed-page';
import { RegisterSuccess } from './pages/register-success-page';
import { Hostpage } from './pages/host-page';
import { DishCreatePage } from './pages/dish-create-page';
import { DishEditPage } from './pages/dish-edit-page';

const sagaMiddleware = createSagaMiddleware()
const potlukkStore = createStore(lukkerUserReducer, applyMiddleware(sagaMiddleware));// now the sagas will watch over the dispatch actions
sagaMiddleware.run(rootSaga)

const exampleProps:number = 178540;



function App() {
  return (
    <Provider store={potlukkStore}>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/registration' element={<RegisterPage/>}/>
          <Route path='/guest' element={<PotlukkDetailGuest/>}/>
          <Route path='/host' element={<PotlukkDetailHost id={exampleProps}/>}/>
          {/*bad practice?*/ }
          <Route path="/error" element={<RegisterFailed/>}/>
          <Route path="/success" element={<RegisterSuccess/>}/>

          <Route path='/createPotlukk' element={<Hostpage/>}/>

          <Route path='/dishcreate' element={<DishCreatePage/>}/>
          <Route path='/dishedit' element={<DishEditPage/>}/>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
