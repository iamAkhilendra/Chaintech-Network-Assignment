import './App.css';

import LoginPage from './Components/LoginPage/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage/CreateAccountPage';
import ProfileDisplay from './Components/ProfileDisplay/ProfileDisplay';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

    return (
        <BrowserRouter>
            <div id="my-app">
                <Routes>
                    <Route path='/' element={<LoginPage />}></Route>
                    <Route path='/create-account-page' element={<CreateAccountPage />}></Route>
                    <Route path='/profile-page' element={<ProfileDisplay />}></Route>
                </Routes>
            </div>
        </ BrowserRouter>
    )
}

export default App
