
import {  Text, View , ScrollView, Button} from 'react-native';
import {City} from '../types/City';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';
import { StyleSheet } from 'react-native';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { ElementStyles } from '../styles/Elements';

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
     <View style={ElementStyles.container}>
        <View style={ElementStyles.innerConteinaer}>

            <View style={ElementStyles.txt}>
                <Text style={ElementStyles.name}>{cname}</Text>
                <Text>{params.country}</Text>
            </View>

            <View style={ElementStyles.buttons}>
                <Button
                    title='locations'
                    onPress={()=>{navigation.navigate('Locations',{city:({name,country,locations,id})})}}
                />

                <Button
                    color={'red'}
                    title='delete'
                    onPress={()=>{context.removeCity(params.id);setname("deleted") ;params.fns.rerender();}}
                />
            </View>

        </View>
     </View>
    )
}



