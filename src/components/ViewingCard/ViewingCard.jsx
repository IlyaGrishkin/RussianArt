import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, Offcanvas } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import TestNavbar from "../TestNavbar/TestNavbar";
import { API_URLS, SERVER_HOST } from '../Utils/constants';
import axios from 'axios';
import { motion } from "motion/react"
import navigationImage from './navigation1.svg'
import greyImage from './grey.webp'
import AppNavbar from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import './ViewingCard.css'



export function ViewingCard() {
    const { id } = useParams();
    const { attemptID } = useParams();

    const [userAnswers, setUserAnswers] = useState([])
    const [variants, setVariants] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [correctAnswers, setCorrectAnswers] = useState({})
    const [questionQuantity, setQuestionQuantity] = useState(0)

    const [showNavigation, setShowNavigation] = useState(false)

    useEffect(() => {
        const viewingData = JSON.parse(localStorage.getItem("viewingData"))
        if (!viewingData || parseInt(viewingData.attempt_id) != parseInt(attemptID)) {
            const apiUrl = API_URLS.GET_ATTEMPT_INFO;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.post(apiUrl,
                {
                    attempt_id: attemptID
                },
                config
            )

                .then((resp) => {
                    const serverData = resp.data;
                    localStorage.setItem("viewingData", JSON.stringify(serverData.data))
                    
                    setQuestionQuantity(serverData.data.question_list.length)

                    const currentQuestion = serverData.data.question_list[parseInt(id) - 1]
                    setQuestionText(currentQuestion.title)
                    setPictureURL(currentQuestion.picture)
                    setVariants(currentQuestion.answers)

                    setCorrectAnswers(serverData.data.correct_answers[id])
                    setUserAnswers(serverData.data.user_answers[id])
                    

                })
                .catch(resp => {
                    
                })
        }
        else {
            setQuestionQuantity(viewingData.question_list.length)

            const currentQuestion = viewingData.question_list[parseInt(id) - 1]
            setQuestionText(currentQuestion.title)
            setPictureURL(currentQuestion.picture)
            setVariants(currentQuestion.answers)

            setCorrectAnswers(viewingData.correct_answers[id])
            setUserAnswers(viewingData.user_answers[id])
        }

    }, [])


    function computeVariant(variantID) {
        let styles = "outline-dark disabled"
        if (userAnswers.indexOf(variantID) != -1 && correctAnswers.indexOf(variantID) != -1) {
            styles = "my-test-card-disabled"
        }
        else if (userAnswers.indexOf(variantID) == -1 && correctAnswers.indexOf(variantID) != -1) {
            styles = "my-test-card-disabled-outline"
        }
        else if (userAnswers.indexOf(variantID) != -1 && correctAnswers.indexOf(variantID) == -1) {
            styles = "my-test-card-danger"
        }
        return styles

    }

    
    

    return (
        <>
            <div className='border-start border-end'>
                <AppNavbar />
            </div>
            <div className="container-fluid border-start border-end" style={{ minHeight: "80vh" }}>
                <div className="row">
                    <div className='col'>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <button className="btn btn-dark fw-bold my-3 mx-md-2 mx-lg-4" onClick={() => setShowNavigation(!showNavigation)}>
                                Навигация <img width={"20px"} src={navigationImage} /></button>
                        </div>
                        <div>
                            <Offcanvas
                                show={showNavigation} onHide={() => setShowNavigation(!showNavigation)}>
                                <Offcanvas.Header closeButton className="border-bottom">
                                    <Offcanvas.Title className="px-3 fw-bold fs-4">Навигация</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <TestNavbar questions_quantity={questionQuantity} completed={[]} viewing={true} />
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>

                    </div>
                    <div className="col-lg-6">
                        <motion.div
                            initial={
                                {
                                    opacity: 0
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                }}
                            transition={{
                                duration: 0.7,
                                ease: "linear"
                            }}>

                            <Card className='my-3'  >

                                <div>
                                    <Card.Img variant="top" src={pictureURL ? SERVER_HOST + pictureURL : greyImage} />
                                    <Card.Body>
                                        <Card.Title>{ }</Card.Title>
                                        <Card.Text>
                                            <h5>{id}. {questionText}</h5>
                                        </Card.Text>
                                    </Card.Body>

                                    <ListGroup className="list-group-flush">
                                        {variants.map((variant) => (
                                            <ListGroup.Item>
                                                <button className={`w-100 btn ${computeVariant(variant.id)}`}>
                                                    {variant.text}
                                                </button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {id == questionQuantity ?
                                            <>
                                                {parseInt(id) - 1 ? <Button style={{ color: "white" }} className="w-50 my-test-card me-1 d-flex align-items-center justify-content-center" variant='' href={`/viewing/${attemptID}/${parseInt(id) - 1}/`}>Назад</Button> : <></>}
                                                <Button onClick={() => { localStorage.removeItem("viewingData") }} style={{ color: "white" }} className="w-50 my-test-card ms-1" variant=' ' href={`/`}>Завершить просмотр</Button>
                                            </>
                                            :
                                            <>
                                                {parseInt(id) - 1 ? <Button style={{ color: "white" }} className="w-50 my-test-card me-1" variant='' href={`/viewing/${attemptID}/${parseInt(id) - 1}/`}>Назад</Button> : <></>}
                                                <Button style={{ color: "white" }} className="w-50 my-test-card ms-1" variant='' href={`/viewing/${attemptID}/${parseInt(id) + 1}/`}>Далее</Button>
                                            </>
                                        }
                                    </Card.Body>
                                </div>


                            </Card>
                        </motion.div>
                    </div>
                    <div className="col"></div>

                </div>
            </div>
            <Footer />
        </>

    );
}