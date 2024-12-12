import {doc, getDoc, setDoc} from "firebase/firestore";
import {firestore} from "../firebase";

export const checkUserExist = async (uid: string) => {
    const userRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(userRef);
    console.log(userDoc.exists());
    return userDoc.exists();
};

export const addUserToFirestore = async (user: any) => {
    await setDoc(doc(firestore, "users", user.uid), user);
}