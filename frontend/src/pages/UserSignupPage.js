import React from 'react';
import axios from 'axios';
import {changeLanguage} from '../api/apiCalls' 
import Input from '../components/Input'
import { withTranslation  } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import {connect} from 'react-redux'
import { signupHandler } from '../redux/authActions';
class UserSignupPage extends React.Component{    

    state = {
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        errors: {}

    };


    onChange = event => {
        const {name,value}=event.target;  // object parçalama event targetin içindeki name ve value yi al anlamına geliyor
        const errors = { ...this.state.errors };
        errors[name]=undefined;
        const {t}=this.props;
     
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) 
              errors.passwordRepeat = t('Password mismatch');
             else if (name === 'passwordRepeat' && value !== this.state.password) 
              errors.passwordRepeat = t('Password mismatch');
             else 
              errors.passwordRepeat = undefined;
          }

        this.setState({
            [name] : value,
            errors
        });
    };

    
    onChangeLanguage = language => {

        const {i18n} = this.props;
    
        i18n.changeLanguage(language);
        changeLanguage(language);


    }


    onClickSignup = async event =>{
        event.preventDefault();    
        const {username, displayName , password}=this.state;
        const body={
            username,
            displayName,
            password
        };

        const {dispatch,history} = this.props;
        const {push}= history;
        try {      
            await dispatch(signupHandler(body));
            push('/')
        } catch (error) {
            if (error.response.data.validationErrors) {
                    this.setState({ errors: error.response.data.validationErrors });
            }
                }
          
    };
render(){

    const {errors} = this.state;
    const {username,displayName,password,passwordRepeat}=errors;
    const { t,pendingApiCall } = this.props;
    return(

        <div className="container">
<form>
    <h1 className="text-center">{t('Sign Up')}</h1>
    <Input name="username" onChange={this.onChange} label ={t('Username')}  error={username} />
    <Input name="displayName" onChange={this.onChange} label = {t("Display Name")} error={displayName} />
    <Input name="password" onChange={this.onChange} label = {t('Password')} error={password} type="password"/>
    <Input name="passwordRepeat" onChange={this.onChange} label= {t('Password Repeat')} error={passwordRepeat} type="password" />     


<div className="text-center">
<ButtonWithProgress onClick={this.onClickSignup} disabled={pendingApiCall || passwordRepeat !== undefined} pendingApiCall={pendingApiCall} text={t('Sign Up')} />

</div>
        </form>
        </div>
    );

}
}


const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPage,'/api/1.0/users');
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest,'/api/1.0/auth');

const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForAuthRequest);

export default connect()(UserSignupPageWithTranslation);