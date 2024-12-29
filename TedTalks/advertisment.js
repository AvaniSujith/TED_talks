const advertisement = document.getElementById('advertisement-block');

const advertisementBlock = document.createElement('div');
advertisementBlock.classList.add('advertisement');

advertisementBlock.innerHTML = `
    <div class="advertisement-header">
        <span>TED is supported by ads and partners</span>
    </div>
    <div class="advertisement-image">
        <img id="image1" src="https://tpc.googlesyndication.com/simgad/1297263008748295798" alt="img1" style="display: none;">
        <img id="image2" src="https://tpc.googlesyndication.com/simgad/485268857400999113" alt="img2" style="display: none;">
    </div>
`;

advertisement.appendChild(advertisementBlock);

const firstImage = document.getElementById('image1');
const nextImage = document.getElementById('image2');

const lastShown = localStorage.getItem('lastImage');

if (lastShown === 'firstImage') {
    firstImage.style.display = 'none';
    nextImage.style.display = 'block';
    localStorage.setItem('lastImage', 'nextImage');
} else {
    firstImage.style.display = 'block';
    nextImage.style.display = 'none';
    localStorage.setItem('lastImage', 'firstImage');
}