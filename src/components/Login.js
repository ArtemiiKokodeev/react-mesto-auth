import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from './Auth';

// пробрасываю handleLogin
function Login( { handleLogin, onUnsuccessAuth, handleError, handleTokenCheck } ) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          //console.log(data)
          setFormValue({email: '', password: ''});
          handleLogin();
          handleTokenCheck();
          navigate('/', {replace: true});
        } else if (data.message === "Incorrect email address or password") {
          //console.log(data.message)
          handleError("Вами введен неправильный e-mail или пароль. Попробуйте еще раз.")
          onUnsuccessAuth();
        }
      })
     .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <h1 className="login__title">
        Вход
      </h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__input-field">
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email"
            value={formValue.email || ''} 
            onChange={handleChange}
            className="login__input login__input_type_email" 
            required  
          />
        </label>
        <label className="login__input-field">
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Пароль"
            value={formValue.password || ''} 
            onChange={handleChange}
            className="login__input login__input_type_password" 
            required
            minLength="6" 
            maxLength="20" 
          />
        </label>
        <div className="login__button-container">
          <button type="submit" className="login__submit-button" name="submitButton">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;