

import {  Text, View , ScrollView, Button} from 'react-native';
import {City} from '../types/City';
import RootStackParams from '../types/navigation';

import { Location } from '../types/City';
import { StyleSheet } from 'react-native';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

import { useContext, useState } from 'react';
import AppContext from '../modules/AppContext';

//is the city elemnent in home that you can press to open cities

import { ElementStyles } from '../styles/Elements';


type locationparam={
    name:string;
    content:string;
    id:string;
    fns:{rerender:Function,getcity:Function}
}

export default function LocationElement(params:locationparam){

    const context=useContext(AppContext)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const {name,content,id}=params



    return (
        <View key={params.id} style={ElementStyles.container}>
            <View style={ElementStyles.innerConteinaer}>

                <View style={ElementStyles.txt}> 
                    <Text style={ElementStyles.name}>{params.name}</Text>
                    <Text>{params.content}</Text>
                </View>
                <View style={ElementStyles.buttons}>

                    <Button
                        title='edit'
                        onPress={()=>{
                            //context.removeLocation(getcity().id, i.id);
                            //maybe not delete
                            //if not null delete when add cityew
                            params.fns.rerender();
                            navigation.navigate('AddLocation',{city:params.fns.getcity(),replocation:{name,content,id}})
                            }}
                    />
                    <Button
                        title='delete'
                        color={'red'}
                        onPress={()=>{context.removeLocation(params.fns.getcity().id, params.id);params.fns.rerender()}}
                    />
                </View>

            </View>
        </View>
    )
}



