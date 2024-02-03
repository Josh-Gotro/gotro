import { useState, useEffect, useCallback } from 'react';
import {
  useFetchCurrentCeramicFiring,
  usePostCeramicFiring,
} from '../../../useApi';

import { questions } from './ceramicKilnQuestions';

const KilnCeramic = () => {
  const [answers, setAnswers] = useState({ cone_type: '6' });
  const [recordId, setRecordId] = useState(null);

  const [currentCeramicFiring, isFetching] = useFetchCurrentCeramicFiring();
  const postCeramicFiring = usePostCeramicFiring();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // populate the answers state with the currentCeramicFiring data
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (currentCeramicFiring) {
      setRecordId(currentCeramicFiring.id);

      // Only set non-null values to the answers state
      const nonNullAnswers = Object.entries(currentCeramicFiring)
        // eslint-disable-next-line no-unused-vars
        .filter(([key, value]) => value != null)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      setAnswers(nonNullAnswers);

      const completed = questions.filter(
        (q) => currentCeramicFiring[q.key] != null
      );
      setCompletedQuestions(
        completed.map((q) => ({
          question: q.text,
          answer: currentCeramicFiring[q.key],
        }))
      );

      const firstUnansweredQuestionIndex = questions.findIndex(
        (q) => currentCeramicFiring[q.key] == null
      );
      if (firstUnansweredQuestionIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredQuestionIndex);
      }
    }
  }, [currentCeramicFiring]);

  // const [records, setRecords] = useState([]);

  const handleAnswerChange = useCallback(
    (event) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[currentQuestionIndex].key]: event.target.value,
        id: recordId,
      }));
    },
    [recordId, currentQuestionIndex]
  );

  const handleNextQuestion = useCallback(async () => {
    setIsLoading(true);

    // Save the answer
    setCompletedQuestions([
      ...completedQuestions,
      {
        question: questions[currentQuestionIndex].text,
        answer: answers[questions[currentQuestionIndex].key],
      },
    ]);

    // Update or create the ceramic kiln firing record
    if (Object.keys(answers).length > 0) {
      const data = { ...answers };
      if (recordId) {
        data.id = recordId;
      }
      await postCeramicFiring(data)
        .then((response) => {
          console.log(response.data);
          if (!recordId && response.id) {
            setRecordId(response.id);
          }
          setIsLoading(false); // Set loading state to false after successful operation
        })
        .catch((error) => {
          console.error(
            'Error updating or creating ceramic kiln firing record:',
            error
          );
          setIsLoading(false); // Set loading state to false even if there was an error
        });
    } else {
      // If there are no answers to post, we still need to set loading to false
      setIsLoading(false);
    }

    // Check if the next question is a time question
    if (
      currentQuestionIndex + 1 < questions.length &&
      questions[currentQuestionIndex + 1].type === 'time'
    ) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[currentQuestionIndex + 1].key]: getCurrentTime(),
      }));
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }, [
    postCeramicFiring,
    answers,
    completedQuestions,
    currentQuestionIndex,
    recordId,
  ]);

  const handleSubmitRecord = useCallback(() => {
    const record = {
      ...answers,
      firing_complete: true,
    };
    if (recordId) {
      record.id = recordId;
    }

    postCeramicFiring(record)
      .then((response) => {
        console.log(response.data);
        // Update recordId with the id returned from the server
        if (!recordId && response.id) {
          setRecordId(response.id);
        }
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    setAnswers({});
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
  }, [answers, recordId, postCeramicFiring]);

  return (
    <div>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            {completedQuestions.map((q, index) => (
              <div key={index} className='question-container'>
                <div className='question-answer-container'>
                  <p className='question-text'>{q.question}:</p>
                  <p className='answer-text'>{q.answer}</p>
                </div>
              </div>
            ))}
            {currentQuestionIndex < questions.length ? (
              <div className='question-input-container'>
                <label className='question-text'>
                  {questions[currentQuestionIndex].text}
                </label>
                {questions[currentQuestionIndex].type === 'select' ? (
                  <select
                    value={answers[questions[currentQuestionIndex].key] || ''}
                    onChange={handleAnswerChange}
                  >
                    <option value=''>Select...</option>
                    {questions[currentQuestionIndex].options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : questions[currentQuestionIndex].type === 'textarea' ? (
                  <textarea
                    value={answers[questions[currentQuestionIndex].key] || ''}
                    onChange={(event) => handleAnswerChange(event)}
                  />
                ) : (
                  <input
                    type={questions[currentQuestionIndex].type}
                    value={answers[questions[currentQuestionIndex].key] || ''}
                    onChange={handleAnswerChange}
                  />
                )}
                <div className='button-container'>
                  <button onClick={handleNextQuestion}>Next</button>
                </div>
              </div>
            ) : (
              <div className='button-container'>
                <button onClick={handleSubmitRecord}>Submit Record</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KilnCeramic;
