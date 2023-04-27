import {  Text, View, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { useState } from 'react';
import { City } from '../types/City';
import { useContext } from 'react';

import AppContext from '../modules/AppContext';
import {useFocusEffect} from '@react-navigation/native'
import { useCallback } from 'react';




//has list of cities and button to add cities
export default function Home(){
    const [rencities, setrencities] = useState<City[]>([])
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const asdf=useContext(AppContext)

    //do we do hook. update hook on 

    function getid():string{
        return Math.random().toString();
    }



    //works but needs refresh uise effect? idk man use focus effect hook i quess

    useFocusEffect(
        useCallback(()=>{

            console.log(rencities)
            setrencities(asdf.cities as City[]);
            console.log(rencities)
            console.log(asdf.cities as City[])

            setrencities(asdf.cities);
            console.log(rencities)
            //how the fuck is rencities not set i actually do not get it
            //how the fuck is this possible. i hate this library


            return()=>{
                console.log("unfocussed")
            }
        },[])
    );

    const elements = rencities.map((i)=>
        <CityElement {...i} key={getid()}></CityElement>
    )
    

    return (
     <View>
         <Text>this is home</Text>
        

          <Button
              title='+'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />
          <Button
              title='log'
              onPress={()=>{
              console.log("asdf")
              console.log(asdf.cities)
              console.log("ren")
              console.log(rencities)
              }}//navigates to thing with name
          />

        <ScrollView>
            {elements}
        </ScrollView>

     </View>
    )
}
