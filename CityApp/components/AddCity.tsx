import {useContext, useState} from 'react';
import { View , TextInput, Button} from 'react-native';
import AppContext from '../modules/AppContext';
import { dbWrapper } from '../modules/DbWrapper';

import { AddScreenStyle } from '../styles/Adds';

export default function AddCity(){
    const [cityName, setCityname]=useState<string>("");
    const [cityCountry, setCityCountry]=useState<string>("");
    const context =useContext(AppContext)

    function buttonHandler(){
        const cit={
            name:cityName,
            country:cityCountry,
            locations:undefined,
            id:context.getid()
        }
        const narr=[...context.cities]// spread was needed for something
        narr.push(cit);
        context.cities=narr;
        dbWrapper.ResetDb(context.cities)
    }


    return (
     <View style={AddScreenStyle.container}>
        <View style={AddScreenStyle.inputs}>
            <TextInput style={AddScreenStyle.tinp} onChangeText={setCityname} value={cityName} placeholder='city name' ></TextInput>
            <TextInput style={AddScreenStyle.tinp} onChangeText={setCityCountry} value={cityCountry} placeholder='country' ></TextInput>
        </View>

        <View style={AddScreenStyle.budden}>
            <Button title='add city' onPress={()=>{buttonHandler() }}/>
        </View>

     </View>
    )
}




