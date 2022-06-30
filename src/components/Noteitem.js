import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const {deleteNote} = useContext(NoteContext);
    const { note, updateNote } = props;
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <img src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" alt="delete" height="25px" width="25px"
                 style={{cursor:"pointer"}} onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted","danger")}}/>
                <img className="mx-3" 
                src="https://cdn-icons.flaticon.com/png/512/2356/premium/2356780.png?token=exp=1656505196~hmac=2fd04d68baf94177a700fa7c0e92283c" 
                alt="delete" height="25px" width="25px" style={{cursor:"pointer"}} onClick={()=>{updateNote(note)}}/>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
