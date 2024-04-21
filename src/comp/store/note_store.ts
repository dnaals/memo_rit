import axios from "axios";
import {create} from "zustand";
const request = axios.create({
    baseURL : "https://nextjs-todo-project-eta.vercel.app/api2"
})
export const useStore = create<any>((set:any)=>{
    return{
        data2 : [],
        dataFetch2 : async function(type:any,id:any){
            
            let note:any={};
            switch(type){
                case "all" : note = await request.get('/'); 
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
                    note.data = state.data2.filter((obj:any) => obj.id != id)
                } else if(type=='post'){
                    
                    note.data = [...state.data2,id]
                } else if (type == 'update'){
                    let d = state.data2.filter((obj:any)=>obj.id == id.id)
                    d[0].title = id.title;
                    d[0].contents = id.contents;
                    d[0].color=id.color;
                    d[0].bookmark=id.bookmark;
                    d[0].url=id.url;
                    note.data = state.data2;
                }
                return {data2 : note.data}
            })

        
            
        }
    }
})