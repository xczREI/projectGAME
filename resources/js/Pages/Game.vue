<script setup>
import { onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';
import MainScene from '@/Game/MainScene';

let game = null;

onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: 800,
        height: 600,
        physics: { default: 'arcade' },
        scene: MainScene
    };
    game = new Phaser.Game(config);
});

onUnmounted(() => {
    if (game) game.destroy(true);
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <div id="game-container"></div>
    </div>
</template>
