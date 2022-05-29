import React,{useState,useEffect} from 'react'
import axios, { AxiosResponse, AxiosInstance } from 'axios'
// import axios from "axios"
const Todo = () => {
    const [newtodo,setnewtodo]=useState("")
    const [todos,settodos]=useState([])
    const [page,setpage]=useState(1)
    const [total,settotal]=useState(0)
useEffect(() => {
  let get =async()=>{
    let res=await axios.get(`http://localhost:3006/todos?_page=${page}&_limit=5`)
    settodos(res.data)
    settotal(res.headers["x-total-count"])
  }
   get ()
   
//   return () => {
    
//   }
}, [page])

console.log(todos.length)
  return (
    
    <div>
       <input value={newtodo} type="text" onChange={(e)=>setnewtodo(e.target.value)}/>
       <button 
        onClick={()=>{
          if(newtodo.length>0){
          axios.post('http://localhost:3006/todos', {
            value:newtodo,
            completed:false
          })
          .then(function (response) {
            console.log(response);
            settodos([...todos,response.data])
            setnewtodo("")
          })
          .catch(function (error) {
            console.log(error);
          });
        }
          // fetch("http://localhost:3004/todos",{
      //      method:"Post",
      //      headers:{"content-type":"application/json"},
      //      body:JSON.stringify({value:newtodo,completed:false}) 
           
      //  }
       
      //      ).then((re)=>re.json())
      //      .then((r)=>{console.log(r)
            
      //       settodos([...todos,r])
      //       setnewtodo("")
      //   })
       }}
       >Save</button>
       {todos.map((el)=>(
    <div key={el.id}>{el.value}</div>
        
       
    ))}
    <button disabled={page<=1} onClick={()=>{
      
setpage(page-1)
    }}>prev</button><button disabled={page*5>total} onClick={()=>{
      setpage(page+1)
    }}>next</button>
    </div>
  )
}

export default Todo