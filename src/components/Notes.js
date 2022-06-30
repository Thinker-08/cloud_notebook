import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import {useHistory} from 'react-router-dom'
const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const ref = useRef("N");
  const refC = useRef("N");
  const history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')!=null){
      getNotes();
    }else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote)
  };
  const [note,setNote]=useState({id:"",title:"",description:"",tag:"Default"})
  const handleClick=(e)=>{
    e.preventDefault();
    refC.current.click();
    editNote(note._id,note.title,note.description,note.tag);
    props.showAlert("Note Successfully edited","success");
}
const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <div className="row my-3">
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
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
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refC}>Close</button>
        <button disabled={note.title.length<5 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <h2>You Notes</h2>
      <div className="container mx-1">
      {notes.length===0 &&"No Notes to display"}
      </div>
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
      })}
    </div>
  );
};

export default Notes;
