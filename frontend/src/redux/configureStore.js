import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';


    const secureLS = new SecureLS();


    const getStateFromStorage  = () => {
       
  const hoaxAuth = secureLS.get('hoax-auth')
   
  let stateInLocalStorage ={
    isLoggedIn : true ,
    username : 'user1',
    displayName : 'display1',
    image : null,
    password : 'P4ssword'
  };

  if(hoaxAuth){
    return hoaxAuth    
  }

  return stateInLocalStorage;
    }



    const configureStore = () => {
      const store = createStore(authReducer,getStateFromStorage(),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

      const updateStateInStorage = newState => {
            secureLS.set('hoax-auth',newState);
        };

        store.subscribe(() => {
            updateStateInStorage(store.getState());
        });
        return store;
  };
  export default configureStore;