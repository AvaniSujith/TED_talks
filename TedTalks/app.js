const buttons = document.querySelectorAll('.header_item button');
const dropdowns = document.querySelectorAll('.flex-dropdown');
const sideBtn = document.getElementById('menu-icon');


dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const dropdownButton = dropdown.querySelector('.flex-item');

    dropdownButton.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'block';
    });

    dropdownButton.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    });

    dropdownContent.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'block';
    });

    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    });

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

