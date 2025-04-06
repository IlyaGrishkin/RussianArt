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
    return (
        <>
            <div className="border-start border-end">
                <AppNavbar/>
            </div>        
            <div className="container border-start border-end px-5" style={{minHeight: "80vh"}}>
                <h1 className="my-0 py-2 fst-italic">{data.subject}</h1>
                <img src={SERVER_HOST + data.picture} className="w-100 px"/>
                <h3 className="m-0 mt-3">{data.title}</h3>
                <p className="my-0 pb-5 mt-2">{data.text}</p>
            </div>
            <Footer/>
        </>
    )
}