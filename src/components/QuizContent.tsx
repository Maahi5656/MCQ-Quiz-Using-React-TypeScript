import React, { useState } from 'react';
import { FC } from 'react';

import './style.css'

// List of Quiz Questions


let quizQuestion = [
    {
        id: 0,
        question: "Which is the largest animal in the world?",
        options: {
            a: "Shark",
            b: "Blue Whale",
            c: "Elephant",
            d: "Giraffe",
        },
        correct: "b",
        selected: null
    },
    {
        id: 1,
        question: "Which is the smallest continent in the world?",
        options: {
            a: "Asia",
            b: "Australia",
            c: "Europe",
            d: "Africa",
        },

        correct: "b",
        selected: null
    },
    {
        id: 2,
        question: "Which is the largest desert in the world?",
        options: {
            a: "Kalahari",
            b: "Gobi",
            c: "Antarctica",
            d: "Sahara",
        },
        correct: "c",
        selected: null
    },
    {
        id: 3,
        question: "Which country has the largest population in the world?",
        options: {
            a: "China",
            b: "Bangladesh",
            c: "Canada",
            d: "Nepal",
        },
        correct: "a",
        selected: null,        
    }
];


const QuizContent:FC = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    return (
        <div className="quiz-container" id="quiz-container">
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
                        <h2 id="question">Question Text</h2>
                        <ul>
                            <li>
                                <input type="radio" name="answer" id="a" className="answer" />
                                <label htmlFor="a" id="a_text">Answer</label>
                            </li>
                            <li>
                                <input type="radio" name="answer" id="b" className="answer" />
                                <label htmlFor="b" id="b_text">Answer</label>
                            </li>
                            <li>
                                <input type="radio" name="answer" id="c" className="answer" />
                                <label htmlFor="c" id="c_text">Answer</label>
                            </li>
                            <li>
                                <input type="radio" name="answer" id="d" className="answer" />
                                <label htmlFor="d" id="d_text">Answer</label>
                            </li>
                        </ul>
                        <button className="btn" id="submit-button">Submit Answer</button>
                    </div>
                </div>
                <div className="button-div">
                    <button className="btn" id="previous-button">Previous</button>
                    <button className="btn" id="next-button">Next</button>
                </div>
            </div>
        </div>
    )
}

export default QuizContent