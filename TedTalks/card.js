document.addEventListener("DOMContentLoaded", () => {
    let currentCount = 24; 
    const totalCount = 6919; 
    
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const videoGrid = document.getElementById("video-grid");
            
            data.forEach((video) => {
                const card = document.createElement('div');
                card.classList.add("card");
                
                const img = document.createElement("img");
                img.src = video.image;
                img.alt = video.title;
                card.appendChild(img);
                
                const content = document.createElement('div');
                content.classList.add("card-content");
                
                const title = document.createElement("div");
                title.classList.add("card-title");
                title.textContent = video.title;
                content.appendChild(title);
                
                const author = document.createElement("div");
                author.classList.add("card-author");
                author.textContent = video.author;
                content.appendChild(author);
                
                const duration = document.createElement("div");
                duration.classList.add("card-duration");
                duration.textContent = video.duration;
                content.appendChild(duration);
                
                card.appendChild(content);
                videoGrid.appendChild(card);
            });
            
            
            document.querySelector(".show-more-btn button").addEventListener("click", () => {
           
                const existingCards = videoGrid.querySelectorAll('.card');
                
              
                for (let i = 0; i < 24 && i < existingCards.length; i++) {
                    const cardClone = existingCards[i].cloneNode(true);
                    videoGrid.appendChild(cardClone);
                }
                
           
                currentCount += 24;
                
                const displayCount = Math.min(currentCount, totalCount);
       
                const counterText = document.querySelector(".talk-block-btn-text");
                counterText.textContent = `${displayCount} of ${totalCount}`;
            });
        })
        .catch((error) => console.error("JSON data refused to connect", error));
});