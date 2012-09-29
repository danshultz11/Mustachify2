$(document).ready(function() {
	initMustachify();
    document.addEventListener('deviceready', onDeviceReady, false);
});

function onDeviceReady() {
    initMustachify();
}

function initMustachify() {
	$('#btnNew').click(function(e) {
        e.preventDefault();
		mustachifyCamera.newPhoto();
	});
    
	mustachifyCanvas.initCanvas();
}

var mustachifyCanvas = {
    backgroundImage: 'img/photo.JPG',
    mustacheImage: 'img/Mustache270.png',
    initialized: false,
    backgroundLayer: null,
	initCanvas: function() {
        $('#container').html('');
		var stage = new Kinetic.Stage({
									  container: 'container',
									  width: window.innerWidth,
									  height: window.innerHeight
									  });
		
		var backgroundLayer = new Kinetic.Layer();
		var backgroundObj = new Image();
		backgroundObj.onload = function() {
            try {
                var background = new Kinetic.Image({
                                                   x: 0,
                                                   y: 0,
                                                   image: backgroundObj,
                                                   width: stage.width,
                                                   height: stage.height,
                                                   draggable: false,
                                                   scale: [window.innerWidth / backgroundObj.width, window.innerHeight / backgroundObj.height]
                                                   });
                
                
                // add the shape to the layer
                backgroundLayer.add(background);
                
                // add the layer to the stage
                stage.add(backgroundLayer);
                
                background.setZIndex(0);
			}
            catch(e) {
                alert(e.message);
            }
		};
		backgroundObj.src = this.backgroundImage;
        
        backgroundLayer.afterDraw(function() {
                                  var mustacheLayer = new Kinetic.Layer();
                                  var mustacheObj = new Image();
                                  mustacheObj.onload = function() {
                                  var mustache = new Kinetic.Image({
                                                                   x: 140,
                                                                   y: 150,
                                                                   image: mustacheObj,
                                                                   width: 270,
                                                                   height: 72,
                                                                   draggable: true
                                                                   });
                                  
                                  
                                  // add the shape to the layer
                                  mustacheLayer.add(mustache);
                                  
                                  // add the layer to the stage
                                  stage.add(mustacheLayer);
                                  
                                  mustache.setZIndex(99);
                                  mustachifyCanvas.initialized = true;
                                  };
                                  mustacheObj.src = mustachifyCanvas.mustacheImage;
                                  });
	}
};

var mustachifyCamera = {
    newPhoto: function() {
        try {
            navigator.camera.getPicture(this.onSuccess, this.onFail, {
                                        quality: 50,
                                        destinationType: Camera.DestinationType.FILE_URI,
                                        allowEdit: true,
                                        encodingType: Camera.EncodingType.JPEG,
                                        });
        }
        catch(e) {
            alert(e.message);
        }
    },
    onSuccess: function(imageUri) {
        mustachifyCanvas.backgroundImage = imageUri;
        mustachifyCanvas.initCanvas();
    },
    onFail: function(message) {
        alert('Failed because: ' + message);
    }
};