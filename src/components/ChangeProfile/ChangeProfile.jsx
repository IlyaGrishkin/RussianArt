import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { API_URLS } from "../Utils/constants";
import { useState } from "react";

export function ChangeProfile() {

    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("")

    async function handleSubmit(event) {
        setLoading(true)
        event.preventDefault()
        const apiUrl = API_URLS.UPDATE_PROFILE;
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
                alert("Произошла ошибка. Проверьте корректность данных и попробуйте еще раз.")
                setLoading(false)
            })

        event.preventDefault()
    }

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar />
            </div>
            <div style={{ minHeight: "80vh" }} className="d-flex w-100 justify-content-center border-start border-end">
                <form className="p-5 border-start border-end" onSubmit={handleSubmit}>
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
                        <input class="form-control" type="file" id="formFile" />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-dark w-100">Сохранить</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}