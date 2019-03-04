
const INITIAL_STATE = {     //the object that is referenced the first time the below function runs, so as to not return a value of 'undefined'
  isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case 'SIGN_IN':
      return { ...state, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false };
    default:
      return state;

  }
};