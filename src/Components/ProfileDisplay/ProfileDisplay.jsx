import React, { useEffect, useState } from 'react';
import './ProfileDisplay.css';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { userDataSliceActions } from '../../assets/Slices';
import { currentLoggedInUserActions } from '../../assets/Slices';

import { Link } from 'react-router-dom';

export default function ProfileDisplay() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Creating some useState variable to track different states of the component.
    const [ editedName, setEditedName ] = useState( '' );
    const [ displayEditedNameWarning, setDisplayEditedNameWarning] = useState( false );

    const [ editedEmail, setEditedEmail ] = useState( '' );
    const [ displayEditedEmailWarning, setDisplayEditedEmailWarning ] = useState( false );

    const [ editedDOB, setEditedDOB ] = useState( '' );

    const [ editedPassword, setEditedPassword ] = useState( '' );
    const [ editedConfirmPassword, setEditedConfirmPassword ] = useState( '' );

    const [ editModeInfo, setEditModeInfo ] = useState( [false, false, false, false] );

    const [ isPasswordShown, setIsPasswordShown ] = useState( false );

    const [ isPasswordTooShort, setIsPasswordTooShort ] = useState( false );

    const [ passwordsDidNotMatch, setPasswordDidNotMatch ] = useState( false );




    // Getting Current logged in user's data from the store
    const currentLoggedInUserEmail = useSelector( (state) => state.currentLoggedInUser.userEmail );

    const currentUserData = useSelector( (state) => state.userDataReducer.storeMap[currentLoggedInUserEmail]);

    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState( currentLoggedInUserEmail != '' );


    // Checks whether any given email id valid or not.
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Resets every input field to default.
    const resetEverythingToDefault = () => {
        setEditedName( '' );
        setEditedEmail( '' );
        setEditedDOB( '' );
        setEditedPassword( '' );
        setEditedConfirmPassword( '' );
    }


    // Removes spaces from starting of the string.
    const trimInitialSpaces = ( string ) => {
        var i = 0;

        while( i < string.length ) {
            if( string[i] != ' ' ) break;
            i++;
        }

        return string.slice( i, string.length );
    }

    // Turns edit mode of different input fields on.
    const handleEditModeOn = ( index ) => {
        const newEditModeInfo = [...editModeInfo];
        newEditModeInfo[index] = true;
        setEditModeInfo( newEditModeInfo );
    }

    // Closes edit mode of different input fields.
    const closeEditMode = (index) => {
        const newEditModeInfo = [...editModeInfo];
        newEditModeInfo[index] = false;
        setEditModeInfo( newEditModeInfo );
    }

    // Updates name valiable.
    const handleEditNameEntry = (event) => {
        setDisplayEditedNameWarning( false );
        var newName = trimInitialSpaces(event.target.value);
        setEditedName( editedName => newName);
    }    

    // Saves the new name.
    const handleApplyEditedName = () => {

        if(editedName.length ==  0) {
            setDisplayEditedNameWarning( true );
            return;
        }

        var newdataobject = {
            name: editedName,
            email: currentUserData.email,
            dob: currentUserData.dob,
            password: currentUserData.password
        }

        dispatch( userDataSliceActions.addData( { userEmail: currentUserData.email, userData: newdataobject } ) );

        setEditedName( '' );

        closeEditMode(0);
    }

    // Cancels editing name variable.
    const handleCancelEditedName = () => {

        setDisplayEditedNameWarning( false );
        setEditedName( '' );
        closeEditMode(0);
    }

    // Updates Email valiable.
    const handleEditEmailEntry = (event) => {
        setDisplayEditedEmailWarning( false );
        setEditedEmail( editedEmail => event.target.value );
    }

    // Saves the new Email.
    const handleApplyEditedEmail = () => {

        if( isValidEmail( editedEmail ) == false) {
            setDisplayEditedEmailWarning( true );
            return;
        }

        var newEmail = editedEmail;
        var previousEmail = currentUserData.email;

        var newdataobject = {
            name: currentUserData.name,
            email: newEmail,
            dob: currentUserData.dob,
            password: currentUserData.password
        }

        dispatch( userDataSliceActions.addData( { userEmail: newEmail, userData: newdataobject } ) );

        dispatch( currentLoggedInUserActions.setNewUser( newEmail ) );

        dispatch( userDataSliceActions.deleteData( { userEmail: previousEmail } ) );

        setEditedEmail( '' );

        closeEditMode(1);
    }

    // Cancels editing Email variable.
    const handleCancelEditedEmail = () => {
        setDisplayEditedEmailWarning( false );

        setEditedEmail( '' );

        closeEditMode(1);
    }


    // Updates Date of Birth varibale.
    const handleEditDOBEntry = (event) => {
        var newDate = event.target.value;
        setEditedDOB( editedDOB => newDate );
    }

    // Saves the new Date of Birth.
    const handleApplyEditedDOB = () => {
        var newdataobject = {
            name: currentUserData.name,
            email: currentUserData.email,
            dob: editedDOB,
            password: currentUserData.password
        }

        dispatch( userDataSliceActions.addData( { userEmail: currentUserData.email, userData: newdataobject } ) );

        setEditedDOB( '' );

        closeEditMode(2);
    }

    // Cancels editing Date of Birth variable.
    const handleCancelEditedDOB = () => {
        setEditedDOB( '' );

        closeEditMode(2);
    }

    // Updates password varibale.
    const handleEditPasswordEntry = (event) => {
        setIsPasswordTooShort( false );
        setPasswordDidNotMatch( false );
        var newPassword = trimInitialSpaces( event.target.value );
        setEditedPassword( newPassword );
    } 

    // Updates confirmation password variable.
    const handleEditConfirmationPasswordEntry = (event) => {
        setIsPasswordTooShort( false );
        setPasswordDidNotMatch( false );
        var newPassword = trimInitialSpaces( event.target.value );
        setEditedConfirmPassword( newPassword );
    }

    // Saves the new password.
    const handleApplyEditedPassword = () => {
        if(editedPassword.length < 6) {
            setIsPasswordTooShort( true );
            return;
        }

        if(editedPassword != editedConfirmPassword) {
            setPasswordDidNotMatch( true );
            return;
        }

        var newdataobject = {
            name: currentUserData.name,
            email: currentUserData.email,
            dob: currentUserData.dob,
            password: editedPassword
        }

        dispatch( userDataSliceActions.addData( { userEmail: currentUserData.email, userData: newdataobject } ) );


        setEditedPassword( '' );
        setEditedConfirmPassword( '' );

        closeEditMode(3);

    }

    // Cancels editing password variable.
    const handleCancelEditedPassword = () => {
        setIsPasswordTooShort( false );
        setPasswordDidNotMatch( false );

        setEditedPassword( '' );
        setEditedConfirmPassword( '' );

        closeEditMode(3);
    }

    // Handles click on log out button.
    const handleProfileLogout = () => {
        dispatch( currentLoggedInUserActions.setNewUser( '' ) );
        resetEverythingToDefault();
        navigate( '/' );
    }

    return (
        <div id='profile-display-page'>
            { 
                Array.from({length: 1}, (_, index) => {
                    if( isUserLoggedIn == false ) {
                        return(
                            <div id="user-not-logged-in-card" key="a">
                                Please Login to your account to see your profile!!  
                                <Link className='buttons' to={"/"}>Go to log in page</Link>
                            </div>
                        )
                    }
                    else return (
                        <div id="profile-display-card" key="b">
                            <div id="profile-card-heading">
                                <h2>Your Profile</h2>
                            </div>

                            <div className='profile-display-data-fields' id="profile-display-card-name-div">
                                <div>
                                    <div><b>Name :  </b></div>
                                    <div className="profile-display-card-content-box">
                                        
                                        <div style={{display: !editModeInfo[0] ? 'flex' : 'none'}}>
                                            <div> { currentUserData.name } </div>
                                            <button className='to-edit-button buttons' onClick={() => handleEditModeOn(0)}>Edit</button>
                                        </div>

                                        <div className="edit-box" style={{display: editModeInfo[0] ? 'flex' : 'none'}}>
                                            <input className='edit-box-input-field' type="text" value={editedName} onChange={handleEditNameEntry} />
                                            <span className='warning' style={{display: displayEditedNameWarning ? 'inline' : 'none'}}>Name is required</span>
                                            <div className="button-box">
                                                <button className="apply-button edit-buttons buttons" onClick={handleApplyEditedName}>Apply</button>
                                                <button className="cancle-button edit-buttons buttons" onClick={handleCancelEditedName}>Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='profile-display-data-fields' id="profile-display-card-email-div">
                                <div>
                                    <div><b>E-mail :  </b></div>
                                    <div className="profile-display-card-content-box">
                                        
                                        <div style={{display: !editModeInfo[1] ? 'flex' : 'none'}}>
                                            <div> { currentUserData.email } </div>
                                            <button className='to-edit-button buttons' onClick={() => handleEditModeOn(1)}>Edit</button>
                                        </div>

                                        <div className="edit-box" style={{display: editModeInfo[1] ? 'flex' : 'none'}}>
                                            <input className='edit-box-input-field' type="text" value={editedEmail} onChange={handleEditEmailEntry} />
                                            <span className='warning' style={{display: displayEditedEmailWarning ? 'inline' : 'none'}}>Invalid E-mail</span>
                                            <div className="button-box">
                                                <button className="apply-button edit-buttons buttons" onClick={handleApplyEditedEmail}>Apply</button>
                                                <button className="cancle-button edit-buttons buttons" onClick={handleCancelEditedEmail}>Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='profile-display-data-fields' id="profile-display-card-dob-div">
                                <div>
                                    <div><b>Date Of Birth :  </b></div>
                                    <div className="profile-display-card-content-box">
                                        
                                        <div style={{display: !editModeInfo[2] ? 'flex' : 'none'}}>
                                            <div> { currentUserData.dob.length == 0 ? 'No date of birth provided' : currentUserData.dob} </div>
                                            <button className='to-edit-button buttons' onClick={() => handleEditModeOn(2)}>Edit</button>
                                        </div>

                                        <div className="edit-box" style={{display: editModeInfo[2] ? 'flex' : 'none'}}>
                                            <input className='edit-box-input-field' type="date" value={editedDOB} onChange={handleEditDOBEntry} />
                                            <div className="button-box">
                                                <button className="apply-button edit-buttons buttons" onClick={handleApplyEditedDOB}>Apply</button>
                                                <button className="cancle-button edit-buttons buttons" onClick={handleCancelEditedDOB}>Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='profile-display-data-fields' id="profile-display-card-password-div">
                                <div>
                                    <div><b>Password :  </b></div>
                                    <div className="profile-display-card-content-box">
                                        
                                        <div style={{display: !editModeInfo[3] ? 'flex' : 'none'}}>
                                            <div> { '*'.repeat( currentUserData.password.length ) } </div>
                                            <button className='to-edit-button buttons' onClick={() => handleEditModeOn(3)}>Edit</button>
                                        </div>

                                        <div className="edit-box" style={{display: editModeInfo[3] ? 'flex' : 'none'}}>
                                            <input className='edit-box-input-field' type={isPasswordShown ? 'text' : 'password'} placeholder='Enter a new Password' value={editedPassword} onChange={handleEditPasswordEntry} />
                                            <span className='warning password-too-short-warning-profile-page' style={{display: isPasswordTooShort ? 'inline' : 'none'}}>Password too short</span>
                                            
                                            <input className='edit-box-input-field' type={isPasswordShown ? 'text' : 'password'} placeholder='Confirm Password' value={editedConfirmPassword} onChange={handleEditConfirmationPasswordEntry} />
                                            <span className='warning password-did-not-match-profile-page' style={{display: passwordsDidNotMatch ? 'inline' : 'none'}}>Password did not match</span>
                                            <div className="button-box">
                                                <button className="apply-button edit-buttons buttons" onClick={handleApplyEditedPassword}>Apply</button>
                                                <button className="cancle-button edit-buttons buttons" onClick={handleCancelEditedPassword}>Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                
                            <button id="profile-logout-button" className="buttons" onClick={handleProfileLogout} >Logout</button>
                        </div>
                    )
                })
            }

            
        </div>
    )
}
