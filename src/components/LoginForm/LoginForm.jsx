import React, { useEffect, useState } from 'react';
import {Carousel} from 'react-bootstrap';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
import './LoginForm.css';
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';
import { API_URLS, URLS } from '../Utils/constants';
import carousel1 from './carousel1.jpg'
import carousel2 from './carousel2.webp'
import carousel3 from './carousel3.jpg'
import AppNavbar from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';



function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState("email не может быть пустым")
    const [formValid, setFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (emailError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [emailError])

    function handleChange(e) {
        setEmail(e.target.value)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(String(e.target.value).toLowerCase())) {
            String(e.target.value).length == 0 ? setEmailError("email не может быть пустым") : setEmailError("Некорректный email")
        }
        else {
            setEmailError("")
        }


    }

    function handleBlur(e) {
        setEmailDirty(true);
    }

    async function handleSubmit(event) {
        if (formValid) {
            setLoading(true)
            event.preventDefault()
            localStorage.setItem("userEmail", JSON.stringify(email))
            const apiUrl = API_URLS.GET_SEND_CODE;
            await axios.post(apiUrl, 
                {
                    email: email
                }
            )
            
            .then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            window.location.href = URLS.LOGIN_CHECK;
            })
            .catch(resp => {
                console.log(resp)
                alert("Произошла ошибка. Проверьте корректность почты и попробуйте еще раз.")
                setLoading(false)
            })
            
            
            
        }
        event.preventDefault()
    }

    return (
        <>
            <div className='border-start border-end'>
                <AppNavbar/>
            </div>        
            <div style={{minHeight: "70vh"}} className='border-start border-end'>
                <div className='login-form-wrapper m-0 pt-5'>
                    <div className='wrapper'>
                        <div className='form-wrap'>
                            <div className='login-msg'>
                                <h2>Вход</h2>
                            </div>
                            
                            <form className='login-form' onSubmit={handleSubmit} noValidate={true}>
                                <label htmlFor="email"><p>Введите свой email</p></label>
                                <input className="form-control my-2" value={email} onChange={e => handleChange(e)} onBlur={e => handleBlur(e)} id="email"
                                    type="email" name="emailAddress" placeholder='Ваша почта' />
                                {(emailError && emailDirty) ? <div style={{ color: "red" }}>{emailError}</div> : <></>}
                                <button type="submit" className={formValid ? 'btn btn-dark w-100 my-2' : 'btn btn-dark disabled w-100 my-2'}>Отправить</button>
                            </form>
                            <div className='create-account'>
                                <p>Нет аккаунта? <a href="/signup/">Зарегистрироваться</a></p>
                            </div>
                        </div>
                        
                    </div>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={loading}
                        onClick={null}
                        >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginForm;