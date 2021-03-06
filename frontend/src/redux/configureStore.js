import { createStore,applyMiddleware,compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk'
import {setAuthorizationHeader} from '../api/apiCalls';

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
      const initialState = getStateFromStorage();
      setAuthorizationHeader(initialState);


      
      const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const store = createStore(authReducer,initialState,composeEnhancers(applyMiddleware(thunk)));

      const updateStateInStorage = newState => {
            secureLS.set('hoax-auth',newState);
        };
        
        store.subscribe(() => {
            updateStateInStorage(store.getState());
            setAuthorizationHeader(store.getState());
          });
        return store;
  };
  export default configureStore;