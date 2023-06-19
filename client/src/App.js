import React, { useContext } from 'react';
import './App.css'
import DbFetch from './context/DbContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Campground from './components/Campground/Campground';
import Show from './components/Campground/Show';
import NewCamp from './components/Campground/NewCamp';
import Edit from './components/Campground/Edit';
import Navbar from './components/other/Navbar';
import Home from './components/other/Home';
import Footer from './components/other/Footer';
import Error from './components/other/Error';
import AlertShow from './context/AlertContext';
import Alert from './components/other/Alert';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Cookies from 'js-cookie';
import { AlertContext } from './context/AlertContext';
import AuthCheck from './context/AuthContext';
import UserDetails from './components/Auth/UserDetails';
import ReviewFetch from './context/ReviewContext';
import CampFetch from './context/CampContext';


function App() {
  //  const alert = useContext(AlertContext)
  //  const {showAlert} = alert

  return (
    <>
      <Router>
        <AlertShow>
          <AuthCheck>
            <DbFetch>
              <CampFetch>
                <ReviewFetch>
                  <Navbar />
                  <Alert />
                  <Login />
                  <SignUp />
                  <UserDetails />
                  {/* <div id='userDetails'></div> */}
                  {/* <div className="container test"> */}
                    <Routes>
                      <Route exact path='/' element={<Home />}></Route>
                      <Route exact path='/campgrounds' element={<Campground />}></Route>
                      <Route exact path='/campgrounds/new' element={<NewCamp />}></Route>
                      <Route exact path={`/campgrounds/:id`} element={<Show />}></Route>
                      <Route exact path='/campgrounds/:id/edit' element={Cookies.get('user') ? <Edit /> : <Show />}></Route>
                      <Route exact path='/error' element={<Error />}></Route>
                    </Routes>
                  {/* </div> */}
                  {/* <Footer /> */}
                </ReviewFetch>
              </CampFetch>
            </DbFetch>
          </AuthCheck>
        </AlertShow>
      </Router>
    </>
  );
}

export default App;
