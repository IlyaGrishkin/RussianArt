import axios from "axios";
 

export const testDurations = ['0-5', '5-10', '10-15', '15-30']
export const testDurationsStrToNums = {
    '0-5': [0, 1, 2, 3, 4],
    '5-10': [5, 6, 7, 8, 9],
    '10-15': [10, 11, 12, 13, 14],
    '15-30': [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}

export const questionsNumber = ['0-10', '10-15', '15-20', '20-30']
export const questionsNumberStrToNum = {
    '0-10': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    '10-15': [10, 11, 12, 13, 14],
    '15-20': [15, 16, 17, 18, 19],
    '20-30': [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}

export const BootstrapBreakpoints = {
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400
}


export const SERVER_HOST  = "http://127.0.0.1:8000"
export const CLIENT_HOST = "http://localhost:3000"


function getTopics() {
    let res = []
    const apiUrl = `${SERVER_HOST}/api/v1/tests/subjects/get`
    axios.get(apiUrl).then((resp) => {
        const serverData = resp.data.data.items
        for (let obj of serverData) {
            res.push(obj.subject)
        } 
        })
    return res
}

export const topics = {
    TOPICS: getTopics(),
    LENGTH: 3,
}


export const URLS = {
    HOME: `${CLIENT_HOST}`,
    FINISH_TEST: "",
    TEST_RESULT: `${CLIENT_HOST}/results/`,
    LOGIN_CHECK: `${CLIENT_HOST}/login/check/`,
    SIGNUP: `${CLIENT_HOST}/signup/`,
    SIGNUP_CONFIRM: `${CLIENT_HOST}/signup/confirm/`,
    GUIDE_CARDS: `${CLIENT_HOST}/guide-cards/`,
    ALL_TESTS: `${CLIENT_HOST}/tests/`,
    LOGOUT: `${CLIENT_HOST}/logout/`,
    CHANGE_PROFILE: `${CLIENT_HOST}/profile/change/`,
    PROFILE: `${CLIENT_HOST}/profile/`
}



export const API_URLS = {
    GET_ALL_TESTS: `${SERVER_HOST}/api/v1/tests/`,
    GET_ALL_CARDS: `${SERVER_HOST}/api/v1/guide/`,

    FINISH_TEST: `${SERVER_HOST}/api/v1/tests/attempt/end`,
    GET_TEST_RESULT: `${SERVER_HOST}/api/v1/tests/attempt/result`,
    CREATE_TEST: `${SERVER_HOST}/api/v1/tests/attempt/create`,
    UPDATE_TEST: `${SERVER_HOST}/api/v1/tests/attempt/update`,

    GET_INFO: `${SERVER_HOST}/api/v1/customers/get_info`,
    GET_ATTEMPT_INFO: `${SERVER_HOST}/api/v1/tests/attempt/info`,

    GET_CONFIRM: `${SERVER_HOST}/api/v1/customers/get/confirm`,
    CREATE_CONFIRM: `${SERVER_HOST}/api/v1/customers/create/confirm`,
    GET_SEND_CODE: `${SERVER_HOST}/api/v1/customers/get/send_code`,
    CREATE_SEND_CODE: `${SERVER_HOST}/api/v1/customers/create/send_code`,
    GET_TEST_SESSION: `${SERVER_HOST}/api/v1/tests/test_session/get_test_id`,
    UPDATE_PROFILE: `${SERVER_HOST}/api/v1/customers/customer_update`,
    SEARCH_CARD: `${SERVER_HOST}/api/v1/guide/search`
}

export function getUserAttempts(testID) {
    return `${SERVER_HOST}/api/v1/tests/${testID}/attempts/user`
}


export function startTest(testID) {
    return `${CLIENT_HOST}/card/${testID}/1/`
}

export function getTestResult() {
    return `${CLIENT_HOST}/results/`
}

export function getGuideCardData(ID) {
    return `${SERVER_HOST}/api/v1/guide/${ID}`
}

export function getGuideCard(ID) {
    return `${CLIENT_HOST}/guide-card/${ID}/`
}

export function getTest(testID){
    return `${SERVER_HOST}/api/v1/tests/${testID}`
}

export function nextQuestion(testID, id) {
    return `${CLIENT_HOST}/card/${testID}/${parseInt(id) + 1}/`
}

export function prevQuestion(testID, id) {
    return `${CLIENT_HOST}/card/${testID}/${parseInt(id) - 1}/`
}


export function goToQuestion(testID, id) {
    return `${CLIENT_HOST}/card/${testID}/${parseInt(id)}/`
}