class SceneTitle extends Phaser.Scene { 
    constructor() { super('SceneTitle'); } 
    preload() { 
        this.load.image("btnPlay","assets/sprites/title/btnPlay.png"); 
        this.load.image("title","assets/sprites/title/title2.png");
        this.load.image("back","assets/sprites/title/back.png");
    } 

    create() {
         console.log('SceneTitle'); 
         var background = this.add.image(400,300,'back');
         background.setScale(4);
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