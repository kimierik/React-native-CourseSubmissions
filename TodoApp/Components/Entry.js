import { View, Text,Button } from "react-native";


    //make this pretty. idk if the ul li thing in html is somethign we can do since that would be cool
    //
export default function Entry(props){

    function itemdel(){
        console.log(props);
        props.delfn(props.ind)
    }

    return(
        <View>
            <Text> {props.item}</Text>
            <Button title="delete" onPress={()=>{itemdel()}}></Button>
        </View>
    );
}


