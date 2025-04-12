import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { getTestResult, nextQuestion, prevQuestion, SERVER_HOST } from '../Utils/constants'
import './Card.css';




function AppCard(props) {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 992px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 992px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);


    const id = props.id
    const testID = props.testID
    const variants = props.variants;
    const questionsQuantity = props.questionsQuantity

    const userAnswers = props.userAnswers
    const active = props.active.slice()


    function addAnswer(questionId, pos) {
        let newActive = active.slice();

        if (newActive.indexOf(pos) != -1) {
            newActive.splice(newActive.indexOf(pos), 1);
        }
        else {
            newActive.push(pos);
        }
        let ans = Object.assign({}, userAnswers)
        console.log('before', ans)
        ans[questionId] = newActive.slice();
        console.log('ans', ans)
        props.setActive(newActive)
        props.setAnswers(ans)
    }



    
    

    return (
        <Card style={{width: matches ? '100%' : '100%'}} className='my-1 my-md-3'>
            <div className=''>
                <Card.Img variant="top" src={props.picture ? SERVER_HOST + props.picture : "https://avatars.mds.yandex.net/i?id=dc7cbd3877e56749ab41a0fcc5145434_l-5231880-images-thumbs&n=13"} />
                <Card.Body>
                    <Card.Title>{ }</Card.Title>
                    <Card.Text>
                        <h5>{id}. {props.question.title}</h5>
                    </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                    {variants.map((variant) => (
                        <ListGroup.Item>
                            <Button className="w-100"
                                variant={(active.indexOf(variant.id) != -1) ? "dark" : "outline-dark"}
                                onClick={() => { addAnswer(id, variant.id); }}>{variant.text}
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        questionsQuantity == id ?
                            <>
                                {parseInt(id) - 1 ? <Button onClick={() => { props.sendAnswers();  window.location.href = prevQuestion(testID, id)}}
                                    className="w-50 my-test-card me-1">Назад</Button> : <></>}
                                <Button style={{color: "white"}} onClick={() => { props.sendAnswers(); props.finishTest(); window.location.href = getTestResult(testID) }}
                                 className="w-50 ms-1 my-test-card" variant=' ' >Завершить тест</Button>
                            </>
                            :
                            
                            <>
                                {parseInt(id) - 1 ? <Button onClick={() => { props.sendAnswers();  window.location.href = prevQuestion(testID, id)}}
                                    className="w-50 my-test-card me-1">Назад</Button> : <></>}
                                <Button onClick={() => { props.sendAnswers();  window.location.href = nextQuestion(testID, id)}}
                                    className="w-50 my-test-card ms-1">Далее</Button>
                            </>   
                             
                    }



                </Card.Body>

            </div>

        </Card>

    );


}


//

//href={id == questionsQuantity ? `/${testID}/results/` : `/card/${testID}/${id ? parseInt(id) + 1 : 1}/`} 

export default AppCard;