import { View, Text,Button, StyleSheet } from "react-native";
import { useState } from "react";


/**
 * An Entry to the list.
 * contains task text and buttons for done and delete 
 *
 */
export default function Entry(props){
    const NotDoneColor="#ff0000"
    const DoneColor="#00ff00"
    const [Color,SetColor]=useState(getCol());

    

    //deletes the item from the list. this fn does not need to be passed
    function itemdel(){
        props.delfn(props.item.id)
    }

    /**
     * gets the color the button is supposed to be
    * @return {string} a hex value color
    * */
    function getCol(){
        return !props.item.done ? NotDoneColor:DoneColor
    }

    function UpdateColor(){
        SetColor(getCol());
    }

    return(
        <View style={styles.EntryStyle}>
            <Text> {props.item.content}</Text>
            <Button title="delete" onPress={()=>{itemdel()}}></Button>
            <Button title="Done" onPress={()=>{props.item.done= !props.item.done;UpdateColor()}} color={Color} ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    EntryStyle:{
        padding:10,
    }
});

