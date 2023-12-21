import React, { useEffect, useState } from 'react';
import './profileForm.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import { auth, database } from '../../store/firebase';
import { update, ref, child, push } from '@firebase/database';
import { writeNewPost } from '../../store/userSlice';

import '../../store/i18n';
import { useTranslation } from 'react-i18next';

function ProfileForm({ setUser }) {
    const user = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [englishLevel, setEnglishLevel] = useState(user.englishLevel || '');
    const [status, setStatus] = useState(user.status || '');
    const [description, setDescription] = useState('');
    const [interests, setInterests] = useState(user.interest || []);

    const { t } = useTranslation();

    console.log('User', user);

    useEffect(() => {
        const storedData = localStorage.getItem('currentUser');

        if (storedData) {
            const parsedData = JSON.parse(storedData) || {};
            setName(parsedData.name || user.name || '');
            setEmail(parsedData.email || user.email || '');
            setEnglishLevel(parsedData.englishLevel);
            setStatus(parsedData.status);
            setInterests(parsedData.interest);
        } else {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const saveDataToLocalStorage = async () => {
        const dataToStore = {
            name,
            email,
            englishLevel,
            status,
            interest: interests,
        };
        console.log(user);

        console.log('uid before writeNewPost', user.userId);

        console.log('Uid:', user.userId);
        console.log('User', user);

        console.log('Name:', name);
        console.log('Email:', email);

        localStorage.setItem('currentUser', JSON.stringify(dataToStore));
        setUser(dataToStore);

        try {
            const userRef = ref(database, `users/${user.userId}`);
            await update(userRef, dataToStore);

            await writeNewPost(user.userId, name, email);

            window.location.href = '/';
        } catch (error) {
            console.error('Помилка під час збереження даних в Firebase:', error);
        }
    };

    const handleInterestChange = (interest) => {
        const updatedInterests = interests
            ? interests.includes(interest)
                ? interests.filter((item) => item !== interest)
                : [...interests, interest]
            : [interest];
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
                setDescription(t('beginner_descr'));
                break;
            case 'intermediate':
                setDescription(t('intermediate_descr'));
                break;
            case 'advanced':
                setDescription(t('advanced_descr'));
                break;
        }
    };

    return (
        <div className="form-container">
            <h1>{t('Profile')}</h1>
            <div className="form-group">
                <label className="label">{t('Name')}</label>
                <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="label">{t('Email')}</label>
                <input
                    className="input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-group'>

                <Link to="/change-password">{t('Change_Password')}</Link>
            </div>
            <div className="form-group">
                <label className="label">{t('Level')}:</label>
                <div className='form-group-level'>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="beginner"
                            checked={englishLevel === 'beginner'}
                            onChange={() => handleEnglishLevelChange('beginner')}
                        /> <span className="radio-dot"></span>
                        {t('Level_beginner')}
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="intermediate"
                            checked={englishLevel === 'intermediate'}
                            onChange={() => handleEnglishLevelChange('intermediate')}
                        /> <span className="radio-dot"></span>
                        {t('Level_intermediate')}
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="advanced"
                            checked={englishLevel === 'advanced'}
                            onChange={() => handleEnglishLevelChange('advanced')}
                        /> <span className="radio-dot"></span>
                        {t('Level_advanced')}
                    </label>
                </div>
                <p>{description}</p>
            </div>
            <div className="form-group">
                <label className="label">{t('Status')}</label>
                <div className='form-group-status'>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="teacher"
                            checked={status === 'teacher'}
                            onChange={() => setStatus('teacher')}
                        /><span className="radio-dot"></span>
                        {t('Teacher')}
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="student"
                            checked={status === 'student'}
                            onChange={() => setStatus('student')}
                        /><span className="radio-dot"></span>
                        {t('Student')}
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="Business"
                            checked={status === 'business'}
                            onChange={() => setStatus('business')}
                        /><span className="radio-dot"></span>
                        {t('Business')}
                    </label>
                    <label className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            value="Other"
                            checked={status === 'other'}
                            onChange={() => setStatus('other')}
                        /><span className="radio-dot"></span>
                        {t('Others')}
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label className="label">{t('First_language')}</label>
                <select className="select" name="profile.language">
                    <option value="Ukrainian">Ukrainian</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                </select>
            </div>
            <div className="form-group">
                <label className="label">{t('A_interest')}</label>
                <div className='form-group-interest'>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Grammar"
                            checked={interests && interests.includes('Grammar')}
                            onChange={() => handleInterestChange('Grammar')}
                        /><span className="custom-checkbox">&#10003;</span>
                        {t('Grammar')}
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Vocabulary"
                            checked={interests && interests.includes('Vocabulary')}
                            onChange={() => handleInterestChange('Vocabulary')}
                        /><span className="custom-checkbox">&#10003;</span>
                        {t('Vocabulary')}
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Listening Skills"
                            checked={interests && interests.includes('Listening skills')}
                            onChange={() => handleInterestChange('Listening skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        {t('L_skills')}
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Reading Skills"
                            checked={interests && interests.includes('Reading skills')}
                            onChange={() => handleInterestChange('Reading skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        {t('R_skills')}
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="Writing Skills"
                            checked={interests && interests.includes('Writing skills')}
                            onChange={() => handleInterestChange('Writing skills')}
                        /><span className="custom-checkbox">&#10003;</span>
                        {t('W_skills')}
                    </label>
                </div>
            </div>
            <button onClick={saveDataToLocalStorage}>{t('Save')}</button>
        </div >
    );
}

export default ProfileForm;