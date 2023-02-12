function PopupWithForm( { title, name, submitButtonText, onSubmit, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <form name={name} className="popup__content" onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__submit" type="submit" name="submitButton">{submitButtonText}</button>
        </form>
      </div>
    </div>      
  )
}

export default PopupWithForm;