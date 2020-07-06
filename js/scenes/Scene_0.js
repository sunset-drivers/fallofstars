class Scene_0 extends Phaser.Scene { 
  
    constructor() { 
        super('Scene_0'); 
        this.player; 
    } 

    preload() {
        this.load.spritesheet("player", "assets/sprites/player/vincent.png",
            { frameWidth: 32, framHeight: 32 }
        );         
        this.load.image("tiles", "assets/tilemaps/00/default.png")
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/00/sc_tm_00.json');             
    } 

    create() {                   
        this.player = new Player({scene:this, x:64, y:320});        
        
        const map = this.make.tilemap({key:"map"});

        //Os parâmetros são o nome do tileset no Tiled e o nome da imagem no preload()
        const tileset = map.addTilesetImage("default", "tiles");   

        //Os parâmetros são o Nome do Layer no Tiled, o tileset e a posição x e y;
        const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });   

        this.objectsLayer = map.createStaticLayer("objects", tileset, 0, 0);
        this.objectsLayer.setCollisionByProperty({ collides: true });   

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.player, this.objectsLayer);

        console.log("layer", this.objectsLayer);
    } 

    update() { 
        if(this.player)
        {   
            var keyObj = this.input.keyboard.addKey('R');    
                keyObj.on('down', () => this.player.Respawn());      
           // if(this.physics.collide(this.player))
              //  console.log("Colidiu, ", this.physics.collide(this.player, this.objectsLayer))

            this.player.PlayerControl();            
        }
            
    } 
    
} 