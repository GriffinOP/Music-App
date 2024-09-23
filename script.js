const apiKey = 'AIzaSyC_zH3HzSahvJAbEtXZ6gu-nIwJpAkEII8'; // Replace with your actual YouTube API key
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsList = document.getElementById('resultsList');
const currentSong = document.getElementById('currentSong');
const player = document.getElementById('player');

// Search for music when the user clicks the search button
searchBtn.addEventListener('click', searchForMusic);

// Search for music on YouTube
function searchForMusic() {
    const query = searchInput.value;
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}&maxResults=5`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

// Display search results
function displayResults(videos) {
    resultsList.innerHTML = ''; // Clear previous results
    videos.forEach((video) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="Thumbnail" />
            ${video.snippet.title}
        `;
        li.addEventListener('click', () => playSong(video.id.videoId, video.snippet.title));
        resultsList.appendChild(li);
    });
}

// Play selected song in the iframe player
function playSong(videoId, title) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    currentSong.innerText = `Now Playing: ${title}`;
}
