
import { StyleSheet } from 'react-native';



/*
 * styles sheet for CityElement and LocationElement components
 * */
export const ElementStyles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',

        borderColor:'#000',
        borderWidth:1,
        marginBottom:5,
        marginTop:5,
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

    buttons:{
        width:'30%',
    }
});


