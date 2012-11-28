/*************************************************************************
* Hermes Library Encode / Decode definitions
* Distributed under GPL v2.0
* Copyright (c) 2012 Dimitri Vusunaras <dbaznr@gmail.com>
* All rights reserved.
*************************************************************************/

var LOW = 0;
var HIGH = 1;
var INPUT = 0;
var OUTPUT = 1;

var HRM_START = ':';
var HRM_END = '\n';
// pin setting
var HRM_PIN_MODE_INPUT = 'I';
var HRM_PIN_MODE_OUTPUT = 'O';
// digital
var HRM_PIN_SET = 'S';
var HRM_PIN_CLEAR = 'C';
var HRM_PIN_GET = 'G';
var HRM_PIN_TOGGLE = 'T';
// Monitor
var HRM_DGT_PIN_VAR = 'D';
var HRM_SET_ANALOG_LIM = 'L';
var HRM_ANALOG_MAX = 'M';
var HRM_ANALOG_MIN = 'N';
// analog
var HRM_ANALOG_READ = 'R';
var HRM_ANALOG_WRITE = 'W';
// macros
var HRM_EXECUTE_MACRO = 'X';
var HRM_MACRO_PARAM = 'P';
var HRM_VIEW_MACRO_RESULT = 'V';
var HRM_ALPHA_ALERT = 'A';
// servo
var HRM_SERVO_MOVE = 'm';
// eeprom
var HRM_EEPROM_READ = 'r';
var HRM_EEPROM_WRITE = 'w';
// I2C
var HRM_I2C_BEGIN = 'b';
var HRM_I2C_SEND = 's';
var HRM_I2C_REQUEST = 'q';
var HRM_I2C_GET = 'g';
var HRM_I2C_END = 'e';
// LCD
var HRM_LCD_SET_CURSOR = 'c';
var HRM_LCD_PRINT = 'p';
var HRM_LCD_CLEAR = 'k';
var HRM_LCD_SCROLL_LEFT = '<';
var HRM_LCD_SCROLL_RIGHT = '>';

// global definitions
var HRM_BASE = 64;
var HRM_TOP = 4096;
var HRM_TOT_PARAMS = 4;
var HRM_DIGITAL_PINS = 14;
var HRM_ANALOG_PINS = 6;

var alpha="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@$";

var modeSt=[];
var monitorMsk=[];
var monitorVal=[];
var macroParam=[];
