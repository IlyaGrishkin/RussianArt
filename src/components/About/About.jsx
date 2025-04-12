import { Footer } from "../Footer/Footer";
import AppNavbar from "../Navbar/Navbar";

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
                
            </div>
            <Footer/>
        </>
    )
}