import {
  FRAME_AMAZON,
  FRAME_DEVELOPER,
  REGISTRY_KEY_SCORE,
  SCENE_BOOT,
  SCENE_GAME,
  SCENE_HUD,
  SCENE_MENU
} from './constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_BOOT
    });
  }

  init(): void {
    this.initRegistry();
  }

  preload() {
    console.log('preload boot');
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet(FRAME_DEVELOPER, './assets/developer.png', {
      frameWidth: 70,
      frameHeight: 85
    });
    this.load.spritesheet(FRAME_AMAZON, './assets/amazon.png', {
      frameWidth: 70,
      frameHeight: 85
    });
    this.load.audio('theme_audio', ['./assets/audio/space.mp3']);
    this.load.spritesheet('revive_button', 'assets/revive-button.png', {
      frameWidth: 193,
      frameHeight: 71
    });
  }

  update(): void {
    this.scene.start(SCENE_MENU);
    // this.scene.start(SCENE_HUD);
    // this.scene.start(SCENE_GAME);
    // this.scene.bringToTop(SCENE_HUD);
  }

  private initRegistry(): void {
    this.registry.set(REGISTRY_KEY_SCORE, 0);
  }
}
