const displayBtn = document.getElementById('search-end-icon');

displayBtn.addEventListener('click', () =>{
    const div = document.getElementById("show-block")
    div.style.display = (div.style.display === "none" || div.style.display === "") ? "flex" : "none";
})