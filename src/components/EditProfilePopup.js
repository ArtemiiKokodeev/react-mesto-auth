import PopupWithForm from './PopupWithForm';
import { React, useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup( { isOpen, onClose, onCloseOverlayClick, onUpdateUser } ) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitButtonText, setSubmitButtonText] = useState("Сохранить");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setSubmitButtonText("Сохранить");
  }, [isOpen, currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setSubmitButtonText("Сохранение...");
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name="userInfoForm"
      title="Редактировать профиль"
      type="edit-profile"
      submitButtonText={submitButtonText}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlayClick={onCloseOverlayClick}
      children={(
        <>
          <label className="popup__text-field">
            <input 
              id="name-text" 
              name="userName" 
              type="text" 
              placeholder="Имя"
              value={name || ''} 
              onChange={handleNameChange}
              className="popup__text popup__text_type_name" 
              required 
              minLength="2" 
              maxLength="40" 
            />
            <span className="popup__text-error name-text-error"></span>
          </label>
          <label className="popup__text-field">
            <input 
              id="occupation-text" 
              name="userOccupation" 
              type="text" 
              placeholder="О себе"
              value={description || ''} 
              onChange={handleDescriptionChange}    
              className="popup__text popup__text_type_occupation" 
              required 
              minLength="2" 
              maxLength="200" 
            />
            <span className="popup__text-error occupation-text-error"></span>
          </label>
        </>
      )}
    />
  );
}

export default EditProfilePopup;