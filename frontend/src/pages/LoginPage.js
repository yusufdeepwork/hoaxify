import React,{useEffect,useState} from 'react';
import Input from '../components/Input'
import { useTranslation  } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import {useDispatch} from 'react-redux';
import {loginHandler} from '../redux/authActions';

const LoginPage = props => {

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [error, setError] = useState();
   const {t} = useTranslation();
   const dispatch =useDispatch();

   useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async event => {
        event.preventDefault();  
        const {history}= props;
        const {push}=history;
        const creds = {
          username,
          password
        };
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
          setError(apiError.response.data.message);
        }
      };
            const pendingApiCall = useApiProgress('post','/api/1.0/auth');
            const buttonEnabled = username&&password;
        
        return(            
            <div className="container ">
            <form>
                <div>
                <h1 className="text-center">{t('Login')}</h1>
                <Input   label ={t('Username')} onChange={event => {setUsername(event.target.value)}}  />
                <Input   label ={t('Password')} type="password" onChange={event => {setPassword(event.target.value)}}   />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
        <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} text={t('Login')} pendingApiCall={pendingApiCall}/>
                 </div>
            </form>
            </div>       
          );
}

export default LoginPage;