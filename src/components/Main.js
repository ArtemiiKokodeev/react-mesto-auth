import { React, useContext } from 'react';
import avatarIcon from '../images/edit-avatar.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main( { 
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick, 
  cards, 
  onCardLike,
  onCardConfirmDelete,
  onConfirmDelete
} ) {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
            <div className="profile__avatar-overlay">
              <img className="profile__avatar-icon" src={avatarIcon} alt="Редактировать аватар" />
            </div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
      </section>
      
      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card 
                card={card} 
                key={card._id} 
                onCardClick={onCardClick} 
                onCardLike={onCardLike}
                onCardConfirmDelete={onCardConfirmDelete}
                onConfirmDelete={onConfirmDelete}
              />
            ))
          } 
        </ul> 
      </section>
    </main> 
  )
}

export default Main;