import {Image, Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {StatusBarColorContext} from "../../contexts/StatusBarColorContext";
import InputCustom from "../../components/InputCustom";
import {ButtonCustom} from "../../components/ButtonCustom";
import DatePickerNeat from 'react-native-neat-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LogBox } from 'react-native';
import characterUtils from "../../utils/characterUtils";
import {ThemeContext} from "../../contexts/ThemeContext";
import SliderBarAge from "../../components/SliderBarAge";
import FlashMessage, {showMessage} from "react-native-flash-message";
import {Categorie} from "../../components/Categorie";
import {getCategories} from "../../firebase/query/categoriesService";
import {SingleChoice} from "../../components/SingleChoice";
import {newEvent} from "../../firebase/query/eventService";
import {formateDate, formatTime} from "../../utils/dateUtils";
import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import isLinkValid from "../../utils/linkUtils";

LogBox.ignoreLogs(['Warning: NeatDatePicker']);

export default function NewEvent() {
    const statusContextValue = React.useContext(StatusBarColorContext);
    const themeContextValue = useContext(ThemeContext);

    const [title, setTitle] = useState('');
    const [nomAsso, setNomAsso] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [guest, setGuest] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [publicSexe, setPublicSexe] = useState('Mixte');
    const [publicAgeMin, setPublicAgeMin] = useState(18);
    const [publicAgeMax, setPublicAgeMax] = useState(100);
    const [paf, setPaf] = useState(0);
    const [registrationLink, setRegistrationLink] = useState('');

    //keyboard
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    //Categorie
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryTitle: string) => {
    if (selectedCategories.includes(categoryTitle)) {
        setSelectedCategories(selectedCategories.filter(category => category !== categoryTitle));
    } else {
        setSelectedCategories([...selectedCategories, categoryTitle]);
    }
};
    // Style
    const styleText = "text-xl font-medium text-black";

    // Calendar
    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [dateEvent, setDateEvent] = useState('');

    const openDatePickerSingle = () => setShowDatePickerSingle(true)

    const onCancelSingle = () => {
        setShowDatePickerSingle(false)
    }
    const onConfirmSingle = (output: { dateString: React.SetStateAction<string>; }) => {
        setShowDatePickerSingle(false)
        setDateEvent(output.dateString)
    }

    // Hours
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [timeEvent, setTimeEvent] = useState('');

    const onChangeTime = (event: any, selectedTime: any) => {
        if (event.type === 'set') {
            // L'utilisateur a sélectionné une heure
            setShowTimePicker(false)
            setTimeEvent(formatTime(selectedTime))
        } else {
            // L'utilisateur a annulé la sélection
            setShowTimePicker(false)
            setTimeEvent('')
        }
    }

    // Image

    const setEvent = async () => {
        if (registrationLink !== "") {
            if (await isLinkValid(registrationLink) === false) {
                showMessage({
                    message: "Le lien d'inscription n'est pas valide",
                    type: "warning",
                    autoHide: true,
                    duration: 2000,
                });
                return;
            }
        }
        if (!dateEvent || !title || !description || !publicSexe) {
            showMessage({
                message: "Veuillez remplir les champs obligatoires",
                type: "warning",
                autoHide: true,
                duration: 2000,
            });
            return;
        }
        try {
            const event = {
                title: title,
                nomAsso: nomAsso,
                time: timeEvent,
                image: image,
                guest: guest,
                description: description,
                categories: selectedCategories,
                paf: paf,
                registrationLink: registrationLink,
                publicSexe: publicSexe,
                publicAgeMin: publicAgeMin,
                publicAgeMax: publicAgeMax
            }
            await newEvent(dateEvent, event);

            showMessage({
                message: "Événement créé avec succès",
                type: "success",
                autoHide: true,
                duration: 2000,
            });
        } catch (e) {
            showMessage({
                message: "Une erreur est survenue",
                type: "danger",
                autoHide: true,
                duration: 2000,
            })
        }
    }

    return (
        <StatusBarColorContext.Provider value={statusContextValue}>
            <StatusBar backgroundColor={statusContextValue.statusBarColor} style={"dark"}/>
            <SafeAreaView className={"flex-1"}>
                <View className={"flex-row justify-between items-center p-5"}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Ionicons name="arrow-back-outline" size={30} color="black"/>
                    </TouchableOpacity>
                    <Text className={"text-2xl font-bold"}>Créer un événement</Text>
                    <View />
                </View>
                <ScrollView className={`flex-1 mx-5`} showsVerticalScrollIndicator={false}>

                    <TouchableOpacity className={"bg-white h-80 mx-8 my-5 justify-center items-center"}>
                            <Image
                                resizeMode="contain"
                                source={require('../../assets/images/fleg.jpg')}
                                className="w-full h-full  rounded-lg border-black"
                            />
                    </TouchableOpacity>

                    {/*<TouchableOpacity*/}
                    {/*    className={"bg-white h-80 mx-8 my-5 border-2 rounded-lg justify-center items-center"}*/}
                    {/*    style={{borderColor: themeContextValue.secondaryColor}}*/}
                    {/*>*/}
                    {/*    /!*{*!/*/}
                    {/*    /!*    image ? (*!/*/}
                    {/*        <Image*/}
                    {/*            resizeMode={"contain"}*/}
                    {/*            source={require('../../assets/images/fleg.jpg')}*/}
                    {/*            style={{ width: '100%',height:'100%', maxHeight: 300 }}*/}
                    {/*        />*/}
                    {/*        /!*) : (*!/*/}
                    {/*        /!*    <AntDesign name="pluscircleo" size={30} color="black"/>*!/*/}
                    {/*        /!*)*!/*/}
                    {/*    /!*}*!/*/}

                    {/*</TouchableOpacity>*/}
                    <View className={"flex-row justify-between mb-3"}>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text className={styleText}>Date</Text>
                                <Text style={{color: 'red'}}> *</Text>
                            </View>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}
                                              onPress={openDatePickerSingle}>
                                <Text className={"text-md"}>
                                    {dateEvent ?
                                        characterUtils(formateDate(dateEvent))
                                        :
                                        "Choisir une date"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className={styleText}>À</Text>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}
                                                onPress={() => setShowTimePicker(true)}
                            >
                                <Text className={"text-md"}>
                                    {timeEvent ?
                                        // timeEvent
                                        timeEvent
                                        :
                                        "Choisir une heure"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setTitle(value)}
                        title={"Titre"}
                        isMultiline={false}
                        isRequired={true}
                        placeHolder={"Cours de ... / Voyage en Italie"}
                        isNumeric={false}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setGuest(value)}
                        title={"Invité"}
                        isMultiline={false}
                        isRequired={false}
                        placeHolder={"Nom de l'invité"}
                        isNumeric={false}
                    />
                    <InputCustom
                        // onInputChange={(value: React.SetStateAction<string>) =>setDescription(description.replace(/\n/g, '\\n'))}
                        onInputChange={(value: React.SetStateAction<string>) => setDescription(value)}
                        title={"Description"}
                        isMultiline={true}
                        isRequired={true}
                        placeHolder={"Événement qui consiste a..."}
                        isNumeric={false}
                    />
                    <View className={"mb-2"}>
                        <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>Catégorie</Text>
                        <View className={"flex-row flex-wrap"}>
                            {categories.map((category) => (
                                <Categorie
                                    key={category}
                                    title={category}
                                    isClickable={true}
                                    onSelect={handleCategorySelect}
                                />
                            ))}
                        </View>
                    </View>
                    <View className={"mb-1 flex-row"}>
                        <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>Public</Text>
                        <Text style={{color: 'red'}}> *</Text>
                    </View>
                    <View className={"mb-2 flex-row"}>
                        <SingleChoice title={"Mixte"} isClickable={true} isSelected={publicSexe === 'Mixte'} onSelect={() => { setPublicSexe('Mixte')}}/>
                        <SingleChoice title={"Femme"} isClickable={true} isSelected={publicSexe === 'Femme'} onSelect={() => { setPublicSexe('Femme')}}/>
                        <SingleChoice title={"Homme"} isClickable={true} isSelected={publicSexe === 'Homme'} onSelect={() => { setPublicSexe('Homme')}}/>
                    </View>
                    <SliderBarAge
                        onValuesChange={(values) => {
                        setPublicAgeMin(values[0]);
                        setPublicAgeMax(values[1]);
                        }}
                        initialValueMin={18}
                        isRequired={true}
                    />
                    <View className={"items-start"}>
                        <InputCustom
                            onInputChange={(value: React.SetStateAction<string>) => setPaf(Number(value))}
                            title={"PAF"}
                            isMultiline={false}
                            isRequired={false}
                            placeHolder={"00"}
                            isNumeric={true}
                        />
                    </View>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setRegistrationLink(value)}
                        title={"Lien d'inscription"}
                        isMultiline={false}
                        isRequired={false}
                        placeHolder={"https://..."}
                        isNumeric={false}
                    />
                    {!isKeyboardVisible && (
                        <View style={{ height: 110 }} />
                    )}
                </ScrollView>
                {!isKeyboardVisible && (
                    <View className={"absolute bottom-0 items-center w-full mb-8"}>
                        <ButtonCustom title={"Créer"} handlePress={setEvent}/>
                    </View>
                )}
                <FlashMessage position="top" />
                <DatePickerNeat
                    isVisible={showDatePickerSingle}
                    mode={'single'}
                    onCancel={onCancelSingle}
                    onConfirm={onConfirmSingle}
                    language={'fr'}
                    dateStringFormat={'yyyy-mm-dd'}
                    colorOptions={{
                        headerColor: themeContextValue.secondaryColor,
                        confirmButtonColor: themeContextValue.secondaryColor,
                        selectedDateBackgroundColor: themeContextValue.secondaryColor,
                        weekDaysColor: themeContextValue.secondaryColor
                    }}/>
                { showTimePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode={'time'}
                        display={'spinner'}
                        onChange={onChangeTime}
                        is24Hour={true}
                        minuteInterval={5}
                    />
                )}
            </SafeAreaView>
        </StatusBarColorContext.Provider>

    )
}