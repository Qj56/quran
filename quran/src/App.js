import React, {useState, useEffect} from 'react';
import gsap from 'gsap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getChaptersList, getChapterContent} from './quranapi/getChapiter';

function App() {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        getChaptersList().then(chapters => {
            // Initialiser chaque chapitre avec un état retourné à false
            const initializedChapters = chapters.map(chapter => ({
                ...chapter,
                isFlipped: false,
                content: '' // Contenu initial vide
            }));
            setChapters(initializedChapters);
        });
    }, []);

    const handleChapterSelect = async (index) => {
        const newChapters = [...chapters];
        const cardElement = document.getElementById(`card-${newChapters[index].id}`);
        if (cardElement) {
            if (!newChapters[index].isFlipped) {
                const chapterContent = await getChapterContent(newChapters[index].number);
                newChapters[index].content = chapterContent.text; // or the appropriate structure from your API
                // Animate card flip to back
                gsap.to(cardElement, {rotationY: 180, transformOrigin: "center"});
            } else {
                // Animate card flip to front
                gsap.to(cardElement, {rotationY: 0, transformOrigin: "center"});
            }
            // Toggle the flipped state
            newChapters[index].isFlipped = !newChapters[index].isFlipped;
            setChapters(newChapters);
        } else {
            console.error(`No element found with id card-${newChapters[index].id}`);
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                <div className="container mt-5">
                    <div className="row">
                        {chapters.map((chapter) => (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={chapter.id}>
                                <div
                                    id={`card-${chapter.id}`}
                                    className="card"
                                    onClick={() => {
                                        if (chapter.id !== undefined) {
                                            handleChapterSelect(chapter.id);
                                        } else {
                                            console.error(`Chapter id is undefined for chapter ${chapter.name_simple}`);
                                        }
                                    }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{chapter.name_simple}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Chapter: {chapter.id}</h6>
                                        <p className="card-text">{chapter.translated_name.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
