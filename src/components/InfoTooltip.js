import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistSuccess from '../images/regist-success.svg';
import UnsuccessAuth from '../images/login-unsuccess.svg';

// пробросить какие-то пропсы (регистрации и лог ина), чтобы выводить тот или иной попап
function InfoTooltip( { isSuccessRegistOpen, isUnsuccessAuthOpen, errorText, onClose } ) {

  const navigate = useNavigate();
  
  const closeSuccessRegistPopup = () => {
    onClose();
    navigate('/sign-in', {replace: true});
  }

  return (
    <>
      <div className={`popup popup_type_regist-success ${isSuccessRegistOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button onClick={closeSuccessRegistPopup} className="popup__close" type="button"></button>
          <div className="popup__info-container">
            <img className="popup__info-logo" src={RegistSuccess} alt="Успешная регистрация" />
            <h1 className="popup__info-title">
              Вы успешно зарегистрировались!
            </h1>
          </div>
        </div>
      </div>
      <div className={`popup popup_type_unsuccess-auth ${isUnsuccessAuthOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button onClick={onClose} className="popup__close" type="button"></button>
          <div className="popup__info-container">
            <img className="popup__info-logo" src={UnsuccessAuth} alt="Ошибка" />
            <h1 className="popup__info-title">{errorText}</h1>
          </div>
        </div>
      </div>
    </>
    )
}

export default InfoTooltip;