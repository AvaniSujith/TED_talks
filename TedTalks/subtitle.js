document.addEventListener("DOMContentLoaded", ()=>{
    let videoData = [];

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            videoData = data;
            getVideos(videoData);
        })
        .catch((error) => console.error("Connection failed", error));

    const videoGrid = document.getElementById("video-grid");

    const subtitleItems = document.querySelectorAll('.subtitle-item');
    subtitleItems.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            const language = e.target.textContent;
            const filteredVideos = filterBySubtitle(videoData, language);
            getVideos(filteredVideos);
        });
    });

    const filterBySubtitle = (videos, language) =>{
        return videos.filter(video => {
            const subtitleLang = video.subtitle;

            switch(language){
                case 'English':
                    return subtitleLang === "English"
                case 'Español':
                    return subtitleLang === 'Español'
                case '日本語':
                    return subtitleLang === '日本語'
                case 'Português brasileiro':
                    return subtitleLang === 'Português brasileiro'
                case '中文 (繁體)':
                    return subtitleLang === '中文 (繁體)'
                default:
                    return true;
            }
        });
    };

    const getVideos = (videos) => {
        videoGrid.innerHTML = '';

        if(videos.length === 0){
            const noVideosMessage = document.createElement('div');
            noVideosMessage.classList.add('no-video-message');
            noVideosMessage.textContent = 'No Videos';
            videoGrid.appendChild(noVideosMessage);
            return;
        }

        videos.forEach(video =>{
            const card = createCards(video);
            videoGrid.appendChild(card);
        });
    };

    const createCards = (video) =>{
        const card = document.createElement('div');
        card.classList.add('card');

        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnails');

        const img = document.createElement('img')
        img.src = video.image;
        img.alt = video.title;
        img.loading = 'lazy';
        thumbnailContainer.appendChild(img);

        const durationTime = document.createElement('div');
        durationTime.classList.add('duration');
        durationTime.textContent = video.duration;
        thumbnailContainer.appendChild(durationTime);

        card.appendChild(thumbnailContainer);

        const content = document.createElement('div')
        content.classList.add('card-content');

        const title = document.createElement('div');
        title.classList.add('card-title');
        title.textContent = video.title;
        content.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('card-author');
        author.textContent = video.author;
        content.appendChild(author);

        card.appendChild(content);
        return card;

    }
})

