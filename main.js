const videoInput = document.getElementById('videoInput');
const videoCanvas = document.getElementById('videoCanvas');
const asciiCanvas = document.getElementById('asciiCanvas');

async function getCameraStream() {
    try {
        return await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    } catch (err) {
        console.log('Could not obtain webcam')
    }
}

async function renderVideo() {
    videoInput.srcObject = await getCameraStream()
}

function renderCanvas() {
    videoCanvas
        .getContext('2d')
        .drawImage(videoInput, 0, 0)

    requestAnimationFrame(renderCanvas);
}

function renderAsciiCanvas() {
    const image = videoCanvas
        .getContext('2d')
        .getImageData(0, 0, 720, 648)

    asciiCanvas
        .getContext('2d')
        .putImageData(transform(image), 0, 0)

    requestAnimationFrame(renderAsciiCanvas);
}

function transform(image) {
    let avg, i;

    // apply a  simple greyscale transformation
    for (i = 0; i < image.data.length; i += 4) {
        avg = (
            image.data[i] +
            image.data[i + 1] +
            image.data[i + 2]
        ) / 3;
        image.data[i] = avg;
        image.data[i + 1] = avg;
        image.data[i + 2] = avg;
    }

    return image;
}

renderVideo();
renderCanvas();
renderAsciiCanvas();