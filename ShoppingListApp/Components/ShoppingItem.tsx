import { View, Text } from "react-native"


import Item from "../types/Item"


export default function ShoppingItem(props:Item){


    return(
        <View>
            <Text>{props.name}</Text>
            <Text>{props.quantity}</Text>
        </View>
    )

}


