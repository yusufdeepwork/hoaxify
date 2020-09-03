import React, { useState, useEffect } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useSelector } from 'react-redux';
import {useTranslation} from "react-i18next";
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
const HoaxSubmit = () => {    
    const {image} = useSelector(store => ({image : store.image}));
    const [focused, setFocused] = useState(false);
    const [hoax,setHoax] = useState('');
    const [newImage, setNewImage] = useState();
    const {t}=useTranslation();
    const [errors, setErrors] = useState({});

    useEffect(()=> {
        if(!focused){
            setHoax('');
            setErrors({});
            setNewImage();
        }
    },[focused]);

    useEffect(()=>{
        setErrors({})
    },[hoax]);

    const pendingApiCall = useApiProgress('post','/api/1.0/hoaxes');

    const onClickHoaxify = async () => {
        const body ={
            content : hoax
        };
        try {
            await postHoax(body);
             setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
              }
        }
    };

    let textAreaClass ='form-control';
    if(errors.content){
        textAreaClass += ' is-invalid';
    }
    const onChangeFile = event => {
        if (event.target.files.length < 1) {
          return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }

    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle mr-1" />            
            <div className="flex-fill">
                <textarea 
                className={textAreaClass}
                rows={focused ? '3' : '1'}
                onFocus={()=> setFocused(true)}
                onChange={event => setHoax(event.target.value)}
                value={hoax}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused && (
                    <>
                    <Input type="file" onChange={onChangeFile} />
                    {newImage &&  <img className="img-thumbnail" src={newImage} alt="hoax-attachment" />}
                <div className="text-right mt-1">
               <ButtonWithProgress 
               className="btn btn-primary" 
               onClick={onClickHoaxify}
               text="Hoaxify"
               pendingApiCall={pendingApiCall}
               disabled={pendingApiCall}
               />
               <button className="btn btn-light d-inline-flex ml-1" 
               onClick={() => setFocused(false)}
               disabled={pendingApiCall}
               >
              <i className="material-icons">close</i>
                {t('Cancel')}
              </button>
                </div>
                </>)}
            </div>
        </div>
    );
};

export default HoaxSubmit;
