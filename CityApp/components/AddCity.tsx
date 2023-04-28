import {useContext, useState} from 'react';
import { View , TextInput, Button} from 'react-native';
import AppContext from '../modules/AppContext';
import { dbWrapper } from '../modules/DbWrapper';

import { AddScreenStyle } from '../styles/Adds';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParams from '../types/navigation';
import { useEffect } from 'react';

import {useIsFocused} from '@react-navigation/native'

type Props=NativeStackScreenProps<RootStackParams,"AddCity","what">

export default function AddCity({route,navigation}:Props){
    const [cityName, setCityname]=useState<string>("");
    const [cityCountry, setCityCountry]=useState<string>("");
    const context =useContext(AppContext)
    const isEditing=route.params!=undefined

    const isfocused=useIsFocused()



    useEffect(()=>{
        //when is focused and we are editing set name and content to what we are editing
        if(isfocused){
            if(isEditing){
            navigation.setOptions({
                title:'edit City'
            })
                
                setCityname(route.params.repCity.name)
                setCityCountry(route.params.repCity.country)
            }
        }
    },[isfocused])


    function buttonHandler(){
        const cit={
            name:cityName,
            country:cityCountry,
            locations:undefined,
            id:context.getid()
        }

        if(isEditing){
            context.removeCity(route.params.repCity.id);
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




