import axios from "axios";
import {create} from "zustand";
const request = axios.create({
    baseURL : "https://nextjs-todo-project-eta.vercel.app/api"
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
                case "update" : await request.put(`/${id.id}`,id);
                break;
            }

            set( (state:any)=>{
                if(type=='delete'){
                    todo.data = state.data.filter((obj:any) => obj.idx != id)
                } else if(type=='post'){
                    todo.data = [...state.data,id]
                } else if (type == 'update'){
                    let d = state.data.filter((obj:any)=>obj.idx == id.id)
                    
                    if(id.complete){
                        d[0].complete = id.complete;
                        todo.data = state.data;
                    } else{
                        
                        d[0].contents = id.contents;
                        todo.data = state.data;
                    }

                }
                return {data : todo.data}
            })

        
            
        }
    }
})