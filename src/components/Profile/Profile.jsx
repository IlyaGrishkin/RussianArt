import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { API_URLS, SERVER_HOST, startTest, URLS } from "../Utils/constants";
import AppNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import mailImage from './mail.svgz'


export function Profile() {
    const [avatar, setAvatar] = useState("")
    const [email, setEmail] = useState("")
    const [regDate, setRegDate] = useState("")
    const [name, setName] = useState("")
    const [testList, setTestList] = useState([])
    const [runningTest, setRunningTest] = useState(false)
    const [noToken, setNoToken] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            const apiUrl = API_URLS.GET_INFO;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.post(apiUrl,
                {},
                config
            )
            .then(resp => {
                const serverData = resp.data;
                console.log(serverData)
                setAvatar(SERVER_HOST + serverData.data.avatar_path)
                setEmail(serverData.data.user_email)
                const date = new Date(serverData.data.user_created_at)
                setRegDate(`${date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate()}.${String(date.getMonth()).length == 1 ? "0" + String(date.getMonth() + 1) : parseInt(date.getMonth()) + 1}.${date.getFullYear()}`)
                setName(serverData.data.user_name)
                setTestList(serverData.data.user_attempts.slice(0, 10))
            })
            .catch(resp => {
                console.log(resp)
            })

            }
        else {
            setNoToken(true)
        }
        
    }, [])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            const apiUrl = API_URLS.GET_TEST_SESSION;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.get(apiUrl,
                config
            )
            .then(resp => {
                const serverData = resp.data;
                console.log('running test', serverData)
                setRunningTest(serverData.data.test_id)
            })
            .catch(resp => {
                console.log(resp)
            })

            }
       
        
    }, [])

    let dataSource = []

    for (let obj of testList) {
        let newObj = {}
        newObj.result = <a href={`/viewing/${obj.attempt_id}/1/`}>{`${obj.total_score}/${obj.question_count}`}</a>
        newObj.test = obj.test_title
        newObj.timeSpent = obj.time_spent
        const date = new Date(obj.end_time)   
        newObj.endTime = `${date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate()}.${String(date.getMonth()).length == 1 ? "0" + String(date.getMonth() + 1) : parseInt(date.getMonth()) + 1}.${date.getFullYear()}`
        dataSource.push(newObj)
    }


        
      const columns = [
        {
          title: 'Результат',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: 'Тест',
          dataIndex: 'test',
          key: 'test',
        },
        {
          title: 'Время прохождения',
          dataIndex: 'timeSpent',
          key: 'timeSpent',
        },
        {
            title: 'Дата прохождения',
            dataIndex: 'endTime',
            key: 'endTime',
          },
      ];
    
     
      

    if (noToken) {
        window.location.href = URLS.SIGNUP
    }
    else {
        return (
            <>  
                <div className="border-start border-end">
                    <AppNavbar/>
                </div>
                <div className="container-fluid border-start border-end pt-3 px-4">
                    <div className="row">
                        <h1 className="fw-bold fs-1">Профиль</h1>
                    </div>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-md-5">
                            <img style={{width: 100 + "%", borderRadius: 4 + "%"}} src={avatar}/>
                        </div>

                        <div className="col-12 col-md-6 d-flex justify-content-center mt-5 mt-md-3">
                            <div style={{overflowX: "auto"}}>
                                <h2 className="mb-4 fw-bold fs-1">{name}</h2>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <img src={mailImage} style={{width: "30px", paddingBottom: "2px"}}/>
                                    <h5 className="fw-bold fs-2"> {email}</h5>
                                </div>
                                <h5 className="fw-bold mb-3">Дата регистрации: {regDate}</h5>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-dark" onClick={() => window.location.href = URLS.CHANGE_PROFILE}>Редактировать профиль</button>
                                    <button className="btn btn-danger ms-2" onClick={() => window.location.href = URLS.LOGOUT}>Выйти из аккаунта</button>
                                </div>
                                {runningTest && <button className="btn btn-success d-block mt-3" onClick={()=>{}}>Продожить попытку</button>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 py-4 border-top">
                        <h2 className="mb-3">Ваши попытки</h2>
                        <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{x: 600}}/>
                    </div>

                    
                    
                </div>
                <Footer/>
            </>
        )
    }
    
}