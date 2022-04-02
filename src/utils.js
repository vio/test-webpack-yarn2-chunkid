const API_BASE_URL = 'https://api.github.com';

export const fetcher = (url) => fetch(`${API_BASE_URL}${url}`).then((res) => res.json());
