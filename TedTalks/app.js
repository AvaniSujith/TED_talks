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

