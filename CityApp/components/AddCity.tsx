
import {useContext, useState} from 'react';
import {  Text, View , TextInput, Button} from 'react-native';
import AppContext from '../modules/AppContext';
import {City} from '../types/City';
import { dbWrapper } from '../modules/DbWrapper';

export default function AddCity(){
    const [cityName, setCityname]=useState<string>("");
    const [cityCountry, setCityCountry]=useState<string>("");
    const context =useContext(AppContext)



    return (
     <View>
        <Text>adds citues</Text>
        <TextInput onChangeText={setCityname} value={cityName} placeholder='city name' ></TextInput>
        <TextInput onChangeText={setCityCountry} value={cityCountry} placeholder='country' ></TextInput>
        <Button title='add city' onPress={()=>{
            const cit={
                name:cityName,
                country:cityCountry,
                locations:undefined,
                id:context.getid()
            }
            const narr=[...context.cities]
            narr.push(cit);
            context.cities=narr;// memory nuke
            //dbWrapper.storeData(cit)
            //context.updateCities()
            dbWrapper.ResetDb(context.cities)


        }}/>

     </View>
    )
}
