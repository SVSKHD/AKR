import firebase from "firebase/app"
import "firebase/auth"


const Firebase ={
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}


firebase.initializeApp(Firebase)


export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const Facebook = new firebase.auth.FacebookAuthProvider()
export const name = "Aquakart | Best Shopping Cart"
export const link = "https://aquakart.store"