function convertImageToCSS() {
    const input = document.getElementById('imgInput');
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            document.getElementById('original').innerHTML = '';
            document.getElementById('original').appendChild(img.cloneNode());
            mapImageToCSS(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function mapImageToCSS(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const imageDiv = document.getElementById('image');
    imageDiv.innerHTML = '';
    imageDiv.style.width = img.width + 'px';
    imageDiv.style.height = img.height + 'px';
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const i = (y * img.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3] / 255;
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.background = `rgba(${r},${g},${b},${a})`;
            imageDiv.appendChild(pixel);
        }
    }
}
