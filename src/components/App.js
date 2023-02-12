import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { React, useEffect, useState } from 'react';
import { apiNew } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    Promise.all([apiNew.getProfileInfo(), apiNew.getInitialCards()])
    .then(([initUserInfo, initCards]) => {
      //console.log(initCards)
      //console.log(initUserInfo)
      setCurrentUser(initUserInfo)
      setCards(initCards);
    })
    .catch((error) => {
      console.log(`Ошибка при первичной загрузке профиля и карточек: ${error}`)
    })
}, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userInfo) {
    apiNew.editProfileInfo(userInfo)
    .then((res) => {
      //console.log(res)
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении профиля: ${error}`)
    })
  }

  function handleUpdateAvarar(avatarLink) {
    apiNew.editAvatar(avatarLink)
    .then((res) => {
      //console.log(res)
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`)
    })
  }

  function handleAddPlaceSubmit(cardInfo) {
    apiNew.addNewCard(cardInfo)
    .then((newCard) => {
      //console.log(res)
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении карточки: ${error}`)
    })
  }
  
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiNew.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении/удалении лайка карточки: ${error}`)
    })
  } 

  function handleCardDelete(card) {
    // Отправляем запрос в API и 
    apiNew.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter(function (c) {
        return c !== card;
      }))
    })
    .catch((error) => {
      console.log(`Ошибка при удалении карточки: ${error}`)
    })
  } 

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvarar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;