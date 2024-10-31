import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ButtonCustom } from "../../components/ButtonCustom";
import { StatusBar } from "expo-status-bar";
import InputCustom from "../../components/InputCustom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { router } from "expo-router";



export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const user = firebaseAuth.currentUser;
    // if (user !== null) {
    //     router.push('/Home');
    // }

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            showMessage({
                message: "Les mots de passe ne correspondent pas",
                type: "danger",
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // const user = userCredential.user;
            //
            // // Create a user object to add to the database
            // const newUser: UserInterface = {
            //     uid: user.uid,
            // };
            //
            // // Add the user to the database
            // await addUser(newUser);
            showMessage({
                message: "Utilisateur créé avec succès",
                type: "success",
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error.code);
            showMessage({
                message: errorMessage,
                type: "danger",
            });
        }
    };

    const getErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return "L'adresse e-mail est déjà utilisée.";
            case 'auth/invalid-email':
                return "L'adresse e-mail n'est pas valide.";
            case 'auth/operation-not-allowed':
                return "L'opération n'est pas autorisée.";
            case 'auth/weak-password':
                return "Le mot de passe est trop faible.";
            case 'auth/user-disabled':
                return "L'utilisateur a été désactivé.";
            case 'auth/user-not-found':
                return "Utilisateur non trouvé.";
            case 'auth/wrong-password':
                return "Mot de passe incorrect.";
            default:
                return "Une erreur est survenue. Veuillez réessayer.";
        }
    };

    return (
        <SafeAreaView className={"flex-1 items-center"}>
            <StatusBar backgroundColor={"#F4F4F9"} style={"dark"} />
            <FlashMessage position="top" />
            <View className={"w-3/4"}>
                <Text className={"text-2xl font-bold mb-4"}>Sign Up</Text>
                <InputCustom
                    title={"Email"}
                    placeHolder={"Email"}
                    onInputChange={setEmail}
                    isMultiline={false}
                    isRequired
                    keyboardType={"email-address"}
                />
                <InputCustom
                    title={"Password"}
                    placeHolder={"Password"}
                    onInputChange={setPassword}
                    isMultiline={false}
                    isRequired
                    keyboardType={"password"}
                />
                <InputCustom
                    title={"Confirm Password"}
                    placeHolder={"Confirm Password"}
                    onInputChange={setConfirmPassword}
                    isMultiline={false}
                    isRequired
                    keyboardType={"password"}
                />
                <ButtonCustom
                    title={"S'inscrire"}
                    handlePress={handleSignUp}
                />
            </View>
        </SafeAreaView>
    );
}