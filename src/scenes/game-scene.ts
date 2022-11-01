import { Developer } from '../objects/developer';
import {
  EVENT_SCORE_CHANGED,
  REGISTRY_KEY_SCORE,
  SCENE_GAME
} from './constants';

export default class GameScene extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;

  private player?: Developer;

  score: number = 0;

  gameOver = false;

  stars: any;

  bombs: any;

  button: any;

  music: any;

  constructor() {
    super({ key: SCENE_GAME });
  }

  preload() {
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('developer', './assets/developer.png', {
      frameWidth: 70,
      frameHeight: 85
    });
    this.load.audio('theme_audio', ['./assets/audio/space.mp3']);
    this.load.spritesheet('revive_button', 'assets/revive-button.png', {
      frameWidth: 193,
      frameHeight: 71
    });
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.player = new Developer(this, 100, 450);

    // PLATFORM
    this.platforms = this.physics.add.staticGroup();

    /*
     * The call to refreshBody() is required because we have scaled
     * a static physics body, so we have to tell the physics world
     * about the changes we made
     */
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.physics.add.collider(this.player, this.platforms);

    // STARS
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(this.stars, this.platforms);

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );

    // BOMBS
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      undefined,
      this
    );

    // music
    this.music = this.sound.add('theme_audio').play();
  }

  private collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.registry.set(REGISTRY_KEY_SCORE, this.score);
    this.events.emit(EVENT_SCORE_CHANGED);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  update(): void {
    this.player?.update();
  }

  private hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }
}
