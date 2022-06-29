import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "62b991fdeba77622e3b49f6f",
          "user": "62b98c03228d131d8116ccee",
          "title": "Arnold",
          "description": "My name is Arnold Subhashnagar",
          "tag": "General",
          "date": "2022-06-27T11:18:21.328Z",
          "__v": 0
        },
        {
          "_id": "62bae63277722ed4788a8cbd",
          "user": "62b98c03228d131d8116ccee",
          "title": "Mihir",
          "description": "Mihir is a good boy",
          "tag": "Personal Preference",
          "date": "2022-06-28T11:29:54.733Z",
          "__v": 0
        }
      ]
    const [notes, setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes,setnotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;