import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context';
import { errorNotification, successNotification } from '../../components';
import styles from './Signup.module.css';

export default function SignUp() {
    const { signUpUser } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [signupCred, setSignupCred] = useState({});
    const [isLoading, setLoading] = useState(false);

    const inputChangeHandler = (e) => {
        e.preventDefault();
        setSignupCred((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        if (
            !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(signupCred.email)
        ) {
            setErrorMessage('Invalid Email address!');
            return false;
        }
        if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(
                signupCred.password
            )
        ) {
            setErrorMessage(
                'Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number.'
            );
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const createAccount = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const { success, message } = await signUpUser(signupCred);

            if (success) {
                successNotification('Account Created!!');
                navigate('/products');
                setLoading(false);
            } else {
                errorNotification(message);
            }
        }
    };

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Let's get your free account.</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => inputChangeHandler(e)}
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                required
                            />
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => inputChangeHandler(e)}
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => inputChangeHandler(e)}
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                            <span></span>
                        </div>
                        <button
                            onClick={(e) => createAccount(e)}
                            className={`btn btn-secondary ${styles.lognBtn}`}
                        >
                            {isLoading ? (
                                <i className="bx bx-loader-alt bx-spin"></i>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>
                    {errorMessage && <p className="f-danger">{errorMessage}</p>}
                    <p>
                        Already have an account?{' '}
                        <Link className={`f-primary`} to="/login">
                            Log in
                        </Link>{' '}
                        here
                    </p>
                </div>
            </div>
        </div>
    );
}
