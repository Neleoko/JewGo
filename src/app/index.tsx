import {Text, View, Image, SafeAreaView} from 'react-native';
import {Redirect, router} from "expo-router";
import { ButtonCustom } from "../components/ButtonCustom";
import {StatusBar} from "expo-status-bar";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import {firebaseAuth} from "../firebase/firebase";
export default function App() {
    const themeContextValue = useContext(ThemeContext);

    // const user = firebaseAuth.currentUser;
    // if (user !== null) {
    //     router.push('/Home');
    // }
    return (
        <View className={`flex-1 flex-col items-center justify-center mx-8 bg-[${themeContextValue.primaryColor}]`}>
            <StatusBar backgroundColor={"#F4F4F9"} style={"dark"}/>
            <Image
                className={"w-40 h-40 mb-10"}

                source={require('../assets/images/x-logo.png')}
            />
            <Text className={`text-6xl m-9 p-1 text-center text-[${themeContextValue.textColor}]`}>JewGo</Text>

            <View className={"my-8"}>
                <ButtonCustom
                    title={"Connexion"}
                    handlePress={() => router.push('/Sign-in')}
                />
            </View>
            <View>
                <ButtonCustom
                    title={"Inscription"}
                    handlePress={() => router.push('/Sign-up')}
                />
            </View>
        </View>
    );
}