import { React, useState } from 'react';

function Login( { onLogin } ) {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
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