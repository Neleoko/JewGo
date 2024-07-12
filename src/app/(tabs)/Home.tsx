import { StatusBar } from 'expo-status-bar';
import {Text, SafeAreaView, ScrollView, View, RefreshControl, ActivityIndicator} from 'react-native';
import {Evenement} from "../../components/Evenement";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CapitalizeFirstLetter from "../../utils/characterUtils";
import {useFocusEffect, useRouter} from "expo-router";
import SwitchSelector from "react-native-switch-selector";
import React, {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar";
import { StatusBarColorContext } from '../../contexts/StatusBarColorContext';

import {ThemeContext} from "../../contexts/ThemeContext";
import {getEvents} from "../../firebase/query/eventService";

export default function Home() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [event, setEvent] = useState([]);

    const statusContextValue = React.useContext(StatusBarColorContext);
    const themeContextValue = React.useContext(ThemeContext);

    const optionsButton = [
        { label: 'Tout', value: '1' },
        { label: 'Abonnement', value: '2' }
    ];
    const fetchEvents = async () => {
        setIsLoading(true)
        setEvent(await getEvents());
        setIsLoading(false)
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEvents().then(() => setRefreshing(false));
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchEvents();
        }, [])
    );

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
                            {isLoading? (
                                <View className={"flex-1 justify-center items-center"}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                event.map((dateEvent) => {
                                        const date = CapitalizeFirstLetter(format(new Date(dateEvent.date).getTime(), "eeee dd MMMM", {locale: fr}))
                                        return (
                                            <View key={dateEvent.date}>
                                                <Text className={"text-3xl font-black"} style={{color:themeContextValue.textColor}}>{date}</Text>
                                                {dateEvent.events.map((event, key) => {
                                                    return (
                                                        <Evenement
                                                            key={event.id}
                                                            evenement={event}
                                                            handlePress={() =>
                                                                router.navigate({
                                                                    pathname: '/EventView',
                                                                    params: { id: event.id, date: dateEvent.date},
                                                                })
                                                            }
                                                        />
                                                    )
                                                })}
                                            </View>
                                        )
                                    })
                            )}

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </StatusBarColorContext.Provider>
        </ThemeContext.Provider>
    );
}