import { postItReducer, PostItState } from "./post-it-reducer"
import React, { useReducer } from "react"
import './App.css'

//create an inital post-it
const initialPostItState: PostItState ={
    title: "",
    body: "",
    newPostIt: {title: "", body: "", id:""},
    deletePostIt: {title: "", body: "", id:""},
    allNotes: []
}

//styling
const titleStyle = {
    backgroundColor: "#F5EFE4",
    borderRadius: 20,
    height: '70px',
    padding: 15,
    textSize: '18px',
    fontSize: "22px",
    color: "#5784C9"
}
const bodyStyle = {
    backgroundColor: "#F5EEE4",
    borderRadius: 20,
    height: '320px',
    padding: 15,
    fontSize: "15px",
    color: "#536888"
}

export function PostIt(){
    const [postItState, dispatch] = useReducer(postItReducer, initialPostItState);

    function handleTitle(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "TITLE", payload: event.target.value})
    }

    function handleText(event:React.ChangeEvent<HTMLTextAreaElement>){
        dispatch({type: "BODY", payload: event.target.value})
    }

    function handleCreate(){
        dispatch({type: "CREATE"})
    }

    function handleDeleteAll(){
        dispatch({type: "CLEAR_ALL"})
    }

    function handleDeleteOne(titleToDelete:string){
        dispatch({type: "CLEAR_ONE", payload: titleToDelete})
    }




    return<>
    <div className="containerNote">
    <div className="note">
        <h1 style={{color:"#F5EFE4"}}>Something on your mind? Post It!</h1>
        <input placeholder="Enter post-it title..." onInput={handleTitle} style={titleStyle}></input>
        <textarea placeholder="Enter post-it content..." onChange={handleText} style={bodyStyle}></textarea>
    </div>

    <div className="create">
        <button onClick={handleCreate} className={"crButton"}> Create Post-It </button>
    </div>
    <div className="clear">
        <button onClick={handleDeleteAll} className={"clButton"}> Clear All Notes </button>
    </div>
    </div>
    <br />

    <div className="containerLog"> 
    <div className="noteLog">
        {postItState.allNotes.map(pi =>
                <table className="table">
                    <thead className="tHead">
                    <tr>
                        <th>{pi.title}</th>        
                    </tr>
                    </thead>
                    <tbody className="tBody">
                    <tr><td colSpan={2}>{pi.body}</td></tr>
                    <tr><td><button className="delButton" onClick={() => {handleDeleteOne(pi.id.toString())}}> Delete Note </button></td></tr>
                    </tbody>
                </table> 
        )}
    </div>
    </div>
    </>
}