import { createSlice } from "@reduxjs/toolkit";


// Getting user data from local storage if it has data stored in it.
var retrievedData = localStorage.getItem( 'userData' );

if(retrievedData == 'undefined') {
    retrievedData = '{}';
}


// Creating a slice that will store data of multiple users.
const userDataSlice = createSlice( {
    name: 'user-ata-store',
    initialState: { storeMap: JSON.parse(retrievedData) },
    reducers: {
        addData: ( state, action ) => { // action.payload = { userEmail: 'email', userData = {} };
            state.storeMap[action.payload.userEmail] = action.payload.userData ;
            localStorage.setItem( 'userData',  JSON.stringify(state.storeMap) );
        },

        deleteData: ( state, action ) => { //action.userEmail = 'email';
            delete state.storeMap[action.payload.userEmail];  
            localStorage.setItem( 'userData',  JSON.stringify(state.storeMap) );
        }
    }
} );

export const userDataSliceActions = userDataSlice.actions;

export default userDataSlice.reducer;


// Getting logged in users Email Id if there is any user is already logged in.
var retrievedEmail = localStorage.getItem( 'currentUserEmail' );

if(retrievedEmail == 'undefined') {
    retrievedEmail = '';
}

// Creating a slice that will store already logged in user's email id.
const currentLoggedInUserSlice = createSlice( {
    name: 'current-logged-in-user',
    initialState: { userEmail: retrievedEmail },
    reducers: {
        setNewUser: ( state, action ) => {
            state.userEmail = action.payload;
            localStorage.setItem( 'currentUserEmail', action.payload );
        }
    }
} );

export const currentLoggedInUserActions = currentLoggedInUserSlice.actions;

export const currentLoggedInUserReducer = currentLoggedInUserSlice.reducer;