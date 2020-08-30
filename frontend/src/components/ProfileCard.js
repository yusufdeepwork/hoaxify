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
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [inEditMode, setInEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(()=>{
    setUser(props.user)
  },[props.user]);

  useEffect(()=>{
    setEditable(pathUsername === loggedInUsername)
  },[pathUsername,loggedInUsername]);

  const {username,displayName,image}=user;
  
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const {t} = useTranslation();


  useEffect(()=> {
    if(!inEditMode){
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    }else{
      setUpdatedDisplayName(displayName)
    }
  },[inEditMode,displayName]);

  useEffect(()=> { 
    setValidationErrors(previousValidationErrors => ({...previousValidationErrors,displayName:undefined}))
  },[validationErrors]);


  const onClickSave = async () => {
  
    let image ;
    if(image){
      image = newImage.split(',')[1]
    }
    const body = {
      displayName:updatedDisplayName,
      image
    };
    try {
      const response = await updateUser(username,body);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };
  
  const onChangeFile = event => {
    if(event.target.files.length < 1){
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () =>{
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  const pendingApiCall = useApiProgress('put','/api/1.0/users/'+username);

  const {displayName : displayNameError} = validationErrors;
  
    return(
    <div className="card text-center">
      <div className="card-header">
      <ProfileImageWithDefault 
      className="rounded-circle" 
      width="200" 
      height="200" 
      alt={`${username} profile`} 
      image={image}
      tempimage ={newImage}
      />
      </div>
      <div className="card-body">
        {!inEditMode &&
        (
          <>
          <h3>
          {displayName}@{username}
          </h3>
          
          { editable && (
            <button className="btn btn-success d-inline-flex" onClick={()=> setInEditMode(true)}>
          <i className="material-icons">edit</i>
          {t('Edit')}
          </button>)}
          </>
        )}
        {inEditMode && (
          <div>
            <Input 
            label={t('Change Display Name')} 
            defaultValue ={displayName}
            onChange={event => {setUpdatedDisplayName(event.target.value)}}
            error={displayNameError}
            />
            <input type="file" onChange={onChangeFile} />
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