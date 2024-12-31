document.addEventListener("DOMContentLoaded", () => {
    let videoData = [];

    const loadVideoData = async () => {
        try {
            const response = await fetch("data.json");
            if(!response.ok){
                throw new Error("Error detected");
            }
            videoData = await response.json();
            getVideos(videoData);
            initializeFilters();
        }catch(error){
            console.error("Failed to load", error);
            showError("Failed to load videos")
        }
    };

    const initializeFilters = () => {
        const subtitleItems = document.querySelectorAll('.subtitle-item');
        subtitleItems.forEach(item => {
            item.addEventListener('click', function(e){
                e.preventDefault();
                subtitleItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                const language = this.textContent.trim();
                const filteredVideos = filterBySubtitle(videoData, language);
                getVideos(filteredVideos);
            });
        });
    };

    const filterBySubtitle = (videos,language) =>{
        if(!language || language === "All"){
            return videos;
        }

        return videos.filter(video => {
            return video.subtitle.trim() === language.trim();
        });
    };

    const videoGrid = document.getElementById("video-grid");

    const getVideos = (videos) =>{
        videoGrid.innerHTML = '';

        if(!videos || videos.length === 0){
            const noVideosMessage = document.createElement('div');
            noVideosMessage.classList.add('no-video-message');
            noVideosMessage.textContent = 'No Videos';
            videoGrid.appendChild(noVideosMessage);
            return;
        }

        videos.forEach(video => {
            const card = createCards(video);
            videoGrid.appendChild(card);
        });
    };

    const createCards = (video) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnails');

        const img = document.createElement('img');
        img.src = video.image;
        img.alt = video.title;
        img.loading = 'lazy';
        thumbnailContainer.appendChild(img);

        const durationTime = document.createElement('div');
        durationTime.classList.add('duration');
        durationTime.textContent = video.duration;
        thumbnailContainer.appendChild(durationTime);

        card.appendChild(thumbnailContainer);

        const content = document.createElement('div');
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
    };

    loadVideoData();
});
