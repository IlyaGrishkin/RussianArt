import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URLS, URLS } from '../Utils/constants';
import AppNavbar from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';



export function TestResults() {
    const { testID } = useParams();
    const [result, setResult] = useState("Загрузка...");
    const [timeSpent, setTimeSpent] = useState('...')
    const [attemptID, setAttemptID] = useState(0)
    const [testName, setTestName] = useState("")

    const [matches, setMatches] = useState(
            window.matchMedia("(min-width: 576px)").matches
        )
    
    useEffect(() => {
            window
                .matchMedia("(min-width: 576px)")
                .addEventListener('change', e => setMatches(e.matches));
        }, []);

    useEffect(() => {
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning")

        const apiUrl = API_URLS.GET_INFO;
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.post(apiUrl,
            {

            },
            config
        )

            .then((resp) => {
                const serverData = resp.data;
                const current = serverData.data.user_attempts[0]
                console.log(serverData.data.user_attempts)
                console.log(current)
                setResult(`${current.total_score}/${current.question_count}`)
                setTestName(current.test_title)
                setTimeSpent(current.time_spent.split('.')[0])
                setAttemptID(current.attempt_id)
                

            })
            .catch(e => {
                window.location.href = URLS.HOME
            })





    }, [])

    return (
        <>
            <div className='border-start border-end'>
                <AppNavbar/>
            </div>
            <div style={{minHeight: "80vh"}} className='border-start border-end d-flex justify-content-center'>
                <div className={matches ?  "py-4 border-start border-end" : 'py-4'}>
                    <div className='w-100 border-bottom px-4'>
                        <h1 className='text-center px-2 fs-1 w-100'>"{testName}"</h1>
                    </div>
                    <div className='d-flex justify-content-center flex-column mt-4'>
                        <h1 className='text-center px-2 fs-2'>Ваш результат: {result}</h1>
                        <h2 className='text-center px-2 fs-2'>Время прохождения: {timeSpent}</h2>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <a href={`/viewing/${attemptID}/1/`} className='btn btn-dark mt-2 w-50'>Просмотр</a>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </>
    )
}


