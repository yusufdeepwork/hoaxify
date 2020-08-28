import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useState } from 'react';
import {useTranslation} from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import {useApiProgress} from '../shared/ApiProgress'

const ProfileCard = props => {
  const {username:loggedInUsername } = useSelector(store => ({username:store.username}));
  const routeParams = useParams()
  const pathUsername = routeParams.username;
  const [inEditMode, setInEditMode] = useState(false);

  const [user, setUser] = useState({});

  useEffect(()=>{
    setUser(props.user)
  },[props.user]);

  const {username,displayName,image}=user;
  
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const {t} = useTranslation();


  useEffect(()=> {
    if(!inEditMode){
      setUpdatedDisplayName(undefined);
    }else{
      setUpdatedDisplayName(displayName)
    }
  },[inEditMode,displayName]);

  const onClickSave = async () => {
    const body = {
      displayName:updatedDisplayName
    };
    try {
      const response = await updateUser(username,body);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {}
  };

  const pendingApiCall = useApiProgress('put','/api/1.0/users/'+username);

  let message = 'We cannot edit';
  
  if (pathUsername === loggedInUsername) {
      message = 'We can edit';
    }

    return(
    <div className="card text-center">
      <div className="card-header">
      <ProfileImageWithDefault className="rounded-circle" width="200" height="200" alt={`${username} profile`} image={image} />
      </div>
      <div className="card-body">
        {!inEditMode &&
        (
          <>
          <h3>
          {displayName}@{username}
          </h3>
          <button className="btn btn-success d-inline-flex" onClick={()=> setInEditMode(true)}>
          <i className="material-icons">edit</i>
          {t('Edit')}
          </button>
          </>
        )}
        {inEditMode && (
          <div>
            <Input 
            label={t('Change Display Name')} 
            defaultValue ={displayName}
            onChange={event => {setUpdatedDisplayName(event.target.value)}}
            />
            <div>
              <ButtonWithProgress 
              className="btn btn-primary d-inline-flex" 
              onClick={onClickSave}
              disabled={pendingApiCall}
              pendingApiCall={pendingApiCall}
              text={     
                <>
              <i className="material-icons">save</i>
              {t('Save')}
              </>
              }
              />
              <button className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
              <i className="material-icons">close</i>
                {t('Cancel')}
              </button>
            </div>
          </div>
        )}
        
      </div>
      </div>
      ); 
    
  };
 
  export default ProfileCard;