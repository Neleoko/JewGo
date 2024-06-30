import {Button, Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {StatusBarColorContext} from "../../contexts/StatusBarColorContext";
import InputCustom from "../../components/InputCustom";
import { firestore } from "../../firebase";
import {ButtonCustom} from "../../components/ButtonCustom";
import DatePickerNeat from 'react-native-neat-date-picker';
import { LogBox } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {ThemeContext} from "../../contexts/ThemeContext";
import SliderBarAge from "../../components/SliderBarAge";
import FlashMessage, {showMessage} from "react-native-flash-message";
import {Categorie} from "../../components/Categorie";

LogBox.ignoreLogs(['Warning: NeatDatePicker']);
export default function NewEvent() {
    const statusContextValue = React.useContext(StatusBarColorContext);
    const themeContextValue = useContext(ThemeContext);

    const [title, setTitle] = useState('');
    const [nomAsso, setNomAsso] = useState('');
    const [hourEvent, setHourEvent] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [guest, setGuest] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [publicSexe, setPublicSexe] = useState('');
    const [publicAgeMin, setPublicAgeMin] = useState(18);
    const [publicAgeMax, setPublicAgeMax] = useState(100);
    const [paf, setPaf] = useState(0);

    //keyboard
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // ou tout autre action que vous souhaitez effectuer
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // ou tout autre action que vous souhaitez effectuer
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    //Categorie
    const handleCategorySelect = (categoryTitle: string) => {
    if (selectedCategories.includes(categoryTitle)) {
        setSelectedCategories(selectedCategories.filter(category => category !== categoryTitle));
    } else {
        setSelectedCategories([...selectedCategories, categoryTitle]);
    }
};
    console.log(selectedCategories);
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
        console.log(output.dateString)
    }

    // Hours
    const [showTimePicker, setShowTimePicker] = useState(false)

    const setEvent = async () => {
        if (!dateEvent || !title || !description || !publicSexe) {
            showMessage({
                message: "Veuillez remplir les champs obligatoires",
                type: "warning",
                autoHide: true,
                duration: 2000,
            });
            console.log("champs manquants" + dateEvent + title + nomAsso + image + publicSexe);
            return;
        }
        try {
            const newEventRef = collection(firestore, `/dateEvents/${dateEvent}/events`);
            await addDoc(newEventRef, {
                title: title,
                nomAsso: nomAsso,
                image: image,
                guest: guest,
                description: description,
                categories: selectedCategories,
                publicSexe: publicSexe,
                publicAgeMin: publicAgeMin,
                publicAgeMax: publicAgeMax
            });
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
                <View className={"items-center justify-center mt-5"}>
                    <Text className={"text-2xl font-bold"}>Créer un événement</Text>
                </View>
                <ScrollView className={`flex-1 mx-5`} showsVerticalScrollIndicator={false}>
                    <View className={"flex-row justify-between mb-3"}>
                        <View>
                            <Text className={styleText}>Date :</Text>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}
                                              onPress={openDatePickerSingle}>
                                <Text className={"text-md"}>
                                    {dateEvent ?
                                        capitalizeFirstLetter(format(dateEvent, "eeee dd MMM", { locale: fr }))
                                        :
                                        "Choisir une date"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className={styleText}>À : </Text>
                            <TouchableOpacity className={`flex border-2 rounded-lg py-2 px-3`}
                                              style={{borderColor: themeContextValue.secondaryColor}}>
                                <Text>Choisir une heure</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setTitle(value)}
                        title={"Titre :"}
                        isMultiline={false}
                        isRequired={true}
                        placeHolder={"Cours de ... / Voyage en Italie"}
                        isNumeric={false}
                    />
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setGuest(value)}
                        title={"Invité :"}
                        isMultiline={false}
                        isRequired={false}
                        placeHolder={"Nom de l'invité"}
                        isNumeric={false}
                    />
                    <InputCustom
                        // onInputChange={(value: React.SetStateAction<string>) =>setDescription(description.replace(/\n/g, '\\n'))}
                        onInputChange={(value: React.SetStateAction<string>) => setDescription(value)}
                        title={"Description :"}
                        isMultiline={true}
                        isRequired={true}
                        placeHolder={"Événement qui consiste a..."}
                        isNumeric={false}
                    />
                    {/*categorie*/}
                    <View>
                        <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>Catégorie :</Text>
                        <View className={"flex-row flex-wrap"}>
                            <Categorie title={"Cours"} isClickable={true} onSelect={handleCategorySelect}/>
                            <Categorie title={"Soirée"} isClickable={true} onSelect={handleCategorySelect}/>
                            <Categorie title={"Repas"} isClickable={true} onSelect={handleCategorySelect}/>
                            <Categorie title={"Sport"} isClickable={true} onSelect={handleCategorySelect}/>
                            <Categorie title={"Culture"} isClickable={true} onSelect={handleCategorySelect}/>
                            <Categorie title={"Chabbat"} isClickable={true} onSelect={handleCategorySelect}/>
                        </View>
                    </View>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setPublicSexe(value)}
                        title={"Public :"}
                        isMultiline={false}
                        isRequired={true}
                        placeHolder={"Tout public / Adulte / Enfant"}
                        isNumeric={false}
                    />
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
                            onInputChange={(value: React.SetStateAction<string>) => setPublicSexe(value)}
                            title={"PAF :"}
                            isMultiline={false}
                            isRequired={false}
                            placeHolder={"00"}
                            isNumeric={true}
                        />
                    </View>
                    {!isKeyboardVisible && (
                        <View style={{ height: 100 }} />
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
            </SafeAreaView>
        </StatusBarColorContext.Provider>

    )
}