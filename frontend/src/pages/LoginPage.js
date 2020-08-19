import React,{useEffect,useState} from 'react';
import Input from '../components/Input'
import { withTranslation  } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import {connect} from 'react-redux';
import {loginHandler} from '../redux/authActions';

const LoginPage = props => {

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [error, setError] = useState();

   useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async event => {
        event.preventDefault();  
        const {history,dispatch}= props;
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
            const {t,pendingApiCall}=props;
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

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default connect()(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));