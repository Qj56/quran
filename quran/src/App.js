// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { getChapters } from './quranapi/getChapiter';

function App() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getChapters().then(data => {
      if (data && data.chapters) {
        setChapters(data.chapters);
      }
    });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          {/* Affiche une liste de chapitres */}
          <ul>
            {chapters.map(chapter => (
                <li key={chapter.id}>
                  {/* Remplacer 'url-to-chapter' par l'URL appropriée */}
                  <a href={`url-to-chapter/${chapter.id}`}>{chapter.name}</a>
                </li>
            ))}
          </ul>
        </header>
      </div>
  );
}

export default App;
