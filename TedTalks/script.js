document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const searchBtnsBlock = document.getElementById('show-block');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const stickyButton = document.querySelector('.sticky-button');
    const displayBtn = document.getElementById('search-end-icon');
    
    initializeStyles();
    
    let currentDropdown = null;
    let hasSelection = true;
    initializeDropdowns();
    
    setupEventListeners();
    
    handleScroll();
    
    function initializeStyles() {
        searchBar.style.width = '100%';
        searchBar.style.transition = 'transform 0.3s ease';
        
        if (stickyButton) {
            stickyButton.style.position = 'fixed';
            stickyButton.style.right = '1rem';
            stickyButton.style.bottom = '3rem';
            stickyButton.style.transition = 'opacity 0.3s ease';
            stickyButton.style.opacity = '0';
            stickyButton.style.pointerEvents = 'none';
        }
        
        const placeholder = document.createElement('div');
        placeholder.style.display = 'none';
        searchBar.parentNode.insertBefore(placeholder, searchBar);
        
        const style = document.createElement('style');
        style.textContent = `
            .btn-text.animate-up {
                position: absolute;
                top: -8px;
                left: 8px;
                transform: translateY(0);
                transition: all 150ms cubic-bezier(.4,0,.2,1);
                background-color: rgb(255, 255, 255);
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
    }
    
    function initializeDropdowns() {
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
    }
    
    function setupEventListeners() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        if (stickyButton) {
            stickyButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        if (displayBtn) {
            displayBtn.addEventListener('click', toggleSearchBlock);
        }
        
        setupDropdownButtons();
        
        document.addEventListener('click', handleGlobalClick);
    }
    
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        const footerRect = footer.getBoundingClientRect();
        const headerHeight = header.offsetHeight;
        const searchBarHeight = searchBar.offsetHeight;
        const placeholder = searchBar.previousElementSibling;
        
        if (stickyButton) {
            if (currentScrollPosition < headerHeight) {
                stickyButton.style.opacity = '0';
                stickyButton.style.pointerEvents = 'none';
            } else {
                stickyButton.style.opacity = '1';
                stickyButton.style.pointerEvents = 'auto';
            }
        }
        
        if (currentScrollPosition > headerHeight) {
            if (footerRect.top > searchBarHeight + headerHeight) {
                makeSticky();
                placeholder.style.display = 'block';
                placeholder.style.height = `${searchBarHeight}px`;
            } else {
                resetSearchBar();
                placeholder.style.display = 'none';
            }
        } else {
            resetSearchBar();
            placeholder.style.display = 'none';
        }
    }
    
    function makeSticky() {
        searchBar.style.position = 'fixed';
        searchBar.style.top = '0';
        searchBar.style.left = '0';
        searchBar.style.right = '0';
        searchBar.style.zIndex = '1000';
        searchBar.style.backgroundColor = 'rgb(246, 246, 246)';
        searchBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        searchBar.style.padding = '10px 20px';
    }
    
    function resetSearchBar() {
        searchBar.style.position = 'static';
        searchBar.style.boxShadow = 'none';
        searchBar.style.padding = '';
    }
    
    function toggleSearchBlock() {
        if (!searchBtnsBlock) return;
        
        const currentDisplay = searchBtnsBlock.style.display;
        searchBtnsBlock.style.display = (currentDisplay === "none" || currentDisplay === "") ? "flex" : "none";
        
        if (searchBtnsBlock.style.display === "flex") {
            const existingStyle = document.querySelector('style[data-search-btns]');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            const style = document.createElement('style');
            style.setAttribute('data-search-btns', '');
            style.textContent = `
                .search-btns-block {
                    padding-bottom: 1.5rem;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function setupDropdownButtons() {
        const buttons = document.querySelectorAll('.search-btn');
        buttons.forEach(button => {
            button.addEventListener('click', handleDropdownClick);
        });
        
        const items = document.querySelectorAll('.droplist-block button');
        items.forEach(item => {
            item.addEventListener('click', handleDropdownItemClick);
        });
    }
    
    function handleDropdownClick(e) {
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
    }
    
    function handleDropdownItemClick(e) {
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
    }
    
    function handleGlobalClick(e) {
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
    }
    
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
});

