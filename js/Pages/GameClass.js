const PIXI = require('pixi.js');
const Viewport = require('pixi-viewport');

PIXI.utils.skipHello()
const [w, h] = [window.innerWidth, window.innerHeight]
const Ratio = window.devicePixelRatio
const W = w * Ratio
const H = h * Ratio
const res = 'resources/spingame'
let textureButton = null
let textureButtonDown = null
let word1Texture
let word2Texture
let word3Texture
let word4Texture
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
PIXI.settings.RESOLUTION = devicePixelRatio || 1;

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class createGame {
  static getInstance () {

    if (!createGame.instance) {
      createGame.instance = new createGame()
    }
    return createGame.instance
  }


  constructor () {
    this.$dom = $('.play.page');
    // viewAdapt.push(".play .page", 342 / 523);
    // this.worldWidth = 1080 / 2
    this.worldWidth = 1080
    this.worldHeight = 1920
    // this.worldHeight = 1920 / 2
    // this.app = new PIXI.Application(window.innerWidth * Ratio, window.innerHeight * Ratio, {
    //   transparent: true,
    // });
    // PIXI.settings.RESOLUTION = window.devicePixelRatio
    this.running = false
    // PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      resolution: devicePixelRatio || 1,
      transparent: true
    })

    // this.viewport.zoom(500)
    // this.app.stage.scale(Ratio, Ratio);
    // this.viewport.fitWidth(this.worldWidth, true, true)
    //   .fitHeight(this.worldHeight, true, true)
    this.isHaveLoad = false
    this.isLoadFirst = false
    this.isLoadTouzi = false
    this.allTexture = {}
    this.objSprites = {
      frame: {
        ani: {
          marquee: {
            framesRange: [1, 9],
            ref: 'frame_',
            texture: '',
            viewport: ''
          }
        },
        json: [
          `${res}/frame-0.json`,
          `${res}/frame-1.json`,
        ]
      },
      word1: {
        ani: {
          wheel: {
            framesRange: [1, 21],
            ref: 'word1_',
            texture: '',
            viewport: ''
          }
        },
        json: [
          `${res}/word1.json`,
        ]
      },
      word2: {
        ani: {
          wheel: {
            framesRange: [1, 14],
            ref: 'word2_',
            texture: '',
            viewport: ''
          }
        },
        json: [
          `${res}/word2.json`,
        ]
      },
      word3: {
        ani: {
          wheel: {
            framesRange: [1, 20],
            ref: 'word3_',
            texture: '',
            viewport: ''
          }
        },
        json: [
          `${res}/word3.json`,
        ]
      },
      word4: {
        ani: {
          wheel: {
            framesRange: [1, 24],
            ref: 'word4_',
            texture: '',
            viewport: ''
          }
        },
        json: [
          `${res}/word4.json`,
        ]
      },
    }
  }

  init () {
    // this.
    this.$dom.append(this.app.view)
    // document.body.appendChild(this.app.view);
    this.viewport = new Viewport({
      // screenWidth: this.worldWidth / 2,
      // screenHeight: this.worldHeight / 2,
      // screenWidth: window.innerWidth,
      // screenHeight: window.innerHeight,
      // screenWidth: window.innerWidth,
      // screenHeight: window.innerHeight,
      screenWidth: w,
      screenHeight: h,
      worldWidth: this.worldWidth,
      worldHeight: this.worldHeight
    })
    // this.viewport.zoomPercent(50)
    // this.viewport
    //   .fitWidth(this.worldWidth, true, true)
    //   .fitHeight(this.worldHeight, true, true)
    this.viewport
      .fitWidth(this.worldWidth, false, false)
      .fitHeight(this.worldHeight, false, false)
    // this.viewport.cacheAsBitmap = true
    this.app.stage.addChild(this.viewport)
    // document.body.appendChild(this.app.view);
    this.loadRes((data) => {
      this.render(data)
    })
  }

  hide () {
    this.$dom.fadeOut();
  }

  show () {
    this.init()
    this.$dom.fadeIn();
  }

  render (data) {
    const val = function (i) {
      // 09
      if (i < 10) {
        return '0' + i
      } else {
        return i
      }
    }; // return a number valur increment (callBack)↓↓↓

    for (const resourceName in data) { // apply loop setup only on .json, They hold the textures && compile all texture inside a variable
      if (data[resourceName].extension === 'json') {
        Object.assign(this.allTexture, data[resourceName].textures)
      }
    }

    // 处理纹理
    for (const obj in this.objSprites) { // we have allTexture , now build with objSprites ani
      for (const aniType in this.objSprites[obj].ani) {
        const frames = []
        const ref = this.objSprites[obj].ani[aniType].ref
        const framesRange = this.objSprites[obj].ani[aniType].framesRange
        for (let i = framesRange[0]; i <= framesRange[1]; i++) {
          // console.log(allTexture[ref + val(i)])
          frames.push(this.allTexture[ref + val(i)])
        }
        this.objSprites[obj].ani[aniType].texture = new PIXI.extras.AnimatedSprite(frames)
      }
    }
    // 添加背景容器
    const bg = this.viewport.addChild(new PIXI.Container())
    this.objSprites.frame.ani.marquee.texture.zIndex = 1
    this.objSprites.frame.ani.marquee.texture.animationSpeed = 0.15
    this.objSprites.frame.ani.marquee.texture.width = this.worldWidth
    this.objSprites.frame.ani.marquee.texture.height = this.worldHeight
    bg.addChild(this.objSprites.frame.ani.marquee.texture)
    this.objSprites.frame.ani.marquee.texture.play()
    this.viewport.addChild(bg)

    word1Texture = this.objSprites.word1.ani.wheel.texture
    // word1Texture.scaleMode = PIXI.SCALE_MODES.NEAREST
    word2Texture = this.objSprites.word2.ani.wheel.texture
    word3Texture = this.objSprites.word3.ani.wheel.texture
    word4Texture = this.objSprites.word4.ani.wheel.texture

    word1Texture.width = 499
    word1Texture.height = 131
    word1Texture.x = this.worldWidth / 2
    word1Texture.y = 850
    word1Texture.anchor.set(0.5)


    word2Texture.width = 499
    word2Texture.height = 131
    word2Texture.anchor.set(0.5)
    word2Texture.x = this.worldWidth / 2
    word2Texture.y = 1000

    word3Texture.width = 499
    word3Texture.height = 131
    word3Texture.anchor.set(0.5)
    word3Texture.x = this.worldWidth / 2
    word3Texture.y = 1150

    word4Texture.width = 499
    word4Texture.height = 131
    word4Texture.anchor.set(0.5)
    word4Texture.x = this.worldWidth / 2
    word4Texture.y = 1300
    // console.log(this.objSprites.word1.ani.wheel.texture)
    // word1Texture.play()
    const words = new PIXI.Container()
    // words.addChild(this.objSprites.word1.ani.wheel.texture)
    // this.objSprites.word1.ani.wheel.texture.play()

    words.addChild(word1Texture)
    words.addChild(word2Texture)
    words.addChild(word3Texture)
    words.addChild(word4Texture)
    word1Texture.animationSpeed = 0.2
    word2Texture.animationSpeed = 0.2
    word3Texture.animationSpeed = 0.2
    word4Texture.animationSpeed = 0.2
    this.viewport.addChild(words)

    const buttonContainer = this.viewport.addChild(new PIXI.Container())
    textureButton = PIXI.Texture.fromImage(`${res}/button.png`)
    textureButtonDown = PIXI.Texture.fromImage(`${res}/buttonDown.png`)
    const button = new PIXI.Sprite(textureButton)
    button.buttonMode = true
    button.anchor.set(0.5)
    button.width = 353
    button.height = 240
    button.x = this.worldWidth / 2 + 10
    button.y = 1500

    // make the button interactive...
    button.interactive = true
    button.buttonMode = true
    button.zIndex = 100
    button
    // Mouse & touch events are normalized into
    // the pointer* events for handling different
    // button events.
    //   .on('pointerdown', this.onButtonDown)
    //   .on('pointerup', this.onButtonUp)
    //   .on('pointerupoutside', this.onButtonUp)
    // .on('pointerover', onButtonOver)
    // .on('pointerout', onButtonOut);

    // Use mouse-only events
    // .on('mousedown', this.onButtonDown)
    // .on('mouseup', this.onButtonUp)
    // .on('mouseupoutside', this.onButtonUp)
    // .on('mouseover', this.onButtonOver)
    // .on('mouseout', this.onButtonOut)

    // Use touch-only events
      .on('touchstart', this.onButtonDown)
      .on('touchend', this.onButtonUp)
      .on('touchendoutside', this.onButtonUp)

    buttonContainer.addChild(button)

  }

  onButtonDown () {
    this.isdown = true
    word1Texture.play()
    word2Texture.play()
    word3Texture.play()
    word4Texture.play()
    let min = 1230
    let max = 2340
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      word4Texture.stop()
    }, rand)
    setTimeout(function () {
      word1Texture.stop()
    }, rand);
    setTimeout(() => {
      word2Texture.stop()

    }, rand)

    setTimeout(() => {
      word3Texture.stop()
    }, rand)

// for (let i = 0; i < 3; i++) {
//   (function() {
//     let j = i;
//     setTimeout(function () {
//       word1Texture.stop()
//
//       word2Texture.stop()
//       word3Texture.stop()
//       word4Texture.stop()
//     }, Math.floor(Math.random() * 1000));
//   })();
// }
    // }
    this.texture = textureButtonDown
    // console.log(this.texture)
    this.alpha = 1
  }

  onButtonUp () {
    this.isdown = false
    this.texture = textureButton
  }

  onButtonOver () {
    if (!this.enable) return;
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.texture = textureButtonDown;
  }

  onButtonOut () {
    if (!this.enable) return;
    this.isOver = false;
    if (this.isdown) {
      return;
    }
    this.texture = textureButton;
  }

  loadRes (cb) {
    if (this.isLoadFirst) {
      cb && cb()
      return false
    }
    this.isLoadFirst = true
    this.loader = new PIXI.loaders.Loader()
    for (const obj in this.objSprites) {
      this.loader.add(this.objSprites[obj].json) // resource load for eatch objSprites
    }
    this.loader.load() // Start(callback)'added'↓↓↓
    this.loader.onComplete.add((loader, data) => {
      this.isHaveLoad = true
      cb && cb(data)
    })
  }

  setSize (sprite, len, size = 'width') {
    if (size === 'height') {
      const precent = len / sprite.height
      sprite.height = len
      sprite.width *= precent
    } else {
      const precent = len / sprite.width
      sprite.width = len
      sprite.height *= precent
    }
  }

}

module.exports = createGame
