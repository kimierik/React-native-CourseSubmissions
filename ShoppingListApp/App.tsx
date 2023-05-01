import { StyleSheet,  View, FlatList } from 'react-native';

import InputForm from './Components/InputForm';
import Header from './Components/Header';
import ShoppingItem from './Components/ShoppingItem';
import Rtk from './StateManagement/Rtk';

import Item from './types/Item'

import { useState } from 'react';
import { useEffect } from 'react';
import { dbWrapper } from './modules/DbWrapper';

import { hydrate } from './StateManagement/Rtk';



export default function App() {
    const [items,setItems]=useState<Item[]>([])//displayed items

    //when something changes in the store we set the rendered items to be what is in the shopping list
    Rtk.subscribe(()=>{ setItems(Rtk.getState().shoppingList) }) 

    //loads what is in the db and hydrates the list in state manager
    async function setData(){
        const data=await dbWrapper.LoadDB()
        setItems(data)
        Rtk.dispatch(hydrate(data))
    }

    //on load of page
    useEffect(()=>{
        setData()
    },[])
    

    return (
        <View style={styles.container}>
            <Header/>
            <InputForm/>
            <FlatList
                style={styles.list}
                data={items}
                renderItem={({item} )=>(
                    <ShoppingItem {...item}></ShoppingItem>
                )}
            />
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
            width:'60%',
      },
});
