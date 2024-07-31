import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { currentLoggedInUserActions } from '../../assets/Slices';

export default function LoginPage() {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Checking whether there is already logged in user or not.
    // If there is any user already logged in, then we will redirect user to it's profile page.
    const currentLoggedInUserEmail = useSelector( (state) => state.currentLoggedInUser.userEmail );
    var alreadyLoggedIn = (currentLoggedInUserEmail != '');

    useEffect( () => {
        if( alreadyLoggedIn ) navigate( '/profile-page' );
    }, []);


    // Setting some use state variable to track different states of the component.
    const [ passwordShown, setPasswordShown ] =  useState( false );

    const [ isEmailIncorrect, setIsEmailIncorrect ] =  useState( false );

    const [ enteredPassword, setEnteredPassword ] = useState( '' );

    const [ Email, setEmail ] = useState( '' );

    const [ isPasswordInvalid, setIsPasswordInvalid ] = useState( false );
 
    // Toggles password visibility.
    const togglePasswordVisibility = () => {
        setPasswordShown( passwordShown => !passwordShown );
    }

    // Removes spaces in the starting of a string if there are any.
    const trimInitialSpaces = ( string ) => {
        var i = 0;

        while( i < string.length ) {
            if( string[i] != ' ' ) break;
            i++;
        }

        return string.slice( i, string.length );
    }

    // Updates the Email variable.
    const handleEmailInput = (event) => {
        setIsEmailIncorrect( false );
        var newemail = trimInitialSpaces( event.target.value );
        setEmail( Email => newemail );
    }

    // Updates password variable.
    const handleEnteredPasswordEntry = (event) => {
        setIsPasswordInvalid( false );
        var newpassword = trimInitialSpaces( event.target.value );
        setEnteredPassword( enteredPassword => newpassword );
    }

    // Checks where an email id is valid or not using regular expression.
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Searches for data of the user with enetered email.
    var storedUserData = undefined;

    const storeData = useSelector( (state) => state.userDataReducer.storeMap );

    if(storeData != null) storedUserData = storeData[Email];


    // Resetes every input field to dafault.
    const resetEverythingToDefault = () => {
        setEmail( '' );
        setEnteredPassword( '' );
        setPasswordShown( false );

    }


    // If user clicks on log in button, following function handles the event.
    // It switches the user to logged in mode and resets all the input field to default.
    const handleLoginClick = (event) => {
        event.preventDefault();

        if( isValidEmail( Email ) == false || storedUserData == undefined) {
            setIsEmailIncorrect( true );
            return;
        }

        if( storedUserData.password !== enteredPassword ) {
            setIsPasswordInvalid( true );
            return;
        }

        dispatch( currentLoggedInUserActions.setNewUser( Email ) );

        resetEverythingToDefault();

        navigate('/profile-page');
    }

    return (
        <div id='my-login-page'>
            <form id='my-login-page-form' action="">
                <div id='login-card-heading'>
                    <h2>Log In to Your Account</h2>
                </div>

                <div className='login-page-input-fields-div'>
                    <span id="incorrect-email-warning" style={{display: isEmailIncorrect ? 'block' : 'none'}} >Invalid Email</span>
                    <input className='login-page-input-fields' id='client-email' type="text" placeholder=' ' value={Email} onChange={handleEmailInput}/>
                    <label className='login-page-input-labels' htmlFor="client-email">E-mail</label>
                </div>

                <div className='login-page-input-fields-div'>
                    <span id='invalid-password-login-page' style={{display: isPasswordInvalid ? 'inline' : 'none'}}>Invalid Password</span>
                    <input className='login-page-input-fields' id='login-page-password' type={ passwordShown ? 'text' : 'password' } placeholder=' ' value={enteredPassword} onChange={handleEnteredPasswordEntry} />
                    <label className='login-page-input-labels' htmlFor="login-page-password">Password</label>
                </div>

                <div id='show-password-div'>
                    <input type="checkbox" name="" id="show-password-checkbox" />
                    <label htmlFor="show-password-checkbox" onClick={togglePasswordVisibility}>Show Password</label>
                </div>

                <button id='login-button' onClick={handleLoginClick}>Login</button>

                <div id='create-account-redirection-text'>Don't have an account yet? <Link to={'/create-account-page'}>Click here</Link> to create one.</div>
            </form>
        </div>
    )
}
