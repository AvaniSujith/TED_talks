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
  
  




















  
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
      .btn-text.animate-up {
          position: absolute;
          top: -8px;
          left: 8px;
          transform: translateY(0);
          transition: all 150ms cubic-bezier(.4,0,.2,1);
          background-color:rgb(255, 255, 255);
      }
      .search-btn {
          transition: all 150ms cubic-bezier(.4,0,.2,1);
      }
      .search-btn:focus {
          border-color: #0000ff !important;
          background-color: white !important;
      }
      .selected-item {
          display: inline-block;
          opacity: 1;
          transition: all 150ms cubic-bezier(.4,0,.2,1);
      }
  `;
  
  document.head.appendChild(style);

  let currentDropdown = null;
  let hasSelection = true;

  function closeAllDropdowns() {
      document.querySelectorAll('.droplist-block').forEach(dropdown => {
          dropdown.style.display = 'none';
      });
      document.querySelectorAll('.dropdown-btn').forEach(icon => {
          icon.style.transform = 'rotate(0deg)';
      });
  }

  function resetButton(button) {
      const btnText = button.querySelector('.btn-text');
      if (btnText) {
          btnText.classList.remove('animate-up');
      }
      button.classList.remove('active');
      const selectedItem = button.querySelector('.selected-item');
      if (selectedItem) {
          selectedItem.remove();
      }
  }

  const buttons = document.querySelectorAll('.search-btn');
  
  // Set default for first sort-by button only
  const firstSortButton = document.querySelector('.newest-btn .search-btn');
  if (firstSortButton) {
      const btnText = firstSortButton.querySelector('.btn-text');
      btnText.classList.add('animate-up');
      firstSortButton.classList.add('active');
      
      let selectedItem = firstSortButton.querySelector('.selected-item');
      if (!selectedItem) {
          selectedItem = document.createElement('span');
          selectedItem.className = 'selected-item';
          firstSortButton.appendChild(selectedItem);
      }
      selectedItem.textContent = 'Newest';
  }

  buttons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.stopPropagation();
          
          const container = this.closest('.newest-btn') || this.closest('.search-item-div');
          if (!container) return;
          
          const dropdownList = container.querySelector('.droplist-block');
          const btnText = this.querySelector('.btn-text');
          const icon = this.querySelector('.dropdown-btn');
          
          if (dropdownList.style.display === 'block') {
              dropdownList.style.display = 'none';
              if (!hasSelection) {
                  resetButton(this);
              }
              if (icon) icon.style.transform = 'rotate(0deg)';
              currentDropdown = null;
          } else {
              closeAllDropdowns();
              hasSelection = false;
              dropdownList.style.display = 'block';
              btnText.classList.add('animate-up');
              this.classList.add('active');
              if (icon) icon.style.transform = 'rotate(180deg)';
              currentDropdown = container;
          }
      });
  });

  const items = document.querySelectorAll('.droplist-block button');
  items.forEach(item => {
      item.addEventListener('click', function(e) {
          e.stopPropagation();
          hasSelection = true;
          
          const container = this.closest('.newest-btn') || this.closest('.search-item-div');
          if (!container) return;
          
          const button = container.querySelector('.search-btn');
          const btnText = button.querySelector('.btn-text');
          const selectedText = this.querySelector('span').textContent;

          btnText.classList.add('animate-up');
          
          let selectedItem = button.querySelector('.selected-item');
          if (!selectedItem) {
              selectedItem = document.createElement('span');
              selectedItem.className = 'selected-item';
              button.appendChild(selectedItem);
          }
          selectedItem.textContent = selectedText;
          
          button.classList.add('active');
          
          container.querySelector('.droplist-block').style.display = 'none';
          const icon = button.querySelector('.dropdown-btn');
          if (icon) icon.style.transform = 'rotate(0deg)';
      });
  });

  document.addEventListener('click', function(e) {
      if (!e.target.closest('.newest-btn') && !e.target.closest('.search-item-div')) {
          const openDropdown = document.querySelector('.droplist-block[style="display: block;"]');
          if (openDropdown) {
              const container = openDropdown.closest('.newest-btn') || openDropdown.closest('.search-item-div');
              const button = container.querySelector('.search-btn');
              if (!hasSelection) {
                  resetButton(button);
              }
          }
          closeAllDropdowns();
          currentDropdown = null;
      }
  });
});