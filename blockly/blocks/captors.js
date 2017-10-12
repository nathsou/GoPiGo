'use strict';
goog.provide('Blockly.Blocks.captors');
goog.require('Blockly.Blocks');

Blockly.Blocks.captors.HUE = "#562E8A";

Blockly.Blocks['picam_take_photo'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.GOPIGO_TAKE_A_PICTURE);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.captors.HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };