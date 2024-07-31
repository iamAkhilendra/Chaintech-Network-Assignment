# About this application

A simple React application with user login, profile management, and account creation features. This app allows users to log in, view and edit their profile details, and create a new account.

# Features 

+ __Login Page:__ Allows users to securely log in to the application by providing their email address and password. Upon the initial render of the application, no user accounts will be present in the system as the application utilizes the __Redux store__ for managing user data. Users must first create an account using the provided link on the login page before they can log in and access the application.

+ __Create Account Page:__ Enables users to set up a new account by entering their email address, name, and password. This page is essential for users who do not yet have an account and need to register before logging in.

+ __Profile Page:__ Displays and allows users to manage their personal information after logging in. Users can view and __update details__ such as their name, email, date of birth, and password. This page provides options to edit these details or log out of the application.

# How this application Works

+ __Email Verification:__ The application uses a regular expression (regex) to verify email addresses. This regex ensures that the email addresses follow a standard format, such as having the "@" symbol and a valid domain suffix. This validation helps to ensure that only properly formatted email addresses are accepted during registration and login.
  
+ __Page Navigation:__ The application utilizes React Router DOM to manage navigation between different pages.

+ __Data Management with Redux:__ The application uses Redux for state management, storing user data directly in the frontend. By maintaining user information in the Redux store, different components of the application can easily access and update this data.

# Live Application

You can view and interact with the live version of this application at [Live Link](https://chaintech-network-assignment.vercel.app/).
