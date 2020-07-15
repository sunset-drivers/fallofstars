var game;

window.onload = function() {
    var config = { 
        type: Phaser.AUTO, 
        width: 800, 
        height: 600, 
        parent: 'phaser-game',
        pixelArt: true,
        backgroundColor: '0x000044',
        physics: {
            default: 'arcade',
            arcade: {
                //debug:true,
                gravity: { y: 1000 }
            }
        }, 
        scene: [
            SceneTitle,
            Scene_0,
            Scene_1,
            SceneEnd
        ] 
    };

    game = new Phaser.Game(config);     
}

function CameraFollow (scene, target) {
    scene.cameras.main.startFollow(target);
}