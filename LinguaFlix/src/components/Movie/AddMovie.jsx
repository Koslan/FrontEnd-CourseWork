import { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../store/firebase';
import { useParams } from 'react-router-dom';
import './AddMovie.css';


function AddMovie() {
   
    const customLabels = {
        title: "Movie Title",
        description: "Movie Description",
        year: "Release Year",
        posterURL: "Poster URL",
        lexicalComplexity: "Lexical Complexity",
        languagePairs: "Language Pairs",
        vocabulary: "Vocabulary Word"
    };

    const [formData, setFormData] = useState({
        description: '',
        languagePairs: ["eng:spa", "eng:ukr"],
        lexicalComplexity: '',
        posterURL: 'https://www.reelviews.net/resources/img/default_poster.jpg',
        title: '',
        year: '',
        vocabByLanguage: JSON.stringify({
            "eng:spa" : {
              A1: [
                "city: ciudad",
                "music: música",
                "dream: sueño",
                "love: amor",
                "dance: danza",
                "night: noche",
                "star: estrella",
                "song: canción",
                "street: calle",
                "light: luz"
              ],
              A2: [
                "career: carrera",
                "movie: película",
                "audition: audición",
                "jazz: jazz",
                "performance: actuación",
                "talent: talento",
                "fame: fama",
                "success: éxito",
                "stage: escenario",
                "passion: pasión"
              ],
                B1: [
                "aspiration: aspiración",
                "struggle: lucha",
                "romance: romance",
                "opportunity: oportunidad",
                "dedication: dedicación",
                "artistry: arte",
                "compromise: compromiso",
                "inspiration: inspiración",
                "ambition: ambición",
                "nostalgia: nostalgia"
              ],
              B2: [
                "perseverance: perseverancia",
                "rejection: rechazo",
                "achievement: logro",
                "melancholy: melancolía",
                "cinematic: cinematográfico",
                "ensemble: conjunto",
                "rendition: interpretación",
                "improvise: improvisar",
                "dazzling: deslumbrante",
                "ephemeral: efímero"
              ],
              C1: [
                "ephemeral: efímero",
                "resonance: resonancia",
                "captivating: cautivador",
                "nuance: matiz",
                "culmination: culminación",
                "yearning: anhelo",
                "mesmerizing: hipnótico",
                "rendezvous: cita",
                "quintessential: quintaesencia",
                "luminous: luminoso"
              ],
              C2: [
                "transcendent: trascendente",
                "intricacy: complejidad",
                "euphonious: eufónico",
                "synchronicity: sincronicidad",
                "metaphorical: metafórico",
                "aesthetic: estético",
                "resplendent: resplandeciente",
                "sublime: sublime",
                "ephemeral: efímero",
                "intangible: intangible"
              ]
            },
            "eng:ukr" : {
              A1: [
                "city: місто",
                "music: музика",
                "dream: сон",
                "love: кохання",
                "dance: танець",
                "night: ніч",
                "star: зірка",
                "song: пісня",
                "street: вулиця",
                "light: світло"
              ],
              A2: [
                "career: кар'єра",
                "movie: фільм",
                "audition: прослуховування",
                "jazz: джаз",
                "performance: виступ",
                "talent: талант",
                "fame: слава",
                "success: успіх",
                "stage: сцена",
                "passion: пристрасть"
              ],
              B1: [
                "aspiration: прагнення",
                "struggle: боротьба",
                "romance: романтика",
                "opportunity: можливість",
                "dedication: прихильність",
                "artistry: мистецтво",
                "compromise: компроміс",
                "inspiration: натхнення",
                "ambition: амбіція",
                "nostalgia: ностальгія"
              ],
              B2: [
                "perseverance: наполегливість",
                "rejection: відмова",
                "achievement: досягнення",
                "melancholy: меланхолія",
                "cinematic: кінематографічний",
                "ensemble: ансамбль",
                "rendition: виконання",
                "improvise: імпровізувати",
                "dazzling: приголомшливий",
                "ephemeral: миттєвий"
              ],
              C1: [
                "ephemeral: миттєвий",
                "resonance: резонанс",
                "captivating: захоплюючий",
                "nuance: нюанс",
                "culmination: кульмінація",
                "yearning: прагнення",
                "mesmerizing: чарівний",
                "rendezvous: побачення",
                "quintessential: квінтесенція",
                "luminous: світлий"
              ],
              C2: [
                "transcendent: надзвичайний",
                "intricacy: складність",
                "euphonious: мелодійний",
                "synchronicity: синхронність",
                "metaphorical: метафоричний",
                "aesthetic: естетичний",
                "resplendent: сяючий",
                "sublime: возвишений",
                "ephemeral: миттєвий",
                "intangible: невловимий"
              ]
            }
          })
        
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
        if (formData.description.length < 20) {
            alert("Description must be at least 20 characters.");
            return;
        }
        try {
            await axios.post(`${DB_URL}/movies.json`, formData);
            alert("Movie added successfully!");
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Error adding movie.");
        }
    };

    return (
    <div className="AddMovieContainer">
        <h2 className="AddMovieTitle">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
            
            <label className="AddMovieLabel" htmlFor="title">{customLabels.title}</label>
            <input className="AddMovieInput" type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder={customLabels.title} required />

            <label className="AddMovieLabel" htmlFor="description">{customLabels.description}</label>
            <textarea className="AddMovieTextArea" name="description" value={formData.description} onChange={handleInputChange} placeholder={customLabels.description} required />

            <label className="AddMovieLabel" htmlFor="year">{customLabels.year}</label>
            <input className="AddMovieInput" type="number" name="year" value={formData.year} min="1900" max={new Date().getFullYear()} onChange={handleInputChange} placeholder={customLabels.year} required />

            <label className="AddMovieLabel" htmlFor="posterURL">{customLabels.posterURL}</label>
            <input className="AddMovieInput" type="text" name="posterURL" value={formData.posterURL} onChange={handleInputChange} placeholder={customLabels.posterURL} required />

            <label className="AddMovieLabel" htmlFor="lexicalComplexity">{customLabels.lexicalComplexity}</label>
            <select className="AddMovieSelect" name="lexicalComplexity" value={formData.lexicalComplexity} onChange={handleInputChange}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>

            <label className="AddMovieLabel" htmlFor="languagePairs">{customLabels.languagePairs}</label>
            <input className="AddMovieInput" type="text" name="languagePairs" value={formData.languagePairs} onChange={handleInputChange} placeholder={customLabels.languagePairs} required />


            <label className="AddMovieLabel" htmlFor="languagePairs">{customLabels.languagePairs}</label>
            <input className="AddMovieInput" type="text" name="vocabByLanguage" value={formData.vocabByLanguage} onChange={handleInputChange} placeholder={customLabels.vocabByLanguage} required />


            <button className="AddMovieButton" type="submit">Add Movie</button>
        </form>
    </div>
);

}

export default AddMovie;