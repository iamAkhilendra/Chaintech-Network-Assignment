import { configureStore } from "@reduxjs/toolkit";

import userDataSliceReducers from './Slices';
import { currentLoggedInUserReducer } from "./Slices";


// Createing a redux store that will store two things.
// One will be email id of already logged in user, if there is no user logged in, then this will store empty string.
// Second thing will be data of users that have logged in before.
const store = configureStore( {
    reducer: {
        userDataReducer: userDataSliceReducers,
        currentLoggedInUser: currentLoggedInUserReducer
    }
} );


export default store;