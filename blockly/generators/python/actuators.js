/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Generating Python for GoPiGo Actuator blocks.
 * @author fraser@google.com (Neil Fraser)
 * @author nicole@dexterindustries.com (Nicole Parrot)
 */
'use strict';
goog.provide('Blockly.Python.actuators');
goog.require('Blockly.Python');
// this function handles three blocks
// set led to x power
Blockly.Python['actuator_led'] = function (block) {
    console.log("actuator_led");
    var delay = block.getFieldValue('seconds') ||
        Blockly.Python.valueToCode(block, 'seconds', Blockly.Python.ORDER_NONE) ||
        0;
    var power = block.getFieldValue('power') ||
        Blockly.Python.valueToCode(block, 'power', Blockly.Python.ORDER_NONE) ||
        100;
    var dropdown_led = block.getFieldValue("led_status") || 'on';
    var port = block.getFieldValue("led_port") || 'D11';
    console.log(power);
    console.log(dropdown_led);
    console.log(delay);
    console.log(port);
    // TODO: Assemble Python into code variable.
    Blockly.Python.definitions_['import_time'] = 'import time';
    var my_led_def = "my_led_port" + port;
    Blockly.Python.definitions_[my_led_def] = my_led_def + " = easy.Led('" + port + "'," + "gpg)";
    var code = '';
    if (dropdown_led == 'on') {
        if (port === "AD1" || port === "AD2") {
            code = my_led_def + ".light_on(" + power + ")\n";
        } else {
            code = my_led_def + ".light_on(int(" + power + "*255/100))\n";
        }
        if ((!isNaN(delay) && delay > 0) || // numeric value > 0
            (typeof delay == "string")
        ) { // variable
            code = code + "time.sleep(" + delay + ")\n";
            code = code + my_led_def + ".light_off()\n";
        }
    } else {
        code = my_led_def + ".light_off()\n";
    }
    return code;
};
// set led on/off
Blockly.Python['actuator_simple_led'] = Blockly.Python['actuator_led'];
Blockly.Python['actuator_led_ext'] = Blockly.Python['actuator_led'];
Blockly.Python['actuator_simple_led_timebased'] = Blockly.Python['actuator_led'];
Blockly.Python['actuator_led_timebased'] = Blockly.Python['actuator_led'];
Blockly.Python['actuator_led_timebased_ext'] = Blockly.Python['actuator_led'];
// ****************
// **** BUZZER ****
// ****************
Blockly.Python['actuator_buzzer'] = function (block) {
    var delay = block.getFieldValue('seconds') ||
        Blockly.Python.valueToCode(block, 'seconds', Blockly.Python.ORDER_NONE) ||
        0;
    var power = block.getFieldValue('power') ||
        Blockly.Python.valueToCode(block, 'power', Blockly.Python.ORDER_NONE) ||
        100;
    var freq = block.getFieldValue('freq') ||
        Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_NONE) ||
        -1;
    var note = block.getFieldValue('buzzer_note') ||
        Blockly.Python.valueToCode(block, 'buzzer_note', Blockly.Python.ORDER_NONE) ||
        "";
    var dropdown_buzzer = block.getFieldValue('buzzer_status') || 'on';
    var port = block.getFieldValue("buzzer_port") || 'D11';
    var conditionCode = Blockly.Python.valueToCode(block, 'BOOL', Blockly.Python.ORDER_NONE) ||
        "";
    var dropdown_compare = block.getFieldValue('MODE');
    console.log(power);
    console.log(dropdown_buzzer);
    console.log(delay);
    console.log(note);
    console.log(conditionCode);
    console.log(freq);
    // Blockly.Python.definitions_['import_time'] = 'import time';
    var my_buzzer_def = "my_buzzer_port" + port;
    Blockly.Python.definitions_[my_buzzer_def] = my_buzzer_def + " = easy.Buzzer('" + port + "'," + " gpg)";
    var code = '';
    // we need to generate a sound
    if (dropdown_buzzer == 'on') {
        if (port === "AD1" || port === "AD2") { // on the GoPiGo3
            if (note != "") {
                code = my_buzzer_def + ".sound(" + my_buzzer_def + ".scale['" + note + "'])\n";
            } else if (freq != -1) {
                code = my_buzzer_def + ".sound(" + freq + ")\n";
            } else if ((typeof power === 'string' || power instanceof String)) {
                code = my_buzzer_def + ".sound(" + power + ")\n";
            } else {
                code = my_buzzer_def + ".sound_on()\n";
            }
        } else { // on the GoPiGo2
            code = my_buzzer_def + ".sound(int(" + power + "*255/100))\n";
        };
        // add a sleep if necessary
        if ((!isNaN(delay) && delay > 0) || (typeof (delay) == "string")) {
            code = code + "time.sleep(float(" + delay + "))\n";
            code = code + my_buzzer_def + ".sound_off()\n";
        }
        // add a while/until if necessary
        else if (conditionCode != "") {
            var reverse = "";
            if (dropdown_compare == "UNTIL") {
                reverse = "not ";
            }
            code = code + "while " + reverse + conditionCode + ":\n";
            code = code + "\ttime.sleep(0.05)\n";
            code = code + my_buzzer_def + ".sound_off()\n";
        }
    }
    // quiet time
    else {
        code = my_buzzer_def + ".sound_off()\n";
    }
    return code;
};
// set led on/off
Blockly.Python['gopigo2_actuator_simple_buzzer'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_buzzer_ext'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_simple_buzzer_timebased'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_buzzer_timebased'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_buzzer_timebased_ext'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_buzzer_at'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['gopigo3_actuator_buzzer_note'] = Blockly.Python['actuator_buzzer'];
Blockly.Python['actuator_buzzer_whileuntil'] = Blockly.Python['actuator_buzzer'];
/////////////////////////////////////////////////////
// SERVO
/////////////////////////////////////////////////////
Blockly.Python['actuator_set_servo'] = function (block) {
    var servo_port = block.getFieldValue('servo') || "";
    var rotation_angle = block.getFieldValue('angle') ||
        Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_NONE) ||
        90;

    return 'gpg.servo(' + rotation_angle + ')\n';
};
Blockly.Python['actuator_set_servo_ext'] = Blockly.Python['actuator_set_servo'];
Blockly.Python['actuator_center_servo'] = Blockly.Python['actuator_set_servo'];