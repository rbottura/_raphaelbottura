const WiW = window.innerWidth, WiH = window.innerHeight

const listProject = ['ColorKineType', 'Bonjour', 'Sketch-2-Print', 'FlowersFromMars', 'ProjetEclate', 'GridSketches', 'Others']
const nbrItems = listProject.length
const TitlesDomElems = document.querySelectorAll('.projectTitle')
let r = 250;
let points = [];
let listItems = []
let prevItemIndex;

const s2 = p => {
  class Item {
    constructor(x, y, z, scale, rotationValue, img, obj, index) {
      this.x = x
      this.y = y
      this.z = z
      this.scale = scale
      this.scaleEase = this.scale
      this.rotVal = rotationValue
      this.rotValEase = this.rotVal
      this.img = img
      this.obj = obj
      this.index = index
    }
    selection() {
      this.rotVal = p.TWO_PI * 3 - 2 * p.PI / 3
      this.scale = 1.7
    }
    deselection() {
      this.rotVal = p.PI / 3
      this.scale = .5
    }
    showIndexNum() {
      p.push()
      p.fill('black')
      p.textFont(font)
      p.textSize(32)
      p.rotateY(p.PI / 2)
      p.text(this.index + 1, 0, -120)
      p.pop()
    }
    show() {
      p.push()
      p.translate(this.x, this.y, this.z)

      p.push()
      // this.showIndexNum()
      this.rotValEase = easing(this.rotValEase, this.rotVal, 0.1)
      this.scaleEase = easing(this.scaleEase, this.scale, 0.1)
      p.noStroke()
      // p.stroke('black')
      p.rotateZ(p.PI)
      p.rotateY(this.rotValEase)
      p.scale(this.scaleEase)
      // p.texture(this.img)
      p.specularMaterial(0, 0, 255);
      p.shininess(1)
      p.model(this.obj)
      p.pop()

      p.pop()
    }
  }

  let cnvW = WiW, cnvH = WiH
  let cnv, font
  for (let i = 0; i < nbrItems; i++) {
    let angle = p.TWO_PI / nbrItems * i;
    let x = r * p.cos(angle);
    let z = r * p.sin(angle);
    points.push(p.createVector(x, 0, z));
  }

  for (const elem of TitlesDomElems) {
    elem.addEventListener('click', (e) => {
      let selectedItemIndex = dispProject(e.target)

      // display the page project
      activateProject(e.target)

      rotVal = rotArr[selectedItemIndex]
      if (listItems[prevItemIndex]) {
        listItems[prevItemIndex].deselection()
      }
      listItems[selectedItemIndex].selection()
      if (dispProject)
        if (prevItemIndex != selectedItemIndex) {
          prevItemIndex = selectedItemIndex
        }
    })
  }

  function dispProject(elem) {
    let arr = Array.prototype.slice.call(TitlesDomElems)
    console.log(arr.indexOf(elem))
    return arr.indexOf(elem)
  }

  p.preload = function () {
    font = p.loadFont('./assets/LibreBaskerville-Regular.ttf')

    for (let i = 0; i < nbrItems; i++) {
      let obj = p.loadModel('./assets/3D/' + listProject[i] + '.obj', true)
      let img = p.loadImage('./img/texture/blank.png')
      let newItem = new Item(points[i].x, points[i].y, points[i].z, .5, 0, img, obj, i)
      listItems.push(newItem)
    }
  }

  p.setup = function () {
    cnv = p.createCanvas(cnvW, cnvH - 55, p.WEBGL);
    p.angleMode(p.RADIANS)
  };

  let rotArr = Array.from({length: 7}, (v, i) => (3 - i * (10.3 / 6)).toFixed(2)).map(Number);
  console.log(rotArr)
  let rotEase = 0, rotVal = 3

  p.draw = function () {
    p.background(255, 0)
    // p.lights()
    p.pointLight(255, 255, 255, 30, -40, 30);
    let c = p.color(255, 0, 180);
    p.directionalLight(c, 1, 1, 0);

    // Draw spheres at each point
    p.push()
    rotEase = easing(rotEase, rotVal, .1)
    p.rotateY(-p.PI / 6 * rotEase)
    
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].show()
    }
    p.pop()
  };
};

new p5(s2, 'bckCanvasContainer')

function easing(from, to, ease) {
  return from + (to - from) * ease
}

function activateProject(title) {
  let state = title.classList.contains('activeTitle')
  if (!state) {
    TitlesDomElems.forEach(elem => {
      elem.classList.remove('activeTitle')
    })
    title.classList.add('activeTitle')

    let ProjectsDomElems = document.querySelectorAll('.projectContainer')
    let indexSelectedProject = [...TitlesDomElems].indexOf(title)

    ProjectsDomElems.forEach(elem => {
      elem.style.display = 'none'
    })

    ProjectsDomElems[indexSelectedProject].style.display = 'flex'

    navigationUpdate(false)
    updateProjectInfos(listPrjInfos[indexSelectedProject])
  }
}

document.querySelector('#displayPageButton').addEventListener('click', (e) => {
  navigationUpdate(true)
})

function navigationUpdate(show) {
  const cnvContainer = document.querySelector('#bckCanvasContainer')
  const btnContainer = document.querySelector('#displayPageButtonContainer')

  if (show) {
    cnvContainer.style.display = "none"
    btnContainer.style.display = "none"
  } else {
    cnvContainer.style.display = "block"
    btnContainer.style.display = "flex"
  }
}

