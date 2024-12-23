document.addEventListener("DOMContentLoaded", () => {
    // Fetch JSON Data
    fetch("test.json")
      .then((response) => response.json())
      .then((data) => {
        const videoGrid = document.getElementById("videoGrid");
        
        data.forEach((video) => {
          // Create Card
          const card = document.createElement("div"); 
          card.classList.add("card");
          
          // Add Image
          const img = document.createElement("img");
          img.src = video.image;
          img.alt = video.title;
          card.appendChild(img);

          // Add Content
          const content = document.createElement("div");
          content.classList.add("card-content");
  
          // Title
          const title = document.createElement("div");
          title.classList.add("card-title");
          title.textContent = video.title;
          content.appendChild(title);
  
          // Author
          const author = document.createElement("div");
          author.classList.add("card-author");
          author.textContent = video.author;
          content.appendChild(author);
  
          // Duration
          const duration = document.createElement("div");
          duration.classList.add("card-duration");
          duration.textContent = video.duration;
          content.appendChild(duration);
  
          // Append Content to Card
          card.appendChild(content);
  
          // Append Card to Grid
          videoGrid.appendChild(card);
        });
      })
      .catch((error) => console.error("Error loading JSON:", error));
  });
  
  