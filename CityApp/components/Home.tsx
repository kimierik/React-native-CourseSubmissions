import {  Text, View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation} from '@react-navigation/native';
import RootStackParams from '../types/navigation';
import { ScrollView } from 'react-native';
import CityElement from './CityElement';
import { createContext, useEffect, useState } from 'react';
import { City } from '../types/City';
import { useContext } from 'react';

import AppContext from '../modules/AppContext';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native';

import {useIsFocused} from '@react-navigation/native'
import { dbWrapper } from '../modules/DbWrapper';
import { ListStyles } from '../styles/Lists';







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


    const elements = rencities.map((i)=>
        <CityElement {...i} key={context.getid()} fns={{rerender}} ></CityElement>
    )//again you are not being reactive
    

        //hoarded debug code
    /*
     *
          async function logdb(){console.log( await dbWrapper.LoadDB())}
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
      */





    return (
     <SafeAreaView style={ListStyles.container}>
         <Text style={ListStyles.title}>List of cities around the world</Text>


        <ScrollView style={ListStyles.scroll }>
                {elements}
        </ScrollView>

        <View style={ListStyles.budden}>

          <Button
              title='add Cities'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />
        </View>
        
     </SafeAreaView>

    )
}


