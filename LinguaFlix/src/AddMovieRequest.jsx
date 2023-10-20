import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { DB_URL } from './store/firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';



function AddMovieRequest () {

    const customLabels  = {
        title: "Movie Title",
        year: "Release Year",
    };

    const [formData, setFormData] = useState({
        title: '',
        year: '',
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("vocabulary-")) {
            const index = parseInt(name.split("-")[1], 10);
            const vocabList = [...formData.vocabulary];
            vocabList[index] = value;
            setFormData(prevData => ({ ...prevData, vocabulary: vocabList }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title === '' || formData.year === '') {
            handleAlert("Please fill out both title and year fields.", false);
            return;
        }
        try {
            const database = getDatabase();
            const wantMovieRef = ref(database, 'wantmovie'); 
            const newMovieRef = push(wantMovieRef); 
            set(newMovieRef, formData); 
            setFormData({ title: '', year: '' });
            handleAlert("Movie added to 'Want Movie' list successfully!", true);
        } catch (error) {
            console.error("Error adding movie:", error);
            handleAlert("Error adding movie.", false);
        }
    };
    const [alertMessage, setAlertMessage] = useState('');
    const [isSuccessAlert, setIsSuccessAlert] = useState(false);

    const handleAlert = (message, isSuccess) => {
        setAlertMessage(message);
        setIsSuccessAlert(isSuccess);
        setTimeout(() => {
            setAlertMessage('');
            setIsSuccessAlert(false);
        }, 3000);
    };
    
    

    return (
        <div className='main-content'>
        <div className="addmovie__container">
        <div className='addmovie__info'>
                <h1>Didn't find the movie you want?</h1>
                <h2>Fill out a form, and we will inform you when it is available in our library.</h2>
        </div>
            <form onSubmit={handleSubmit}  className='form__container'>
            <div className='forms'>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder={customLabels.title} required />
                <input type="number" name="year" value={formData.year} min="1900" max={new Date().getFullYear()} onChange={handleInputChange} placeholder={customLabels.year} required />
                <button type="submit">Send</button>
                </div>
            </form>
        </div>
        {alertMessage && (
                <Alert variant={isSuccessAlert ? 'success' : 'danger'}>
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
}


export default AddMovieRequest;
