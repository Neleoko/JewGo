import {Text, View, Image, SafeAreaView} from 'react-native';
import {Redirect, router} from "expo-router";
import { ButtonCustom } from "../components/ButtonCustom";
export default function App() {
    return (
        <View className={"flex-1 flex-col items-center justify-center mx-8"}>
            <Image
                className={"w-40 h-40 mb-10"}

                source={require('../assets/images/x-logo.png')}
            />
            <Text className={"text-6xl m-9 p-1 text-center"}>JEvents</Text>

            <View className={"my-8"}>
                <ButtonCustom
                    title={"Connexion"}
                    handlePress={() => router.push('/sign-in')}
                />
            </View>
            <View>
                <ButtonCustom
                    title={"Inscription"}
                    handlePress={() => router.push('/sign-up')}
                />
            </View>
        </View>
    );
}