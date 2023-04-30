
import { View, Text , Button, TextInput} from "react-native"

import { useState } from "react"

export default function InputForm(){
    const [name,setName]= useState<string>("")
    const [quantity,setQuantity]= useState<string>("")

    function changeQuantity(i:string){ 
        const n=parseInt(i).toString();
        setQuantity(n=="NaN"?"":n)
    }



    return(
        <View>
            <Text>add snobbing item</Text>
            <TextInput
                placeholder="item name"
                onChangeText={setName}
                value={name}
            />

            <TextInput
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="quantity"
                onChangeText={changeQuantity}
                value={quantity.toString()}
            />

            <Button 
                title="add item"
            />

        </View>
    )



}


