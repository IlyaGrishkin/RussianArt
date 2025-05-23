import { useEffect, useState } from "react";
import { GuideCardPreview } from "../GuideCardPreview/GuideCardPreview";
import axios from "axios";
import { API_URLS, SERVER_HOST } from "../Utils/constants";
import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import BasicPagination from "../MuiPagination/MuiPagination";
import { motion } from "motion/react"
import searchImage from './search.svg'
import crossImage from './Cross.svg'

export function GuideCardScreen() {
    const MAX_CARDS = 6
    const [allCards, setAllCards] = useState([])
    const [data, setData] = useState([])
    const [cardList, setCardList] = useState([])

    const [cardSearch, setCardSearch] = useState("")

    const [filter, setFilter] = useState(false)

    useEffect(() => {
        const apiUrl = API_URLS.GET_ALL_CARDS
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            
            setData(serverData.data.items)
            setAllCards(serverData.data.items)
            setCardList(serverData.data.items.slice(0, MAX_CARDS))
        })
            .catch(resp => {
                
            })
    }, [])

    useEffect(() => {
        setCardList(data.slice(0, MAX_CARDS))
    }, [data])

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        
        setPage(value);
        const newTestList = data.slice((MAX_CARDS * value) - MAX_CARDS, MAX_CARDS * value)
        setCardList(newTestList)
    };

    function submitSearch() {
        const apiUrl = API_URLS.SEARCH_CARD
        axios.get(apiUrl, { headers: {}, params: { query: cardSearch } })
            .then((resp) => {
                const serverData = resp.data;
                setData(serverData.data.items)
                setFilter(true)
                
            })
            .catch((e) => {})
    }


    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 993px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 993px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const borderClass = matches ? "border-start" : "border-top"

    return (
        <>
            <div className="border-start border-end">
                <AppNavbar />
            </div>
            <div className="container border-start border-end" style={{ minHeight: "80vh" }}>
                <div className="d-flex">
                    <div className="row d-flex">
                        <div className="col-12 col-lg-7 col-xl-8 my-4">
                            <h1 className="ms-3 fs-1 fw-bold text-center">Узнавайте новое с нашими Гайд-карточками</h1>
                        </div>
                        <div className={`col-12 col-lg-5 col-xl-4  px-0 d-flex justify-content-center align-items-center ${borderClass} my-4`}>
                            <div>
                                <div className="d-flex align-items-center mb-2 mt-3">
                                    <div className="rounded-circle" style={{ width: "14px", height: "14px", backgroundColor: 'black' }}></div>
                                    <h2 className="ps-2 m-0">Поиск</h2>
                                </div>
                                <div className="d-flex">
                                    <input style={{ width: "80%" }} value={cardSearch} onChange={(e) => setCardSearch(e.target.value)}
                                        className="form-control" type="text" id="formName" placeholder="Hазвание карточки" />
                                    <button className="btn btn-dark m-0 ms-2" onClick={submitSearch}>
                                        <img src={searchImage} width={'20px'} style={{ paddingBottom: "2px" }} /></button>
                                    {filter && <button className="btn btn-dark ms-2"
                                        onClick={() => { setFilter(false); setData(allCards); setCardSearch("") }}>
                                        <img width={'20px'} style={{ paddingBottom: "2px" }} src={crossImage} alt="" />
                                    </button>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center border-top border-bottom">
                    {cardList.length > 0 ? cardList.map(item =>
                        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-4">

                            <motion.div
                                initial={
                                    {
                                        y: 100,
                                        opacity: 0
                                    }
                                }
                                animate={
                                    {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.5 }
                                    }}
                            >


                                <GuideCardPreview image={SERVER_HOST + item.picture}
                                    title={item.title}
                                    text={item.text}
                                    id={item.id}
                                />
                            </motion.div>
                        </div>

                    ) : <h2 className="text-center my-5">Ничего не найдено</h2>}
                </div>
                <div className='mt-5 pb-4 d-flex justify-content-center'>
                    <BasicPagination totalCards={data.length} maxCards={MAX_CARDS} page={page} handleChange={handleChange} />
                </div>
            </div>
            <Footer />
        </>
    )
}