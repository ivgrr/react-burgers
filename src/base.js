import Rebase from 're-base';
import firebase from "firebase/app";
require('firebase/database');

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCr6-jgZtPXNCFBQYuBu5RAJCEnQF5O4ew",
    authDomain: "very-hot-burgers-e9265.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-e9265-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebase.database());

export {firebaseApp};

export default base;
