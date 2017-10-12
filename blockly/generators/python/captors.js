Blockly.Python['picam_take_photo'] = function(block) {
    Blockly.Python.definitions_["import_picamera"] = 'import picamera';
    Blockly.Python.definitions_["import_os"] = 'import os';
    Blockly.Python.definitions_["camera"] = 'camera = picamera.PiCamera()';

    return "camera.capture(os.getcwd() + '/cam.jpg')\nprint '__picam__'\n";
  };