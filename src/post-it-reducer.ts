
// 1. created a state - this is  what the user is changing on their end
export type PostIt = {
    title: string,
    body: string
}

export type PostItState = {
    title: string,
    body: string,
    newPostIt: PostIt,
    deletePostIt: PostIt,
    allNotes: PostIt[]
}

// 2. create actions that interact with the state
export type SetTitleAction= {type:"TITLE", payload: string};
export type SetBodyAction= {type:"BODY", payload: string};
export type CreateAction= {type:"CREATE"};
export type ClearAllAction= {type:"CLEAR_ALL"};
export type ClearSelectedAction= {type:"CLEAR_ONE", payload: string};
export type PostItAction = SetTitleAction | SetBodyAction | CreateAction | ClearAllAction | ClearSelectedAction

// 3. write the reducer
export function postItReducer(state: PostItState, action: PostItAction): PostItState{
    //make a copy of the state - deep copy since we have an array of past post its
    let newState: PostItState = JSON.parse(JSON.stringify(state));

    // switch case to determine the action to execute
    switch(action.type){
        case "TITLE": {
            // if(newState.allNotes.map(n => n.title === action.payload)){
            //     return newState;
            // }
            newState.title = action.payload;
            return newState;
        }
        case "BODY": {
            newState.body = action.payload;
            return newState;
        }
        case "CREATE": {
            const postIt: PostIt = {
                title: newState.title,
                body: newState.body
            }

            if(postIt.body.length < 3){
                alert("Note-Body must contain 3 characters or more.")
                return newState;
            }

            newState.allNotes.push(postIt);
            return newState;
        }
        case "CLEAR_ALL": {
            newState.allNotes = [];
            return newState
        }
        case "CLEAR_ONE": {
            newState.allNotes = newState.allNotes.filter(n => n.title !== action.payload)
            return newState;
        }
    } 
}

