import React, { useState, useEffect } from 'react';

const TypedHTMLContent = ({ html, speed = 50 }: {html:any, speed: any}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < html.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prevContent => prevContent + html[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [html, currentIndex, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: displayedContent }} />
      {showCursor && currentIndex < html.length && (
        <span className="typing-cursor">|</span>
      )}
    </div>
  );
};

export default TypedHTMLContent;