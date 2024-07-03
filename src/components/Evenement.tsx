import {Button, Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View} from "react-native";

export type EvenementProps = {
    evenement: {
        title: string,
        nomAsso: string,
        image: ImageSourcePropType,
        guest: string,
        description: string,
        logoAsso: ImageSourcePropType,
        categories: string[],
        paf: number,
        registrationLink: string,
        publicSexe: string,
        publicAgeMin: number,
        publicAgeMax: number
    },
    handlePress?: () => void
}

export const Evenement = ({evenement, handlePress}: EvenementProps) => {
    return (
        <TouchableOpacity
            className={"flex-1 flex-row items-center my-2 p-3 bg-white rounded-lg"}
            style={{elevation: 5}}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <Image
                resizeMode="contain"
                className={"border-2"}
                style={{width: 120, height: 125}}
                source={evenement.image}
            />
            <View className={"flex-col flex-1 ml-2"}>
                <View className={"flex-row"}>
                    <View className={"flex-col flex-1"}>
                        <Text className={"font-semibold text-xl"}>{evenement.title}</Text>
                        <Text className={"font-medium text-l"}>{evenement.guest}</Text>
                    </View>
                    <View>
                        <Image
                            className={"w-10 h-10 rounded-md"}
                            source={evenement.logoAsso}
                        />
                    </View>
                </View>
                <View className={"flex-row pt-5"}>
                    <Text className={"font-medium"}>Public
                        : {evenement.publicSexe} - {evenement.publicAgeMin} à {evenement.publicAgeMax} ans</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

