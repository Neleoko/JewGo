import { Text, View, Image } from 'react-native';
import { Redirect,router } from "expo-router";
import { ButtonHome } from "../components/buttonHome";

export default function App() {
    return (
        <View className={"flex-1 items-center justify-center"}>
            <Image
                className={"w-40 h-40 mb-10"}

                source={require('../assets/images/x-logo.png')}
            />
            <Text className={"text-6xl mb-10"}>JEvents</Text>

            <ButtonHome
                title={"Connexion"}
                handlePress={() => router.push('/sign-in')}
            />

            <ButtonHome
                title={"Inscription"}
                handlePress={() => router.push('/sign-up')}
            />
        </View>
    );
}