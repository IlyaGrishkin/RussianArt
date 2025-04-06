import './HelloScreen.css'
import churchImage from './church.jpg'
import archImage from './museum.svg'
import { ScrollableList } from '../Scroller/Scroller'
import { GuideCardPreview } from '../GuideCardPreview/GuideCardPreview'
import { API_URLS, SERVER_HOST, startTest, URLS } from '../Utils/constants'
import { useEffect, useState } from 'react'
import timeImage from './time-svgrepo-com (2).svg'
import quantityImg from './pen-new-square-svgrepo-com.svg'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import { MyVerticallyCenteredModal } from '../Modal/Modal';
import { motion } from "motion/react"
import { Footer } from '../Footer/Footer'
import AppNavbar from '../Navbar/Navbar'



export function HelloScreen() {

    const apiUrl = API_URLS.GET_ALL_TESTS
    const MAX_CARDS = 3

    const [testList, setShownTestList] = useState([])
    const [modalShow, setModalShow] = useState(false)

    const [title, setTitle] = useState("")
    const [readyToStart, setReadyToStart] = useState(null)
    const [onUnfound, setOnUnfound] = useState("")

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    useEffect(() => {
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)


            const tests = serverData.data.items
            let testList = []
            for (let test of tests) {
                testList.push(test)

            }
            setShownTestList(testList.slice(0, MAX_CARDS))
        })
            .catch(resp => {
                console.log(resp)
            })
    }, [])


    let items = [
        <div className='guide-card-promo d-flex align-items-end border-end me-3' style={{ height: "400px", width: "250px" }}>
            <div className='mb-5'>
                <div className="rounded-circle mb-3" style={{ width: "14px", height: "14px", backgroundColor: 'black' }}></div>
                <div>
                    <p className="fw-bold fs-4">Гайд-карточки на<br /> любой вкус</p>
                </div>
                <button className='btn btn-dark rounded-pill px-4' onClick={() => window.location.href = URLS.GUIDE_CARDS
                }>Начать изучать</button>
            </div>
        </div>
    ]

    const [cards, setCards] = useState([])
        useEffect(() => {
            const apiUrl = API_URLS.GET_ALL_CARDS
            axios.get(apiUrl).then((resp) => {
                const serverData = resp.data;
                console.log(serverData)
                let cards = serverData.data.items
                let showCards = cards.map((item) => 
                    <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={SERVER_HOST + item.picture}
                    title={item.title} text={item.text} id={item.id}/>
                )
                
                console.log('showCards', showCards)
                items.push(...showCards)
                setCards(items)
            })
            .catch(resp => {
                console.log(resp)
            })
        }, [])


        
    
    

    function handleTestStart(testID) {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            console.log(testID)
            const apiUrl = API_URLS.CREATE_TEST;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.post(apiUrl,
                {
                    test_id: testID
                },
                config
            )

                .then((resp) => {
                    const serverData = resp.data;
                    console.log('create', serverData)
                    localStorage.setItem("testTime", Math.floor(new Date(serverData.data.created_at).getTime() / 1000))
                    localStorage.setItem("answers", JSON.stringify(serverData.data.user_answers))
                    let test;
                    for (let item of testList) {
                        if (item.id == testID) {
                            test = item;
                        }
                    }
                    localStorage.setItem("testDuration", JSON.stringify(test.work_time * 60))
                    localStorage.setItem("testRunning", JSON.stringify(testID))
                    window.location.href = startTest(testID)

                })
                .catch(resp => {
                    if (resp.response.status == 400) {
                        alert('Вы уже проходите другой тест. Завершите его, чтобы начать этот.')
                    }
                })

        }


        else {
            alert("Для прохождения теста необходимо авторизоваться")
        }
    }


    const normalStyle = "col-12 col-lg-12 col-xl-10 col-xxl-9 d-flex  pt-4 border-top"

    console.log(items)

    return (
        <div className="container">
            <div className='border-start border-end'>
                <div className='mb-3'>
                    <AppNavbar/>
                </div>
                    
                <div className='d-flex gap-3 align-items-center justify-content-end pe-4'>
                    <div className="rounded-circle mb-5" style={{ width: "14px", height: "14px", backgroundColor: 'black' }}></div>
                    <p className='fw-bold fs-5 text-end'>
                        Русское искусство - мир <br />шедевров и секретов</p>
                </div>
                <div className='pb-5 border-bottom mb-5'>
                    <h1 className='text-center fs-1'>Приглашаем вас исследовать  <span className='font-spectral'>РУССКОЕ<br /> ИСКУССТВО</span> вместе с нами</h1>
                </div>
             

                <img className='w-100 px-5' src={churchImage} alt="" />

                <h2 className='text-center my-5'> <span className=''>ПОЛУЧАЙТЕ ЗНАНИЯ</span> <br /> и <span className='font-spectral'>ОТКРЫВАЙТЕ НОВОЕ</span> <br /> с нашими карточками</h2>
            </div>

            <div className="scrollable-wrap border-bottom border-top">
                <ScrollableList items={cards} />
            </div>

            <h2 className='text-center my-5'>Проверяйте свои знания</h2>

            <div className='container border-start border-end'>



                {testList.length > 0 ? testList.map((test, index) =>
                    <div className={'row d-flex justify-content-center'}>
                        <div className={index % 2 == 0 ? normalStyle + ' justify-content-center justify-content-lg-start' : normalStyle + ' justify-content-center justify-content-lg-end'}>
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
                                whileHover={{
                                    y: -3,
                                    transition: { duration: 0.1 }
                                }}
                            >
                                <div className='' style={{ maxWidth: '24rem' }}>

                                    <div className='start-card-info d-flex justify-content-between align-items-center mb-3'>
                                        <h5 className='fw-bold'>{test.subject}</h5>
                                        <span className='start-test-deco p-2 px-3 fw-bold' style={{ backgroundColor: "inherit" }}>
                                            Тест
                                        </span>
                                    </div>
                                    <Card className={matches ? "card mb-4 home-card-wrap p-0" + " h-100" : "card mb-4 home-card-wrap p-0 h-75"} style={{ cursor: "pointer", maxWidth: '24rem', margin: 0, height: 480 + 'px' }} onClick={() => { setTitle(test.title); setModalShow(true); setReadyToStart(test.id) }}>
                                        <Card.Img variant="top" src={test.picture ? "http://127.0.0.1:8000" + test.picture : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
                                        <Card.Body>
                                            <Card.Title className='card-title'>{test.title}</Card.Title>
                                            <Card.Text>
                                                {test.description}
                                            </Card.Text>
                                            <Card.Text>
                                                <div className='timeInfo d-flex'>
                                                    <p>Время: {test.work_time} мин</p>
                                                    <img src={timeImage} width={20 + 'px'} className='pb-3 mx-2' />
                                                </div>

                                                <div className='questionsInfo d-flex'>
                                                    <p>Количество вопросов: {test.question_count}</p>
                                                    <img src={quantityImg} width={20 + 'px'} className='pb-3 mx-2' />
                                                </div>


                                            </Card.Text>
                                        </Card.Body>

                                    </Card>
                                </div>


                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    testName={title}
                                    onTestStart={() => handleTestStart(readyToStart)}
                                />
                            </motion.div>
                        </div>
                    </div>

                ) : <h4>{onUnfound}</h4>}

                <div className={'row d-flex justify-content-center py-4'}>
                    <div className='d-flex justify-content-end col-12 col-lg-12 col-xl-10 col-xxl-9 border-top pt-4'>
                        <span>
                            <div className="rounded-circle mb-2" style={{ width: "14px", height: "14px", backgroundColor: 'black' }}></div>
                            <p className='fw-bold fs-4'>И это далеко не все!<br /> Проверьте себя на других тестах</p>
                            <button className='btn btn-dark rounded-pill px-4' onClick={() => window.location.href = URLS.ALL_TESTS
                }>Другие тесты</button>
                        </span>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}