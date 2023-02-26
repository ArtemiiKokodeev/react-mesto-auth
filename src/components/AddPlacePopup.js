import PopupWithForm from './PopupWithForm';
import { React, useEffect, useState } from 'react';

function AddPlacePopup( { isOpen, onClose, onCloseOverlayClick, onAddPlace } ) {
  
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Создать");

  useEffect(() => {
    setName("");
    setLink("");
    setSubmitButtonText("Создать");
  }, [isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText("Сохранение...");
    onAddPlace({
      name: name,
      link: link,
    });
  } 

  return (
    <PopupWithForm 
      name="addCardForm"
      title="Новое место"
      type="add-card"
      submitButtonText={submitButtonText}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlayClick={onCloseOverlayClick}
      children={(
        <>
          <label className="popup__text-field">
            <input 
              id="place-text" 
              name="name" 
              type="text" 
              placeholder="Название"
              value={name || ''} 
              onChange={handleNameChange}
              className="popup__text popup__text_type_place-name" 
              required 
              minLength="2" 
              maxLength="30" />
            <span className="popup__text-error place-text-error"></span>
          </label>
          <label className="popup__text-field">
            <input 
              id="image-link" 
              name="link" 
              type="url" placeholder="Ссылка на картинку"
              value={link || ''} 
              onChange={handleLinkChange}
              className="popup__text popup__text_type_image-link" 
              required />
            <span className="popup__text-error image-link-error"></span>
          </label>
        </>
      )}
    />
  );
}

export default AddPlacePopup;