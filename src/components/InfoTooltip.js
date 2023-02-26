import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistSuccess from '../images/regist-success.svg';
import UnsuccessAuth from '../images/login-unsuccess.svg';

function InfoTooltip( { 
  isSuccess, 
  isAuthPopupOpen,
  errorText, 
  onClose,
  onCloseOverlayClick } ) {

  const navigate = useNavigate();
  
  const closeSuccessRegistPopup = () => {
    onClose();
    navigate('/sign-in', {replace: true});
  }

  return (
    <div className={`popup ${isAuthPopupOpen && 'popup_opened'}`} onClick={onCloseOverlayClick}>
      <div className="popup__container">
        <button onClick={isSuccess ? closeSuccessRegistPopup : onClose} className="popup__close" type="button"></button>
        <div className="popup__info-container">
          <img className="popup__info-logo" 
            src={isSuccess ? RegistSuccess : UnsuccessAuth} 
            alt={`${isSuccess ? "Успешная регистрация" : "Ошибка авторизации"}`} />
          <h1 className="popup__info-title">
            {`${isSuccess ? "Вы успешно зарегистрировались!" : errorText}`}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;