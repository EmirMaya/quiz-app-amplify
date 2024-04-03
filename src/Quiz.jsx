import React, {useState} from 'react';
import quizData from './quizData';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswerOptionClick = (option) => {
        const correctAnswer = quizData[currentQuestion].answer;
        setSelectedAnswer(option);
        if(option === correctAnswer) {
            setScore(score +1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizData.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer('');
                setIsCorrect(null);
            } else {
                setShowScore(true);
            }
        }, 1000)
    }
  return (
    <div className='m-auto p-5 bg-slate-400'>
      {showScore ? (
        <div className=''>
            You scored {score} out of {quizData.length}
        </div>
      ) : (
        <>
        <div>
            <div>
                <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div>{quizData[currentQuestion].question}</div>
        </div>
        <div>
            {quizData[currentQuestion].options.map((option) => (
                <button
                onClick={() => handleAnswerOptionClick(option)}
                key={option.id}
                style={{ backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '' }}
                >
                    {option}
                </button>
            ))}
        </div>
        {selectedAnswer && (
            <div className='mt-2'>
                {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
        )}
        </>
      )}
    </div>
  )
}

export default Quiz;