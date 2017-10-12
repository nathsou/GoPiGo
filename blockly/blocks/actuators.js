'use strict';
goog.provide('Blockly.Blocks.actuators');
goog.require('Blockly.Blocks');
/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.actuators.HUE = "#A52022";
var NOTES = [
    ["play note A3 on buzzer", "A3"],
    ["play note A3# on buzzer", "A3#"],
    ["play note B3 on buzzer", "B3"],
    ["play note C4 on buzzer", "C4"],
    ["play note C4# on buzzer", "C4#"],
    ["play note D4 on buzzer", "D4"],
    ["play note D4# on buzzer", "D4#"],
    ["play note E4 on buzzer", "E4"],
    ["play note F4 on buzzer", "F4"],
    ["play note F4# on buzzer", "F4#"],
    ["play note G4 on buzzer", "G4"],
    ["play note G4# on buzzer", "G4#"],
    ["play note A4 on buzzer", "A4"],
    ["play note A4# on buzzer", "A4#"],
    ["play note B4 on buzzer", "B5"],
    ["play note C5 on buzzer", "C5"],
    ["play note C5# on buzzer", "C5#"],
    ["play note D5 on buzzer", "D5"],
    ["play note D5# on buzzer", "D5#"],
    ["play note E5 on buzzer", "E5"],
    ["play note F5 on buzzer", "F5"],
    ["play note F5# on buzzer", "F5#"],
    ["play note G5 on buzzer", "G5"],
    ["play note G5# on buzzer", "G5#"]
];
/////////////////////////////
// LED
/////////////////////////////
Blockly.Blocks['actuator_led'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn LED on at")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("%");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1 on at", "AD1"],
                        ["turn LED in port AD2 on at", "AD2"]
                    ]),
                    "led_port")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("%");
        }
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you set the Grove LED to the specified intensity. 0% is the same as turning it off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_simple_led'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED on", "on"],
                        ["turn LED off", "off"]
                    ]),
                    "led_status");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1", "AD1"],
                        ["turn LED in port AD2", "AD2"]
                    ]),
                    "led_port")
                .appendField(new Blockly.FieldDropdown([
                        ["on", "on"],
                        ["off", "off"]
                    ]),
                    "led_status");
        }
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you turn the Grove LED on or off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_led_ext'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField("turn LED on at");
        } else {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1 on at", "AD1"],
                        ["turn LED in port AD2 on at", "AD2"]
                    ]),
                    "led_port");
        }
        this.appendDummyInput()
            // .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
            .appendField("%");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you set the Grove LED to the specified intensity. 0% is the same as turning it off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_simple_led_timebased'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn LED on")
                .appendField("for");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1 on", "AD1"],
                        ["turn LED in port AD2 on", "AD2"]
                    ]),
                    "led_port")
                .appendField("for");
        }
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 0, 100, 0), "seconds")
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you set the Grove LED on for a certain amount of time. 0% is the same as turning it off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_led_timebased'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn LED on at")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("% for");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1 on at", "AD1"],
                        ["turn LED in port AD2 on at", "AD2"]
                    ]),
                    "led_port")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("% for");
        }
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 0, 100, 0), "seconds")
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you set the Grove LED to the specified intensity for a certain amount of time. 0% is the same as turning it off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_led_timebased_ext'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField("turn LED on at");
        } else {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                        ["turn LED in port AD1 on at", "AD1"],
                        ["turn LED in port AD2 on at", "AD2"]
                    ]),
                    "led_port");
        }
        this.appendValueInput("seconds")
            .setCheck("Number")
            .appendField("% for ");
        this.appendDummyInput()
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block lets you set the Grove LED to the specified intensity for a certain amount of time. 0% is the same as turning it off.');
        this.setHelpUrl('');
    }
};
/////////////////////////////
// BUZZER
/////////////////////////////
Blockly.Blocks['actuator_buzzer'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn buzzer on at")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("%");
            this.setTooltip('You can choose any number between 0 and 100');
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1", "AD1"],
                        ["turn buzzer in port AD2", "AD2"]
                    ]),
                    "buzzer_port")
                .appendField(new Blockly.FieldDropdown([
                        ["on", "on"],
                        ["off", "off"]
                    ]),
                    "buzzer_status");
            this.setTooltip('This block turns the buzzer on or off');
        }
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo2_actuator_simple_buzzer'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer on", "on"],
                        ["turn buzzer off", "off"]
                    ]),
                    "buzzer_status");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1", "AD1"],
                        ["turn buzzer in port AD2", "AD2"]
                    ]),
                    "buzzer_port")
                .appendField(new Blockly.FieldDropdown([
                        ["on", "on"],
                        ["off", "off"]
                    ]),
                    "buzzer_status");
        }
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block will turn the buzzer on and off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_buzzer_ext'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField("turn buzzer on at");
            this.appendDummyInput()
                // .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("%");
            this.setTooltip('This block will turn on the buzzer at the setting you choose. You can choose any number between 0 and 100 but this is not a pure volume control.');
        } else {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on at", "AD1"],
                        ["turn buzzer in port AD2 on at", "AD2"]
                    ]),
                    "buzzer_port");
            this.appendDummyInput()
                // .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("Hz");
            this.setTooltip('This block will turn on the buzzer at the setting you choose. You can choose between 0 and 5500 Hz. Higher value for Hz is a higher pitch and lower value for Hz is a lower pitch.');
        }
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_simple_buzzer_timebased'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn buzzer on")
                .appendField("for");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on", "AD1"],
                        ["turn buzzer in port AD2 on", "AD2"]
                    ]),
                    "buzzer_port")
                .appendField("for");
        }
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 0, 100, 0), "seconds")
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block will turn on the buzzer for a certain length of time.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_buzzer_timebased'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("turn buzzer on at")
                .appendField(new Blockly.FieldNumber(100, 0, 100, 0), "power")
                .appendField("% for");
            this.setTooltip('This block will turn on the buzzer at the setting you choose for the specified length of time.');
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on at", "AD1"],
                        ["turn buzzer in port AD2 on at", "AD2"]
                    ]),
                    "buzzer_port")
                .appendField(new Blockly.FieldNumber(329, 0, 55000, 0), "freq")
                .appendField("Hz for");
            this.setTooltip('This block will turn on the buzzer at the setting you choose  for the specified length of time. You can choose between 0 and 5500 Hz. Higher value for Hz is a higher pitch and lower value for Hz is a lower pitch.');
        }
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 0, 100, 0), "seconds")
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_buzzer_timebased_ext'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField("turn buzzer on at");
            this.appendValueInput("seconds")
                .setCheck("Number")
                .appendField("% for ");
        } else {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on at", "AD1"],
                        ["turn buzzer in port AD2 on at", "AD2"]
                    ]),
                    "buzzer_port");
            this.appendValueInput("seconds")
                .setCheck("Number")
                .appendField("Hz for");
        }
        this.appendDummyInput()
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block will turn on the buzzer at the value you choose for a specific amount of time, and then turn it off.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo3_actuator_buzzer_note'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(NOTES), "buzzer_note")
            .appendField(new Blockly.FieldDropdown([
                    ["in port AD1 for", "AD1"],
                    ["in port AD2 for", "AD2"]
                ]),
                "buzzer_port");
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0.5, 0, 100, 0), "seconds")
            .appendField("sec");
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('This block allows you to play musical notes on the buzzer. By changing notes and play time you can come up with little tunes');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo3_actuator_buzzer_note_ext'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(NOTES), "buzzer_note")
            .appendField(new Blockly.FieldDropdown([
                    ["in port AD1 for", "AD1"],
                    ["in port AD2 for", "AD2"]
                ]),
                "buzzer_port");
        this.appendValueInput("seconds")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("sec");
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('This block allows you to play musical notes on the buzzer. By changing notes and play time you can come up with little tunes');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_buzzer_at'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField("turn buzzer on at");
        } else {
            this.appendValueInput("power")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on at", "AD1"],
                        ["turn buzzer in port AD2 on at", "AD2"]
                    ]),
                    "buzzer_port");
        }
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block allows you to turn the buzzer on at a value specified by another sensor or block.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_buzzer_whileuntil'] = {
    init: function () {
        var OPERATORS = [
            ["while", 'WHILE'],
            ["until", 'UNTIL']
        ];
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput('BOOL')
                .appendField("turn buzzer on")
                .setCheck('Boolean')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        } else {
            this.appendValueInput('BOOL')
                .appendField(new Blockly.FieldDropdown([
                        ["turn buzzer in port AD1 on", "AD1"],
                        ["turn buzzer in port AD2 on", "AD2"]
                    ]),
                    "buzzer_port")
                .setCheck('Boolean')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        }
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block will turn the buzzer on while something else is happening, or until something else happens that you specify in the program.');
        this.setHelpUrl('');
    }
};
////////////////////////////////////////////////
// SERVO
////////////////////////////////////////////////
Blockly.Blocks['actuator_set_servo'] = {
    init: function () {
        var angle_field = new Blockly.FieldNumber(90, 0, 180);
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField("set servo to")
                .appendField(angle_field, "angle");
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["set servo 1 to", "SERVO1"],
                    ["set servo 2 to", "SERVO2"],
                    ["set both servos to", "both"]
                ]), "servo")
                .appendField(angle_field, "angle");
        }
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block allows you to control a servo motor. The range of values is from 0 to 180');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_set_servo_ext'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendValueInput("angle")
                .setCheck("Number")
                .appendField(Blockly.Msg.GOPIGO_SET_SERVO_TO);
        } else {
            this.appendValueInput("angle")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                    ["set servo 1 to", "SERVO1"],
                    ["set servo 2 to", "SERVO2"],
                    ["set both servos to", "both"]
                ]), "NAME");
        }
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block allows you to control a servo motor. The range of values is from 0 to 180');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['actuator_center_servo'] = {
    init: function () {
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            this.appendDummyInput()
                .appendField(Blockly.Msg.GOPIGO_CENTER_SERVO);
        } else {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["center servo 1", "SERVO1"],
                    ["center servo 2", "SERVO2"],
                    ["center both servos", "both"]
                ]), "NAME");
        }
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actuators.HUE);
        this.setTooltip('This block allows you to bring the servo back to its middle position');
        this.setHelpUrl('');
    }
};