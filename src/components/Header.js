import { React, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import headerGroupMenu from '../images/group-menu.svg';
import headerCloseIcon from '../images/close-icon.svg';

function Header( { email, handleEmail, onLoggedIn } ) {

  function onSingOut() {
    localStorage.removeItem("jwt");
    handleEmail("");
    onLoggedIn(false);
    setGroupMenuList(false)
  }

  const [groupMenuIcon, setGroupMenuIcon] = useState(headerGroupMenu);
  const [groupMenuList, setGroupMenuList] = useState(false);

  function handleGroupMenuIconClick() {
    if (groupMenuIcon === headerGroupMenu) {
      setGroupMenuIcon(headerCloseIcon);
      setGroupMenuList(true);
    } else {
      setGroupMenuIcon(headerGroupMenu)
      setGroupMenuList(false);
    }
  }

  return (
    <>
      {groupMenuList && 
        <div className="header__container_type_group-menu">
          <p className="header__email">{email}</p>
          <Link to="/sign-in" className="header__signout" onClick={onSingOut}>Выйти</Link>
        </div>}
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Место Россия" />
        <Routes>
          <Route path="/" element={
              <>
                <div className="header__container">
                  <p className="header__email">{email}</p>
                  <Link to="/sign-in" className="header__signout" onClick={onSingOut}>Выйти </Link>
                </div>
                <img className="header__group-menu-icon" src={groupMenuIcon} alt="Меню" onClick={handleGroupMenuIconClick} />
              </>
            }
          />
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>}/>
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>}/>
        </Routes>
      </header>
    </>
  )
}

export default Header;