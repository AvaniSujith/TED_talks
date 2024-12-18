


// const dropdown = document.getElementById("dropdown_item")
// const dropdownBtn = document.getElementById("dropdownBtn")
// const dropdownContent = document.getElementById("drop-content")

// dropdownBtn.addEventListener('mouseover', function(){
//     dropdownContent.style.display = "block";
// })

// dropdown.addEventListener('mouseleave', function(){
//     dropdownContent.style.display = "none";
// })



const buttons = document.querySelectorAll('.header_item button');
const dropdowns = document.querySelectorAll('.flex-dropdown');


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
