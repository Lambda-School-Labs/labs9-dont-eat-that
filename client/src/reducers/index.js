
// BELOW CODE IS SAMPLE
//IT WILL BE CHANGED AS NEEDED

const initialState = {
    fetching: false,
    smurfs: [],
    error: null
  };
  
  export const RecipesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCHING_REQUEST":
        return { ...state, fetching: true };
  
      case "FETCHING_SUCCESS":
        console.log("fetching success", action.payload);
        return { ...state, fetching: false, smurfs: [...action.payload] };
  
      case "FETCHING_FAILURE":
        return { ...state, fetching: false, error: action.payload };
  

      default:
        return state;
    }
  };
  