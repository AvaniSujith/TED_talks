// const displayBtn = document.getElementById('search-end-icon');

// displayBtn.addEventListener('click', () =>{
//     const div = document.getElementById("show-block")
//     div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";

//     if(div.style.display === "flex"){
//         const style = document.createElement('style');
//         style.textContent = `
//             .search-btns-block{
//                 padding-bottom: 1.5rem;
//             } 
//         `;
//         document.head.appendChild(style);
//     }
// })

// document.addEventListener('DOMContentLoaded', function() {
//     const searchBar = document.querySelector('.search-bar');
//     const searchBtnsBlock = document.getElementById('show-block');
//     const footer = document.querySelector('footer');
//     const header = document.querySelector('header');
    
//     // Add initial styles
//     searchBar.style.width = '100%';
//     searchBar.style.transition = 'transform 0.3s ease';
    
//     // Create a placeholder div to prevent content jump when searchBar becomes fixed
//     const placeholder = document.createElement('div');
//     placeholder.style.display = 'none';
//     searchBar.parentNode.insertBefore(placeholder, searchBar);
    
//     function handleScroll() {
//         const currentScrollPosition = window.pageYOffset;
//         const footerRect = footer.getBoundingClientRect();
//         const headerHeight = header.offsetHeight;
//         const searchBarHeight = searchBar.offsetHeight;
        
//         // Calculate when searchBar should become sticky (after header)
//         if (currentScrollPosition > headerHeight) {
//             // Check if footer is approaching
//             if (footerRect.top > searchBarHeight + headerHeight) {
//                 makeSticky();
//                 placeholder.style.display = 'block';
//                 placeholder.style.height = `${searchBarHeight}px`;
//             } else {
//                 // Footer is in view, unstick the search bar
//                 resetSearchBar();
//             }
//         } else {
//             resetSearchBar();
//             placeholder.style.display = 'none';
//         }
//     }
    
//     function makeSticky() {
//         // Remove the automatic display of searchBtnsBlock
//         searchBar.style.position = 'fixed';
//         searchBar.style.top = '0';
//         searchBar.style.left = '0';
//         searchBar.style.right = '0';
//         searchBar.style.zIndex = '1000';
//         searchBar.style.backgroundColor ='rgb(246, 246, 246)';
//         searchBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
//         searchBar.style.padding = '10px 20px';
//     }
    
//     function resetSearchBar() {
//         searchBar.style.position = 'static';
//         searchBar.style.boxShadow = 'none';
//         searchBar.style.padding = '';
        
//         // Remove the automatic display of searchBtnsBlock
//     }
    
//     // Add scroll event listener with throttle
//     let ticking = false;
//     window.addEventListener('scroll', () => {
//         if (!ticking) {
//             window.requestAnimationFrame(() => {
//                 handleScroll();
//                 ticking = false;
//             });
//             ticking = true;
//         }
//     });
    
//     // Initial check
//     handleScroll();

//     // Keep the existing click event listener for the end button
//     const displayBtn = document.getElementById('search-end-icon');
//     displayBtn.addEventListener('click', () => {
//         const div = document.getElementById("show-block");
//         div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";
        
//         if(div.style.display === "flex") {
//             const style = document.createElement('style');
//             style.textContent = `
//                 .search-btns-block{
//                     padding-bottom: 1.5rem;
//                 }
//             `;
//             document.head.appendChild(style);
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const searchBtnsBlock = document.getElementById('show-block');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const displayBtn = document.getElementById('search-end-icon');
    
    // Check if button exists
    if (!displayBtn) {
        console.error('Search end icon button not found');
        return;
    }

    // Add initial styles
    searchBar.style.width = '100%';
    searchBar.style.transition = 'transform 0.3s ease';
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    searchBar.parentNode.insertBefore(placeholder, searchBar);
    
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        const footerRect = footer.getBoundingClientRect();
        const headerHeight = header.offsetHeight;
        const searchBarHeight = searchBar.offsetHeight;
        
        if (currentScrollPosition > headerHeight) {
            if (footerRect.top > searchBarHeight + headerHeight) {
                makeSticky();
                placeholder.style.display = 'block';
                placeholder.style.height = `${searchBarHeight}px`;
            } else {
                resetSearchBar();
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
    
    // Single click event listener
    displayBtn.addEventListener('click', () => {
        const div = document.getElementById("show-block");
        
        // Check if div exists
        if (!div) {
            console.error('Show block div not found');
            return;
        }
        
        // Toggle display
        div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";
        
        // Add styles if showing
        if(div.style.display === "flex") {
            // Remove existing style if present
            const existingStyle = document.querySelector('style[data-search-btns]');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            const style = document.createElement('style');
            style.setAttribute('data-search-btns', ''); // Add identifier
            style.textContent = `
                .search-btns-block {
                    padding-bottom: 1.5rem;
                }
            `;
            document.head.appendChild(style);
        }
    });

    // Scroll event listener with throttle
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
    
    // Initial check
    handleScroll();
});