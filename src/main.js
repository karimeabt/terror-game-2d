import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create, update }
}

let player
let keys
let darkness
let maskShape

new Phaser.Game(config)

function preload () {
  this.load.image('player', 'assets/characters/player.png')
}
function create () {
  // PLAYER
  player = this.physics.add.sprite(400, 300, 'player')
  player.setCollideWorldBounds(true)
  player.setScale(0.5)

  keys = this.input.keyboard.addKeys('W,A,S,D')

  // DARK OVERLAY
  darkness = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8)

  // MASK GRAPHIC
  maskShape = this.make.graphics({ x: 0, y: 0, add: false })
  maskShape.fillStyle(0xffffff)
  maskShape.fillCircle(player.x, player.y, 120)

  const mask = maskShape.createGeometryMask()
  darkness.setMask(mask)
}

function update () {
  const speed = 120
  player.setVelocity(0)

  if (keys.A.isDown) player.setVelocityX(-speed)
  if (keys.D.isDown) player.setVelocityX(speed)
  if (keys.W.isDown) player.setVelocityY(-speed)
  if (keys.S.isDown) player.setVelocityY(speed)

  // UPDATE LIGHT
  maskShape.clear()
  maskShape.fillStyle(0xffffff)
  maskShape.fillCircle(player.x, player.y, 80)
}
