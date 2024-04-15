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
                case "update" : await request.put(`/${id.idx}`,id);
                break;
            }
   
            set( (state:any)=>{
                if(type=='delete'){
                    todo.data = state.data.filter((obj:any) => obj.idx != id)
                } else if(type=='post'){
                    todo.data = [...state.data,id]
                } else if (type == 'update'){
                    let d = state.data.filter((obj:any)=>obj.idx == id.idx)
                    if(id.contents == "false"){
                        d[0].complete='true'
                        todo.data = state.data;
                    } else if(id.contents =='true'){
                        d[0].complete='false'
                        todo.data = state.data;
                    } else{
                        d[0].contents=id.contents
                        todo.data = state.data;
                    }
                }
                return {data : todo.data}
            })

          
            
        }
    }
})