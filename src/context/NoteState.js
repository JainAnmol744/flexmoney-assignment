import React from 'react'
import noteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []
      
      const [notes, setNotes] = useState(notesInitial)
    
      //Edit a batch
      const editNote = async (eemail, ebatch)=>{
        // TODO : API CALL
        const response = await fetch(`${host}/api/notes/updatebatch/`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({eemail, ebatch}) 
        });
        const json = await response.json(); 
        let newNotes = JSON.parse(JSON.stringify(notes))
      
        for(let index=0; index<newNotes.length; index++){
          const element = newNotes[index];
          if(element.email === eemail){
           newNotes[index].batch = ebatch;
            break;
          }
        }
        setNotes(newNotes)
      }

    return(
        <noteContext.Provider value= {{notes, setNotes, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
    }
export default NoteState; 