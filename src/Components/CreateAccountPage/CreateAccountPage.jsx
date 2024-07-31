import React, { useEffect, useState } from 'react';
import './CreateAccountPage.css';
import { useNavigate } from 'react-router-dom';

import { userDataSliceActions } from '../../assets/Slices';
import { currentLoggedInUserActions } from '../../assets/Slices';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

export default function CreateAccountPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Creating some useState variables for tracking states of the component.
    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ DOB, setDOB ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ passwordConfirmation, setPasswordConfirmation ] = useState( '' );
    
    const [ isNameInvalid, setIsNameInvalid ] = useState( false );

    const [ isEmailInvalid, setIsEmailInvalid ] = useState( false );

    const [ isPasswordTooShort, setIsPasswordTooShort ] = useState( false );

    const [ passwordDidNotMatch, setPasswordDidNotMatch ] = useState( false );

    const [ isPasswordShown, setIsPasswordShown ] = useState( false );

    const [ emailAlreadyExists, setEmailAlreadyExists ] = useState( false );

    // Removes spaces from the start of a string if there are any.
    const trimInitialSpaces = ( string ) => {
        var i = 0;

        while( i < string.length ) {
            if( string[i] != ' ' ) break;
            i++;
        }

        return string.slice( i, string.length );
    }

    // Updates name variable.
    const handleNameEntry = (event) => {
        setIsNameInvalid( false );
        var newName = trimInitialSpaces( event.target.value );
        setName( name => newName );
    }

    // Updates Email variable.
    const handleEmailEntry = (event) => {
        setIsEmailInvalid( false );
        setEmailAlreadyExists( false );
        var newEmail = trimInitialSpaces( event.target.value );
        setEmail( email => newEmail );
    }
    
    // Updates DOB (Date Of Birth) variable.
    const handleDOBEntry = (event) => {
        var newDOB = trimInitialSpaces( event.target.value );
        setDOB( DOB => newDOB );
    }

    // Updates password variable.
    const handlePasswordEntry = (event) => {
        setIsPasswordTooShort( false );
        setPasswordDidNotMatch( false );
        var newPassword = trimInitialSpaces( event.target.value );
        setPassword( password => newPassword );
    }

    // Updates confirmation password variable.
    const handlePasswordConfirmationEntry = (event) => {
        setPasswordDidNotMatch( false );
        var newConfirmationPassword = trimInitialSpaces( event.target.value );
        setPasswordConfirmation( passwordConfirmation => newConfirmationPassword );
    }

    // Toggles password visibility.
    const togglePasswordShown = () => {
        setIsPasswordShown( isPasswordShown => !isPasswordShown );
    }


    // Checks whether a given email id is valid or not.
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Compares password and confirmation password, whether they are same or not.
    const matchPasswords = () => {
        return password === passwordConfirmation;
    }

    // Checks whether the entered password is long enough or not.
    const checkPasswordLongEnough = () => {
        return password.length >= 6;
    }

    // Resets every input field to default.
    const resetEverythingToDefault = () => {
        setName( '' );
        setEmail( '' );
        setDOB( '' );
        setPassword( '' );
        setPasswordConfirmation( '' );
    }

    // Adds the creates user id data to the redux store.
    const addDataToTheStore = () => {
        
        const newUserData = {
            name: name,
            email: email,
            dob: DOB,
            password: password
        }

        dispatch( userDataSliceActions.addData( {
            userEmail: email,
            userData: newUserData
        } ) );

        dispatch( currentLoggedInUserActions.setNewUser( email ) );

        resetEverythingToDefault();
    }

    const storeData = useSelector( (state) => state.userDataReducer.storeMap );

    // Handles click on create account button.
    // Resetes every input field to default and logs the user in.
    const handleCreateAccountClick = (event) => {
        event.preventDefault();

        if( name.length == 0 ) {
            setIsNameInvalid( true );
            return;
        }

        if( isValidEmail( email ) == false ) {
            setIsEmailInvalid( true );
            return;
        }

        if( storeData != null && storeData[email] != undefined ) {
            setEmailAlreadyExists( true );
            return;
        } 

        if( checkPasswordLongEnough() == false ) {
            setIsPasswordTooShort( true );
            return;
        }

        if( matchPasswords() == false ) {
            setPasswordDidNotMatch( true );
            return;
        }

        addDataToTheStore();

        navigate( '/profile-page' );
    }

    return (
        <div id='create-account-page'>
            <form action="" id="create-account-page-form">
                
                <div id="create-account-page-heading">
                    <h2>Create Your Account</h2>
                </div>

                <div className="create-account-page-input-fields-div">
                    <span id="create-account-page-name-warning" style={{display: isNameInvalid ? 'block' : 'none'}}>Name is required</span>
                    <input type="text" name="" className='create-account-page-input-fields' id="create-account-page-name-field" placeholder='' value={name} onChange={handleNameEntry} />
                    <label className='create-account-page-input-fields-label' htmlFor="create-account-page-name-field">Name</label>
                </div>

                <div className="create-account-page-input-fields-div">
                    <span id='email-already-exists-warning' style={{display: emailAlreadyExists ? 'inline' : 'none'}}>Email already exists</span>
                    <span id="create-account-page-email-warning" style={{display: isEmailInvalid ? 'inline' : 'none'}}>Invalid E-mail</span>
                    <input type="text" name="" className='create-account-page-input-fields' id="create-account-page-email-field" placeholder='' value={email} onChange={handleEmailEntry} />
                    <label className='create-account-page-input-fields-label' htmlFor="create-account-page-email-field">E-mail</label>
                </div>

                <div>
                    <label htmlFor="create-account-page-date-field"><b>Date Of Birth : </b></label>
                    <input type="date" name="" id="create-account-page-date-field" value={DOB} onChange={handleDOBEntry}/>
                </div>

                <div className="create-account-page-input-fields-div">
                <span id="create-account-page-confirm-password-warning" style={{display: isPasswordTooShort ? 'block' : 'none'}}>Password is too short</span>
                    <input type={isPasswordShown ? "text" : "password"} name="" className='create-account-page-input-fields' id="create-account-page-password-field" placeholder='' value={password} onChange={handlePasswordEntry} />
                    <label className='create-account-page-input-fields-label' htmlFor="create-account-page-password-field">Enter a password</label>
                </div>

                <div className="create-account-page-input-fields-div">
                    <span id="create-account-page-password-too-short-warning" style={{display: passwordDidNotMatch ? 'block' : 'none'}}>Password did not match</span>
                    <input type={isPasswordShown ? "text" : "password"} name="" className='create-account-page-input-fields' id="create-account-page-confirm-password-field" placeholder='' value={passwordConfirmation} onChange={handlePasswordConfirmationEntry}/>
                    <label className='create-account-page-input-fields-label' htmlFor="create-account-page-confirm-password-field">Confirm password</label>
                </div>

                <div id="create-account-page-show-password-box">
                    <input type="checkbox" name="" id="create-account-page-show-password" onClick={togglePasswordShown} />
                    <label htmlFor="create-account-page-show-password">Show password</label>
                </div>

                <button id='create-account-create-button' onClick={handleCreateAccountClick}>Create Account</button>

            </form>
        </div>
    )
}
