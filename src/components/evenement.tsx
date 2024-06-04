import {Button, Image, ImageSourcePropType, Text, View} from "react-native";
export type EvenementProps = {
    title: string;
    image: ImageSourcePropType;
    logoAsso: ImageSourcePropType;
    rabbin: string;
    publicSexe: string;
    publicAgeMin: string;
    publicAgeMax: string;
}

export const Evenement = ({
                              title, image, logoAsso,
                              rabbin, publicSexe,
                              publicAgeMin, publicAgeMax
                            }: EvenementProps) => {
    return (
        <View className={"flex-1 flex-row items-center m-5 p-3 bg-white rounded-lg"} style={{elevation:5}}>
            <Image
                resizeMode="contain"
                className={"border-2"}
                style={{width: 120, height: 125}}
                source={ image }
            />
            <View className={"flex-col flex-1 ml-2"}>
                <View className={"flex-row"}>
                    <View className={"flex-col flex-1"}>
                        <Text className={"font-semibold text-xl"}>{title}</Text>
                        <Text className={"font-medium text-l"}>{rabbin}</Text>
                    </View>
                    <View>
                        <Image
                            className={"w-10 h-10 rounded-md"}
                            source={ logoAsso }
                        />
                    </View>
                </View>
                <View className={"flex-row pt-5"}>
                    <Text className={"font-medium"}>Public : {publicSexe} - {publicAgeMin} à {publicAgeMax} ans</Text>
                </View>
                <View>

                </View>
                <View>
                    <Text>STARS ⭐⭐⭐⭐⭐ </Text>
                </View>
            </View>

        </View>
    );
};

