import { StatusBar } from 'expo-status-bar';
import {Text, SafeAreaView, ScrollView, View, RefreshControl} from 'react-native';
import {Evenement} from "../../components/Evenement";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { useRouter } from "expo-router";
import SwitchSelector from "react-native-switch-selector";
import React, {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import { StatusBarColorContext } from '../../contexts/StatusBarColorContext';
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {ThemeContext} from "../../contexts/ThemeContext";


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
            image: require("../../assets/images/chabath.jpg"),
            logoAsso: require("../../assets/images/MakhomeLogo.jpg"),
            rabbin: "Rav Binyamin Smadja",
            publicSexe: "Homme",
            publicAgeMin: 18,
            publicAgeMax: 35
        }],
    }]

export default function Home() {
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const statusContextValue = React.useContext(StatusBarColorContext);
    const themeContextValue = React.useContext(ThemeContext);

    const optionsButton = [
        { label: 'Tout', value: '1' },
        { label: 'Abonnement', value: '2' }
    ];
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Ici, vous pouvez appeler votre fonction pour recharger les données
        // Par exemple, vous pouvez appeler une fonction fetchData() qui récupère les données
        // fetchData().then(() => {
            setRefreshing(false);
        // });
    }, []);
    return (
        <ThemeContext.Provider value={themeContextValue}>
            <StatusBarColorContext.Provider value={statusContextValue}>
                <SafeAreaView className={"flex-1 border-6 border-cyan-400"}>
                    <StatusBar backgroundColor={statusContextValue.statusBarColor} style={"dark"}/>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        className={"flex-1"}
                        style={{backgroundColor:themeContextValue.primaryColor}}
                        showsVerticalScrollIndicator={false}
                    >
                        <View className={"flex-1 justify-center m-5"}>
                            <View className={"items-center mb-1"}>
                                <SwitchSelector options={optionsButton} buttonColor={themeContextValue.secondaryColor} initial={0} />
                            </View>
                            <SearchBar />
                            {dateEvent.map((date) => {
                                return (
                                    <View key={date.date}>
                                        <Text className={"text-3xl font-black"} style={{color:themeContextValue.textColor}}>{date.date}</Text>
                                        {date.evenement.map((evenement, key) => {
                                            return (
                                                <Evenement
                                                    key={evenement.id}
                                                    evenement={evenement}
                                                    handlePress={() =>
                                                        router.navigate({
                                                            pathname: '/(view)/EventView',
                                                            params: { date: date.date, evenement: JSON.stringify(evenement) },
                                                        })
                                                    }
                                                />
                                            )
                                        })}
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </StatusBarColorContext.Provider>
        </ThemeContext.Provider>
    );
}