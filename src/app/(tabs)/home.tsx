import { StatusBar } from 'expo-status-bar';
import {Text, SafeAreaView, ScrollView, View} from 'react-native';
import {Evenement} from "../../components/Evenement";
import {router} from "expo-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
// import { Text} from "../../components/Text";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";


const dateEvent =
    [{
        date: capitalizeFirstLetter(format(new Date(2014, 1, 11), "eeee dd MMMM", { locale: fr })),
        evenement: [{
            id: 1,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }, {
            id: 2,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }]
    }, {
        date: capitalizeFirstLetter(format(new Date(2014, 2, 11), "eeee dd MMMM", { locale: fr })),
        evenement: [{
            id: 3,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }, {
            id: 4,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }],
    }, {
        date: capitalizeFirstLetter(format(new Date(2014, 3, 11), "eeee dd MMMM", { locale: fr })),
        evenement: [{
            id: 5,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }, {
            id: 6,
            title: "Cours de Halakha Makhome",
            nomAsso: "Makhome",
            image: require("../../assets/images/fleg.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }],
    }]


export default function index() {
    return (
        <SafeAreaView className={"flex-1"}>
            <ScrollView className={"flex-1"} style={{backgroundColor:"#F4F4F9"}}>
                <View className={"flex-1 justify-center m-5 border-2"}>
                    {dateEvent.map((date) => {
                        return (
                            <View key={date.date}>
                                <Text className={"text-3xl font-black"} style={{color:"#171718"}}>{date.date}</Text>
                                {date.evenement.map((evenement, key) => {
                                    return (
                                        <Evenement
                                            key={evenement.id}
                                            evenement={evenement}
                                            handlePress={() => router.push('/eventView')}
                                        />
                                    )
                                })}
                            </View>
                        )
                    })}
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}