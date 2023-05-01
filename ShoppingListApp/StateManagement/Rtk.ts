import { dbWrapper } from "../modules/DbWrapper";

import { createSlice } from "@reduxjs/toolkit";
import Item from "../types/Item";
import type { PayloadAction } from "@reduxjs/toolkit";


interface appstate{
    shoppingList:Item[];
}

const thing={
    shoppingList:[]
}

const snobbingSlice=createSlice({
    name:'snobbingSlice',
    initialState:thing,
    reducers:{

        /*
        * hydrates state. 
        * items should be contents of db
        * */
        hydrate:(state:appstate,items:PayloadAction<Item[]>)=>{
            state.shoppingList=items.payload
        },

        //adds item
        addItem:(state:appstate,item:PayloadAction<Item> )=>{ 
            state.shoppingList.push(item.payload)
            dbWrapper.storeData(item.payload)
        },
        
        //logs state to console. also updates all subscibers
        logstate:(state:appstate)=>{ 
            console.log("teststate")
            console.log(state.shoppingList)
        },

        //removes item
        removeItem:(state:appstate,id:PayloadAction<string> )=>{
            state.shoppingList.map((item,index)=>{
                if(item.id==id.payload){
                    state.shoppingList.splice(index,1)
                    dbWrapper.DeleteSingle(id.payload)
                }
            })
        },

    }

})



import { configureStore } from "@reduxjs/toolkit";

export default configureStore({reducer:snobbingSlice.reducer})

export const {addItem,hydrate, logstate, removeItem}=snobbingSlice.actions



