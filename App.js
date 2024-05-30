// src/App.js
import React from 'react';
import QuestionCarousel from './QuestionCarousel';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Screening Test
      </Typography>
      <QuestionCarousel />
    </Container>
  );
}

export default App;
