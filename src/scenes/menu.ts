import { Amazon } from '../objects/amazon';
import { Developer } from '../objects/developer';
import {
  BUTTON_AMAZZ_DISABLED,
  BUTTON_AMAZZ_ENABLED,
  BUTTON_DEV_DISABLED,
  BUTTON_DEV_ENABLED,
  FRAME_AMAZON,
  FRAME_DEVELOPER,
  SCENE_BOOT,
  SCENE_MENU
} from './constants';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_MENU
    });
  }

  private isDev = false;

  private player;

  private buttonAmazzEnab: Phaser.GameObjects.Image;
  private buttonDevDisab: Phaser.GameObjects.Image;
  private buttonAmazzDisab: Phaser.GameObjects.Image;
  private buttonDevEnab: Phaser.GameObjects.Image;

  preload() {
    console.log('preload menu');
    this.load.image(
      BUTTON_AMAZZ_ENABLED,
      '../assets/menu/amazzone_disabled.png'
    );
    this.load.image(
      BUTTON_AMAZZ_DISABLED,
      '../assets/menu/amazzone_enabled.png'
    );
    this.load.image(BUTTON_DEV_ENABLED, '../assets/menu/dev_disabled.png');
    this.load.image(BUTTON_DEV_DISABLED, '../assets/menu/dev_enabled.png');
  }

  create() {
    this.add.text(500, 50, 'CHOOSE CHARACTER', {
      font: '30px Arial',
      color: 'black',
      fixedWidth: 200,
      wordWrap: {
        width: 50
      },
      align: 'center'
    });

    this.buttonAmazzEnab = this.createButton(
      this.game.renderer.width / 2 + 200,
      this.game.renderer.height / 2 - 100,
      BUTTON_AMAZZ_ENABLED,
      1,
      0.5
    );

    this.buttonDevDisab = this.createButton(
      this.game.renderer.width / 2 + 200,
      this.game.renderer.height / 2 - 30,
      BUTTON_DEV_DISABLED,
      1,
      0.5
    );

    this.buttonAmazzDisab = this.createButton(
      this.game.renderer.width / 2 + 200,
      this.game.renderer.height / 2 - 100,
      BUTTON_AMAZZ_DISABLED,
      1,
      0.5
    );

    this.buttonAmazzDisab.visible = false;

    this.buttonDevEnab = this.createButton(
      this.game.renderer.width / 2 + 200,
      this.game.renderer.height / 2 - 30,
      BUTTON_DEV_ENABLED,
      1,
      0.5
    );

    this.buttonDevEnab.visible = false;

    const dev = this.createSpriteFrame(
      this.game.renderer.width / 2 + 50,
      this.game.renderer.height / 2 - 30,
      FRAME_DEVELOPER,
      4,
      0.7
    );

    const amazon = this.createSpriteFrame(
      this.game.renderer.width / 2 + 50,
      this.game.renderer.height / 2 - 100,
      FRAME_AMAZON,
      3,
      0.7
    );

    this.player = new Amazon(this, 100, 450);
  }

  private createButton(
    x: number,
    y: number,
    texture: string,
    depth?: number,
    scale?: number
  ) {
    const button = this.add.image(x, y, texture);

    if (depth) {
      button.setDepth(depth);
    }

    if (scale) {
      button.scale = scale;
    }

    button.setInteractive().on('pointerdown', () => this.toggleChoice(texture));

    return button;
  }

  private createSpriteFrame(
    x: number,
    y: number,
    texture: string,
    frame: number,
    scale?: number
  ) {
    const spriteFrame = this.add.sprite(x, y, texture, frame);

    if (scale) {
      spriteFrame.scale = scale;
    }

    return spriteFrame;
  }

  private toggleChoice(texture: string) {
    if (texture === BUTTON_AMAZZ_DISABLED && this.isDev) {
      this.buttonDevDisab.visible = true;
      this.buttonDevEnab.visible = false;
      this.buttonAmazzEnab.visible = true;
      this.buttonAmazzDisab.visible = false;
      this.isDev = false;
      this.player = new Amazon(this, 100, 450);
    }
    if (texture === BUTTON_DEV_DISABLED && !this.isDev) {
      this.buttonDevDisab.visible = false;
      this.buttonDevEnab.visible = true;
      this.buttonAmazzEnab.visible = false;
      this.buttonAmazzDisab.visible = true;
      this.isDev = true;
      this.player = new Developer(this, 100, 450);
    }
  }
}
