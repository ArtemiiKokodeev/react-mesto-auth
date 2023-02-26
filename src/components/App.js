import { React, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { apiNew } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as Auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [selectedCardForOpen, setSelectedCardForOpen] = useState(null);
  const [selectedCardForDelete, setSelectedCardForDelete] = useState(null);
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    {loggedIn && Promise.all([apiNew.getProfileInfo(), apiNew.getInitialCards()])
    .then(([initUserInfo, initCards]) => {
      //console.log(initCards)
      //console.log(initUserInfo)
      setCurrentUser(initUserInfo)
      setCards(initCards);
    })
    .catch((error) => {
      console.log(`Ошибка при первичной загрузке профиля и карточек: ${error}`)
    })
  }}, [loggedIn])

  useEffect(() => {
    handleTokenCheck();
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", closePopupWithEsc);
  }, []);

  const navigate = useNavigate();

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        setIsSuccess(true);
        setIsAuthPopupOpen(true);
      })
      .catch((err) => {
        setErrorText("Аккаунт с введенным e-mail уже зарегистрирован. Попробуйте еще раз.")
        setIsSuccess(false);
        setIsAuthPopupOpen(true);
   });
    
  }

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token){
          localStorage.setItem("jwt", data.token);
          handleTokenCheck();
        } 
      })
     .catch((err) => {
        setErrorText("Вами введен неправильный e-mail или пароль. Попробуйте еще раз.")
        setIsSuccess(false);
        setIsAuthPopupOpen(true);
     });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          handleEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err) => {
        console.log(`Ошибка при проверке токена: ${err}`)
     });
    }
  }

  function handleEmail(email) {
    setUserEmail(email);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteConfirmClick() {
    setIsDeleteConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCardForOpen(null);
    setIsAuthPopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCardForDelete(false);
  }

  function closePopupWithEsc(e) {
    e.key === "Escape" && closeAllPopups();
  }

  function closePopupWithOverlayClick(e) {
    e.target === e.currentTarget && closeAllPopups();
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
        <Header 
          email={userEmail}
          handleEmail={handleEmail}
          onLoggedIn={setLoggedIn}/>

        <Routes>
          <Route exact path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCardForOpen}
                cards={cards}
                onCardLike={handleCardLike}
                onCardConfirmDelete={setSelectedCardForDelete}
                onConfirmDelete={handleDeleteConfirmClick}
                component={Main}
              />
            } 
          />
          <Route path="/sign-in" 
            element={<Login 
              onLogin={handleLogin}
            />}
          />
          <Route path="/sign-up" 
            element={<Register 
              onRegister={handleRegister}
            />}
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlayClick={closePopupWithOverlayClick}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onCloseOverlayClick={closePopupWithOverlayClick}
          onUpdateAvatar={handleUpdateAvarar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onCloseOverlayClick={closePopupWithOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCardForOpen}
          onClose={closeAllPopups}
          onCloseOverlayClick={closePopupWithOverlayClick}
        />

        <DeleteConfirmPopup
          isOpen={isDeleteConfirmPopupOpen}
          card={selectedCardForDelete}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          onCloseOverlayClick={closePopupWithOverlayClick}
        />

        <InfoTooltip
          isSuccess={isSuccess}
          isAuthPopupOpen={isAuthPopupOpen}
          errorText={errorText}
          onClose={closeAllPopups}
          onCloseOverlayClick={closePopupWithOverlayClick}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;