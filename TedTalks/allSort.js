document.addEventListener("DOMContentLoaded", () => {
    let videoData = [];
    const sortButton = document.querySelector('.search-btn');
    const droplist = document.querySelector('.droplist-block');
    const selectedItem = document.querySelector('.selected-item');
    const blockItems = document.querySelectorAll('.block-item button');
    const videoGrid = document.getElementById("video-grid");

    selectedItem.textContent = 'Newest';

    const loadVideoData = async () => {
        try {
            const response = await fetch("data.json");
            if(!response.ok) throw new Error("Error detected");
            videoData = await response.json();
            
            videoData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            getVideos(videoData);
            initializeFilters();
            initializeSorting();
            initializeDurationFilter();
        } catch(error) {
            console.error("Failed to load", error);
            showError("Failed to load videos");
        }
    };

    const validateSortType = (sortType) => {
        const validSortTypes = ['Newest', 'Oldest', 'Relevance', 'Most Viewed'];
        return validSortTypes.includes(sortType) ? sortType : 'Newest';
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

    const applyFiltersAndSort = (sortType) => {
        let filteredVideos = [...videoData];
        
        const validatedSortType = validateSortType(sortType);
        if (selectedItem.textContent !== validatedSortType) {
            selectedItem.textContent = validatedSortType;
        }
        
        const activeSubtitle = document.querySelector('.subtitle-item.active');
        if (activeSubtitle && activeSubtitle.textContent.trim() !== 'All') {
            filteredVideos = filterBySubtitle(filteredVideos, activeSubtitle.textContent.trim());
        }

        const activeDuration = document.querySelector('.duration-item.active');
        if (activeDuration) {
            const durationText = activeDuration.querySelector('span').textContent.trim();
            filteredVideos = filterByDuration(filteredVideos, durationText);
        }

        filteredVideos = sortVideos(filteredVideos, validatedSortType);
        
        getVideos(filteredVideos);
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
                e.preventDefault();
                
                if (!item.closest('.block-item')) return;
                
                const sortType = item.querySelector('span').textContent;
                selectedItem.textContent = sortType;
                
                applyFiltersAndSort(sortType);
                
                droplist.classList.remove('show');
                sortButton.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!sortButton.contains(e.target) && !e.target.closest('.duration-item')) {
                droplist.classList.remove('show');
                sortButton.classList.remove('active');
            }
        });
    };

    const initializeFilters = () => {
        const subtitleItems = document.querySelectorAll('.subtitle-item');
        subtitleItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                subtitleItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const currentSort = selectedItem.textContent;
                applyFiltersAndSort(currentSort);
            });
        });
    };

    const initializeDurationFilter = () => {
        const durationItems = document.querySelectorAll('.duration-item');
        durationItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                e.stopImmediatePropagation();
                
                durationItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const currentSort = selectedItem.textContent;
                applyFiltersAndSort(currentSort);
            });
        });
    };

    const filterBySubtitle = (videos, language) => {
        if(!language || language === "All") return videos;
        return videos.filter(video => video.subtitle.trim() === language.trim());
    };

    const filterByDuration = (videos, range) => {
        return videos.filter(video => {
            const durationParts = video.duration.split(":");
            const durationMin = parseInt(durationParts[0]) + parseInt(durationParts[1])/60;

            switch(range) {
                case '0-6 minutes':
                    return durationMin <= 6;
                case '6-12 minutes':
                    return durationMin > 6 && durationMin <= 12;
                case '12-18 minutes':
                    return durationMin > 12 && durationMin <= 18;
                case '18+ minutes':
                    return durationMin > 18;
                default:
                    return true;
            }
        });
    };

    const getVideos = (videos) => {
        videoGrid.innerHTML = '';

        if(!videos || videos.length === 0) {
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

