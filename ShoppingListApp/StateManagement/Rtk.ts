



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
        addItem:(state:appstate,item:PayloadAction<Item> )=>{ 
            state.snobbing_list.push(item.payload)
        },
        logstate:(state:appstate)=>{ 
            console.log("teststate")
            console.log(state.snobbing_list)
        },
        removeItem:(state:appstate,id:PayloadAction<string> )=>{
            state.snobbing_list.map((item,index)=>{
                if(item.id==id.payload){
                    state.snobbing_list.splice(index,1)
                }
            })
        },

    }

})



import { configureStore } from "@reduxjs/toolkit";

export default configureStore({reducer:snobbingSlice.reducer})

export const {addItem, logstate, removeItem}=snobbingSlice.actions



