import Rebase from 're-base';
import firebase from 'firebase';



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3lY-OsoAX62aPM7ZPRl1zx2h8EdOXAgw",
    authDomain: "hadley-s.firebaseapp.com",
    databaseURL: "https://hadley-s.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());


//this is a named export
export { firebaseApp };

//this is a default export
export default base;