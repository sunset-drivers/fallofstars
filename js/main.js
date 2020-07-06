var game;

window.onload = function() {
    var config = { 
        type: Phaser.AUTO, 
        width: 800, 
        height: 640, 
        parent: 'phaser-game',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug:true,
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

function CameraFollow (scene, target) {
    scene.cameras.main.startFollow(target);
}

