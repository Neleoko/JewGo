import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import SliderBarAge from './SliderBarAge';
import {Categorie} from "./Categorie";

export default function Filter({modalVisible, handleFilterButtonClick, setStatusBarColor}) {
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
                    <Text className={"font-bold text-gray-900 text-lg"}>Catégorie :</Text>
                    <View className={"flex-row flex-wrap"}>
                        <Categorie title={"Cours"} isClickable={true} onSelect={handleCategorySelect}/>
                        <Categorie title={"Soirée"} isClickable={true} onSelect={handleCategorySelect}/>
                        <Categorie title={"Repas"} isClickable={true} onSelect={handleCategorySelect}/>
                        <Categorie title={"Sport"} isClickable={true} onSelect={handleCategorySelect}/>
                        <Categorie title={"Culture"} isClickable={true} onSelect={handleCategorySelect}/>
                        <Categorie title={"Chabbat"} isClickable={true} onSelect={handleCategorySelect}/>
                    </View>
                </View>
                <SliderBarAge onValuesChange={(values) => console.log(values)}/>
            </View>
        </Modal>
    );
}