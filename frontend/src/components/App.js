import Footer from "./Footer";
import Profile from "./Profile";
import Cards from "./Cards";
import { CardsContext } from "../contexts/CardsContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupConfirm from "./PopupConfirm";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { useEffect, useState, useRef } from "react";
import api from "../utils/Api";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as token from "../utils/token";
import PopupFailedRegistration from "./PopupFailedRegistration";
import PopupSuccessRegistration from "./PopupSuccessRegistration";
import PathName from "../utils/PathNames";
import StateUser from "../utils/StateUser";

const PopupType = {
  confirm: "confirm",
  element: "element",
  profile: "profile",
  update: "update",
  addimage: "addimage",
  noPopup: "",
};

const noUser = {
  avatar: "",
  name: "",
  about: "",
  id: "",
  email: "",
};

const noCards = [];

function App() {
  const [currentUser, setCurrentUser] = useState(noUser);

  const { pathname } = useLocation();

  const handleUpdateUser = (name, about) => {
    return api
      .editProfile(name, about)
      .then((data) => {
        setCurrentUser((old) => ({ ...old, ...data }));
        handleClose();
      })
      .catch((error) => {
        console.log("Ошибка при отправке профиля", error);
      });
  };

  const handleUpdateAvatar = (avatarLink) => {
    return api
      .updateAvatar(avatarLink)
      .then((data) => {
        setCurrentUser((old) => ({ ...old, ...data }));
        handleClose();
      })
      .catch((error) => {
        console.log("Ошибка при отправке аватара", error);
      });
  };

  const [cards, setCards] = useState(noCards);
  const deleteId = useRef();
  const handleCardDelete = () => {
    const id = deleteId.current;
    return api
      .deleteCard(id)
      .then(() => {
        setCards((oldCards) => {
          return oldCards.filter((card) => {
            return card._id !== id;
          });
        });
        handleClose();
      })
      .catch((e) => {
        console.error("Ошибка при удалении карточки:", e);
      });
  };

  const handleCardLike = (id, alreadyLiked) => {
    api
      .toggleLikes(id, alreadyLiked)
      .then((data) => {
        setCards((oldCards) => {
          return oldCards.map((card) => {
            if (card._id === id) {
              return data;
            }
            return card;
          });
        });
      })
      .catch((error) => {
        console.log("Ошибка при удалении", error);
      });
  };

  //Методы для работы с Popup
  const [popup, setPopup] = useState(PopupType.noPopup);

  const handleDeleteClick = (id) => {
    deleteId.current = id;
    setPopup(PopupType.confirm);
  };

  const openedCardData = useRef();

  const handleOpenCard = (data) => {
    openedCardData.current = data;
    setPopup(PopupType.element);
  };

  const handleClose = () => {
    setPopup(PopupType.noPopup);
  };

  const handleAddPlaceSubmit = (placename, link) => {
    api
      .addCard(placename, link)
      .then((newCardData) => {
        setCards((oldCards) => {
          return [newCardData, ...oldCards];
        });
        handleClose();
      })
      .catch((error) => {
        console.log("Ошибка при добавлении карточки", error);
      });
  };

  const handleEditProfile = () => {
    setPopup(PopupType.profile);
  };

  const handleEditAvatar = () => {
    setPopup(PopupType.update);
  };

  const handleOpenAddImage = () => {
    setPopup(PopupType.addimage);
  };

  const [userState, setUserState] = useState(() => {
    if (pathname === PathName.register || pathname === PathName.login) {
      return StateUser.idle;
    }
    return StateUser.needCheck;
  });
  useEffect(() => {
    if (pathname === PathName.register || pathname === PathName.login) {
      token.removeToken();
      setCurrentUser(noUser);
      setCards(noCards);
      setUserState(StateUser.idle);
    }
  }, [pathname]);

  useEffect(() => {
    if (userState !== StateUser.needCheck) {
      return;
    }

    setUserState(StateUser.checking);

    api
      .getInfoUser()
      .then((userData) => {
        setCurrentUser((old) => ({
          ...old,
          ...userData,
        }));
        setUserState(StateUser.loggedIn);
      })
      .catch((e) => {
        console.error("Ошибка при загрузке данных пользователя: ", e);
        setUserState(StateUser.error);
      });
  }, [userState]);

  useEffect(() => {
    if (userState !== StateUser.loggedIn || cards !== noCards) {
      return;
    }

    Promise.all([api.getInitialCards(), api.getInfoUser()])
      .then(([cardsData, userData]) => {
        setCurrentUser((old) => ({
          ...old,
          ...userData,
        }));
        cardsData.reverse();
        setCards(cardsData);
      })
      .catch((er) => {
        console.log("Ошибка при загрузке карточек", er);
      });
  }, [userState, cards]);

  const handleLogin = ({ email, password }, onSuccess, onError) => {
    api
      .authorize(email, password)
      .then((res) => {
        if (!res.token) {
          throw new Error("Нет токена");
        }
        token.setToken(res.token);
        setUserState(StateUser.loggedIn);
        onSuccess();
      })
      .catch((err) => {
        setPopup("failed");
        onError(err);
      });
  };
  const handleRegister = ({ email, password }, onSuccess, onError) => {
    api
      .register(email, password)
      .then(() => {
        setPopup("success");
        onSuccess();
      })
      .catch((err) => {
        onError(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page__content">
          <Routes>
            <Route
              path={PathName.register}
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path={PathName.login}
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={
                    <Main>
                      <Profile
                        onEditProfile={handleEditProfile}
                        onEditAvatar={handleEditAvatar}
                        onOpenAddImage={handleOpenAddImage}
                      />
                      <Cards
                        onCardLike={handleCardLike}
                        onDeleteClick={handleDeleteClick}
                        onOpenCard={handleOpenCard}
                      />
                    </Main>
                  }
                  userState={userState}
                />
              }
            />
            <Route path="*" element={<p>Страница не найдена</p>} />
          </Routes>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={popup === "profile"}
            onClose={handleClose}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={popup === "update"}
            onClose={handleClose}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={popup === "addimage"}
            onClose={handleClose}
          />

          <PopupConfirm
            onCardDelete={handleCardDelete}
            isOpen={popup === "confirm"}
            onClose={handleClose}
          />

          <ImagePopup
            isOpen={popup === "element"}
            onClose={handleClose}
            data={openedCardData.current}
          />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={popup === "profile"}
            onClose={handleClose}
          />
          <PopupFailedRegistration
            isOpen={popup === "failed"}
            onClose={handleClose}
          />
          <PopupSuccessRegistration
            isOpen={popup === "success"}
            onClose={handleClose}
          />
          <Footer />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
