import React, { useEffect, useState } from 'react';
import { FC, MouseEvent, ChangeEvent } from 'react';

import PopUpModal from './PopUpModal';
import ResultCard from './ResultCard';

import './style.css'

// List of Quiz Questions
export type QuizQuestions = {
    id: number,
    questions: string,
    answer_options: {
        
            a: string,
            b: string,
            c: string,
            d: string,
           
    }
    correct_answer: string,
    selected_answer: string|null
}


export const quizQuestion: QuizQuestions[] = [
    {
        id: 0,
        questions: "Which is the largest animal in the world?",
        answer_options: {
            a: "Shark",
            b: "Blue Whale",
            c: "Elephant",
            d: "Giraffe",
        },
        correct_answer: "b",
        selected_answer: null
    },
    {
        id: 1,
        questions: "Which is the smallest continent in the world?",
        answer_options: {
            a: "Asia",
            b: "Australia",
            c: "Europe",
            d: "Africa",
        },

        correct_answer: "b",
        selected_answer: null
    },
    {
        id: 2,
        questions: "Which is the largest desert in the world?",
        answer_options: {
            a: "Kalahari",
            b: "Gobi",
            c: "Antarctica",
            d: "Sahara",
        },
        correct_answer: "c",
        selected_answer: null
    },
    {
        id: 3,
        questions: "Which country has the largest population in the world?",
        answer_options: {
            a: "China",
            b: "Bangladesh",
            c: "Canada",
            d: "Nepal",
        },
        correct_answer: "a",
        selected_answer: null,        
    }
];

    
const QuizContent:FC = () => {

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestions[]>(quizQuestion);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string|null>(null);
    const [score, setScore] = useState<number>(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalText, setModalText] = useState<any>();
    const [modalHTML, setModalHTML] = useState<any>();
    const [modalColor, setModalColor] = useState<any>();

    // let nextButton = document.querySelector<HTMLButtonElement>("#next-button");
    // let previousButton = document.querySelector<HTMLButtonElement>("#previous-button");
    // let submitButton = document.querySelector<HTMLButtonElement>("#submit-button");

    const handleStart = () => {

        const resetQuestions = quizQuestion.map(q => ({
            ...q,
            selected_answer: null // Reset all selected answers
        }));

        setQuizQuestions(resetQuestions);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setOpenModal(false);
        setQuizComplete(false);
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    const HandleNextButton = () => {
        
        if(currentIndex<quizQuestion.length-1){
            setCurrentIndex(currentIndex+1);
            console.log(currentIndex); 
        }
    }

    const HandlePreviousButton = () => {
        if(currentIndex>0){
            setCurrentIndex(currentIndex-1);
            console.log(currentIndex); 
        }
    }

    const handleSubmit = () => {

        if(selectedAnswer){
            quizQuestion[currentIndex].selected_answer = selectedAnswer;
            if(selectedAnswer === quizQuestion[currentIndex].correct_answer){
                setScore(score+1);
            }
            
            if(currentIndex < (quizQuestion.length - 1)){
                setCurrentIndex(currentIndex+1);
                setSelectedAnswer(null);
                //quizQuestion[currentIndex].selected_answer = selectedAnswer;
            }

            const allQuestionsAnswered = quizQuestion.every(q=>q.selected_answer !== null);

            if(allQuestionsAnswered){
                setQuizComplete(true);
            }else{
                setQuizComplete(false);
            }
   
            
        }

        handleModal();
    }

    const handleSelectedAnswer = (e: ChangeEvent<HTMLInputElement>, questionID: number, selectedOption: string) => {
        setSelectedAnswer(e.target.value);
        console.log(selectedAnswer);
        // console.log("Selected Answer: "+selectedAnswer)
        setQuizQuestions(prevQuestions => prevQuestions.map(q=>q.id === questionID ? {...q, selected_answer: selectedOption}:q));
    }

    const handleModal = () => {
        setOpenModal(true);

        console.log(quizQuestion[currentIndex].selected_answer);

        if(!selectedAnswer){
            setModalText("Please Select An Answer");
            setModalHTML(<i className="far fa-list-alt" aria-hidden="true"></i>);
            setModalColor("rgb(83, 141, 215)");
        }else{
            if(selectedAnswer === quizQuestion[currentIndex].correct_answer){
                setModalText("Correct Answer");
                setModalHTML(<i className="fas fa-check-circle" aria-hidden="true"></i>);
                setModalColor("rgb(37, 211, 102)");            
            }
    
            if(selectedAnswer !== quizQuestion[currentIndex].correct_answer){
                setModalText("Incorrect Answer");
                setModalHTML(<i className="far fa-times-circle" aria-hidden="true"></i>);
                setModalColor("rgb(245, 130, 157)");             
            }
        }
    }


    useEffect(()=>{
        handleStart();
    }, []);

    return (
        <>
        {
            !quizComplete ? (
            <>
                <div className={`quiz-container ${openModal ? "blur": null}`} id="quiz-container">
                    <div className="quiz-container-content">
                        <div className="quiz-header">
                            <h1>MCQ Quiz</h1>
                            <p>
                                Your Score is : <b id="scorecard">
                                    <b id="score_obtained">{ score }</b>/<b id="total_score">{ quizQuestion.length }</b></b>
                            </p>
                        </div>
                        <div className="quiz-body" id="quiz-body">
                            <div className="quiz-info" >
                                <h2 id="question">{ quizQuestion[currentIndex].questions }</h2>
                                <ul>
                                    {
                                        Object.entries(quizQuestion[currentIndex].answer_options).map(([key, value])=>(
                                            <li key={key}>
                                                <input type="radio" name="answer" id={key} value={key} checked={quizQuestions[currentIndex].selected_answer === key} onChange={ (e)=>handleSelectedAnswer(e, quizQuestion[currentIndex].id, key) } className="answer" />
                                                <label htmlFor={key} id="a_text">{ value }</label>
                                            </li>
                                        ))
                                    }

                                </ul>
                                <button className="btn" id="submit-button" onClick={handleSubmit} disabled={quizQuestion[currentIndex].selected_answer != null}>Submit Answer</button>
                            </div>
                        </div>
                        <div className="button-div">
                            <button className="btn" id="previous-button" onClick={HandlePreviousButton} disabled={currentIndex === 0}>Previous</button>
                            <button className="btn" id="next-button" onClick={HandleNextButton} disabled={currentIndex === quizQuestion.length-1}>Next</button>
                        </div>
                    </div>
                </div>
                <PopUpModal modalText={modalText} modalHTML={modalHTML} modalColor={modalColor} modalActive={openModal} closeModal={setOpenModal} />
            </>
            ) : <ResultCard score={score} total={quizQuestions.length} restart={handleRefresh} questions={quizQuestion} />
        }

        </>
    )
}

export default QuizContent