document.addEventListener('DOMContentLoaded', function(){
    const searchBar = document.querySelector('.search-bar');
    const searchBtnsBlock = document.getElementById('show-block');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const stickyButton = document.querySelector('.sticky-button');

    searchBar.style.width = '100%';
    searchBar.style.transition = 'transform 0.3s ease';

    stickyButton.style.position = 'fixed';
    stickyButton.style.right = '1rem';
    stickyButton.style.bottom = '3rem';
    stickyButton.style.transition = 'opacity 0.3s ease';


    stickyButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    searchBar.parentNode.insertBefore(placeholder, searchBar);

    function handleScroll(){
        const currentScrollPosition = window.pageYOffset;
        const footerRect = footer.getBoundingClientRect();
        const headerHeight = header.offsetHeight;
        const searchBarHeight = searchBar.offsetHeight;

        if(currentScrollPosition < headerHeight){
            stickyButton.style.opacity = '0';
            stickyButton.style.pointerEvents = 'none';
        }else{
            stickyButton.style.opacity = '1';
            stickyButton.style.pointerEvents = 'auto';
        }

        if(currentScrollPosition > headerHeight){
            if(footerRect.top > searchBarHeight + headerHeight){
                makeSticky();
                placeholder.style.display = 'block';
                placeholder.style.height = `${searchBarHeight}px`
            }else{
                resetSearchBar();
                placeholder.style.display = 'none;'
            }
        }else{
            resetSearchBar();
        }

        }

        function makeSticky(){
            searchBar.style.position = 'fixed';
            searchBar.style.top = '0';
            searchBar.style.left = '0';
            searchBar.style.right = '0';
            searchBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            searchBar.style.padding = '10px 20px';
        }

        function resetSearchBar(){
            searchBar.style.position = 'static';
            searchBar.style.boxShadow = 'none';
            searchBar.style.padding = '';
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if(!ticking){
                window.requestAnimationFrame(()=>{
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        const displayBtn = document.getElementById('search-end-icon');
        displayBtn.addEventListener('click', () =>{
            const div = document.getElementById('show-block');
            div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";

            if(div.style.display === "flex"){
                const style = document.createElement('style');
                style.textContent = `
                
                .search-btns-block{
                   padding-bottom: 1.5rem;
                   }`;
                document.head.appendChild(style);
            }
        });

    handleScroll();
})

