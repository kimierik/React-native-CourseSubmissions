import {  Text, View, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { useEffect, useState } from 'react';
import { City } from '../types/City';
import { useContext } from 'react';

import AppContext from '../modules/AppContext';

import { SafeAreaView } from 'react-native';

import {useIsFocused} from '@react-navigation/native'




//has list of cities and button to add cities
export default function Home(){
    const [rencities, setrencities] = useState<City[]>([])
    const isfocused= useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const asdf=useContext(AppContext)

    //do we do hook. update hook on 



/*
    useFocusEffect(()=>{
        console.log("focus event")
        setrencities(asdf.cities);
    })
 * */

/*

 * */


    useEffect(()=>{
        if(isfocused){
          setrencities(asdf.cities)
        }
    },[isfocused])




    //whenever we add or come back to this page we need to re render the elements
    //since they are probably updated
    //i want to render shit when something changes on another screen
    //use focus runs but does not seem to be able to set state
    //idk man fix this later
    //idk if context provider is the thing we need to be doing
    //something rerenders when somehting happens so we could be able to use that one
    //
    //idk if im looking at old shit
    //seems to work ok
    //except does not have any re renders



    const elements = rencities.map((i)=>
        <CityElement {...i} key={asdf.getid()}></CityElement>
    )
    

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
              console.log("asdf.ciries")
              console.log(asdf.cities)
              console.log("ren")
              console.log(rencities)
              setrencities(asdf.cities)
              }}//navigates to thing with name
          />


        <ScrollView>
            {elements}
        </ScrollView>
        
     </SafeAreaView>

    )
}
