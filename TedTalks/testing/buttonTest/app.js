document.querySelector('.left-scroll-btn').addEventListener('click', () => {
    document.querySelector('.first-scroll').scrollBy({
        left: -200, // Adjust the value as per your preference
        behavior: 'smooth'
    });
});

document.querySelector('.right-scroll-btn').addEventListener('click', () => {
    document.querySelector('.first-scroll').scrollBy({
        left: 200, // Adjust the value as per your preference
        behavior: 'smooth'
    });
});

// Similarly, for the second scroll section
document.querySelector('.left-scroll-btn').addEventListener('click', () => {
    document.querySelector('.second-scroll').scrollBy({
        left: -200,
        behavior: 'smooth'
    });
});

document.querySelector('.right-scroll-btn').addEventListener('click', () => {
    document.querySelector('.second-scroll').scrollBy({
        left: 200,
        behavior: 'smooth'
    });
});
