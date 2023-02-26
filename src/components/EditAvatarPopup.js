import PopupWithForm from './PopupWithForm';
import { React, useEffect, useState, useRef } from 'react';

function EditAvatarPopup( { isOpen, onClose, onCloseOverlayClick, onUpdateAvatar } ) {

  const avatarRef = useRef();
  const [submitButtonText, setSubmitButtonText] = useState("Сохранить");
  
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText("Сохранение...");
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm 
      name="editAvatarForm"
      title="Обновить аватар"
      type="edit-avatar"
      submitButtonText={submitButtonText}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlayClick={onCloseOverlayClick}
      children={(
        <label className="popup__text-field">
          <input 
            id="image-avatarlink" 
            name="avatarLink" 
            type="url" 
            placeholder="Ссылка на картинку"
            ref={avatarRef}
            className="popup__text popup__text_type_image-link" 
            required 
          />
          <span className="popup__text-error image-avatarlink-error"></span>
        </label>
      )}
    />
  );
}

export default EditAvatarPopup;