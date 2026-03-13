import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // We will load images here later
    }

    create() {
        this.add.text(20, 20, 'Bullet Hell: Enemy Update', { font: '24px Arial', fill: '#00ff00' });

        // 1. Create the Player (Green Square)
        this.player = this.add.rectangle(400, 500, 40, 40, 0x00ff00);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Enable keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // 2. Create an Enemy Group
        this.enemies = this.physics.add.group();

        // 3. Set a Timer to Spawn Enemies (Every 1 second / 1000ms)
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // 4. Detect Collisions (Player touches Enemy)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    }

    update() {
        const speed = 300;

        // --- Player Movement ---
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        // --- Memory Cleanup (Crucial for Bullet Hells) ---
        // Destroy enemies that fall off the bottom of the screen
        this.enemies.getChildren().forEach((enemy) => {
            if (enemy.y > 650) {
                enemy.destroy();
            }
        });
    }

    // --- Custom Functions ---

    spawnEnemy() {
        // Pick a random X coordinate between 50 and 750
        const randomX = Phaser.Math.Between(50, 750);

        // Create a red square at the top of the screen
        const enemy = this.add.rectangle(randomX, 0, 30, 30, 0xff0000);
        this.physics.add.existing(enemy);

        // Add it to the group and make it fall down
        this.enemies.add(enemy);
        enemy.body.setVelocityY(200); // Speed of the enemy falling
    }

    hitEnemy(player, enemy) {
        // What happens when you crash?
        enemy.destroy(); // Destroy the specific enemy that hit you

        // Temporarily turn the player red to show damage
        player.fillColor = 0xff0000;

        // Change back to green after 200ms
        this.time.delayedCall(200, () => {
            player.fillColor = 0x00ff00;
        });

        // (Later, we will subtract health or trigger Game Over here)
    }
}
