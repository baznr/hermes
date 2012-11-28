
#define HRM_START ':'
#define HRM_END '\n'
// pin setting
#define HRM_PIN_MODE_INPUT 'I'
#define HRM_PIN_MODE_OUTPUT 'O'
// digital
#define HRM_PIN_SET 'S'
#define HRM_PIN_CLEAR 'C'
#define HRM_PIN_GET 'G'
#define HRM_PIN_TOGGLE 'T'
// Monitor
#define HRM_DGT_PIN_VAR 'D'
#define HRM_SET_ANALOG_LIM 'L'
#define HRM_ANALOG_MAX 'M'
#define HRM_ANALOG_MIN 'N'

// analog
#define HRM_ANALOG_READ 'R'
#define HRM_ANALOG_WRITE 'W'
// macros
#define HRM_EXECUTE_MACRO 'X'
#define HRM_MACRO_PARAM 'P'
#define HRM_VIEW_MACRO_RESULT 'V'
#define HRM_ALPHA_ALERT 'A'
// servo
#define HRM_SERVO_MOVE 'm'
// eeprom
#define HRM_EEPROM_READ 'r'
#define HRM_EEPROM_WRITE 'w'
// I2C
#define HRM_I2C_BEGIN 'b'
#define HRM_I2C_SEND 's'
#define HRM_I2C_REQUEST 'q'
#define HRM_I2C_GET 'g'
#define HRM_I2C_END 'e'
// LCD
#define HRM_LCD_SET_CURSOR 'c'
#define HRM_LCD_PRINT 'p'
#define HRM_LCD_CLEAR 'k'
#define HRM_LCD_SCROLL_LEFT '<'
#define HRM_LCD_SCROLL_RIGHT '>'

// global definitions
#define HRM_BASE 64
#define HRM_TOP 4096
#define HRM_TOT_PARAMS 4
#define HRM_DIGITAL_PINS 14
#define HRM_ANALOG_PINS 6
#define HRM_TOTAL_SERVOS 6


char alpha[]="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@$";
byte modeSt[HRM_DIGITAL_PINS];
byte digitalVal[HRM_DIGITAL_PINS];
int macroParam[HRM_TOT_PARAMS];


unsigned long startTime=0;
unsigned long interval=1000;

int  analogMax[HRM_ANALOG_PINS];
int  analogMin[HRM_ANALOG_PINS];

Servo servoArr[HRM_TOTAL_SERVOS];
int  servoPos[HRM_TOTAL_SERVOS];
