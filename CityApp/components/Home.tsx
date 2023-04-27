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






//has list of cities and button to add cities
export default function Home(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const asdf=useContext(AppContext)



    const elements = asdf.cities.map((i)=>
        <CityElement {...i}></CityElement>
    )
    //works but needs refresh



    return (
     <View>
         <Text>this is home</Text>
        

          <Button
              title='+'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />
          <Button
              title='log'
              onPress={()=>{console.log("asdf")}}//navigates to thing with name
          />

        <ScrollView>
            {elements}
        </ScrollView>

     </View>
    )
}
