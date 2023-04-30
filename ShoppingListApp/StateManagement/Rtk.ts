



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
    name:'shoppingList',
    initialState:thing,
    reducers:{
        addItem:(state:appstate,item:PayloadAction<Item> )=>{ 
            state.snobbing_list.push(item.payload)
        },

    }

})






export default snobbingSlice
