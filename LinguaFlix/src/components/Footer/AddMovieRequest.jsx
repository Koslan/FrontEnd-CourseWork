import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { DB_URL } from "../../store/firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import '../../store/userSlice.js';

import '../../store/i18n.js';
import { useTranslation } from "react-i18next";
import { getUserFromDB } from "../../store/userSlice.js";

function AddMovieRequest({ user }) {
  const { t } = useTranslation();

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  console.log("User Info:", user);

  const customLabels = {
    title: "Movie Title",
    year: "Release Year",
  };

  const [formData, setFormData] = useState({
    title: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("vocabulary-")) {
      const index = parseInt(name.split("-")[1], 10);
      const vocabList = [...formData.vocabulary];
      vocabList[index] = value;
      setFormData((prevData) => ({ ...prevData, vocabulary: vocabList }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title === "" || formData.year === "") {
      handleAlert(t("addMovieRequest.fillFields"), false);
      return;
    }
    try {
      const database = getDatabase();
      const wantMovieRef = ref(database, "wantmovie");
      const newMovieRef = push(wantMovieRef);
      set(newMovieRef, formData);
      setFormData({ title: "", year: "" });
      handleAlert(t("addMovieRequest.movieAddedSuccess"), true);
    } catch (error) {
      console.error("Error adding movie:", error);
      handleAlert(t("addMovieRequest.errorAddingMovie"), false);
    }
  };

  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const handleAlert = (message, isSuccess) => {
    setAlertMessage(message);
    setIsSuccessAlert(isSuccess);
    setTimeout(() => {
      setAlertMessage("");
      setIsSuccessAlert(false);
    }, 3000);
  };
  // const permissions = useSelector((state) => state.permissions);
  // const isUser = permissions.isUser;
  // const isGuest = permissions.isGuest;

  useEffect(() => {
    dispatch(getUserFromDB(userId));
  }, [dispatch, userId]);

  return (
    <div className="main-content-addmovie">
      <div className="addmovie__container">
        <div className="addmovie__info">
          <h1>{t('Add_request')}</h1>
          <h2>{t('Add_request_text')}</h2>
        </div>
        <form onSubmit={handleSubmit} className="form__container">
          <div className="forms">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={t('Add_request_title')}
              required
            />
            <input
              type="number"
              name="year"
              value={formData.year}
              min="1900"
              max={new Date().getFullYear()}
              onChange={handleInputChange}
              placeholder={t('Add_request_year')}
              required
            />
            {user ? (
              <button type="submit">{t('Send')}</button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleAlert(t('handle_Alert'), false);
                }}
              >
                {t('Send')}
              </button>
            )}
          </div>
        </form>
      </div>
      {alertMessage && (
        <Alert variant={isSuccessAlert ? "success" : "danger"}>
          <p>{alertMessage}</p>
        </Alert>

      )}
    </div>
  );
}
export default AddMovieRequest;