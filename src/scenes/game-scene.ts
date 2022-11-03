export default class Game extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;

  private player?: Phaser.Physics.Arcade.Sprite;

  score: number = 0;

  scoreText: any;

  gameOver = false;

  stars: any;

  bombs: any;

  button: any;

  music: any;

  private velocityX: number;
  private velocityY: number;

  constructor() {
    super("PostQuake");
  }

  init() {
    this.velocityX = 600;
    this.velocityY = 800;
  }

  preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("ground", "./assets/platform.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.spritesheet("developer", "./assets/developer.png", {
      frameWidth: 70,
      frameHeight: 85,
    });
    this.load.audio("theme_audio", ["./assets/audio/space.mp3"]);
    this.load.spritesheet("revive_button", "assets/revive-button.png", {
      frameWidth: 193,
      frameHeight: 71,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    // PLATFORM
    this.platforms = this.physics.add.staticGroup();

    /*
     * The call to refreshBody() is required because we have scaled
     * a static physics body, so we have to tell the physics world
     * about the changes we made
     */
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    // STARS
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(this.stars, this.platforms);

    // PLAYERS
    this.player = this.physics.add.sprite(100, 450, "developer");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("developer", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "developer", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("developer", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setGravityY(500);
    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });

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
    this.music = this.sound.add("theme_audio").play();

    // buttons
    this.button = this.add
      .text(100, 100, "Restart", { color: "#0f0" })
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.removeAll();
        this.scene.restart();
        console.log("click");
      });
  }

  private collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  private hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.gameOver = true;
  }

  update(time: number, delta: number): void {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-this.velocityX);

      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(this.velocityX);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-this.velocityY);
    }
  }

  public setVelocityX(velocity: number) {
    this.velocityX = velocity;
  }

  public setVelocityY(velocity: number) {
    this.velocityY = velocity;
  }
}
