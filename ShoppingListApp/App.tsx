import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';


import InputForm from './Components/InputForm';
import Header from './Components/Header';
import ShoppingItem from './Components/ShoppingItem';
import Rtk from './StateManagement/Rtk';

import {Provider } from 'react-redux';

import { addItem} from './StateManagement/Rtk';
import Item from './types/Item'

import { useState } from 'react';

//wtf




export default function App() {
    const [items,setItems]=useState<Item[]>([])


    //this function only exists to cast shoppinglist to Item[] so that typescript is happy
    function getItems(){
        setItems(Rtk.getState().snobbing_list)
    }
    Rtk.subscribe(()=>{getItems()})
    

    return (
        <View style={styles.container}>

        <Provider store={Rtk}>
            <Header></Header>
            <InputForm></InputForm>

            <FlatList
                style={styles.list}
                data={items}
                renderItem={({item} )=>(
                    <ShoppingItem {...item}></ShoppingItem>
                )}
            ></FlatList>
        </Provider>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
        list:{
            width:'50%',
      },
});
