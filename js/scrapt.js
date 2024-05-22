//scrapt.js
const s1 = p => {
    let windowWidth = window.innerWidth, windowHeight = window.innerHeight
    let x = windowWidth / 2 - 10;
    let y = windowHeight / 2 - 10;
    let prev, next, cnv
    let cnvW = 150
    p.setup = function () {
      cnv = p.createCanvas(cnvW, cnvW, p.P2D);
  
      prev = p.createGraphics(cnvW, cnvW, p.P2D)
      next = p.createGraphics(cnvW, cnvW, p.P2D)
      // cnv.width = window.innerWidth
      // cnv.height = window.innerHeight
      console.log(cnv)
    };
  
    p.draw = function () {
  
      [prev, next] = [next, prev]
  
      mil = p.millis() * 0.003
  
      next.clear()
  
      next.push()
      next.translate(cnvW / 2, cnvW / 2)
      next.scale(1.08)
      // next.scale(.9)
  
      next.image(prev, -cnvW / 2, -cnvW / 2)
      next.pop()
  
      // next.rect(p.mouseX -10, p.mouseY -10, 20, 20)
  
      next.textSize(12);
      next.fill('yellow')
      next.stroke('black')
      next.strokeWeight(1)
      next.textFont('garamond')
      next.textStyle(p.BOLD);
      next.textAlign(p.CENTER)
      next.text('ProjectName', cnvW / 2, cnvW / 2)
  
      p.background(255)
      p.image(next, 0, 0)
  
    };
  };