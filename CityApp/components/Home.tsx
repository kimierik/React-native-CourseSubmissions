import {  Text, View, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { createContext, useEffect, useState } from 'react';
import { City } from '../types/City';
import { useContext } from 'react';

import AppContext from '../modules/AppContext';

import { SafeAreaView } from 'react-native';

import {useIsFocused} from '@react-navigation/native'



const cityContext=createContext('');

export {cityContext}

//has list of cities and button to add cities
export default function Home(){
    const [rencities, setrencities] = useState<City[]>([])
    const isfocused= useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const asdf=useContext(AppContext)
    //do we do hook. update hook on 





    useEffect(()=>{
        if(isfocused){
          setrencities(asdf.cities)
        }
    },[isfocused])


    function rerender(){
        asdf.cities=[...asdf.cities]// unfortunate mem nuke is needed to rerender properly
        setrencities(asdf.cities as City[]) 
    }


    const elements = rencities.map((i)=>
        <CityElement {...i} key={asdf.getid()} fns={{rerender}} ></CityElement>
    )//again you are not being reactive
    

    return (
     <SafeAreaView>
         <Text>this is home</Text>

          <Button
              title='+'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />

          <Button
              title='log'
              onPress={()=>{
              console.log("log button")
              console.log(asdf.cities)
              console.log(rencities)
              console.log("log end")
              }}//navigates to thing with name
          />


        <ScrollView>
                {elements}
        </ScrollView>
        
     </SafeAreaView>

    )
}
