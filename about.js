window.addEventListener('load', function () {
    var mediaElements = document.querySelectorAll('video, img');
    var totalMediaElements = mediaElements.length;
    var loadedMediaCount = 0;

    console.log(loadedMediaCount)
    function checkAllMediaLoaded() {
        loadedMediaCount++;
        console.log(loadedMediaCount)
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
    // Check if the device is a smartphone
    let isSmartphone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    animateSprites()
});

function showPencil(){
    console.log('oue')
    console.log(document.querySelector('#btn_mainPage').childNodes[0])
    document.querySelector('#btn_mainPage').childNodes[0].click()
}

let indexSprite = 0;
let loop = 0;
let loopSprites = true;

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