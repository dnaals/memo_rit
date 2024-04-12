import axios from "axios";
import {create} from "zustand";
const request = axios.create({
    baseURL : "http://localhost:3000/api",
    timeout : 1000
})
export const useStore = create<any>((set:any)=>{
    return{
        data : [],
        dataFetch : async function(type:any,id:any){
            
            let todo:any={};
            switch(type){
                case "all" : todo = await request.get('/'); 
                break;
                case "delete" : await request.delete(`/${id}`); 
                break;
                case "post" : await request.post('/',id);
                break;
            }
   
            set( (state:any)=>{
                if(type=='delete'){
                    todo.data = state.data.filter((obj:any) => obj.idx != id)
                } else if(type=='post'){
                    
                }
                return {data : todo.data}
            })

          
            
        }
    }
})