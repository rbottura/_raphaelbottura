const WiW = window.innerWidth, WiH = window.innerHeight
const scaleCanvas = 0.5 
let persoInfoShowing = true, cnvW = WiW * scaleCanvas, cnvH 
let phoneDisp = isMobileDevice()

function togglePersoInfos() {
    console.log("function show infos")
    const container = document.querySelector('#persoInfoContainer');
    cnvH = isMobileDevice() ? 776*scaleCanvas : WiH*scaleCanvas 
    if (persoInfoShowing) {
        container.style[isMobileDevice() ? 'top' : 'bottom'] = '100vh';
    } else {
        container.style[isMobileDevice() ? 'top' : 'bottom'] = '0';
    }
    persoInfoShowing = !persoInfoShowing;
}

togglePersoInfos()

document.querySelectorAll('#nameTitle, #closeInfosButton').forEach(elem => {
    elem.addEventListener('click', () => {
        togglePersoInfos()
    });
})


function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

class prjInfos {
    constructor(tag, date, license, github) {
        this.tag = tag
        this.date = date
        this.license = license
        this.github = github
    }
}

let prj_ColorKineType = new prjInfos('tool', '2022 - 2023', 'MIT license', 'https://colorkinetype.com')
let prj_Bonjour = new prjInfos('exhibition', '2023', 'no license', '')
let prj_Sketch2print = new prjInfos('tool', '2022 - 2023', 'MIT license', 'https://sketch2print.netlify.app')
let prj_FlowersFromMars = new prjInfos('illustration', '2023', 'no license', '')
let prj_ProjetEclate = new prjInfos('p5js 3D Music', '2022', 'no license', '')
let prj_GridSketches = new prjInfos('tool', '2024', 'MIT license', 'https://github.com/rbottura/grid_sketch')
let prj_Others = new prjInfos('video', 'various years', 'MIT license', '')

const listPrjInfos = [
    prj_ColorKineType,
    prj_Bonjour,
    prj_Sketch2print,
    prj_FlowersFromMars,
    prj_ProjetEclate,
    prj_GridSketches,
    prj_Others
]

function updateProjectInfos(prj) {
    let listInfosElems = document.querySelector('#projectInfos').children
    console.log(listInfosElems)
    for (let i = 0; i < listInfosElems.length; i++) {
        if (i == 3 && Object.values(prj)[i]) {
            listInfosElems[i].innerHTML = 'Link'
            listInfosElems[i].href = Object.values(prj)[i]
        } else {
            listInfosElems[i].innerHTML = Object.values(prj)[i]
        }
    }
}


document.querySelectorAll('img').forEach(elem => {
    if (!elem.classList.contains('noZoom')) {
        elem.classList.add('imageViews')
        elem.addEventListener('click', (e) => {
            showImgFullscreen(e.target)
        })
    }
})

showImgFullscreen()
function showImgFullscreen(image) {

    let imageViewerWrapper = document.createElement('div')
    imageViewerWrapper.style.display = 'flex'
    imageViewerWrapper.style.alignItems = 'center'
    imageViewerWrapper.style.justifyContent = 'center'
    imageViewerWrapper.style.position = 'fixed'
    imageViewerWrapper.style.top = '0px'
    imageViewerWrapper.style.width = '100vw'
    imageViewerWrapper.style.height = '100vh'
    imageViewerWrapper.style.zIndex = '500'
    imageViewerWrapper.style.backgroundColor = 'rgba(160, 160, 255, .4)'
    imageViewerWrapper.style.backdropFilter = 'blur(4px)'

    imageViewerWrapper.addEventListener('click', e => {
        imageViewerWrapper.remove()
    })

    let bigImage = document.createElement('img')
    if (image) {
        if (image.naturalHeight / image.naturalWidth > 1) {
            bigImage.style.height = '92%'
        } else {
            bigImage.style.width = '86%'
        }
        bigImage.classList.add('zoomedIn')
        bigImage.src = image.src
        imageViewerWrapper.appendChild(bigImage)
        document.body.appendChild(imageViewerWrapper)
    }
}