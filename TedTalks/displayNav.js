const displayBtn = document.getElementById('search-end-icon');

displayBtn.addEventListener('click', () =>{
    const div = document.getElementById("show-block")
    div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";

    if(div.style.display === "flex"){
        const style = document.createElement('style');
        style.textContent = `
            .search-btns-block{
                padding-bottom: 1.5rem;
            } 
        `;
        document.head.appendChild(style);
    }
})

