import React,{useState} from 'react';
import Input from '../components/Input'
import { useTranslation  } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import {useDispatch} from 'react-redux'
import { signupHandler } from '../redux/authActions';

const UserSignupPage = (props) => {    
    const [form, setForm] = useState({ 
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const {t} = useTranslation();

   const onChange = event => {
        const {name,value}=event.target;  // object parçalama event targetin içindeki name ve value yi al anlamına geliyor  
        errors[name]=undefined;
        setErrors((previousErrors) => ({ ...previousErrors,[name]:undefined}));
        setForm((previousForm) => ({...previousForm,[name]: value}))
    };

   const onClickSignup = async (event) =>{
        event.preventDefault();    
        const {username, displayName , password}=form;
        const body={
            username,
            displayName,
            password
        };
        const {history} = props;
        const {push}= history;
        try {      
            await dispatch(signupHandler(body));
            push('/')
        } catch (error) {
            if (error.response.data.validationErrors) {
              setErrors(error.response.data.validationErrors);
            };
                };          
    };

    //we can dedect errors and control match betweend password and passwordrepeat
    const {username : usernameError,displayName:displayNameError,password:passwordError}=errors;
    let passwordRepeatError;
    if(form.password !== form.passwordRepeat){
        passwordRepeatError=t('Password mismatch');
    };
    
    //we can controll spinner according to apiCall.
    const pendingApiCallSignUp = useApiProgress('post','/api/1.0/users');
    const pendingApiCallLogin= useApiProgress('post','/api/1.0/auth')
    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignUp;
    return(
        <div className="container">
<form>
    <h1 className="text-center">{t('Sign Up')}</h1>
    <Input name="username" onChange={onChange} label ={t('Username')}  error={usernameError} />
    <Input name="displayName" onChange={onChange} label = {t("Display Name")} error={displayNameError} />
    <Input name="password" onChange={onChange} label = {t('Password')} error={passwordError} type="password"/>
    <Input name="passwordRepeat" onChange={onChange} label= {t('Password Repeat')} error={passwordRepeatError} type="password" />     

<div className="text-center">
<ButtonWithProgress onClick={onClickSignup} disabled={pendingApiCall || passwordRepeatError !== undefined} pendingApiCall={pendingApiCall} text={t('Sign Up')} />

</div>
        </form>
        </div>
    );
}
export default UserSignupPage;