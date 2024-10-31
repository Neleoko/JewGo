import React, {useContext, useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import SliderBarAge from './SliderBarAge';
import {Categorie} from "./Categorie";
import {ThemeContext} from "../contexts/ThemeContext";
import { getCategories } from '../firebase/query/categoriesService';

export default function Filter({modalVisible, handleFilterButtonClick, setStatusBarColor}) {
    const themeContextValue = useContext(ThemeContext);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);
    const handleCategorySelect = (categoryTitle: string) => {
        console.log(categoryTitle);
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View className={"bg-white p-7 flex-1"}>
                <View className={"flex-row justify-between"}>
                    <Text className={"text-2xl font-bold"}>Filtres</Text>
                    <TouchableOpacity onPress={handleFilterButtonClick}>
                        <Entypo name="cross" size={40} color="#082385"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className={`font-bold text-[${themeContextValue.textColor}] text-xl`}>Catégorie :</Text>
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
                <SliderBarAge onValuesChange={(values) => console.log(values)}/>
            </View>
        </Modal>
    );
}