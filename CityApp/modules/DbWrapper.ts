import AsyncStorage from '@react-native-async-storage/async-storage';
import {City} from '../types/City';





/**
    * functions to interract with the database
    * */
const dbWrapper={

    /**
     * stores given object to local memory
     * will throw if val does not have a id field
     * @param {City} val this is the object you want to upload
     */
    storeData: async function (val:City){
        try{
            const jsonval=JSON.stringify(val)
            await AsyncStorage.setItem(val.id.toString() ,jsonval);
        }catch(e){}
    },



    /**
     * loads the db from mem
     * loads it directy to context
     */
    LoadDB:async ()=>{
        let kelist =await AsyncStorage.getAllKeys(); 
        let jsonitems = await AsyncStorage.multiGet(kelist)
        let parseditems:City[]=[];
        //maybe dont do it directly to cities but return instead

        //json items is [[id,val],[id,val]] so we need to take the 1 index to get the object
        jsonitems.map((i)=>{
            if(i[1]!=null){
                parseditems.push(JSON.parse(i[1]))
            }
        });

        return parseditems;
    },


    GetSingle:async(id:string)=>{
        const city=await AsyncStorage.getItem(id)
        if(city!=null){
            //console.log(JSON.parse(city))
            return JSON.parse(city)
        }
        return undefined
    },


    /**
    * deletes a single item
    * @param {string} id id of the item that you want to delete
    * */
    DeleteSingle:function(id:string){
        AsyncStorage.removeItem(id);
    },


    /**
     * deletes everything in the db and sets the list state to it
     * @param {list} cities the list you want to upload to the db 
     */
    ResetDb: async function (cities:City[]){
        let keys= await AsyncStorage.getAllKeys()
        keys.map( async (key)=>{
            await AsyncStorage.removeItem(key);
        });
        cities.map(async(item)=>{
            this.storeData(item);
        })

    }
}


export {dbWrapper}

