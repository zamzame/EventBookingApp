import { createSlice } from '@reduxjs/toolkit';

// { from db.json:
//       "id": "1",
//       "title": "React Conference 2026",
//       "description": "Annual React developers conference with the latest talks on React 19, server components, and the React Compiler.",
//       "category": "Technology",
//       "date": "2026-07-15",
//       "time": "09:00 AM",
//       "location": "San Francisco, CA",
//       "venue": "Convention Center",
//       "image": "https://picsum.photos/seed/react/400/200",
//       "organizerName": "Tech Events Inc",
//       "ticketTypes": [
//         {
//           "id": "t1",
//           "name": "General",
//           "price": 99,
//           "available": 100
//         },
//         {
//           "id": "t2",
//           "name": "VIP",
//           "price": 299,
//           "available": 16
//         }
//       ]
//     },

const nullEvent = {
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  venue: "",
  image: "",
  organizerName: "",
  ticketTypes: [
    {
      id: "t1",
      name: "General",
      price: 0,
      available: 0,
    },
  ],
};

const initialize = {
    step: 1,
    event: nullEvent,
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: initialize ,

  reducers: {
        updateEventField(state, action) {
            const { name, value } = action.payload;
            state.event[name] = value;
        },

        updateTicketField(state, action) {
            const { index, name, value } = action.payload;
            state.event.ticketTypes[index][name] = value;
        },    


        addTicketType( state) {
            state.event.ticketTypes.push({
                id: `t${state.event.ticketTypes.length + 1}`,
                name: "",
                price: 0,
                available: 0,
            });
        },

        removeTicketType(state, action){
            if (state.event.ticketTypes.length > 1){
                state.event.ticketTypes.splice(action.payload, 1);
            }
        },

        moveNextStep(state){
            if (state.step <= 3){
                state.step += 1;
            }
        },

        movePreviousStep(state) {
        if (state.step >= 1) {
            state.step -= 1;
        }
        },

        resetCreateEvent(){
            return initialize;
        },
    },

});

export const {
  updateEventField,
  updateTicketField,
  addTicketType,
  removeTicketType,
  moveNextStep,
  movePreviousStep,
  resetCreateEvent,
} = createEventSlice.actions;

export default createEventSlice.reducer;