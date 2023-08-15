import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCb3S4UfNALm-JqnQOKAcFrG1g9zeIpmbY",
	authDomain: "cbs-be.firebaseapp.com",
	projectId: "cbs-be",
	storageBucket: "cbs-be.appspot.com",
	messagingSenderId: "241808909363",
	appId: "1:241808909363:web:d261617f3182dc704d6f46",
	measurementId: "G-0KST16GC78",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)