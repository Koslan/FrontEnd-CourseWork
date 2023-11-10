import React, { useState } from 'react';
import { auth, updatePassword } from '../../store/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from '../../store/firebase';
import Alert from 'react-bootstrap/Alert';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

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
            <h1>Change Password</h1>
            <p>To change your password, please fill in the fields below:</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="primary">{successMessage}</Alert>}
            <div className="form-group">
                <label>Current Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="custom-input"
                />
            </div>
            <div className="form-group">
                <label>Confirm new Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handlePasswordChange}>Change Password</button>
        </div>
    );
}

export default ChangePassword;