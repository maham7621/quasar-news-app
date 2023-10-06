import axios from 'axios';

const apiKey =
  process.env.VUE_APP_NEWS_API_KEY || '3aadce49c9854223a788300cafdd6a9c';
const baseUrl = 'https://newsapi.org/v2/top-headlines';

export const getNews = async (searchTerm: string, page: number) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: searchTerm,
        language: 'en',
        pageSize: 10,
        page,
      },
      headers: {
        Authorization: `${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    alert('Error fetching news article');
    return [];
  }
};

export const getSources = async () => {
  try {
    const response = await axios.get(baseUrl + '/sources', {
      params: {
        language: 'en',
      },
      headers: {
        Authorization: `${apiKey}`,
      },
    });
    return response.data.sources;
  } catch (error) {
    alert('Error fetching news sources');
    return [];
  }
};
