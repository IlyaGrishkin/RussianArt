import { Footer } from "../Footer/Footer";
import AppNavbar from "../Navbar/Navbar";
import music from "./Хор.mp3"

export function AboutScreen() {
    return (
        <>
            <div className="border-start border-end">
                <AppNavbar/>
            </div>
            <div style={{minHeight: "80vh"}} className="border-start border-end px-4 pt-3">
                <h1 className="fs-1 fw-bold">
                    Создатели: Миша и Илья
                </h1>
              
                <h1 style={{overflow: "auto"}} className="fs-2 fw-bold my-5">Связаться с нами: <a type="email" href="mailto:russianartandheritage@gmail.com">
                russianartandheritage@gmail.com</a></h1>
                <h1 className="fs-2 fw-bold mt-4">
                    Вдохновение:
                </h1>
                <audio controls src={music}></audio>
            </div>
            <Footer/>
        </>
    )
}