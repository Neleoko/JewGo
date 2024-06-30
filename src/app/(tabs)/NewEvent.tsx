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
import { doc, getDocs, query } from "firebase/firestore";
import {SingleChoice} from "../../components/SingleChoice";

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
    const [registrationLink, setRegistrationLink] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    //keyboard
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
        const getCategories = async () => {
            const categoriesCollection = collection(firestore, "categories");
            const categoriesQuery = query(categoriesCollection);
            const categoriesSnapshot = await getDocs(categoriesQuery);
            categoriesSnapshot.forEach((doc) => {
                // Accéder à la propriété 'categories' de l'objet
                const categoriesData = doc.data().categories;
                setCategories(categoriesData.sort());
            });
        };
        getCategories();
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
                    <View className={"mb-2"}>
                        <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>Catégorie :</Text>
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
                        <Text className={`text-xl font-medium text-[${themeContextValue.textColor}]`}>Public :</Text>
                        <Text style={{color: 'red'}}> *</Text>
                    </View>
                    <View className={"mb-2 flex-row"}>
                        <SingleChoice title={"Mixte"} isClickable={true} isSelected={publicSexe === 'mixte'} onSelect={() => { setPublicSexe('mixte')}}/>
                        <SingleChoice title={"Femme"} isClickable={true} isSelected={publicSexe === 'femme'} onSelect={() => { setPublicSexe('femme')}}/>
                        <SingleChoice title={"Homme"} isClickable={true} isSelected={publicSexe === 'homme'} onSelect={() => { setPublicSexe('homme')}}/>
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
                            title={"PAF :"}
                            isMultiline={false}
                            isRequired={false}
                            placeHolder={"00"}
                            isNumeric={true}
                        />
                    </View>
                    <InputCustom
                        onInputChange={(value: React.SetStateAction<string>) => setRegistrationLink(value)}
                        title={"Lien d'inscription :"}
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
            </SafeAreaView>
        </StatusBarColorContext.Provider>

    )
}