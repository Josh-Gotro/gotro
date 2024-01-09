import { useState, useEffect } from 'react';
import axios from 'axios';

const KilnCeramic = () => {
  const [answers, setAnswers] = useState({});
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    // Fetch the current ceramic kiln firing record when the component mounts
    axios.get('/current-ceramic-firing')
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setAnswers(response.data);
          setRecordId(response.data.id);
        }
      })
      .catch(error => console.error('Error fetching current ceramic kiln firing record:', error));
  }, []);

  useEffect(() => {
    // Update or create the ceramic kiln firing record when the answers state changes
    if (Object.keys(answers).length > 0) {
      const data = { ...answers, id: recordId };
      axios.post('/ceramic-firings', data)
        .then(response => console.log(response.data.message))
        .catch(error => console.error('Error updating or creating ceramic kiln firing record:', error));
    }
  }, [answers, recordId]);

  const questions = [
    {
      id: 1,
      text: 'Select Cone',
      options: ["020"],
      type: 'select',
    },
    {
      id: 2,
      text: 'What is the room temp?',
      type: 'text',
    },
    {
      id: 3,
      text: 'What time did you start the low fire?',
      type: 'time',
    },
    {
      id: 4,
      text: 'Loading Notes?',
      type: 'textarea',
    },
    {
      id: 5,
      text: 'What time did you start the medium fire?',
      type: 'time',
    },
    {
      id: 6,
      text: 'What time did you start the high fire?',
      type: 'time',
    },
    {
      id: 7,
      text: 'About what time did the kiln turn off?',
      type: 'text',
    },
    {
      id: 8,
      text: 'Unloading Notes?',
      type: 'textarea',
    },
    // Add more questions here
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [records, setRecords] = useState([]);

  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: event.target.value
    });
  };

  const handleNextQuestion = () => {
    // Stub for saving the answer
    console.log('Saving answer:', answers[questions[currentQuestionIndex].id]);

    setCompletedQuestions([
      ...completedQuestions,
      {
        question: questions[currentQuestionIndex].text,
        answer: answers[questions[currentQuestionIndex].id],
      },
    ]);

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitRecord = () => {
    // Stub for marking the record as complete
    console.log('Completing record:', answers);

    // Stub for fetching the updated records
    setRecords([...records, answers]);
  };

  return (
    <div>
      <div>
        {completedQuestions.map((q, index) => (
          <div key={index}>
            <p>{q.question}: {q.answer}</p>
          </div>
        ))}
        {currentQuestionIndex < questions.length ? (
          <div>
            <label>{questions[currentQuestionIndex].text}</label>
            {questions[currentQuestionIndex].type === 'select' ? (
              <select value={answers[questions[currentQuestionIndex].id] || ''} onChange={handleAnswerChange}>
                <option value="">Select...</option>
                {questions[currentQuestionIndex].options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : questions[currentQuestionIndex].type === 'textarea' ? (
              <textarea value={answers[questions[currentQuestionIndex].id] || ''} onChange={handleAnswerChange} />
            ) : (
              <input type={questions[currentQuestionIndex].type} value={answers[questions[currentQuestionIndex].id] || ''} onChange={handleAnswerChange} />
            )}
            <button onClick={handleNextQuestion}>Next</button>
          </div>
        ) : (
          <button onClick={handleSubmitRecord}>Submit Record</button>
        )}
      </div>
      <div>
        {records.map((record, index) => (
          <div key={index}>
            {/* Display the record */}
            <pre>{JSON.stringify(record, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KilnCeramic;