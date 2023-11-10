import React, { useEffect, useState } from 'react';
import './profileForm.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileForm({ setUser }) {
    const user = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(user.email || '');
    const [englishLevel, setEnglishLevel] = useState(user.englishLevel || '');
    const [status, setStatus] = useState(user.status || '');
    const [description, setDescription] = useState('');
    const [interests, setInterests] = useState(user.interest || []);

    useEffect(() => {
        const storedData = localStorage.getItem('user_data');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setName(parsedData.name);
            setEmail(parsedData.email);
            setEnglishLevel(parsedData.englishLevel);
            setStatus(parsedData.status);
            setInterests(parsedData.interest);
        } else {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const saveDataToLocalStorage = () => {
        const dataToStore = {
            name,
            email,
            englishLevel,
            status,
            interest: interests,
        };
        localStorage.setItem('user_data', JSON.stringify(dataToStore));

        setUser(dataToStore);

        window.location.href = '/';
    };

    const handleInterestChange = (interest) => {
        const updatedInterests = interests.includes(interest)
            ? interests.filter((item) => item !== interest)
            : [...interests, interest];
        setInterests(updatedInterests);

        localStorage.setItem('userInterests', JSON.stringify(updatedInterests));
    };

    const handleEnglishLevelChange = (level) => {
        setEnglishLevel(level);
        updateDescription(level);
    };

    console.log(user);

    const updateDescription = (level) => {
        switch (level) {
            case 'beginner':
                setDescription('You know a little English. You can have simple conversations in shops, restaurants, etc. You can write simple sentences, but you usually need a dictionary to help you.');
                break;
            case 'intermediate':
                setDescription('You can have simple conversations about a lot of different topics. You can make some complex sentences. You can read some English texts, but often need a dictionary to help you.');
                break;
            case 'advanced':
                setDescription('You have a strong command of English. You can have in-depth conversations, read English literature, and write complex essays.');
                break;
        }
    };
    console.log(saveDataToLocalStorage);

    return (
        <div className="form-container">
            <h1>My profile:</h1>
            <div className="form-group">
                <label className="label">Name:</label>
                <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="label">Email:</label>
                <input
                    className="input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-group'>

                <Link to="/change-password">Change Password</Link>
            </div>
            <div className="form-group">
                <label className="label">English Proficiency Level:</label>
                <div className='form-group-level'>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="beginner"
                            checked={englishLevel === 'beginner'}
                            onChange={() => handleEnglishLevelChange('beginner')}
                        /> <span className="radio-dot"></span>
                        Beginner
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="intermediate"
                            checked={englishLevel === 'intermediate'}
                            onChange={() => handleEnglishLevelChange('intermediate')}
                        /> <span className="radio-dot"></span>
                        Intermediate
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="advanced"
                            checked={englishLevel === 'advanced'}
                            onChange={() => handleEnglishLevelChange('advanced')}
                        /> <span className="radio-dot"></span>
                        Advanced
                    </label>
                </div>
                <p>{description}</p>
            </div>
            <div className="form-group">
                <label className="label">Your Status:</label>
                <div className='form-group-status'>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="teacher"
                            checked={status === 'teacher'}
                            onChange={() => setStatus('teacher')}
                        /><span className="radio-dot"></span>
                        Teacher
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="student"
                            checked={status === 'student'}
                            onChange={() => setStatus('student')}
                        /><span className="radio-dot"></span>
                        Student
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="Business"
                            checked={status === 'business'}
                            onChange={() => setStatus('business')}
                        /><span className="radio-dot"></span>
                        Business
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="Other"
                            checked={status === 'other'}
                            onChange={() => setStatus('other')}
                        /><span className="radio-dot"></span>
                        Other
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label className="label">First language:</label>
                <select className="select" name="profile.language">
                    <option value="Ukrainian">Ukrainian</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                </select>
            </div>
            <div className="form-group">
                <label className="label">Areas of interest:</label>
                <div className='form-group-interest'>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Grammar"
                            checked={interests.includes('Grammar')}
                            onChange={() => handleInterestChange('Grammar')}
                        /><span className="custom-checkbox">&#10003;</span>
                        Grammar
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Vocabulary"
                            checked={interests.includes('Vocabulary')}
                            onChange={() => handleInterestChange('Vocabulary')}
                        /><span className="custom-checkbox">&#10003;</span>
                        Vocabulary
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Listening Skills"
                            checked={interests.includes('Listening skills')}
                            onChange={() => handleInterestChange('Listening skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        Listening Skills
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Reading Skills"
                            checked={interests.includes('Reading skills')}
                            onChange={() => handleInterestChange('Reading skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        Reading Skills
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Writing Skills"
                            checked={interests.includes('Writing skills')}
                            onChange={() => handleInterestChange('Writing skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        Writing Skills
                    </label>
                </div>
            </div>
            <button onClick={saveDataToLocalStorage}>Save</button>
        </div >
    );
}

export default ProfileForm;