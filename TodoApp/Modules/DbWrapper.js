import AsyncStorage from '@react-native-async-storage/async-storage';




/**
    * functions to interract with the database
    * */
const dbWrapper={

    /**
     * stores given object to local memory
     * will throw if val does not have a id field
     * @param {object} val this is the object you want to upload
     */
    storeData: async function (val){
        console.log(val)
        try{
            const jsonval=JSON.stringify(val)
            await AsyncStorage.setItem(val.id.toString() ,jsonval);
        }catch(e){}
    },



    /**
     * loads the db from mem
     * @param {function} setList this is the setter function for the list that you want to load the data to
     */
    LoadDB:async (setList)=>{
        let kelist =await AsyncStorage.getAllKeys(); 
        let jsonitems = await AsyncStorage.multiGet(kelist)
        let parseditems=[];

        //json items is [[id,val],[id,val]] so we need to take the 1 index to get the object
        jsonitems.map((i)=>{
            parseditems.push(JSON.parse(i[1]))
        });
        
        setList(parseditems)
    },


    /**
     * deletes everything in the db and sets the list state to it
     * @param {list} getList the list you want to upload to the db 
     */
    ResetDb: async function (getList){
        let keys= await AsyncStorage.getAllKeys()
        keys.map( async (key)=>{
            await AsyncStorage.removeItem(key);
        });
        getList.map(async(item)=>{
            this.storeData(item);
        })


    }
}


export {dbWrapper}

