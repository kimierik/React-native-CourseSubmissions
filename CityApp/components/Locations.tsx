import {  Text, View, Button, ScrollView } from 'react-native';
import RootStackParams from '../types/navigation';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {City, Location} from '../types/City';
import { useContext, useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'

import AppContext from '../modules/AppContext';

type Props=NativeStackScreenProps<RootStackParams,"Locations","what">

export default function Locations({route,navigation}:Props){
    //const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const context = useContext(AppContext)
    const isfocused=useIsFocused();
    const [loclst,setlocations]=useState<Location[]>([]);

    
    
    function getcity():City{//hesus cristus
        
        if(route.params?.city== undefined){
            //city should never be undefined but if it iss this will stop the app from self destructing
            let a:City={id:"errorid",name:"error city",country:"error country",locations:undefined}; 
            return a;
        }else return route.params.city;
    }

    useEffect(()=>{
        if(isfocused){
        //console.log("location focus")
          if(context.findCity(route.params.city.id).locations!=undefined){
              setlocations(context.findCity(route.params.city.id).locations)
          }
        }
    },[isfocused])

    
    function rerender(){
        let cit=context.findCity(route.params.city.id).locations
        cit=[...cit]// unfortunate mem nuke is needed to rerender properly
        setlocations(cit)
    }


    const elements=loclst.map((i)=>
        <View key={i.id} style={styles.container}>
            <View style={styles.innerConteinaer}>

                <View style={styles.txt}> 
                    <Text style={styles.name}>{i.name}</Text>
                    <Text>{i.content}</Text>
                </View>
                <View style={styles.buttons}>

                    <Button
                        title='edit'
                        onPress={()=>{
                            //context.removeLocation(getcity().id, i.id);
                            //maybe not delete
                            //if not null delete when add cityew
                            rerender();
                            navigation.navigate('AddLocation',{city:getcity(),replocation:i})
                            }}
                    />
                    <Button
                        title='delete'
                        color={'red'}
                        onPress={()=>{context.removeLocation(getcity().id, i.id);rerender()}}
                    />
                </View>

            </View>
        </View>
    )



    return (
     <View style={styles.container}>
        <Text style={styles.title}>these are the locations of {getcity().name}</Text>


        <ScrollView>
            {elements}
        </ScrollView>

        <View style={styles.budden}>
          <Button
              title='add locations'
              onPress={()=>{navigation.navigate('AddLocation',{city:getcity(),replocation:undefined})}}//navigates to thing with name
          />
        </View>


     </View>
     )
}





const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

        borderColor:'#000',
        borderWidth:1,
    },
    innerConteinaer:{
        width:'100%',
        flexDirection:'row',
        
    },

    txt:{
        width:'70%',
        paddingLeft:20,
    },

    name:{
        fontSize:24,
    },

    del:{
        color:'red'
    },

    buttons:{
        width:'30%',
    },

    budden:{
        width:'100%',
    },

    title:{
        fontSize:24,
    },

})

