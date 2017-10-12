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
 * @fileoverview Generating Python for GoPiGo motion blocks.
 * @author fraser@google.com (Neil Fraser)
 * @author nicole@dexterindustries.com (Nicole Parrot)
 */
'use strict';
goog.provide('Blockly.Python.gopigo');
goog.require('Blockly.Python');
// drive forward/backward for x secs/cm/inches/rotations
Blockly.Python['gopigo_drive_x_units'] = function (block) {
    var dropdown_direction_choices = block.getFieldValue('direction_choices');
    // GoPiGo 2 doesn't have this pulldown. Default to "seconds"
    var dropdown_distanceunit = block.getFieldValue('distanceunit') || "seconds";
    // attempt to get the x_value from an internal getField
    // if that doesn't exist, assume an external field (integrated variable)
    if (block.getField('x_value')) {
        // Internal number.
        // var x_value = String(parseInt(block.getFieldValue('x_value'), 10));
        var x_value = block.getFieldValue('x_value');
    } else {
        // External number.
        var x_value = Blockly.Python.valueToCode(block, 'x_value',
            Blockly.Python.ORDER_NONE) || '0';
    }
    console.log(dropdown_distanceunit)
    var code = "";
    var WHEEL_RAD = 3.25;
    var WHEEL_CIRC = 2 * 3.1416 * WHEEL_RAD;
    var encoder_value = (x_value / WHEEL_CIRC) * 18;
    console.log(encoder_value);
    if (dropdown_direction_choices === "forward") {
        code = 'gpg.forward()\n';
    } else {
        code = 'gpg.backward()\n';
    }
    if (dropdown_distanceunit == "seconds") {
        if (x_value < 0) {
            x_value = 0
        }
        code = code + 'time.sleep(' + x_value + ')\n';
    }
    code = code + 'gpg.stop()\n';
    // GoPiGo3 only
    var reverse = "";
    if (dropdown_direction_choices === "backward") {
        // Note: it is possible for x_value to be a string, when it's set to a variable for example
        reverse = "*-1";
    }
    if (dropdown_distanceunit == "cm") {
        code = 'gpg.drive_cm(' + x_value + reverse + ',blocking=True)\n';
    }
    // GoPiGo3 only
    else if (dropdown_distanceunit == "in") {
        code = 'gpg.drive_inches(' + x_value + reverse + ',blocking=True)\n';
    } else if (dropdown_distanceunit == "rotations") {
        // figure out how to convert to rotations with the encoders
        code = 'gpg.drive_degrees(' + x_value + "*360" + reverse + ',blocking=True)\n';
    }
    console.log(code)
    return code;
};
Blockly.Python['gopigo_drive_x_units_ext'] = Blockly.Python['gopigo_drive_x_units'];
Blockly.Python['gopigo_drive_untilwhile'] = function (block) {
    // Drive forward/backward while/until
    Blockly.Python.definitions_['import_time'] = 'import time';
    var dropdown_compare = block.getFieldValue('MODE');
    var dropdown_directions = block.getFieldValue('dir');
    var order = Blockly.Python.ORDER_RELATIONAL;
    // console.log(dropdown_compare);
    var conditionCode = Blockly.Python.valueToCode(block, 'BOOL',
        Blockly.Python.ORDER_NONE) || "False";
    // Handle the until case by doing a 
    // while not ... case instead
    var reverse = "";
    if (dropdown_compare == "UNTIL") {
        reverse = "not ";
    }
    if (dropdown_directions == "forward") {
        var direction = "\tgpg.forward()\n";
    } else if (dropdown_directions == "backward") {
        var direction = "\tgpg.backward()\n";
    } else if (dropdown_directions == "left") {
        var direction = "\tgpg.left()\n";
    } else if (dropdown_directions == "right") {
        var direction = "\tgpg.right()\n";
    }
    var code = "while " + reverse + conditionCode + ":\n";
    code += direction;
    code += "\ttime.sleep(0.05)\n";
    code += "gpg.stop()\n";
    return code;
};
Blockly.Python['gopigo_turn_untilwhile'] = Blockly.Python['gopigo_drive_untilwhile']
// Blockly.Python['gopigo_turn_degrees'] = function(block) {
//   var angle_name = block.getFieldValue('rotation_in_deg');
//   var dropdown_turn_direction = block.getFieldValue('turn_direction');
//   console.log("turn_direction: "+dropdown_turn_direction)
//   if (dropdown_turn_direction === "left") {
//     var code = 'gpg.turn_left_wait_for_completion('+angle_name+')\n';
//   }
//   else {
//     var code = 'gpg.turn_right_wait_for_completion('+angle_name+')\n';
//   }
//   console.log(code)
//   return code;
// };
Blockly.Python['gopigo_turn_timebased'] = function (block) {
    var number_turn_value = Blockly.Python.valueToCode(block, 'turn_value', Blockly.Python.ORDER_ATOMIC) ||
        block.getFieldValue('turn_value') ||
        -1;
    var dropdown_turn_direction = block.getFieldValue('turn_direction');
    console.log(number_turn_value);
    Blockly.Python.definitions_['import_time'] = 'import time';
    if (dropdown_turn_direction === "left") {
        var code = 'gpg.left()\n';
    } else {
        var code = 'gpg.right()\n';
    }
    if (number_turn_value != -1) {
        code += "time.sleep(" + number_turn_value + ")\n";
        code += "gpg.stop()\n"
    }
    console.log(code)
    return code;
};
Blockly.Python['gopigo_turn_timebased_ext'] = Blockly.Python['gopigo_turn_timebased']
Blockly.Python['gopigo_turn'] = Blockly.Python['gopigo_turn_timebased']
Blockly.Python['gopigo3_turn_degrees'] = function (block) {
    var angle_rotation_in_deg = block.getFieldValue('rotation_in_deg');
    var dropdown_turn_direction = block.getFieldValue('turn_direction');
    // TODO: Assemble Python into code variable.
    if (dropdown_turn_direction === "left") {
        angle_rotation_in_deg = -1 * angle_rotation_in_deg;
    }
    console.log(angle_rotation_in_deg);
    console.log(dropdown_turn_direction);
    var code = 'gpg.turn_degrees(' + angle_rotation_in_deg + ', blocking=True)\n';
    return code;
};
Blockly.Python['gopigo_direction'] = function (block) {
    console.log("gopigo_direction");
    var dropdown_direction_choices = block.getFieldValue('direction_choices');
    if (dropdown_direction_choices == 'forward') {
        var code = 'gpg.forward()\n';
    } else {
        var code = 'gpg.backward()\n';
    }
    console.log(code);
    return code;
};
// Blockly.Python['gopigo_forward'] = function(block) {
//   var code = 'gpg.forward()\n';
//   console.log(code);
//   return code;
// };
// Blockly.Python['gopigo_backward'] = function(block) {
//   var code = 'gpg.backward()\n';
//   // print (code)
//   return code;
// };
Blockly.Python['gopigo_stop'] = function (block) {
    var code = 'gpg.stop()\n';
    return code;
};
Blockly.Python['gopigo_change_speed'] = function (block) {
    var dropdown_variation = block.getFieldValue('variation');
    console.log("variation")
    console.log(dropdown_variation)
    console.log(Blockly.GoPiGoVersion)
        // TODO: Assemble Python into code variable.
    var speed = 0
    if (Blockly.GoPiGoVersion == "GoPiGo") {
        if (dropdown_variation == "FASTEST") {
            speed = 255;
        } else if (dropdown_variation == "FASTER") {
            speed = 192;
        } else if (dropdown_variation == "NORMAL") {
            speed = 128;
        } else if (dropdown_variation == "SLOWER") {
            speed = 80;
        } else if (dropdown_variation == "SLOWEST") {
            speed = 40;
        } else {
            // should never be reached. Set to normal speed to be safe
            var code = 'gpg.set_speed(128)\n';
        }
    }
    if (Blockly.GoPiGoVersion == "GoPiGo3") {
        if (dropdown_variation == "FASTEST") {
            speed = 500;
        } else if (dropdown_variation == "FASTER") {
            speed = 400;
        } else if (dropdown_variation == "NORMAL") {
            speed = 300;
        } else if (dropdown_variation == "SLOWER") {
            speed = 200;
        } else if (dropdown_variation == "SLOWEST") {
            speed = 100;
        } else {
            // should never be reached. Set to normal speed to be safe
            var code = 'gpg.set_speed(300)\n';
        }
    }
    console.log("speed: " + speed)
    var code = 'gpg.set_speed(' + speed + ')\n';
    return code;
};
Blockly.Python['gopigo_set_speed_to'] = function (block) {
    var value_new_speed = Blockly.Python.valueToCode(block, 'new_speed', Blockly.Python.ORDER_ATOMIC) ||
        block.getFieldValue('new_speed');
    console.log(value_new_speed);
    if (Blockly.GoPiGoVersion == "GoPiGo3") {
        // let's assume 500 dps is a good upper limit
        var convert_speed = "*500/100";
    } else { // gopigo 2 goes from 0 to 255
        var convert_speed = "*255/100";
    };
    var code = 'gpg.set_speed(int(' + value_new_speed + convert_speed + '))\n';
    return code;
};
Blockly.Python['gopigo_set_speed_to_ext'] = Blockly.Python['gopigo_set_speed_to'];
Blockly.Python['gopigo_wait'] = function (block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    // Count a specific number of seconds
    var wait_count = Blockly.Python.valueToCode(block, 'wait_count', Blockly.Python.ORDER_ATOMIC) ||
        block.getFieldValue('wait_count');
    var code = "time.sleep (" + wait_count + ")\n";
    return code;
};
Blockly.Python['gopigo_wait_ext'] = Blockly.Python['gopigo_wait']
Blockly.Python['gopigo_led_control'] = function (block) {
    var dropdown_gopigo_led = block.getFieldValue('gopigo_led');
    var dropdown_gopigo_led_status = block.getFieldValue('gopigo_led_status');
    var code = "";
    console.log(dropdown_gopigo_led)
    if (dropdown_gopigo_led == "left_led" || dropdown_gopigo_led == "both_leds") {
        if (dropdown_gopigo_led_status == "led_on") {
            code = code + 'gpg.led_on(' + 1 + ')\n';
        } else {
            code = code + 'gpg.led_off(' + 1 + ')\n';
        }
    }
    if (dropdown_gopigo_led == "right_led" || dropdown_gopigo_led == "both_leds") {
        if (dropdown_gopigo_led_status == "led_on") {
            code = code + 'gpg.led_on(' + 0 + ')\n';
        } else {
            code = code + 'gpg.led_off(' + 0 + ')\n';
        }
    }
    console.log("led")
    console.log(code)
    return code;
};
Blockly.Python['gopigo_led_control_timebased'] = function (block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var dropdown_gopigo_led = block.getFieldValue('gopigo_led');
    // var dropdown_gopigo_led_status = block.getFieldValue('gopigo_led_status');
    var time_based = Blockly.Python.valueToCode(block, 'time_in_secs', Blockly.Python.ORDER_ATOMIC) ||
        block.getFieldValue('time_in_secs')
    var code = "";
    console.log(dropdown_gopigo_led)
    if (dropdown_gopigo_led == "left_led" || dropdown_gopigo_led == "both_leds") {
        code = code + 'gpg.led_on(1)\n';
    };
    if (dropdown_gopigo_led == "right_led" || dropdown_gopigo_led == "both_leds") {
        code = code + 'gpg.led_on(0)\n';
    };
    code = code + "time.sleep(" + time_based + ")\n"
    if (dropdown_gopigo_led == "left_led" || dropdown_gopigo_led == "both_leds") {
        code = code + 'gpg.led_off(1)\n';
    }
    if (dropdown_gopigo_led == "right_led" || dropdown_gopigo_led == "both_leds") {
        code = code + 'gpg.led_off(0)\n';
    }
    console.log(code)
    return code;
};
Blockly.Python['gopigo_led_control_timebased_ext'] = Blockly.Python['gopigo_led_control_timebased']
Blockly.Python['gopigo3_eye_control'] = function (block) {
    var dropdown_gopigo_eye = block.getFieldValue('gopigo_eye');
    var dropdown_gopigo_eye_status = block.getFieldValue('gopigo3_eye_status');
    // TODO: Assemble Python into code variable.
    var code = '';
    if (dropdown_gopigo_eye_status === "open") {
        if (dropdown_gopigo_eye === "left_eye") {
            code = "gpg.open_left_eye()\n"
        }
        if (dropdown_gopigo_eye === "right_eye") {
            code = "gpg.open_right_eye()\n"
        }
        if (dropdown_gopigo_eye === "both_eyes") {
            code = "gpg.open_eyes()\n"
        }
    } else {
        if (dropdown_gopigo_eye === "left_eye") {
            code = "gpg.close_left_eye()\n"
        }
        if (dropdown_gopigo_eye === "right_eye") {
            code = "gpg.close_right_eye()\n"
        }
        if (dropdown_gopigo_eye === "both_eyes") {
            code = "gpg.close_eyes()\n"
        }
    }
    return code;
};
Blockly.Python['gopigo3_set_eye_color'] = function (block) {
    var dropdown_eye = block.getFieldValue('eye');
    var colour_eye_color = block.getFieldValue('eye_color');
    var colour = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour_eye_color);
    console.log(colour_eye_color);
    var r = parseInt(colour[1], 16);
    var g = parseInt(colour[2], 16);
    var b = parseInt(colour[3], 16);
    // TODO: Assemble JavaScript into code variable.
    var code = '';
    if (dropdown_eye === "left_eye") {
        code = "gpg.set_left_eye_color((" + r + "," + g + "," + b + "))\ngpg.open_left_eye()\n"
    }
    if (dropdown_eye === "right_eye") {
        code = "gpg.set_right_eye_color((" + r + "," + g + "," + b + "))\ngpg.open_right_eye()\n"
    }
    if (dropdown_eye === "both_eyes") {
        code = "gpg.set_eye_color((" + r + "," + g + "," + b + "))\ngpg.open_eyes()\n"
    }
    return code;
};