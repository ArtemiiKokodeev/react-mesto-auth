function PopupWithForm( { 
  title, 
  name,
  type, 
  submitButtonText, 
  onSubmit, 
  isOpen, 
  onClose,
  onCloseOverlayClick, 
  children }) {

  return (
    <div className={`popup popup_type_${type} ${isOpen && 'popup_opened'}`} onClick={onCloseOverlayClick}>
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