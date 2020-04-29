import {CONSTANTS} from "../Actions";

let initialState = {
    CountDownlists:  
     {
       
        resources:[
            // {title: "משימה 1", key:"0"},
            // {title: "משימה 2", key:"1"},
            // {title: "משימה 3", key:"2"},
            // {title: "משימה 4", key:"3"},
            // {title: "משימה 5", key:"4"},
            // {title: "משימה 6", key:"5"},
        ],
        events:[
            // {id:1,title:"sharon",startHour:3,endHour:4, columID:0, comments:"Dana"},
            // {id:2,title:"dana",startHour:5,endHour:7, columID:3, comments:"Shoky"},
            // {id:3,title:"lior",startHour:1,endHour:2, columID:4, comments: "Tooffee"}
        ]
     }
}
try {
    const serializedState = localStorage.getItem("chosen_state"); //''something 
    
    if (serializedState === null) {
        //  do nothing
    }
    else{
        let chosen_state = JSON.parse(JSON.parse(serializedState ))
        console.log(chosen_state.MessageWindow)
        console.log(chosen_state)
        initialState={...chosen_state}
    }
    
} 
catch (err) 
{
    console.log(err)
}
const CountDownWindowReducers = (state = initialState, action) =>{
    switch(action.type){
        case CONSTANTS.DELETE_EVENT_COUNTDOWN:
        {
            const deleteID = action.payload.id;
               const newEventsList = state.CountDownlists.events.filter( event=>
                {
                  if(event.id != deleteID.id)      
                    return event
                }
               )
            const CountDownlistsNew = {
                resources:[...state.CountDownlists.resources],
                events:newEventsList
            } 
            console.log(CountDownlistsNew);
            return {CountDownlists: CountDownlistsNew };
        };

        case CONSTANTS.DELETE_ENTITY_COUNTDOWN:
        {
            const deleteID = action.payload.id;
            let newResourcesList = [];
            let newEventsList = [];
            for(let i=0;i<state.CountDownlists.resources.length;i++)
                {
                    if(state.CountDownlists.resources[i].key != deleteID)
                    {
                        if(state.CountDownlists.resources[i].key>deleteID)
                        {
                            let temp = parseInt(state.CountDownlists.resources[i].key)-1;
                            state.CountDownlists.resources[i].key="" + temp;
                        }
                        newResourcesList.push(state.CountDownlists.resources[i]);
                    }
                }
                for(let i=0;i<state.CountDownlists.events.length;i++)
                {
                    if(state.CountDownlists.events[i].columID != deleteID)
                    {
                        if(state.CountDownlists.events[i].columID >deleteID)
                        {
                            state.CountDownlists.events[i].columID = state.CountDownlists.events[i].columID-1;
                        }
                        newEventsList.push(state.CountDownlists.events[i]);
                    }
                }
          
          
             const CountDownlistsNew = {
                resources:newResourcesList,
                events:newEventsList
             } 
             console.log(state);
             return {...state,CountDownlists: CountDownlistsNew };    
        };
        case CONSTANTS.ADD_ENTITY_COUNTDOWN:{
            const CountDownlistsNew = {
                resources:[
                    ...state.CountDownlists.resources,
                    {
                        title: action.payload.title,
                        key: state.CountDownlists.resources.length
                    }
                ],
                events:[...state.CountDownlists.events],       
            } 
            return {...state,CountDownlists: CountDownlistsNew };
        }
        case CONSTANTS.ADD_EVENT_COUNTDOWN:
        {    
        
        const CountDownlistsNew = {
            resources:[...state.CountDownlists.resources],
            events:[
                ...state.CountDownlists.events,
                {
                    id:state.CountDownlists.events.length+1,
                    title:action.payload.title,
                    startHour:action.payload.startHour,
                    endHour:action.payload.endHour, 
                    columID:action.payload.entity,
                    comments:action.payload.comments
                }
            ]
    
            } 
            return {...state,CountDownlists: CountDownlistsNew };
        }
        default:return state;
    }
}

export default CountDownWindowReducers;
