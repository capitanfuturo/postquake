import {
  EVENT_SCORE_CHANGED,
  KEY_SCORE,
  SCENE_GAME,
  SCENE_HUD,
} from "./constants";

export default class HudScene extends Phaser.Scene {
  private textElements?: Map<string, Phaser.GameObjects.BitmapText>;

  constructor() {
    super({ key: SCENE_HUD });
  }

  create(): void {
    this.textElements = new Map([
      [KEY_SCORE, this.addText(40, 8, `${this.registry.get(KEY_SCORE)}`)],
    ]);
    // [KEY_TIME, this.addText(136, 8, `${this.registry.get(KEY_TIME)}`)]

    // create events
    const level = this.scene.get(SCENE_GAME);
    level.events.on(EVENT_SCORE_CHANGED, this.updateScore, this);
    // add timer
    // this.timer = this.time.addEvent({
    //   delay: 1000,
    //   callback: this.updateTime,
    //   callbackScope: this,
    //   loop: true,
    // });
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.Text {
    return this.add.text(x, y, value, {
      fontSize: "32px",
      color: "#000",
    });
  }

  // private updateTime() {
  //   this.registry.values.time -= 1;
  //   this.textElements.get(KEY_TIME).setText(`${this.registry.get(KEY_TIME)}`);
  // }

  private updateScore() {
    const registryScore = this.registry.get(KEY_SCORE);
    this.textElements
      .get(KEY_SCORE)
      .setText(`Score: ${registryScore}`)
      .setX(40 - 8 * (registryScore.toString().length - 1));
  }
}
