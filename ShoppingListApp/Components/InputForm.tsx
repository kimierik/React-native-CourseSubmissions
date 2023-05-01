
import { View, Text , Button, StyleSheet, TextInput} from "react-native"

import { useState } from "react"


import Rtk from "../StateManagement/Rtk"
import { addItem } from "../StateManagement/Rtk"



export default function InputForm(){
    const [name,setName]= useState<string>("")
    const [quantity,setQuantity]= useState<string>("")

    //this prevents quantity from being nan
    function changeQuantity(i:string){ 
        const n=parseInt(i).toString();
        setQuantity(n=="NaN"  ? "":n)
    }

    //generates random id
    function getId(){
        return Math.random().toString();
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>add items to the ShoppingList</Text>

            <TextInput
                style={styles.inputs}
                placeholder="item name"
                onChangeText={setName}
                value={name}
            />

            <TextInput
                style={styles.inputs}
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="quantity"
                onChangeText={changeQuantity}
                value={quantity.toString()}
            />

            <Button 
                title="add item"
                onPress={()=>{ 
                Rtk.dispatch(addItem(
                                    {
                                        name,
                                        quantity:parseInt(quantity==""?"1":quantity),
                                        id:getId()}
                                    )
                            )}} />

        </View>
    )

}



const styles=StyleSheet.create({
    container:{
        width:'80%',
        borderWidth:2,
        marginBottom:15,
        
    },
    inputs:{
        borderWidth:1,
        borderColor:'#000',
        width:'100%',
        height:50,
        marginBottom:5,
        marginTop:5,
    },
    title:{
        fontSize:20,
    },

})


