import { React, useState } from 'react';
import { Link } from 'react-router-dom';

function Register( { onRegister } ) {

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
    onRegister(formValue.email, formValue.password);
  }

  return (
    <div className="register">
      <h1 className="register__title">
        Регистрация
      </h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__input-field">
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email"
            value={formValue.email || ''} 
            onChange={handleChange}
            className="register__input register__input_type_email" 
            required  
          />
        </label>    
        <label className="register__input-field">
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Пароль"
            value={formValue.password || ''} 
            onChange={handleChange}
            className="register__input register__input_type_password" 
            required
            minLength="6" 
            maxLength="20" 
          />
        </label>
        <div className="register__button-container">
          <button className="register__submit-button" type="submit" name="submitButton">
            Зарегистрироваться
          </button>  
        </div>
      </form>
      <div className="register__sign-in">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;