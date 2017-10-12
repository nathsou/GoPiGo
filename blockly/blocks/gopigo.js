/**
* @license
* Visual Blocks Editor
*
* Copyright 2017 Nathan Soufflet .
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* @fileoverview Robot control blocks for Blockly.
* @author nathan.soufflet@utt.fr (Nathan Soufflet)
*/

'use strict';

goog.provide('Blockly.Blocks.gopigo');
goog.require('Blockly.Blocks');

Blockly.GoPiGoVersion = 'GoPiGo';

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.gopigo.HUE = "#CC3333";
Blockly.BlockSvg.START_HAT = true;
Blockly.Blocks['gopigo_drive_x_units'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.GOPIGO_DRIVE_FORWARD, "forward"],
                [Blockly.Msg.GOPIGO_DRIVE_BACKWARD, "backward"]
            ]), "direction_choices");
        this.appendDummyInput()
            .appendField(Blockly.Msg.GOPIGO_DRIVE_FOR);
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 0, Infinity), "x_value");
        // GoPiGo version2 is limited to time-based
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            console.log("GoPiGo 2 detected");
            this.appendDummyInput()
                .appendField("s");
            this.setTooltip('Drive the GoPiGo forward or backward for a number of seconds');
        } else {
            console.log("GoPiGo 3 detected");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                        ["sec", "seconds"],
                        ["in", "in"],
                        ["cm", "cm"],
                        ["rotations", "rotations"]
                    ]),
                    "distanceunit");
            this.setTooltip('This block will drive the GoPiGo forward or backwards for the amount of time shown. It will stop after that amount of time.');
        }
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_drive_x_units_ext'] = {
    init: function () {
        this.appendValueInput("x_value")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.GOPIGO_DRIVE_FORWARD, "forward"],
                [Blockly.Msg.GOPIGO_DRIVE_BACKWARD, "backward"]
            ]), "direction_choices")
            .appendField(Blockly.Msg.GOPIGO_DRIVE_FOR);
        // GoPiGo version2 is limited to time-based
        if (Blockly.GoPiGoVersion === "GoPiGo") {
            console.log("Version 2 detected");
            this.appendDummyInput()
                .appendField("s");
        } else {
            console.log("Version 3 detected");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["sec", "seconds"],
                    ["cm", "cm"],
                    ["in", "in"],
                    ["rotations", "rotations"]
                ]), "distanceunit");
        }
        // this.appendDummyInput()
        //     .appendField(" and ")
        //     .appendField(new Blockly.FieldDropdown([ ["wait","WAIT"],["continue","CONTINUE"]]), "blocking_status");
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('This block will drive the GoPiGo forward or backwards for the amount of time shown. It will stop after that amount of time.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_drive_untilwhile'] = {
    init: function () {
        var DIRECTIONS = [Blockly.Msg.GOPIGO_DRIVE_FORWARD, Blockly.Msg.GOPIGO_DRIVE_BACKWARD];
        var OPERATORS = [
            [Blockly.Msg.GOPIGO_WHILE, 'WHILE'],
            [Blockly.Msg.GOPIGO_UNTIL, 'UNTIL']
        ];
        var CHOOSE_DIRECTIONS = [
            [Blockly.Msg.GOPIGO_DRIVE_FORWARD, 'forward'],
            [Blockly.Msg.GOPIGO_DRIVE_BACKWARD, 'backward']
        ];
        this.setHelpUrl("");
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.appendValueInput('BOOL')
            .appendField(new Blockly.FieldDropdown(CHOOSE_DIRECTIONS), 'dir')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip('Use this block to program the GoPiGo to drive forward or backwards while something else is happening. Or, choose until if you want to drive the GoPiGo forward or backwards until something else happens. Connect blocks to this one to determine what else it will do.');
        // this.setTooltip(function() {
        //   var op = thisBlock.getFieldValue('MODE');
        //   var TOOLTIPS = {
        //     'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
        //     'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
        //   };
        //   return TOOLTIPS[op];
        // });
    }
};
Blockly.Blocks['gopigo_direction'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.GOPIGO_DRIVE_FORWARD, "forward"],
                [Blockly.Msg.GOPIGO_DRIVE_FORWARD, "backward"]
            ]), "direction_choices");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('The GoPiGo will drive forward or backwards indefinintely until you tell it otherwise. Hint: you can use the "count x seeconds" block after it to make it drive for that amount of time, but then you need to tell it what to do after it counts, like "stop GoPiGo".');
        this.setHelpUrl('http://dexterindustries.com');
    }
};
Blockly.Blocks['gopigo_change_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [
                    [Blockly.Msg.GOPIGO_SET_SPEED_TO_SLOWEST, "SLOWEST"],
                    [Blockly.Msg.GOPIGO_SET_SPEED_TO_SLOW, "SLOWER"],
                    [Blockly.Msg.GOPIGO_SET_SPEED_TO_NORMAL, "NORMAL"],
                    [Blockly.Msg.GOPIGO_SET_SPEED_TO_FAST, "FASTER"],
                    [Blockly.Msg.GOPIGO_SET_SPEED_TO_FASTEST, "FASTEST"]
                ]), "variation");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('Use this block to change the speed of the GoPiGo.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_set_speed_to'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.GOPIGO_SET_SPEED_TO)
            .appendField(new Blockly.FieldNumber(50, 0, 100, 0), "new_speed")
            .appendField("%");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('Use this block to change the speed of the GoPiGo. Higher numbers are faster, lower numbers are slower. 100% would be the fastest, and 0% would be not moving at all.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_set_speed_to_ext'] = {
    init: function () {
        this.appendValueInput("new_speed")
            .setCheck("Number")
            .appendField(Blockly.Msg.GOPIGO_SET_SPEED_TO);
        this.appendDummyInput()
            .appendField("%");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('Use this block to change the speed of the GoPiGo. Higher numbers are faster, lower numbers are slower. 100% would be the fastest, and 0% would be not moving at all.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo3_turn_degrees'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("turn")
            .appendField(new Blockly.FieldAngle(90), "rotation_in_deg")
            .appendField(" degrees to the ")
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_LEFT, "left"],
                        [Blockly.Msg.GOPIGO_RIGHT, "right"]
                    ]),
                "turn_direction");
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('This block will rotate the GoPiGo3 to the left or right based on the value you input.');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_turn_timebased'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_LEFT + ' ' + Blockly.Msg.GOPIGO_DRIVE_FOR, "left"],
                        [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_RIGHT + ' ' + Blockly.Msg.GOPIGO_DRIVE_FOR, "right"]
                    ]),
                "turn_direction")
            .appendField(new Blockly.FieldNumber(1, 0, Infinity, 0), "turn_value")
            .appendField("sec");
        // .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "turn_direction");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('This block will rotate the GoPiGo to the right or left for however long you specify. You will have to do some testing to see how far it will rotate for a given amount of time. Note this does not go forward while it turns, it will simply turn on the left or right motor to make it spin right or left. Use this to help you point the GoPiGo in the direction you want, and then drive it forward.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_turn_timebased_ext'] = {
    init: function () {
        this.appendValueInput("turn_value")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_LEFT + ' ' + Blockly.Msg.GOPIGO_DRIVE_FOR, "left"],
                        [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_RIGHT + ' ' + Blockly.Msg.GOPIGO_DRIVE_FOR, "right"]
                    ]),
                "turn_direction");
        this.appendDummyInput()
            .appendField("sec");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('This block will rotate the GoPiGo to the right or left for however long you specify. You will have to do some testing to see how far it will rotate for a given amount of time. Note this does not go forward while it turns, it will simply turn on the left or right motor to make it spin right or left. Use this to help you point the GoPiGo in the direction you want, and then drive it forward.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_turn'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.GOPIGO_TURN)
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_LEFT, "left"],
                        [Blockly.Msg.GOPIGO_RIGHT, "right"]
                    ]),
                "turn_direction");
        // .appendField(new Blockly.FieldDropdown([["to the left","left"], ["to the right","right"]]), "turn_direction");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('This block will make the GoPiGo spin to the right or left indefinitely until your program tells it to do something else. Note that this will turn either the left or right motor, so it will rotate to point a direction, not actually turn while driving forward.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_turn_untilwhile'] = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.GOPIGO_WHILE, 'WHILE'],
            [Blockly.Msg.GOPIGO_UNTIL, 'UNTIL']
        ];
        var CHOOSE_DIRECTIONS = [
            [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_LEFT, 'left'],
            [Blockly.Msg.GOPIGO_TURN + ' ' + Blockly.Msg.GOPIGO_RIGHT, 'right']
        ];
        this.setHelpUrl("");
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.appendValueInput('BOOL')
            .appendField(Blockly.Msg.GOPIGO_TURN)
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_LEFT, "left"],
                        [Blockly.Msg.GOPIGO_RIGHT, "right"]
                    ]),
                "dir")
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip('Use this block to program the GoPiGo to drive forward or backwards while something else is happening. Or, choose until if you want to drive the GoPiGo forward or backwards until something else happens. Connect blocks to this one to determine what else it will do.');
    }
};
Blockly.Blocks['gopigo_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel(Blockly.Msg.GOPIGO_STOP));
        this.setColour("#FF0000");
        this.setTooltip('GoPiGo will stop moving.');
        this.setHelpUrl('http://www.dexterindustries.com');
        this.setNextStatement(true);
        this.setPreviousStatement(true); // false implies no previous connector, the default
    }
};
Blockly.Blocks['gopigo_wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.GOPIGO_WAIT)
            .appendField(new Blockly.FieldNumber(1, 0, Infinity, 0), "wait_count")
            .appendField(Blockly.Msg.GOPIGO_WAIT_SECS_AND_THEN);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('Use this block to program time based actions such as "drive forward" "count 3 seconds and thenâ€¦" "stop GoPiGo".');
        this.setHelpUrl('http://www.dexterindustries.com');
        this.setNextStatement(true);
        this.setPreviousStatement(true); // false implies no previous connector, the default
    }
};
Blockly.Blocks['gopigo_wait_ext'] = {
    init: function () {
        this.appendValueInput("wait_count")
            .appendField(Blockly.Msg.GOPIGO_WAIT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.GOPIGO_WAIT_SECS_AND_THEN);
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setTooltip('Use this block to program time based actions such as "drive forward" "count 3 seconds and thenâ€¦" "stop GoPiGo".');
        this.setHelpUrl('http://www.dexterindustries.com');
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setPreviousStatement(true); // false implies no previous connector, the default
    }
};
Blockly.Blocks['gopigo_led_control'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_TURN_BOTH_BLINKERS, "both_leds"],
                        [Blockly.Msg.GOPIGO_TURN_LEFT_BLINKER, "left_led"],
                        [Blockly.Msg.GOPIGO_TURN_RIGHT_BLINKER, "right_led"],
                    ]),
                "gopigo_led")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.GOPIGO_BLINKER_OFF, "led_off"],
                [Blockly.Msg.GOPIGO_BLINKER_ON, "led_on"]
            ]), "gopigo_led_status");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('There are two LEDs in the front of the GoPiGo that you can turn on and off with this block. You can turn on one at a time, or both together.');
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.gopigo.HUE);
    }
};
Blockly.Blocks['gopigo3_eye_control'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                    ["open", "open"],
                    ["close", "close"]
                ]),
                "gopigo3_eye_status")
            .appendField(new Blockly.FieldDropdown(
                    [
                        ["both eyes", "both_eyes"],
                        ["left eye", "left_eye"],
                        ["right eye", "right_eye"],
                    ]),
                "gopigo_eye");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('The red board of the robot has a little Dex robot in white. He has two eyes made of LEDs, and this block turns those little LED eyes on and off. "Open" means to turn it on, and "Close" means to turn if off.');
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.gopigo.HUE);
    }
};
Blockly.Blocks['gopigo3_set_eye_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(
                    [
                        ["both eyes", "both_eyes"],
                        ["left eye", "left_eye"],
                        ["right eye", "right_eye"],
                    ]),
                "eye")
            .appendField("to")
            .appendField(new Blockly.FieldColour("#00FFFF"), "eye_color");
        this.setColour(Blockly.Blocks.gopigo.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('The red board of the robot has a little Dex robot in white. He has two eyes made of LEDs, and this block controls the color of those little LED eyes.');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['gopigo_led_control_timebased'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("turn ")
            .appendField(new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg.GOPIGO_TURN_BOTH_BLINKERS, "both_leds"],
                        [Blockly.Msg.GOPIGO_TURN_LEFT_BLINKER, "left_led"],
                        [Blockly.Msg.GOPIGO_TURN_RIGHT_BLINKER, "right_led"],
                    ]),
                "gopigo_led")
            // .appendField(new Blockly.FieldDropdown([["on","led_on"], ["off","led_off"]]), "gopigo_led_status")
            .appendField("for")
            .appendField(new Blockly.FieldNumber(1, 0, 60, 0), "time_in_secs")
            .appendField("sec");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('There are two LEDs in the front of the GoPiGo that you can turn on for a certain amount of time, and then they will turn off. You can control the LEDs one at a time, or both together.');
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.gopigo.HUE);
    }
};
Blockly.Blocks['gopigo_led_control_timebased_ext'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("turn")
            .appendField(new Blockly.FieldDropdown(
                    [
                        ["both blinkers on", "both_leds"],
                        ["left blinker on", "left_led"],
                        ["right blinker on", "right_led"],
                    ]),
                "gopigo_led")
            // .appendField(new Blockly.FieldDropdown([["on","led_on"], ["off","led_off"]]), "gopigo_led_status")
            .appendField("for")
        this.appendValueInput("time_in_secs")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('There are two LEDs in the front of the GoPiGo that you can turn on for a certain amount of time, and then they will turn off. You can control the LEDs one at a time, or both together.');
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.gopigo.HUE);
    }
};