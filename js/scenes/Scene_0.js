class Scene_0 extends Phaser.Scene { 
  
    constructor() { super('Scene_0'); this.player;} 
    preload() { 
        this.load.image("background", "assets/sprites/00/background.png")        
    } 

    create() {
        var back = this.add.image(400,300,"background");
        this.player = new Player({scene:this, x:400, y:300});
    } 
    
    update() { 
        this.player.PlayerControl();
    } 
    
} 