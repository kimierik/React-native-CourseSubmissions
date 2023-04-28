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


import { dbWrapper } from '../modules/DbWrapper';

const cityContext=createContext('');

export {cityContext}

//has list of cities and button to add cities
export default function Home(){
    const [rencities, setrencities] = useState<City[]>([])
    const isfocused= useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const context=useContext(AppContext)
    //do we do hook. update hook on 



    async function setdata(){
        const data=await dbWrapper.LoadDB();
        context.updateCities()
        setrencities(data)
    }

    


    useEffect(()=>{
        if(isfocused){
            setdata()
        }
    },[isfocused])


    function rerender(){
        context.cities=[...context.cities]// unfortunate mem nuke is needed to rerender properly
        setrencities(context.cities as City[]) 
    }

  async function logdb(){console.log( await dbWrapper.LoadDB())}

    const elements = rencities.map((i)=>
        <CityElement {...i} key={context.getid()} fns={{rerender}} ></CityElement>
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
              console.log(context.cities)
              console.log(rencities)
              logdb()
              console.log("log end")
              }}//navigates to thing with name
          />


        <ScrollView>
                {elements}
        </ScrollView>
        
     </SafeAreaView>

    )
}
