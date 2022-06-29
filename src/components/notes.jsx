import e from 'express';
import React,{useContext} from 'react'
import NoteContext from '../context/Notes/NoteContext';
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(NoteContext);
    const {notes,setNotes} = context;
  return (
    <div className='my-3'>
    <h3>Your Notes</h3>
    { notes.map((element)=>{return(
        <Noteitem note={element}/>
      )})}
      </div>
  )
}

export default Notes;