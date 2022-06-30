import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import Notes from './Notes'
export const Home = (props) => {
    const [note,setNote]=useState({title:"",description:"",tag:"Default"})
    const context=useContext(NoteContext);
    const {addNote}=context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Note Added Successfully","success")
        setNote({title:"",description:"",tag:""});
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5 || note.description.length<5}>Add Note</button>
            </form>
            </div>

            <Notes showAlert={props.showAlert}/>
        </div>
    )
}
