import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { API_URLS, SERVER_HOST, URLS } from "../Utils/constants";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
 


export function ChangeProfile() {

    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const [newAvatar, setNewAvatar] = useState("")

    const [matches, setMatches] = useState(
            window.matchMedia("(min-width: 520px)").matches
        )
    
        useEffect(() => {
            window
                .matchMedia("(min-width: 520px)")
                .addEventListener('change', e => setMatches(e.matches));
        }, []);
    

    async function handleSubmit(event) {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            setLoading(true)
            event.preventDefault()
            let formData = new FormData()
            formData.append("schema", JSON.stringify({
                first_name: name,
                last_name: secondName
            }))
            formData.append("image", file)
            const apiUrl = API_URLS.UPDATE_PROFILE;
            await axios.patch(apiUrl,
                formData,
                {
                    headers: {
                        "Auth-Token": JSON.parse(localStorage.getItem("accessToken")),
                        "Content-type": "multipart/form-data",
                    },
                }
    
            )

                .then((resp) => {
                    const serverData = resp.data;
                    setNewAvatar(SERVER_HOST + serverData.data.picture)
                    localStorage.setItem("avatar", JSON.stringify(SERVER_HOST + serverData.data.picture))
                    //toast.success('Профиль обновлен!')
                    console.log(serverData)
                    setLoading(false)
                    window.location.href = URLS.PROFILE
                })
                .catch(resp => {
                    console.log(resp)
                    toast.error("Произошла ошибка. Проверьте корректность данных и попробуйте еще раз.")
                    setLoading(false)
                })
        }

        event.preventDefault()
    }

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar newAvatar={newAvatar}/>
            </div>
            <div style={{ minHeight: "80vh" }} className="d-flex w-100 justify-content-center border-start border-end">
                <form className={matches ? "p-5 border-start border-end" : "p-5"} onSubmit={handleSubmit}>
                    <h2 className="pb-3 border-bottom">Редактировать профиль</h2>
                    <div className="mt-4">
                        <label for="formName" class="form-label fw-bold fs-4">Имя</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} class="form-control" type="text" id="formName" required />
                    </div>
                    <div className="mt-3">
                        <label for="formSecondName" class="form-label fw-bold fs-4">Фамилия</label>
                        <input value={secondName} onChange={(e) => setSecondName(e.target.value)} class="form-control" type="text" id="formSecondName" required />
                    </div>
                    <div className="mt-3">
                        <label for="formFile" class="form-label fw-bold fs-4">Аватар </label>
                        <input onChange={(e) => setFile(e.target.files[0])} class="form-control" type="file" id="formFile" />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-dark w-100">Сохранить</button>
                    </div>
                </form>
            </div>
            <Footer />

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
                    primary: 'white',
                    secondary: 'black',
                },
                },
            }}
            />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
                onClick={null}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}