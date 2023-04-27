import {  Text, View, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { useState } from 'react';
import { City } from '../types/City';
import { createContext } from 'react';




export const AppContext=createContext({cits:[]});



//has list of cities and button to add cities
export default function Home(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [cities, setCities]= useState<City[]>()

    const elements = cities?.map((i)=>
        <CityElement {...i}></CityElement>
    )



    return (
     <View>
         <Text>this is home</Text>
        

          <Button
              title='+'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />

        <ScrollView>
            {elements}
        </ScrollView>

     </View>
    )
}
