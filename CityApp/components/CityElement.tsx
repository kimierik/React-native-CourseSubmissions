
import {  Text, View , ScrollView, Button} from 'react-native';
import {City} from '../types/City';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

import { useContext, useState } from 'react';
import AppContext from '../modules/AppContext';

//is the city elemnent in home that you can press to open cities

type Cityparam={
    name:string;
    country:string;
    locations: undefined | Location[];
    id:string;
    fns:{rerender:Function}
}

export default function CityElement(params:Cityparam){
    const [cname,setname] = useState(params.name)
    const {name,country,locations,id}=params

    const context=useContext(AppContext)
    

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();



    return (
     <View>
        <Text>{cname}</Text>
        <Text>{params.country}</Text>
            <Button
                title='gotoscre'
                onPress={()=>{navigation.navigate('Locations',{city:({name,country,locations,id})})}}
            />

            <Button
                title='delete'
                onPress={()=>{context.removeCity(params.id);setname("deleted") ;params.fns.rerender();}}
            />

     </View>
    )
}
