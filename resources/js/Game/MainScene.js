import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load your ship and bullet assets here
    }

    create() {
        this.add.text(10, 10, 'Bullet Hell Active', { fill: '#0f0' });
        this.player = this.add.rectangle(400, 500, 40, 40, 0x00ff00);
        this.physics.add.existing(this.player);
    }

    update() {
        // Handle 60fps movement and bullet spawning here
    }
}
