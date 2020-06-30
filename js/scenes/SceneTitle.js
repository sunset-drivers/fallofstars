class SceneTitle extends Phaser.Scene { 
    constructor() { super('SceneTitle'); } 
    preload() { 
        this.load.image("btnPlay","assets/sprites/00/btnPlay.png"); 
        this.load.image("title","assets/sprites/00/title2.png");
    } 

    create() {
         console.log('SceneTitle'); 
         var btnStart = this.add.image(400,400,'btnPlay');

         btnStart.setInteractive();
         btnStart.on("pointerdown", this.startGame, this);
         var title = this.add.image(400,100,'title');
    } 
    
    update() { 

    } 
    
    startGame() { 
        this.scene.start('Scene_0');
    }
} 