
window.addEventListener('load', function () {
    console.log('hey')
    let random = Math.floor(Math.random() * 3) + 1
    let random_sm_vid = './videos/smart_phone_vid_(' + Math.floor(random) + ').mp4'

    let random_pc_vid = './videos/pc_vid_(1).mp4'

    let videoContainer = document.getElementById('video-container');

    // Check if the device is a smartphone
    let isSmartphone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isSmartphone) {
        videoContainer.innerHTML = '<video src="' + random_sm_vid + '"  autoplay muted loop></video>';
    } else {
        videoContainer.innerHTML = '<video src="' + random_pc_vid + '"  autoplay muted loop></video>';
    }

    animateSprites()
});

let indexSprite = 0;
let loop = 0;
let loopSprites = true
function animateSprites() {
    let imgs = document.querySelectorAll('.sprites')
    let color = 'white';
    if (loop % 2 == 0) {
        color = 'black'
    } else {
        color = 'transparent'
    }
    imgs[indexSprite].style.backgroundColor = color;
    imgs[indexSprite].style.transform = 'rotate(' + 90 * loop + 'deg)'
    indexSprite++
    if (indexSprite == imgs.length) {
        indexSprite = 0
        loop++
    }
    if (loop == 25) {
        loopSprites = false
    }
    if (loopSprites) {
        setTimeout(() => { animateSprites() }, 1000);
    }

    let posters1 = document.querySelectorAll('.gp_posters_1')
    if (indexSprite % 3 == 0) {
        for (let i = 0; i < posters1.length; i++) {
            posters1[i].style.flexGrow = '1'
        }
        posters1[Math.floor(indexSprite/2.5)].style.flexGrow = '1.8'
    }
    console.log(indexSprite)
}

function animatePosters1() {
    let
}