import logo from './logo.svg';
import './App.css';
import Todo from './Component/Todo';
import React ,{useEffect, useState} from 'react';
import List from './Component/List';
import { db } from './Firebase'
import {getDocs,collection,addDoc,deleteDoc,doc, updateDoc} from 'firebase/firestore'
// import{app,db,collection, addDoc, query, where, onSnapshot,doc, deleteDoc, updateDoc} from '../src/Firebase'
function App() {

const [newMovieTitle , setNewMovieTitle] = useState("")
const [newMovieDesc , setNewMovieDesc] = useState("")
const [newReleaseDate , setNewReleaseDate] = useState(0)


const [updateTitle,setUpdateTitle] = useState("")
 const onSubmitMovie = async()=>{
  try {
    const docRef = await addDoc(collection(db, "Movies"), {
     title : newMovieTitle,
     Desc : newMovieDesc,
     Date : newReleaseDate
    });
    getMovieList();
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
 }


const [movieList,setMovieList] = useState([]);

const moviesCollectionRef = collection(db , "Movies");

const getMovieList = async () =>{
try{
  const data = await getDocs(moviesCollectionRef);
  const filteredData = data.docs.map((doc)=>({
    ...doc.data(),
    id :doc.id
  }));
  setMovieList(filteredData);
}catch(err){
  console.error(err)
}
};
useEffect(()=>{
getMovieList();

},[])

const deleteTodo = async(id)=>{
  const movieDoc =  doc(db, "Movies", id)
  // console.log(id);
  await deleteDoc(movieDoc);
  window.location.reload()
}
const editTodo = async(id)=>{
  const movieDoc =  doc(db, "Movies", id)
  // console.log(id);
  await updateDoc(movieDoc,{title : updateTitle});
  window.location.reload()
}


  // const [formValues , setFormValues] = useState([])

  // const handleAdd = (v) =>{
  //   console.log("VALUE" ,v);
  //   setFormValues([...formValues,v])
  // }
return(
  <div className='App'>
    <h1 style={{color : "red"}}>Enter Details</h1>
 <input style={{width : 400 , padding : 10}} type="text" name="" id=""
  placeholder='Movie Title'
  onChange={(e)=>setNewMovieTitle(e.target.value)} 
 /><br />
 <textarea rows={10} style={{width : 403 , padding : 10,marginTop : 10}} type="text" name="" id="" 
    placeholder='Movie Description' 
    onChange={(e)=>setNewMovieDesc(e.target.value)}
    /><br />
    <div style={{display : "flex",justifyContent : "center" , gap : 154}}>

 <input style={{width : 50}} type="number" name="" id=""
  placeholder='Date'
  onChange={(e)=>setNewReleaseDate(Number(e.target.value))}
  /><br />
 <button onClick={onSubmitMovie}>Submit</button>
  </div>
  
  {/* <Todo updateValue ={handleAdd}/>
  <List formValues={formValues}/> */}
  <br />
  <div>
  <h1 style={{color : "red"}}>Result</h1>
    {movieList.map((movie)=>(
      <center>
        <br /><br /><br />
        
      <div style={{border : "1px solid black" , padding : 10 , width : 400 , justifyContent : "center",borderRadius : 10}}>
        <h1 style={{color : "red"}}>{movie.title}</h1>
        <p>{movie.Desc}</p>
        <p>Date : {movie.Date}</p>
        <button onClick={()=> deleteTodo(movie.id)}>Delete</button>
        <input type="text" 
        placeholder='Edit Title..'
        onChange={(e)=>setUpdateTitle(e.target.value)}
        />
        <button onClick={()=> editTodo(movie.id)}>Edit</button>
      </div>
      </center>
    ))}
  </div>
  </div>
)

}

export default App;
