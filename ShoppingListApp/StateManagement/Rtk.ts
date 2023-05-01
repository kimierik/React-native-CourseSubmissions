import { dbWrapper } from "../modules/DbWrapper";

import { createSlice } from "@reduxjs/toolkit";
import Item from "../types/Item";
import type { PayloadAction } from "@reduxjs/toolkit";


interface appstate{
    snobbing_list:Item[];
}

const thing={
    snobbing_list:[]
}

const snobbingSlice=createSlice({
    name:'snobbingSlice',
    initialState:thing,
    reducers:{

        /*
        * hydrates state. 
        * @param {Item[]} items should be data brom the db
        * */
        hydrate:(state:appstate,items:PayloadAction<Item[]>)=>{
            state.snobbing_list=items.payload
        },

        addItem:(state:appstate,item:PayloadAction<Item> )=>{ 
            state.snobbing_list.push(item.payload)
            dbWrapper.storeData(item.payload)
        },
        logstate:(state:appstate)=>{ 
            console.log("teststate")
            console.log(state.snobbing_list)
        },
        removeItem:(state:appstate,id:PayloadAction<string> )=>{
            state.snobbing_list.map((item,index)=>{
                if(item.id==id.payload){
                    state.snobbing_list.splice(index,1)
                    dbWrapper.DeleteSingle(id.payload)
                }
            })
        },

    }

})



import { configureStore } from "@reduxjs/toolkit";

export default configureStore({reducer:snobbingSlice.reducer})

export const {addItem,hydrate, logstate, removeItem}=snobbingSlice.actions



