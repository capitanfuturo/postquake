import { Action, FRAME_DEVELOPER, Key } from '../scenes/constants';

export class Developer extends Phaser.Physics.Arcade.Sprite {
  private VELOCITY_X = 350;
  private VELOCITY_Y = 350;

  private actionKeyboardMap = new Map<string, Phaser.Input.Keyboard.Key>();
  private velocityX = this.VELOCITY_X;
  private velocityY = this.VELOCITY_Y;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, FRAME_DEVELOPER);
    this.initSprite();
    this.scene.add.existing(this);
  }

  initSprite(): void {
    // input
    this.addKey(Action.DOWN, Key.DOWN);
    this.addKey(Action.JUMP, Key.UP);
    this.addKey(Action.LEFT, Key.LEFT);
    this.addKey(Action.RIGHT, Key.RIGHT);

    // animation
    this.anims.create({
      key: Action.LEFT,
      frames: this.anims.generateFrameNumbers(FRAME_DEVELOPER, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: Action.TURN,
      frames: [{ key: FRAME_DEVELOPER, frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: Action.RIGHT,
      frames: this.anims.generateFrameNumbers(FRAME_DEVELOPER, {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    // physics
    this.scene.physics.world.enable(this);
  }

  init(): void {
    // physiscs
    this.setBounce;
    this.setCollideWorldBounds(true);
    this.setGravityY(500);
  }

  update(): void {
    this.handleInput();
    this.handleAnimations();
  }

  private handleInput(): void {
    // x-axis
    if (this.getKey(Action.LEFT)?.isDown) {
      this.velocityX = -this.VELOCITY_X;
    } else if (this.getKey(Action.RIGHT)?.isDown) {
      this.velocityX = this.VELOCITY_X;
    } else {
      this.velocityX = 0;
    }
    this.setVelocityX(this.velocityX);

    // y-axis
    if (this.getKey(Action.JUMP)?.isDown && this.body.touching.down) {
      this.velocityY = -this.VELOCITY_Y;
      this.setVelocityY(this.velocityY);
    }
  }

  private handleAnimations(): void {
    if (this.velocityX === 0) {
      this.anims.play(Action.TURN);
    } else if (this.velocityX > 0) {
      this.anims.play(Action.RIGHT, true);
    } else if (this.velocityX < 0) {
      this.anims.play(Action.LEFT, true);
    }
  }

  private addKey(action: Action, key: Key): void {
    this.actionKeyboardMap.set(action, this.scene.input.keyboard.addKey(key));
  }

  private getKey(action: Action): Phaser.Input.Keyboard.Key | undefined {
    return this.actionKeyboardMap.get(action);
  }
}
