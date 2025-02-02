import React, { useEffect, useState } from 'react'
import { FC } from 'react'



type Results = {
    score?: number,
    total?: number,
    restart?: any,
    questions?: any[]|null, 
}

const ResultCard: FC<Results> = ({score, total, restart, questions}) => {

    useEffect(()=>{
        console.log(questions)
    }, []);

    const [showAnswers, setShowAnswers] = useState(false);

    const handleRestart = () => {
        window.location.reload();
        setShowAnswers(false);
    }

    return (
        <>
        {
            !showAnswers ? (
                <>
                    <div className='quiz-container'>
                        <div className="final-answer-container">
                            <div className="final-answer-content">
                                <h2>You Answered {score}/{total} questions correctly</h2>
                                <div className="answer-button-content">
                                    <button className="btn" onClick={restart}>Reload</button>
                                    <button className="btn" onClick={()=>setShowAnswers(true)}>View Results</button>
                                </div>
                            </div>
                        </div>
                    </div>                
                </>
            ) : 
            <>
                <div className='answer-container-inner'>
                    <div className="answer-content">
                        <h2><u>Results</u></h2>
                        <hr />
                        {
                            questions?.map(question=>(
                                <div className="answer-content">
                                    <h3>{ question.questions }</h3>
                                    <br />
                                    <b>Correct Answer: { question.correct_answer }</b>
                                    <br />
                                    <hr />
                                </div>
                            ))
                        }
                                
                        <button className="btn" onClick={handleRestart}>Retake Quiz</button>
                    </div>
                </div>
            </>

        }
        </>
         

        

    )
}

export default ResultCard