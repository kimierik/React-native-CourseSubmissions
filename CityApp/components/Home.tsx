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
     <SafeAreaView style={styles.container}>
         <Text style={styles.title}>List of cities around the world</Text>


        <ScrollView style={styles.scroll }>
                {elements}
        </ScrollView>

        <View style={styles.budden}>

          <Button
              title='add Cities'
              onPress={()=>{navigation.navigate('AddCity')}}//navigates to thing with name
          />
        </View>
        
     </SafeAreaView>

    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll:{
    width:'100%',
  },

    budden:{
        width:'100%',
    },
    title:{
        fontSize:24,
    }



});
