import React, { useState } from 'react';
import { auth, updatePassword } from '../../store/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from '../../store/firebase';
import Alert from 'react-bootstrap/Alert';

import '../../store/i18n';
import { useTranslation } from 'react-i18next';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const { t } = useTranslation();

    const handlePasswordChange = () => {
        if (newPassword === confirmPassword) {
            const user = auth.currentUser;

            if (user) {
                const credentials = EmailAuthProvider.credential(user.email, oldPassword);

                reauthenticateWithCredential(user, credentials)
                    .then(() => {
                        updatePassword(user, newPassword)
                            .then(() => {
                                setOldPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                                setError(null);
                                setSuccessMessage('Password updated successfully');
                                console.log('Password updated successfully.');
                                setTimeout(() => {
                                    setSuccessMessage('');
                                    window.location.href = '/';
                                }, 2000);
                            })
                            .catch((updateError) => {
                                setError(updateError.message);
                            });
                    })
                    .catch((reauthError) => {
                        setError(reauthError.message);
                    });
            } else {
                setError('No user is currently signed in.');
            }
        } else {
            setError('New password and confirm password do not match.');
        }
    };

    return (
        <div className='form-change-password'>
            <h1>{t('Change Password')}</h1>
            <p>{t('Change_prescript')}</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="primary">{successMessage}</Alert>}
            <div className="form-group">
                <label>{t('Current_Password')}</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>{t('New_Password')}</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="custom-input"
                />
            </div>
            <div className="form-group">
                <label>{t('Confirm_new')}</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handlePasswordChange}>{t('Change Password')}</button>
        </div>
    );
}

export default ChangePassword;