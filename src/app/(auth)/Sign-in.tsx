import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react';
import { ButtonCustom } from "../../components/ButtonCustom";
import { StatusBar } from "expo-status-bar";
import InputCustom from "../../components/InputCustom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { router } from "expo-router";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            showMessage({
                message: "Connexion réussie",
                type: "success",
            });
            router.push('/Home');
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
            case 'auth/invalid-email':
                return "L'adresse e-mail n'est pas valide.";
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
                <Text className={"text-2xl font-bold mb-4"}>Sign In</Text>
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
                <ButtonCustom
                    title={"Se connecter"}
                    handlePress={handleSignIn}
                />
            </View>
        </SafeAreaView>
    );
}