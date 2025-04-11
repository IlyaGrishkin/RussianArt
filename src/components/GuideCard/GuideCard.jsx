import { useParams } from "react-router-dom";
import {getGuideCardData, SERVER_HOST } from "../Utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export function GuideCard(props) {
    const [data, setData] = useState([])
    const {id} = useParams()
    useEffect(() => {
        const apiUrl = getGuideCardData(id)
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setData(serverData.data)
        })
        .catch(resp => {
            console.log(resp)
        })
    }, [])

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 850px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 850px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar/>
            </div>        
            <div className="container border-start border-end px-5" style={{minHeight: "80vh"}}>
             
                <h1 className="my-0 py-4 fst-italic text-center fs-2">{data.subject}</h1>
                <div className="d-flex justify-content-center">
                    <img src={SERVER_HOST + data.picture} className={matches ? "w-75" : "w-100"}/>
                </div>
                <h3 className="m-0 mt-3 text-center fw-bold">{data.title}</h3>
                <p className="my-0 pb-5 mt-2 text-center">{data.text}</p>
                
            </div>
            <Footer/>
        </>
    )
}