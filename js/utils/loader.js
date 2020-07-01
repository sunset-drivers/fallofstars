const loader = {
    spritesheet: (config, params, callback) => {
        params.forEach(param => {
            config.scene.load.spritesheet(param.name, param.path,
                { frameWidth: 32, framHeight: 32 }
            );
        });
        config.scene.load.start();
        config.scene.load.once('complete', function(){
            callback();
        });        
    }
};