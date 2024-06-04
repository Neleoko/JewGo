import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Evenement} from "../components/evenement";

export default function index() {
    return (
        <SafeAreaView className={"flex-1"}>
            <ScrollView className={"flex-1"} style={{backgroundColor:"#F4F4F9"}}>
                <View className={"flex-1 justify-center"}>
                    <Evenement
                        title={"Cours de Halakha Makhome"}
                        image={require("../assets/images/fleg.jpg")}
                        logoAsso={require("../assets/images/MakhomeLogo.jpg")}
                        rabbin={"Rav Binyamin Smadja"}
                        publicAgeMin={"18"}
                        publicAgeMax={"35"}
                        publicSexe={"Homme"}
                    />
                    <Evenement
                        title={"Cours de Halakha Makhome"}
                        image={require("../assets/images/chabath.jpg")}
                        logoAsso={require("../assets/images/MakhomeLogo.jpg")}
                        rabbin={"Rav Binyamin Smadja"}
                        publicAgeMin={"18"}
                        publicAgeMax={"35"}
                        publicSexe={"Homme"}

                    />
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginHorizontal: 20,
//         marginVertical: 20,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//     },
// });
