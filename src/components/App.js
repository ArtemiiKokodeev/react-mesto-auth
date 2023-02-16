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
  const [selectedCard, setSelectedCard] = useState(null);
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [userEmail, setUserEmail] = useState("")

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

  const navigate = useNavigate();

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          //console.log(res.data.email);
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
    setIsAuthPopupOpen(false);
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

  function handleIsSuccess(state) {
    setIsSuccess(state);
  }

  function handleAuthPopupOpen() {
    setIsAuthPopupOpen(true);
  }

  function handleLogin() {
    setLoggedIn(true);
    handleTokenCheck();
    navigate('/', {replace: true});
  }

  function handleLoginError() {
    handleTextError("Вами введен неправильный e-mail или пароль. Попробуйте еще раз.")
    handleIsSuccess(false);
    handleAuthPopupOpen();
  }

  function handleRegister() {
    handleIsSuccess(true);
    handleAuthPopupOpen();
  }

  function handleRegisterError() {
    handleTextError("Аккаунт с введенным e-mail уже зарегистрирован. Попробуйте еще раз.")
    handleIsSuccess(false);
    handleAuthPopupOpen();
  }

  function handleTextError(error) {
    setErrorText(error);
  }

  function handleEmail(email) {
    setUserEmail(email);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          email={userEmail}
          handleEmail={handleEmail}
          handleLogin={handleLogin}/>

        <Routes>
          <Route exact path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                component={Main}
              />
            } 
          />
          <Route path="/sign-in" 
            element={<Login 
              onLogin={handleLogin}
              onError={handleLoginError}
            />}
          />
          <Route path="/sign-up" 
            element={<Register 
              onRegister={handleRegister}
              onError={handleRegisterError}
            />}
          />
        </Routes>

        <Footer />

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

        <InfoTooltip
          isSuccess={isSuccess}
          isAuthPopupOpen={isAuthPopupOpen}
          errorText={errorText}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;