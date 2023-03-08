
import { StyleSheet, Text, View ,Button , TextInput} from 'react-native';

import { StatusBar } from 'expo-status-bar';


/**
*app header
* */
export default function Header(props){

    const{submit,filtertext,getText,setText, incrementFilter}=props.fns




    return(
        <View style={styles.HeaderContainer}>
           <Text style={styles.htext}>TODO app</Text>

            <View style={styles.Textview}>
                <TextInput placeholder='todo input' maxLength={20} value={getText} onChangeText={setText} style={styles.Textfield} ></TextInput>
            </View>

            <Button title='Add to task list' onPress={()=>{submit()}}> </Button>
            <Button title={filtertext} onPress={()=>{incrementFilter()}}> </Button>
            <StatusBar style="auto" />
        </View>
    );
}


const styles=StyleSheet.create({

    HeaderContainer:{
        alignItems:'center',
    },

    Textview:{
        borderWidth:2,
        width:200,
        borderColor:"#ff0000",
    },
    Textfield:{
        padding:5,
        alignContent:"center",
        textAlign:"center",
    },
    htext:{
        fontSize:50,

    }
});

