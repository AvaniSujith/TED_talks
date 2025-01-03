document.addEventListener("DOMContentLoaded", () => {
    let videoData = [];
    const sortButton = document.querySelector('.search-btn');
    const droplist = document.querySelector('.droplist-block');
    const selectedItem = document.querySelector('.selected-item');
    const blockItems = document.querySelectorAll('.block-item button');

    // Set initial text before data loads
    selectedItem.textContent = 'Newest';

    const loadVideoData = async () => {
        try {
            const response = await fetch("data.json");
            if(!response.ok){
                throw new Error("Error detected");
            }
            videoData = await response.json();
            
            // Sort by newest first by default
            videoData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Display sorted videos
            getVideos(videoData);
            initializeFilters();
            initializeSorting();
        }catch(error){
            console.error("Failed to load", error);
            showError("Failed to load videos")
        }
    };

    const initializeSorting = () => {
        sortButton.addEventListener('click', (e) => {
            e.stopPropagation();
            droplist.classList.toggle('show');
            sortButton.classList.toggle('active');
        });

        blockItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const sortType = item.querySelector('span').textContent;
                selectedItem.textContent = sortType;
                
                // Get currently displayed videos
                let currentVideos = [...videoData];
                const activeFilter = document.querySelector('.subtitle-item.active');
                if (activeFilter && activeFilter.textContent.trim() !== 'All') {
                    currentVideos = filterBySubtitle(currentVideos, activeFilter.textContent.trim());
                }

                // Apply selected sort
                const sortedVideos = sortVideos(currentVideos, sortType);
                getVideos(sortedVideos);
                
                droplist.classList.remove('show');
                sortButton.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!sortButton.contains(e.target)) {
                droplist.classList.remove('show');
                sortButton.classList.remove('active');
            }
        });
    };

    const sortVideos = (videos, sortType) => {
        const videosCopy = [...videos];
        
        switch(sortType.toLowerCase()) {
            case 'newest':
                return videosCopy.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            case 'oldest':
                return videosCopy.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            case 'relevance':
                return videosCopy.sort((a, b) => b.relevanceScore - a.relevanceScore);
            case 'most viewed':
                return videosCopy.sort((a, b) => b.views - a.views);
            default:
                return videosCopy;
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
                let filteredVideos = filterBySubtitle(videoData, language);
                
                // Maintain current sort when filtering
                const currentSort = selectedItem.textContent;
                filteredVideos = sortVideos(filteredVideos, currentSort);
                
                getVideos(filteredVideos);
            });
        });
    };

    const filterBySubtitle = (videos, language) => {
        if(!language || language === "All"){
            return videos;
        }
        return videos.filter(video => video.subtitle.trim() === language.trim());
    };

    const videoGrid = document.getElementById("video-grid");

    const getVideos = (videos) => {
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