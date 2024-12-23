document.addEventListener("DOMContentLoaded", () =>{
    let videoData = [];

    fetch("data.json")
        .then((response) => response.json())
        .then((data) =>{
            videoData = data;
            renderVideos(videoData);
        })
        .catch((error) => console.error("Connection with database failed", error));

    const videoGrid = document.getElementById("video-grid");

    const renderVideos = (videos) => {
        videoGrid.innerHTML = "";
        if(videos.length === 0){
            const videoMissing = document.createElement("div");
            videoMissing.classList.add("no-video-message");
            videoMissing.textContent = "No videos found.";
            videoGrid.appendChild(videoMissing);
            return;
        }

        videos.forEach((video) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = video.image;
            img.alt = video.title;
            card.appendChild(img);

            const content = document.createElement("div");
            content.classList.add("card-content")

            const title = document.createElement("div");
            title.classList.add("card-title");
            title.textContent = video.author;
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
    }

    const durationBtns = document.querySelectorAll("#duration-item");

    durationBtns.forEach((durationBtn) =>{
        durationBtn.addEventListener("click", () =>{
            const range = durationBtn.textContent.trim();
            const filteredvideos = durationfilter(videoData, range);
            renderVideos(filteredvideos)
        })
    })


    const durationfilter = (videos, range) =>{
        return videos.filter((video) =>{
            const durationParts = video.duration.split(":");
            const durationMin = parseInt(durationParts[0]) + parseInt(durationParts[1]) / 60;

            if(range === "0-6 minutes") return durationMin <= 6;
            if(range === "6-12 minutes") return durationMin > 6 && durationMin <= 12;
            if(range === "12-18 minutes") return durationMin > 12 && durationMin <= 18;
            if(range === "18+ minutes") return durationMin > 18;
            return false;
        });
    }
    
})