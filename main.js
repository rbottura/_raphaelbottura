window.addEventListener('DOMContentLoaded', function () {
    var mediaElements = document.querySelectorAll('video, img');
    var totalMediaElements = mediaElements.length;
    var loadedMediaCount = 0;

    // console.log(loadedMediaCount)
    function checkAllMediaLoaded() {
        loadedMediaCount++;
        if (loadedMediaCount === totalMediaElements) {
            var body = document.body;
            body.removeAttribute('hidden');
        }
    }

    mediaElements.forEach(function (media) {
        // console.log(media)
        media.addEventListener('load', checkAllMediaLoaded);
        media.addEventListener('error', checkAllMediaLoaded);
        if (media.complete) {
            checkAllMediaLoaded();
        }
    });

    
    let random = Math.floor(Math.random() * 4) + 1
    let random_sm_vid = './videos/smart_phone_vid_(' + Math.floor(random) + ').mp4'
    // let random_sm_vid = './videos/smart_phone_vid_(1).mp4'

    let random_pc_vid = './videos/pc_vid_(' + Math.floor(random) + ').mp4'
    // let random_pc_vid = './videos/pc_vid_(2).mp4'

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
    let posterIndex = Math.floor(indexSprite / 3)

    if (posterIndex == 3) {
        posterIndex = 0;
    }

    // console.log(posterIndex)
    let color = 'white';
    if (loop % 2 == 0) {
        color = 'black'
    } else {
        color = 'transparent'
    }

    imgs[indexSprite].style.backgroundColor = color;
    imgs[indexSprite].style.transform = 'rotate(' + 90 * loop + 'deg)'

    let posters1 = document.querySelectorAll('.gp_posters_1')
    if (indexSprite % 3 == 0) {
        for (let i = 0; i < posters1.length; i++) {
            posters1[i].style.flexGrow = '1'
        }
        posters1[posterIndex].style.flexGrow = '1.2'
    }

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
}

function animatePosters1() {
    let
}