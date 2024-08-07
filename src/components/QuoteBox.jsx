import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/quotebox.scss';
import { Button } from 'react-bootstrap';

// Helper function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const QuoteBox = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState('#6a0dad');

  const fetchQuote = async () => {
    try {
      const res = await axios.get('https://api.quotable.io/random');
      setQuote(res.data.content);
      setAuthor(res.data.author);
      const newColor = getRandomColor();
      setColor(newColor);
      document.body.style.backgroundColor = newColor;
      document.body.style.color = newColor;
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;

  return (
    <div id="quote-box" className="container bg-light p-4 rounded shadow" style={{ color }}>
      <div id="text" className="quote-text mb-3">{quote}</div>
      <div id="author" className="quote-author mb-3">- {author}</div>
      <Button id="new-quote" onClick={handleNewQuote} className="btn btn-primary me-2">New Quote</Button>
      <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noopener noreferrer" className="btn btn-info">
        Tweet Quote
      </a>
    </div>
  );
};

export default QuoteBox;