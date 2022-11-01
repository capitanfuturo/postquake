import {
  EVENT_SCORE_CHANGED,
  REGISTRY_KEY_SCORE,
  SCENE_GAME,
  SCENE_HUD
} from './constants';

export default class HudScene extends Phaser.Scene {
  private textElements?: Map<string, Phaser.GameObjects.Text>;

  constructor() {
    super({ key: SCENE_HUD });
  }

  create(): void {
    const level = this.scene.get(SCENE_GAME);

    this.textElements = new Map([
      [
        REGISTRY_KEY_SCORE,
        this.addText(
          40,
          8,
          this.getScoreText(this.registry.get(REGISTRY_KEY_SCORE))
        )
      ]
    ]);

    // buttons
    this.add
      .text(100, 100, 'Restart', { color: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.removeAll();
        this.scene.restart();
      });

    // create events
    level.events.on(EVENT_SCORE_CHANGED, this.updateScore, this);
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.Text {
    return this.add.text(x, y, value, {
      fontSize: '32px',
      color: '#000'
    });
  }

  private updateScore() {
    const registryScore = this.registry.get(REGISTRY_KEY_SCORE);
    this.textElements
      ?.get(REGISTRY_KEY_SCORE)
      ?.setText(this.getScoreText(registryScore));
  }

  private getScoreText(score: number): string {
    return `Score: ${score}`;
  }
}
