console.log("JavaScript file loaded!");
alert("JS works!");
const API_KEY = '1565c7edaa37219495eed55041887dc3';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
// Elements
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');

// Event listener untuk Enter key
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Fungsi utama untuk mendapatkan data cuaca
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Mohon masukkan nama kota');
        return;
    }

    showLoading();
    hideError();
    hideWeatherInfo();

    try {
        // Simulasi data cuaca (karena tidak ada API key asli)
        const mockData = await getMockWeatherData(city);
        displayWeatherData(mockData);
    } catch (err) {
        showError('Terjadi kesalahan saat mengambil data cuaca. Pastikan nama kota benar.');
    }
}

// Fungsi untuk mendapatkan data cuaca mock/simulasi
function getMockWeatherData(city) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Data cuaca simulasi
            const weatherData = {
                name: city.charAt(0).toUpperCase() + city.slice(1),
                main: {
                    temp: Math.floor(Math.random() * 15) + 20, // 20-35°C
                    feels_like: Math.floor(Math.random() * 15) + 22,
                    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
                    pressure: Math.floor(Math.random() * 50) + 1000 // 1000-1050 hPa
                },
                weather: [{
                    main: getRandomWeather(),
                    description: getRandomDescription()
                }],
                wind: {
                    speed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
                }
            };
            
            resolve(weatherData);
        }, 1000);
    });
}

// Fungsi untuk mendapatkan cuaca acak
function getRandomWeather() {
    const weathers = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Drizzle'];
    return weathers[Math.floor(Math.random() * weathers.length)];
}

// Fungsi untuk mendapatkan deskripsi cuaca acak
function getRandomDescription() {
    const descriptions = [
        'cerah berawan',
        'berawan sebagian',
        'hujan ringan',
        'cerah',
        'mendung',
        'gerimis',
        'berawan'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Fungsi untuk menampilkan data cuaca
function displayWeatherData(data) {
    hideLoading();
    
    location.textContent = `${data.name}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    
    showWeatherInfo();
}

// Fungsi untuk menampilkan loading
function showLoading() {
    loading.classList.add('show');
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
    loading.classList.remove('show');
}

// Fungsi untuk menampilkan error
function showError(message) {
    error.textContent = message;
    error.classList.add('show');
}

// Fungsi untuk menyembunyikan error
function hideError() {
    error.classList.remove('show');
}

// Fungsi untuk menampilkan info cuaca
function showWeatherInfo() {
    weatherInfo.classList.add('show');
}

// Fungsi untuk menyembunyikan info cuaca
function hideWeatherInfo() {
    weatherInfo.classList.remove('show');
}

// Inisialisasi dengan cuaca Jakarta sebagai default
window.addEventListener('load', function() {
    cityInput.value = 'Jakarta';
    getWeather();
});

// Fungsi untuk menggunakan API cuaca asli (uncomment jika punya API key)
/*
async function getRealWeatherData(city) {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return await response.json();
}
*/
