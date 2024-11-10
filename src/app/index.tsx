import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {ButtonCustom} from "../components/ButtonCustom";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import FlashMessage, {showMessage} from "react-native-flash-message";
import InputCustom from "../components/InputCustom";
import {StatusBarColorContext} from "../contexts/StatusBarColorContext";
import {router} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';


export default function App() {
    const themeContextValue = useContext(ThemeContext);
    const statusContextValue = useContext(StatusBarColorContext);

    const [loginMode, setLoginMode] = useState(true);

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
    }, [])

    // Connexion
    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            showMessage({
                message: "Connexion réussie",
                type: "success",
            });
            router.push('/Home');
        } catch (error) {
            console.log(error);
            const errorMessage = getErrorMessage(error.code);
            showMessage({
                message: errorMessage,
                type: "danger",
            });
        }
    };

    // Inscription
    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            showMessage({
                message: "Utilisateur créé avec succès",
                type: "success",
            });
        } catch (error) {
            console.log(error);
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
            case 'auth/email-already-in-use':
                return "L'adresse e-mail est déjà utilisée.";
            case 'auth/invalid-credential':
                return "Les informations d'identification sont invalides.";
            default:
                return "Une erreur est survenue. Veuillez réessayer.";
        }
    };

    return (
        <SafeAreaView className={`flex-1`} style={{backgroundColor: themeContextValue.primaryColor}}>
            <FlashMessage position="top"/>
            <View className={`flex-1 justify-center mx-8`}>
                <StatusBar backgroundColor={`${statusContextValue.statusBarColor}`} style={"dark"}/>
                <View className={"mb-6"}>
                    <Text className={"text-3xl"}>{loginMode ? "Connexion" : "Inscription"}</Text>
                </View>
                <InputCustom
                    title={"Email"}
                    placeHolder={"Email"}
                    onInputChange={setEmail}
                    isMultiline={false}
                    isRequired={false}
                    keyboardType={"email-address"}
                    icon={"mail"}
                />
                <InputCustom
                    title={"Password"}
                    placeHolder={"Password"}
                    onInputChange={setPassword}
                    isMultiline={false}
                    isRequired={false}
                    keyboardType={"password"}
                    icon={"lock"}
                />
                {loginMode ? (
                    <>
                        <TouchableOpacity className={"flex-row self-end mb-24"} onPress={() => alert("mdp oublié")}>
                            <Text style={{color: themeContextValue.secondaryColor}} className={"text-sm"}>Mot de passe
                                oublié ?</Text>
                        </TouchableOpacity>

                        <ButtonCustom title={"Se connecter"} styleNativeWind={"py-2.5 mx-4 "} handlePress={() => {
                            handleSignIn()
                        }}/>
                    </>
                ) : (
                    <>
                        <View className={"mb-24"}/>
                        <ButtonCustom title={"S'inscrire"} styleNativeWind={"py-2.5 mx-4 "} handlePress={() => {
                            handleSignUp()
                        }}/>
                    </>
                )}
                <View className={"flex-row items-center my-5 mx-12"}>
                    <View className={"flex-1 h-0.5"} style={{backgroundColor: themeContextValue.secondaryColor}}/>
                    <Text className={"text-center w-12"} style={{color: themeContextValue.secondaryColor}}>ou</Text>
                    <View className={"flex-1 h-0.5"} style={{backgroundColor: themeContextValue.secondaryColor}}/>
                </View>
                <TouchableOpacity
                    className={`flex-row justify-center items-center rounded-3xl py-2.5 bg-white border-2 mx-4`}
                    style={{borderColor: themeContextValue.secondaryColor}}
                    onPress={() => router.push('/Home')}
                >
                    <View className={"mr-5"}>
                        <Image source={require('../assets/images/google-logo.png')} style={{ width: 28, height: 28 }} />
                    </View>
                    <Text className={"text-lg text-black"}>Connexion avec Google</Text>
                </TouchableOpacity>

                <View className={"flex-row justify-center mt-5"}>
                    <Text className={"text-sm"}>{loginMode ? "Pas de compte ?" : "Déjà un compte ?"}</Text>
                    <TouchableOpacity onPress={() => setLoginMode(!loginMode)}>
                        <Text style={{color: themeContextValue.secondaryColor}}
                              className={"text-sm ml-1 font-semibold underline"}>{loginMode ? "Inscrivez-vous" : "Connectez-vous"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}