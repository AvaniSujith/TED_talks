document.addEventListener('DOMContentLoaded', function() {
    const searchBtns = document.querySelector('.search-btns');
    const container = searchBtns.parentElement;

    // Create navigation buttons
    const leftBtn = document.createElement('button');
    leftBtn.className = 'scroll-nav-btn left';
    leftBtn.innerHTML = '←';

    const rightBtn = document.createElement('button');
    rightBtn.className = 'scroll-nav-btn right';
    rightBtn.innerHTML = '→';

    // Add buttons to container
    container.appendChild(leftBtn);
    container.appendChild(rightBtn);

    function updateScrollButtons() {
        const { scrollLeft, scrollWidth, clientWidth } = searchBtns;
        
        // Show/hide left button
        leftBtn.classList.toggle('visible', scrollLeft > 0);
        
        // Show/hide right button
        rightBtn.classList.toggle('visible', scrollLeft < scrollWidth - clientWidth);
    }

    function scroll(direction) {
        const scrollAmount = 120;
        searchBtns.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Event listeners
    leftBtn.addEventListener('click', () => scroll(-1));
    rightBtn.addEventListener('click', () => scroll(1));

    // Update buttons on scroll
    searchBtns.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollButtons);
    });

    // Initial check
    updateScrollButtons();

    // Handle window resize
    window.addEventListener('resize', updateScrollButtons);
});