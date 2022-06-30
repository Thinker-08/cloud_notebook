import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = [];
      const [notes, setNotes] = useState(notesInitial)


      // fetch all notes
      const getNotes = async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers: {
            'Content-Type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzMzMGVkZjE2NWQ3Zjg4YzRhYzc4In0sImlhdCI6MTY1NjUwMTA4M30.sSOyFisQQF5p_IcdqYC_Wov7Rof-bIttwUfPndUYHyo"
          }
        });
        const dat = await response.json();
        console.log(dat);
        setNotes(dat);
      }


      // Add a note
      const addNote=async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzMzMGVkZjE2NWQ3Zjg4YzRhYzc4In0sImlhdCI6MTY1NjUwMTA4M30.sSOyFisQQF5p_IcdqYC_Wov7Rof-bIttwUfPndUYHyo"
          },
          body: JSON.stringify({title,description,tag})
        });
        var dat = await response.json();
        console.log(dat);
        getNotes();
      }


      // delete a note
      const deleteNote=async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers: {
            'Content-Type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzMzMGVkZjE2NWQ3Zjg4YzRhYzc4In0sImlhdCI6MTY1NjUwMTA4M30.sSOyFisQQF5p_IcdqYC_Wov7Rof-bIttwUfPndUYHyo"
          }
        });
        const res = response.json();
        console.log(res);
        getNotes();
      }


      //edit a note
      const editNote=async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers: {
            'Content-Type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzMzMGVkZjE2NWQ3Zjg4YzRhYzc4In0sImlhdCI6MTY1NjUwMTA4M30.sSOyFisQQF5p_IcdqYC_Wov7Rof-bIttwUfPndUYHyo"
          },
          body: JSON.stringify({title,description,tag})
        });
        const ress = await response.json();
        console.log(ress);
        getNotes();
        }
    return (
        <NoteContext.Provider value={{notes, setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;