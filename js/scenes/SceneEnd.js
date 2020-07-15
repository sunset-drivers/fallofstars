class SceneEnd extends Phaser.Scene { 
    constructor() { super('SceneEnd'); } 
    preload() { 
        this.load.image("btnReplay","assets/sprites/end/replay_button.png"); 
        this.load.image("the_end","assets/sprites/end/the_end.png");
    } 

    create() {         
         var msgEnd = this.add.image(400,200,'the_end');
         var btnRestart = this.add.image(400,400,'btnReplay');
         btnRestart.setScale(0.2);
         btnRestart.setInteractive();
         btnRestart.on("pointerdown", this.RestartGame, this);        
    } 
    
    update() { 

    } 
    
    RestartGame() { 
        this.scene.start('Scene_0');
    }
} 