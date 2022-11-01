import {
  REGISTRY_KEY_SCORE,
  SCENE_BOOT,
  SCENE_GAME,
  SCENE_HUD,
} from "./constants";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_BOOT,
    });
  }

  init(): void {
    this.initRegistry();
  }

  update(): void {
    this.scene.start(SCENE_HUD);
    this.scene.start(SCENE_GAME);
    this.scene.bringToTop(SCENE_HUD);
  }

  private initRegistry(): void {
    this.registry.set(REGISTRY_KEY_SCORE, 0);
  }
}
