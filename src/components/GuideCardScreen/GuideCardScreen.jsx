import { useEffect, useState } from "react";
import { GuideCardPreview } from "../GuideCardPreview/GuideCardPreview";
import axios from "axios";
import { API_URLS, SERVER_HOST } from "../Utils/constants";
import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import BasicPagination from "../MuiPagination/MuiPagination";

export function GuideCardScreen(){
    const MAX_CARDS = 4
    const [data, setData] = useState([])
    const [cardList, setCardList] = useState([])

    const [cardSearch, setCardSearch] = useState("")

    useEffect(() => {
        const apiUrl = API_URLS.GET_ALL_CARDS
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setData(serverData.data.items)
            setCardList(serverData.data.items.slice(0, MAX_CARDS))
        })
        .catch(resp => {
            console.log(resp)
        })
    }, [])

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        console.log("val", value)
        setPage(value);
        const newTestList = data.slice((MAX_CARDS * value) - MAX_CARDS, MAX_CARDS * value)
        setCardList(newTestList)
    };

    function submitSearch() {
        const apiUrl = API_URLS.SEARCH_CARD
        axios.get(apiUrl, {headers: {}, params: {query: cardSearch}})
        .then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
        })
        .catch((e) => console.log(e))
    }

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar/>
            </div>
            <div className="container border-start border-end">
                <div className="ms-3 py-4">
                    <h2>Поиск</h2>
                    <div className="d-flex w-50">
                            <input style={{width: "40%"}} value={cardSearch} onChange={(e) => setCardSearch(e.target.value)} className="form-control" type="text" id="formName"/>
                            <button className="btn btn-dark ms-2" onClick={submitSearch}>Найти</button>
                    </div>
                </div>

                <div className="row d-flex justify-content-center border-top border-bottom">
                    {cardList.map(item => 
                        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-4">
                        <GuideCardPreview image={SERVER_HOST + item.picture}
                        title={item.title}
                        text={item.text}
                        id={item.id}
                        />
                    </div>

                    )} 
                </div>
                <div className='mt-5 pb-4 d-flex justify-content-center'>
                    <BasicPagination totalCards={data.length} maxCards={MAX_CARDS} page={page} handleChange={handleChange} />
                </div>
            </div>
            <Footer/>
        </>
    )
}