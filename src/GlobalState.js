import React, { useReducer } from "react";

const GlobalStateContext = React.createContext();

const initialState = {
  homePageData: [],
  playListData:{}
};

function reducer(state, action) {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        isLoggedAsAdmin: true
      };
    case "SET_DEVICES":
      return {
        ...state,
        devices: [...action.payload]
      };
    case "RESET":
      return initialState;
    case "SET_HOMEDATA":
        return {
            ...state,
            homePageData: action.payload
        }
    case "SET_PLAYLISTDATA":
      const newPlayListData = state.playListData
      newPlayListData[action.payload.id]=action.payload.data
      return {
        ...state,
        playListData:newPlayListData 
      }
    default:
      return state;
  }
}

function GlobalStateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={[ state, dispatch ]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateProvider, GlobalStateContext };
