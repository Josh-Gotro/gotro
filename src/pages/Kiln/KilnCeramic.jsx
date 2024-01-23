import { useState, useEffect } from 'react';
import {
  useFetchCurrentCeramicFiring,
  usePostCeramicFiring,
} from '../../../useApi';

const KilnCeramic = () => {
  const [answers, setAnswers] = useState({});
  const [recordId, setRecordId] = useState(null);

  const currentCeramicFiring = useFetchCurrentCeramicFiring();
  const postCeramicFiring = usePostCeramicFiring();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);

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

  // wrap in useMemo Hook
  const questions = [
    {
      id: 1,
      text: 'Select Cone',
      options: ['020', '04', '05', '6', 'other'],
      type: 'select',
      key: 'cone_type',
    },
    {
      id: 2,
      text: 'What is the room temp?',
      type: 'text',
      key: 'room_temp',
    },
    {
      id: 3,
      text: 'What time did you start the low fire?',
      type: 'time',
      key: 'low_fire_start_time',
    },
    {
      id: 4,
      text: 'Loading Notes?',
      type: 'textarea',
      key: 'loading_notes',
    },
    {
      id: 5,
      text: 'What time did you start the medium fire?',
      type: 'time',
      key: 'medium_fire_start_time',
    },
    {
      id: 6,
      text: 'What time did you start the high fire?',
      type: 'time',
      key: 'high_fire_start_time',
    },
    {
      id: 7,
      text: 'About what time did the kiln turn off?',
      type: 'text',
      key: 'kiln_turn_off_time',
    },
    {
      id: 8,
      text: 'Unloading Notes?',
      type: 'textarea',
      key: 'unloading_notes',
    },
    {
      id: 9,
      text: 'Rate this firing',
      type: 'select',
      key: 'rating',
      options: ['positive', 'neutral', 'negative'],
    },
  ];

  // const [records, setRecords] = useState([]);

  const handleAnswerChange = (event) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].key]: event.target.value,
      id: recordId,
    }));
  };

  const handleNextQuestion = async () => {
    // Save the answer
    console.log('Saving answer:', answers[questions[currentQuestionIndex].key]);

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
        })
        .catch((error) =>
          console.error(
            'Error updating or creating ceramic kiln firing record:',
            error
          )
        );
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitRecord = () => {
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
  };

  return (
    <div>
      <div>
        {completedQuestions.map((q, index) => (
          <div key={index}>
            <p>
              {q.question}: {q.answer}
            </p>
          </div>
        ))}
        {currentQuestionIndex < questions.length ? (
          <div>
            <label>{questions[currentQuestionIndex].text}</label>
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
            <button onClick={handleNextQuestion}>Next</button>
          </div>
        ) : (
          <button onClick={handleSubmitRecord}>Submit Record</button>
        )}
      </div>
    </div>
  );
};

export default KilnCeramic;
