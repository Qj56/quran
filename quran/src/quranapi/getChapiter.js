// getChapiter.js
import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const getChaptersList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/chapters`);
        return response.data.chapters;
    } catch (error) {
        console.error('Error fetching chapters:', error);
        return [];
    }
};

// Fonction mise à jour pour obtenir le contenu d'un chapitre en français
export const getChapterContent = async (chapterNumber) => {
    try {
        const config = {
            method: 'get',
            url: `${BASE_URL}/chapters/${chapterNumber}/info`,
            headers: {
                'Accept': 'application/json'
            }
        };
        const response = await axios(config);
        return response.data; // Retourne les données de la réponse
    } catch (error) {
        console.error(`Error fetching content for chapter ${chapterNumber}:`, error);
        return {};
    }
};
