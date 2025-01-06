document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    const leftButton = document.querySelector('.left-scroll-btn');
    const rightButton = document.querySelector('.right-scroll-btn');
    const firstScroll = document.querySelector('.first-scroll');
    const secondScroll = document.querySelector('.second-scroll');
  
  
    leftButton.style.display = 'none';
  
    const isScrollable = () => {
      return firstScroll.scrollWidth > scrollContainer.clientWidth ||
             secondScroll.scrollWidth > scrollContainer.clientWidth;
    };
  
    const isAtEnd = (currentTranslate) => {
      const firstScrollEnd = Math.abs(currentTranslate) >= (firstScroll.scrollWidth - scrollContainer.clientWidth);
      const secondScrollEnd = Math.abs(currentTranslate) >= (secondScroll.scrollWidth - scrollContainer.clientWidth);
      return firstScrollEnd || secondScrollEnd;
    };
 
    const scrollAmount = 200;
    let currentTranslate = 0;
  
    rightButton.addEventListener('click', () => {
  
      const maxScroll = Math.max(
        firstScroll.scrollWidth - scrollContainer.clientWidth,
        secondScroll.scrollWidth - scrollContainer.clientWidth
      );
  
      currentTranslate = Math.max(-maxScroll, currentTranslate - scrollAmount);
      
      firstScroll.style.transform = `translateX(${currentTranslate}px)`;
      secondScroll.style.transform = `translateX(${currentTranslate}px)`;
    
      leftButton.style.display = 'block';
      
    
      if (isAtEnd(currentTranslate)) {
        rightButton.style.display = 'none';
      }
    });
  
    leftButton.addEventListener('click', () => {
      currentTranslate = Math.min(0, currentTranslate + scrollAmount);
      
    
      firstScroll.style.transform = `translateX(${currentTranslate}px)`;
      secondScroll.style.transform = `translateX(${currentTranslate}px)`;
     
      rightButton.style.display = 'block';
      
     
      if (currentTranslate === 0) {
        leftButton.style.display = 'none';
      }
    });
  
    
    const checkScrollability = () => {
      if (!isScrollable()) {
        rightButton.style.display = 'none';
        leftButton.style.display = 'none';
        firstScroll.style.transform = 'translateX(0)';
        secondScroll.style.transform = 'translateX(0)';
        currentTranslate = 0;
      } else {
    
        rightButton.style.display = isAtEnd(currentTranslate) ? 'none' : 'block';
      }
    };
  
    window.addEventListener('resize', checkScrollability);
  
    checkScrollability();
  
   
    firstScroll.style.transition = 'transform 0.3s ease';
    secondScroll.style.transition = 'transform 0.3s ease';
  });