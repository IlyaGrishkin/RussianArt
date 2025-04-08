import { Backdrop, CircularProgress } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { API_URLS, URLS } from "../Utils/constants"
import AppNavbar from '../Navbar/Navbar';
import "./SignUp.css"
import { Footer } from "../Footer/Footer";
import toast, { Toaster } from "react-hot-toast";


export function SignUp() {
    const [email, setEmail] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState("email не может быть пустым")

    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState()

    const [secondName, setSecondName] = useState("")
    const [secondNameError, setSecondNameError] = useState("")

    const [formValid, setFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

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

    function handleNameChange(e) {
        const newName = e.target.value
        const cyrillicPattern = /^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/
        if (cyrillicPattern.test(String(newName))) {
            setFormValid(!secondNameError)
            setFirstNameError("")
        }
        else {
            setFirstNameError(newName.length == 0 ? "поле 'Имя' не может быть пустым" : "некорректное имя")
            setFormValid(false)
        }
        setFirstName(newName)
        

        
    }

    function handleSecondNameChange(e) {
        const newName = e.target.value
        const cyrillicPattern = /^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/
        if (cyrillicPattern.test(String(newName))) {
            setFormValid(!firstNameError)
            setSecondNameError("")
        }
        else {
            setSecondNameError(newName.length == 0 ? "поле 'Фамилия' не может быть пустым" : "некорректная фамилия")
            setFormValid(false)
        }
        setSecondName(newName)
    }

    async function handleSubmit(event) {
        if (formValid) {
            setLoading(true)
            event.preventDefault()
            const apiUrl = API_URLS.CREATE_SEND_CODE;
            await axios.post(apiUrl, 
                {
                    email: email,
                    first_name: firstName,
                    last_name: secondName
                }
            )
            
            .then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            
            localStorage.setItem("userEmail", JSON.stringify(email))
            localStorage.setItem("userFirstName", JSON.stringify(firstName))
            localStorage.setItem("userLastName", JSON.stringify(secondName))
            window.location.href = URLS.SIGNUP_CONFIRM
            })
            .catch(resp => {
                toast.error("Произошла ошибка. Проверьте корректность данных и попробуйте еще раз.")
            })
            
            
            
            
        }
        event.preventDefault()
    }

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar/>
            </div>
            <div className="container-fluid py-5 border-start border-end">
                <div className="row  d-flex justify-content-center">
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <form onSubmit={handleSubmit} noValidate={true} style={{backgroundColor: "white"}} 
                        className="p-5 pt-3 radius-3 signup-form-mixin">
                            <h2 className="mb-3 text-body-secondary">Регистрация</h2>
                            <label className="p-0 m-0 fw-bold fs-5" htmlFor="email">Email</label>
                            <input className="form-control m-0" value={email} onChange={e => handleChange(e)} onBlur={e => handleBlur(e)} id="email"
                                type="email" name="emailAddress" placeholder='Ваша почта' />
                            {(emailError && emailDirty) ? <div style={{ color: "red" }}>{emailError}</div> : <></>}

                            <label className="mt-3 fw-bold fs-5" htmlFor="firstName">Имя</label>
                            <input className="form-control m-0" value={firstName} onChange={e => handleNameChange(e)} 
                            placeholder="Ваше имя"/>
                            {firstNameError ? <div style={{ color: "red" }}>{firstNameError}</div> : <></>}

                            <label className="mt-3 fw-bold fs-5" htmlFor="firstName">Фамилия</label>
                            <input className="form-control m-0" value={secondName} onChange={e => handleSecondNameChange(e)}
                            placeholder="Ваша фамилия"/>
                            {secondNameError ? <div style={{ color: "red" }}>{secondNameError}</div> : <></>}
                            <button type="submit" className="btn btn-dark mt-3">Создать аккаунт</button>
                            <p className="mt-2">Уже есть аккаунт? <a href="/login/">Войти</a></p>
                        </form>
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
            <Footer/>

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'black',
                            secondary: 'white',
                        },
                    },
                }}
            />
        </>
    )
}