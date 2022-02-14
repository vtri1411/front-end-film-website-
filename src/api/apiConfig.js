const apiConfig = {
	baseUrl: 'https://api.themoviedb.org/3/',
	apiKey: 'e9497e3ec9c64360a071eee0c0225ef5',
	originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
	w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig
