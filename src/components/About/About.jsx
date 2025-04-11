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
                    От создателей
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat fugiat facere voluptatibus dolorum, ut mollitia, libero ratione assumenda cumque sint maiores? Corrupti possimus, magni hic perspiciatis unde placeat ab necessitatibus? Incidunt ut fugiat expedita blanditiis aliquam sapiente voluptates tenetur deserunt saepe voluptatibus quam quod voluptate at eos, recusandae ea dicta odio sed libero ex error et sequi quo fuga. Facere, natus, veniam a pariatur dolorum earum sint ea quas quia sapiente sequi sunt architecto! Totam quidem distinctio minus commodi consectetur delectus soluta odit assumenda ducimus deleniti voluptate corrupti ex quas, vero dignissimos numquam dolorum optio itaque quae hic enim perspiciatis?</p>
            </div>
            <Footer/>
        </>
    )
}