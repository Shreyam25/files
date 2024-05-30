// src/QuestionCarousel.js
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';  // Ensure this path is correct
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

const QuestionCarousel = () => {
  const [questions, setQuestions] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recruiter', 'OnbAW1GM7nbZLBwe13coFOM8h9h2', 'job_postings', 'A1f7nNqMPIl3eepOkT3z', 'recommendations', '5GhrIjLyypZGF3UYFin37fvhDj82', 'questions'));
        const questionsData = [];
        querySnapshot.forEach((doc) => {
          questionsData.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleResponseChange = (questionId, response) => {
    setUserResponses({
      ...userResponses,
      [questionId]: response,
    });
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save responses to Firestore
      try {
        for (const questionId in userResponses) {
          const questionRef = doc(db, 'recruiter', 'OnbAW1GM7nbZLBwe13coFOM8h9h2', 'job_postings', 'A1f7nNqMPIl3eepOkT3z', 'recommendations', '5GhrIjLyypZGF3UYFin37fvhDj82', 'questions', questionId);
          await updateDoc(questionRef, {
            user_response: userResponses[questionId],
          });
        }
        alert('Responses saved successfully!');
      } catch (error) {
        console.error('Error saving responses:', error);
      }
    }
  };

  return (
    <div>
      <SwipeableViews index={currentIndex}>
        {questions.map((question) => (
          <Card key={question.id} style={{ padding: '20px', margin: '20px' }}>
            <CardContent>
              <Typography variant="h5">{question.question}</Typography>
              <RadioGroup
                value={userResponses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              >
                {Object.entries(question.options).map(([optionKey, optionValue]) => (
                  <FormControlLabel
                    key={optionKey}
                    value={optionValue}
                    control={<Radio />}
                    label={optionValue}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </SwipeableViews>
      <Button variant="contained" onClick={handleNext}>
        {currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </Button>
    </div>
  );
};

export default QuestionCarousel;
