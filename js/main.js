var game;

window.onload= function() {
    var config = { 
        type: Phaser.AUTO, 
        width: 800, 
        height: 600, 
        parent: 'phaser-game',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1000 }
            }
        }, 
        scene: [
            SceneTitle,
            Scene_0
        ] 
    };

    game = new Phaser.Game(config);     
}

