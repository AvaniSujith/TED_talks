document.addEventListener("DOMContentLoaded", ()=> {
    let videoData = [];

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            videoData = data;
            getVideos(videoData)
        })
        .catch((error) => console.error("Connection failed", error));

    const videoGrid = document.getElementById("video-grid");

    
    const durationItems = document.querySelectorAll('.duration-item');
    durationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const range = this.querySelector('span').textContent.trim();
            const filteredVideos = filterByDuration(videoData, range);
            getVideos(filteredVideos);
        });
    });

    const filterByDuration = (videos, range) => {
        return videos.filter(video => {
            const durationParts = video.duration.split(":");
            const durationMin = parseInt(durationParts[0]) + parseInt(durationParts[1]) /60;

            switch(range){
                case '0-6 minutes':
                    return durationMin <= 6;
                case '6-12 minutes':
                    return durationMin > 6 && durationMin <=12;
                case '12-18 minutes':
                    return durationMin > 12 && durationMin <=18;
                case '18+ minutes':
                    return durationMin > 18;
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

})

