var addBytes = function(bytes, start){
var counter = 0
var bytesString = bytes
bytes = bytesString.split(" ")
console.log(bytes)
while(counter != bytes.length){
byteArray[parseInt(start)]=bytes[counter]
counter += 1
}
}
var expandedROM = false
var expandROM = function(){
if(expandedROM === false){
/*

Moehr code begin


//Edit @0148:
//a hex edit to the header cart size 04 (512) to accomodate the extra banks
addBytes("04",0x148)

//;hijack @3DE2:
addBytes("CD 60 3F C9 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF",0x3D02)

//;new code @3F60
//;table:
//;must have as many entries as you have level data banks
//;or will allow loading of bad data from random opcode values
addBytes("10 11 12 13 14 15 16",0x3F60)
//;opcodes for code below
addBytes("FA 58 D0 D6 09 5F 16 00 21 7f 3f 19 7E EA 4E D0 EA 00 21 CD 00 40 3E 02 EA 4E D0 EA 00 21 C9",0x3F67)

//;then lastly, paste all of bank 3 to bank 10, 11, 12, 13, 14, 15, 16
//quick and dirty. REALLY dirty.
addbank(1,2)//10
addbank(1,2)//11
addbank(1,2)//12
addbank(1,2)//13
addbank(1,2)//14
addbank(1,2)//15
addbank(1,2)//16
addbank(1,15)//17
addbank(1,15)//18
addbank(1,15)//19
addbank(1,15)//1A
addbank(1,15)//1B
addbank(1,15)//1C
addbank(1,15)//1D
addbank(1,15)//1E*/
addbank(1)//1F
expandedROM === true
} else {
addbank(1)}}
/*var blankBank = [//the blank bank is simply a bytearray containing the boilerplate data
"00","46","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","47","00","48",//chunk pointers
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","49","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4A","00","4B",
"00","4C","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","4D","00","45",

"05","04","04","04","04","04","04","04","04","04","04","04","04","04","04","06",//scroll
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"01","00","00","00","00","00","00","00","00","00","00","00","00","00","00","02",
"0A","08","08","08","08","08","08","08","08","08","08","08","08","08","08","09",

"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",//room transitions
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",

"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",//down right corner
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",

"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",//up left corner
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",

"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",//top
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",

"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",//up right corner
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",

"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",//left
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",

"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",//open
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",

"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",//right
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","00",

"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",//down left corner
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",

"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",//bottom
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08",
"00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00",
]*/
var drawObj=function(ctx,x,y,type){
ctx.beginPath()
ctx.lineWidth = 3;
ctx.strokeStyle = 'red';
ctx.rect(x,y,16,16)
ctx.font = "12px Arial";
ctx.fillStyle = 'orange';
ctx.fillText(""+type+"", x+1, y+12);
ctx.stroke()
}
var startbank = ["24000","28000","2C000","30000","34000","38000","3C000"]
var imageDatas = []
var prevTileset
var drawChunkImageData = function(ctx,imageDatas){
var c = 0
for (let y = 0; y != 16; y += 1) {
for (let x = 0; x != 16; x += 1) {
var data = new ImageData(imageDatas[parseInt(pointers[c],16)-parseInt("45",16)], 16)
ctx.putImageData(data, x*16, y*16)
c += 1
}
}
}
arrayGenerated = false
var tilectx = document.getElementById("tilesetimage").getContext("2d")
var drawgrid = function(ctx, style){
        if(style != undefined||style != null){
           ctx.fillStyle = style;
        } else {
	   ctx.fillStyle = "white";
        }
        var x = 0
        while(x != 272){
            ctx.beginPath();
            ctx.moveTo(0,x);
            ctx.lineTo(256,x);
            ctx.stroke();
            x += 16
        }
        x = 0
        while(x != 272){
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,256);
            ctx.stroke();
            x += 16
        }
    }
var fileChange = false
var totalbanksadded = 0
var pointers = []
var epointers = []
var room_transitions = []
var scroll = []
var chunks = []
var selected
var prevbank
var tile
var imagetileset
var tiles0 = "00"
var tiles1 = "60"
var metatiles0 = "80"
var metatiles1 = "52"
var collision0 = "80"
var collision1 = "45"
var tilebank = "07"
var samus
var obj
var objnum
var k = 0
var changeTileset = function(tile){
    var ctx = document.getElementById("tilesetimage").getContext("2d")
    ctx.drawImage(tile, 0, 0)
    //console.log("drew tileset")
}
var loadtileset = function(){
    var samusimg = new Image(16, 32);
    samusimg.src = "Object Sprites/samus.png"
    samus = samusimg
    var objimg = new Image(16, 16)
    objimg.src = "Object Sprites/placeholderOBJ.png"
    obj = objimg
    var select = document.getElementById("tileset")
    var tileset = new Image(256, 128);
    var selected = select.selectedIndex+9
    tileset.src = "Tilesets/"+selected.toString(16)+".png";
    imagetileset =  tileset
    drawgrid(tilectx)
}
var renderroom = function(){
        var d = 0
        while(d != 256){
        var xpos = d
        var ypos = 0
        while(xpos >= 16){
            xpos -= 16
            ypos += 1
        }
        var currentbyte = chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[d]
        //0 = 7f
        var tilex = parseInt(currentbyte, 16)
        var tiley = 0
        while(tilex > 16){
            tilex -= 16
            tiley += 1
        }
        var renderer = roomedit.getContext("2d")
        var xOffset = 0
        var yOffset = 0
        if(x != undefined ||x != null){
        if(xOffset >= 0){
            roomedit.width += xOffset
        }
        if(yOffset >= 0){
            roomedit.height += yOffset
        }} else {
            xOffset = 0
            yOffset = 0
        } 
        xpos += xOffset
        ypos += yOffset
        renderer.drawImage(imagetileset,tilex*16,tiley*16,16,16,xpos*16,ypos*16,16,16)
        d += 1
        }
        var pos = selected.toString(16)
        var bank = document.getElementById("bankselect").selectedIndex + 9
       
        if(byteArray[parseInt("4E75", 16)] === "0"+bank.toString(16)+""){
            if(byteArray[20073] === "0"+pos.substr(0, 1)+""){
                if(byteArray[20075] === "0"+pos.substr(1, 2)+""){
                    var x = parseInt(byteArray[20074], 16)
                    var y = parseInt(byteArray[20072], 16)
                    var ctx = roomedit.getContext("2d")
                    ctx.drawImage(samus, x-1, y-11)
                    //ctx.drawImage(imagetileset,0,0,16,16,x,y+16,16,32)
                }
            }
        }
        var loc = epointers[selected]
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        var loc = parseInt(""+d.toString(16)+""+e+"", 16)
        //ID,type,x,y
        e = 0
        d = 0
        var ctx = roomedit.getContext("2d")
        while(e != 4){
            var p = d*4
            var x = p+2
            var y = p+3
            if(e === 0){
                if(byteArray[loc + p] != "ff"){
                    e = 2
                } else {
                    e = 4
                }
            }
            if(e === 2){
                drawObj(ctx,parseInt(byteArray[loc + x], 16), parseInt(byteArray[loc + y], 16), byteArray[loc + p])
                //console.log("drew object number "+d+" at X:"+byteArray[loc + x]+" and Y:"+byteArray[loc + y]+"")
                //console.log("obj"+d+":"+byteArray[loc + p]+" "+byteArray[loc + p + 1]+" "+byteArray[loc + x]+" "+byteArray[loc + y]+" ")
                d += 1
                e = 0
            }
        }
        objnum = d
    }
var renderbank = function(added){
    var input = document.getElementById("bankselect") //select element, loads a bank
    var canvas = document.getElementById("edit")
    var ctx = canvas.getContext("2d")
    var roomedit = document.getElementById("roomedit")
    var tileset = document.getElementById("tilesetimage")
    if(added === true){
        tileset.addEventListener("mousedown", function(e){
        var ctx = this.getContext("2d")
	ctx.fillStyle = "white";
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        tile = bank
        //console.log(""+bank+","+tile+"")
        ctx.clearRect(0, 0, 256, 256);
        changeTileset(imagetileset)
        drawgrid(ctx, "white")
        drawgrid(ctx, "white")
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        ctx.beginPath();
        ctx.moveTo(x-1,y-1);
        ctx.lineTo(x-1,y+17);
        ctx.lineTo(x+17,y+17);
        ctx.lineTo(x+17,y-1);
        ctx.lineTo(x-1,y-1);
        ctx.stroke();      
            
    })} else if(added === false || added === null || added === undefined){
arrayGenerated = input.selectedIndex
    }
    
    if(added === true){
    roomedit.addEventListener("mousedown", function(e){
    var placeblock = function(ctx){
        var edittile = true
        if(tile === null || tile === undefined){
            edittile = false
        }
        var pos = parseInt(""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+"", 16)
        var posb = ""+parseInt(chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].pointer+"00", 16)
        posb -= parseInt("4000", 16)
        posb += parseInt(startbank[input.selectedIndex], 16)
        posb += pos
        if(edittile === true){
            byteArray[posb] = tile
            chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[pos] = tile
        } else {
            console.error("exception: tile not selected")
            console.log("edits not applied")
        }
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var xpos = parseInt(tile.substr(1, 2), 16)*16
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = x*16
        var yclear = y*16
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }

    if(document.getElementById("mode").selectedIndex === 0){
        var ctx = this.getContext("2d")
        placeblock(ctx)
    } else if(document.getElementById("mode").selectedIndex === 1){
        var ctx = this.getContext("2d")
        var ID = document.getElementById("OBJID").value
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var type = objectList[document.getElementById("OBJType").selectedIndex][0]
        var loc = document.getElementById("enemy-dat").value
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        loc = parseInt(""+d.toString(16)+""+e+"", 16)
        
        if(objnum <= 15){
            //drawObj(ctx,sx, sy, type)
        var num = objnum*4
        if(sy.toString(16) === "0"){
            sy = "00"
        } else {
            var yy = sy.toString(16)
            sy = yy
        }
        if(sx.toString(16) === "0"){
            sx = "00"
        } else {
            var yy = sx.toString(16)
            sx = yy
        }
        byteArray[loc+num] = ID
        byteArray[loc+num+1] = type
        byteArray[loc+num+2] = sx
        byteArray[loc+num+3] = sy
        byteArray[loc+num+4] = "ff"
        objnum += 1
        k += 1
        } else {
            window.alert("16 is the object limit per screen")
        }
        
    } else if(document.getElementById("mode").selectedIndex === 2){
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var ctx = this.getContext("2d")
        //ctx.drawImage(samus, sx*16, y*16)
        //ctx.drawImage(imagetileset,0,0,16,16,x*16,y*16,16,16)
        //ctx.drawImage(samus, sx, sy-7)
        spawn(byteArray, sx.toString(16), sy.toString(16))
        renderroom()
    } else {
        console.log("unimplemented")
    }
    })}
    if(added === true){
    roomedit.addEventListener("mousemove", function(e){
    if(document.getElementById("mode").selectedIndex === 0){
    var placeblock = function(ctx){
        var edittile = true
        if(tile === null || tile === undefined){
            edittile = false
        }
        var pos = parseInt(""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+"", 16)
        var posb = ""+parseInt(chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].pointer+"00", 16)
        posb -= parseInt("4000", 16)
        posb += parseInt(startbank[input.selectedIndex], 16)
        posb += pos
        if(edittile === true){
            byteArray[posb] = tile
            chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[pos] = tile
        } else {
            console.error("exception: tile not selected")
            console.log("edits not applied")
        }
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var xpos = parseInt(tile.substr(1, 2), 16)*16
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = x*16
        var yclear = y*16
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }
        var ctx = this.getContext("2d")
        if(e.buttons === 1){
            placeblock(ctx)
        }
    } else {
        console.log("only placing one at a time for your sanity")
    }
    })
    if(added === true){
    canvas.addEventListener("mousedown", function(e){
	var simplePalette = [0,255,127]
var array = []
for(let e = 0; e!=256;e+=1){
	array[e]=new Uint8ClampedArray(1024)}
	generateArray(array, simplePalette,chunks)
        var pointertext = document.getElementById("pointers")
        var scrolltext = document.getElementById("scroll")
        var transtext = document.getElementById("rtransition")
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        var epointertext = document.getElementById("enemy-dat")
        selected = parseInt(bank, 16)
        console.log(""+bank+","+selected+"")
        pointertext.value = pointers[selected]
        transtext.value = room_transitions[selected]
        scrolltext.value = scroll[selected]
        epointertext.value = epointers[selected]
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, 256, 256);
	drawChunkImageData(ctx,imageDatas)//.putImageData(imageData, 0, 0)
        drawgrid(ctx)
        drawgrid(ctx)
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        ctx.beginPath();
        ctx.moveTo(x-1,y-1);
        ctx.lineTo(x-1,y+17);
        ctx.lineTo(x+17,y+17);
        ctx.lineTo(x+17,y-1);
        ctx.lineTo(x-1,y-1);
        ctx.stroke();
        
    setInterval(function(){window.dispatchEvent(frame)}, 1000/10)
        //renderroom()
        pointertext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)
            var select = selected * 2
            var locp = loc + select
            byteArray[locp] = pointertext.value.substr(0, 2)
            byteArray[locp+1] = pointertext.value.substr(2, 4)
            pointers[selected] = pointertext.value
            console.log("changed chunk pointer at "+locp.toString(16)+" to "+pointertext.value+"")
        }
        transtext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
            var select = selected * 2
            var locp = loc + select
            byteArray[locp] = transtext.value.substr(0, 2)
            byteArray[locp+1] = transtext.value.substr(2, 4)
            room_transitions[selected] = transtext.value
            console.log("changed room transition at "+locp.toString(16)+" to "+transtext.value+"")
        }
        scrolltext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
            var locp = loc + selected
            byteArray[locp] = scrolltext.value
            scroll[selected] = scrolltext.value
            console.log("changed scroll data at "+locp.toString(16)+" to "+scrolltext.value+"")
        }
         epointertext.onchange=function(){
            var selection = input.selectedIndex*512
            var loc = parseInt("C2E0", 16)+selection
            var locp = loc + selected
            epointers[selected] = epointertext.value
            byteArray[loc] = epointertext.value
             console.log("changed object pointer at "+locp.toString(16)+" to "+epointertext.value+"")
            }
/*            var e = ""+epointer1+""+epointer2+""
            var f = parseInt(e, 16)
            var i = 0
            var enemies = []
            while(byteArray[f] != "ff"){
                var ID = byteArray[parseInt(""+epointer1+"", 16)]
                var type = byteArray[parseInt(""+epointer1+"", 16) + 1]
                var xpos = byteArray[parseInt(""+epointer1+"", 16) + 2]
                var ypos = byteArray[parseInt(""+epointer1+"", 16) + 3]
                f += 4
                eneimies[e] = [ID, type, xpos, ypos]
                i += 1
            }
            console.log(enemies.length)*/
        renderroom()
    })}}
    
    drawgrid(ctx)
    drawgrid(ctx)
    loadtileset()    
    drawgrid(tilectx)
    var point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)
        var p = point *2
        var locp = loc + p
        pointers[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
        var p = point *2
        var locp = loc + p
        room_transitions[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
        var locp = loc + point
        scroll[point] = byteArray[locp]
        point += 1
    }
    point = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }
    point = 0
    var p = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[p] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        p += 1
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }
    point = 0
    while(point != 59){
        var chunk = parseInt("45", 16)
        chunk += point
        chunks[point] = {}
        chunks[point].pointer = chunk.toString(16)
        chunks[point].chunk = []
        chunks[point].collisions = []
        var e = 0
        while(e != 256){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("500", 16)
            var hex = chunks[point].pointer
            var pointer = parseInt(""+hex+"00", 16)
            pointer -= parseInt("4500", 16)
            loc += pointer
            var locp = loc + e
            chunks[point].chunk[e] = byteArray[locp]
            chunks[point].collisions[e] = collisionData[document.getElementById("tileset").selectedIndex][parseInt(byteArray[locp],16)]
            e += 1
        }
        point += 1
    }
    console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 16 + e
                //var select = document.createElement("option")
                //select.innerHTML = g.toString(16)
                //parent.appendChild(select)
                e += 1
            } else {
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                break
            }
        }
    }
    totalbanksadded = Math.floor(byteArray.length/parseInt("4000", 16))
}
var generateArray = function(array, simplePalette,chunks){

for (let x = 0; x != 59; x += 1){

for (let p = 0; p < 1024; p += 4) {
  array[x][p] = simplePalette[chunks[x].collisions[Math.floor(p/4)]];// R value
  array[x][p+1] = array[x][p];  // G value
  array[x][p+2] = array[x][p] // B value
  array[x][p+3] = 255;  // A value
}
}/*
for (let x = 0; x != 16; x += 1) {
for (let y = 0; y != 16; y += 1) {
for (let p = 0; p < 1024; p += 4) {
var e = x*y
  array[e][p] = simplePalette[chunks[parseInt(pointers[e],16)-parseInt("45",16)].collisions[Math.floor(p/4)]];// R value
  array[e][p+1] = array[p];  // G value
  array[e][p+2] = array[p] // B value
  array[e][p+3] = 255;  // A value

}
}
}*/
imageDatas=array
}
/*set spawn template(need to implement the save editor first to get the pointer locations)*/
var spawn = function(byteArray, x, y){
    hex = selected.toString(16)
    byteArray[20068] = ""+y+""
    byteArray[20069] = "0"+hex.substr(0, 1)+""
    byteArray[20070] = ""+x+""
    byteArray[20071] = "0"+hex.substr(1, 2)+""
    byteArray[20072] = ""+y+""
    byteArray[20073] = "0"+hex.substr(0, 1)+""
    byteArray[20074] = ""+x+""
    byteArray[20075] = "0"+hex.substr(1, 2)+""
    var bank = document.getElementById("bankselect").selectedIndex + 9
    byteArray[parseInt("4E75", 16)] = "0"+bank.toString(16)+""
    //window.alert("warning: collision data might not be right, expect glitches.")
    
    console.log("set spawn to bank "+bank.toString(16)+" on screen "+hex.toString(16)+", at x "+x+" and y "+y+".")
    //TODO: set metatiles, graphics properly
    var tileset = document.getElementById("tileset").selectedIndex + 9
    var sel = tileset.toString(16)
    if(sel === "9"){
    tilebank = "07"
    tiles1 = "40"
    tiles0 = "00"
    metatiles1 = "48"
    metatiles0 = "80"
    collision1 = "41"//correct
    collision0 = "80"
    } else if(sel === "a"){
    tilebank = "07"
    tiles1 = "48"
    tiles0 = "00"
    metatiles1 = "4A"
    metatiles0 = "80"
    collision1 = "42"//unknown
    collision0 = "80"
    } else if(sel === "b"){
    tiles1 = "71"
    tiles0 = "BC"
    tilebank = "08"
    metatiles1 = "4C"
    metatiles0 = "80"
    collision1 = "42"//unknown
    collision0 = "80"
    } else if(sel === "c"){
    tilebank = "07"
    tiles1 = "60"
    tiles0 = "00"
    metatiles1 = "52"
    metatiles0 = "80"
    collision1 = "45"//correct
    collision0 = "80"
    } else if(sel === "d"){
    tilebank = "07"
    tiles1 = "58"
    tiles0 = "00"
    metatiles1 = "50"
    metatiles0 = "80"
    collision1 = "44"//unknown, might be ruins interior
    collision0 = "80"
    } else if(sel === "e"){
    var caveVariant = parseInt(prompt("select acid caves varient, 1-3, 1 being acid all up, 2 being middle, and 3 being lowered"), 10)
    if (caveVariant === 1){
        tiles1 = "68"
        tiles0 = "00"
        metatiles1 = "56"
        metatiles0 = "A8"
        console.log("acid not lowered")
    } else if(caveVariant === 2){
        tiles1 = "6D"
        tiles0 = "30"
        metatiles1 = "54"
        metatiles0 = "80"
        console.log("acid lowered halfway")
    } else if (caveVariant === 3){
        tiles1 = "72"
        tiles0 = "60"
        metatiles1 = "55"
        metatiles0 = "94"
        console.log("acid lowered fully")
    }
    tilebank = "07"
    collision1 = "46" //correct, but glitchy
    collision0 = "80"
    } else if(sel === "f"){
    tiles1 = "69"
    tiles0 = "BC"
    tilebank = "08"
    metatiles1 = "57"
    metatiles0 = "BC"
    collision1 = "47"//correct, I think...
    collision0 = "80"
    } else {
        window.alert("INVALID TILESET")
    }
    //(base values) 4E6F	$6000	graphics

    //(base values) 4E71    $5280  	Metatile

    //(base values) 4E73    $4580   collision
    /*use scroll borders to clip screen location of the camera at spawn (low priority)
    stop down:
0F
0E
0D
0C
0B
0A
09
08
stop up:
0F
0E
0D
0C
07
06
05
04
stop left:
0F
0E
0B
07
0A
06
03
02
stop right: 
0F
0D
0B
09
07
05
03
01

00-Free Scroll
01-Stop Scrolling Right
02-Stop Scrolling Left
03-Vertical Shaft
04-Stop Scrolling Up
05-Stop Scrolling Up Right Corner
06-Stop Scrolling Up Left Corner
07-Vertical Shaft End Up
08-Stop Scrolling Down
09-Stop Scrolling Down Right
0A-Stop Scrolling Down Left
0B-Vertical Shaft End Down
0C-Hallway
0D-Hallway End Right
0E-Hallway End Left
0F-No Scroll


Metatile Definitions
0x20880-0x20A7F - Bubbles, Ruins 3 Catacombs
0x20A80-0x20C7F - Inside Ruins
0x20C80-0x20E7F - Final Ruins
0x20E80-0x2107F - Queen's Room
0x21080-0x2127F - First/Last Caves
0x21280-0x2147F - Outside/Ship
0x21480-0x21593 - Acid Caves (Acid Mid)
0x21594-0x218A7 - Acid Caves (Acid Down)
0x216A8-0x217BB - Acid Caves (Acid Up)
0x217BC-0x219BB - Outside Ruins

Collision Data
0x20080-0x2087F - 0x100 per tileset
20080(4080) - ???(set 1)
20180(4180) - ???(set 2)
20280(4280) - ???(set 3)
20380(4380) - ???(set 4)
20480(4480) - ???(set 5)
20580(4580) - outside/ship(set 6)
20680(4680) - ???(set 7)
20780(4780) - ???(set 8)

Tiles
0x1C000-0x1C7FF - Bubbles, Ruins 3 Catacombs
0x1C800-0x1CFFF - Inside Ruins
0x1D000-0x1D7FF - Queeny
0x1D800-0x1DFFF - First/Last Caves
0x1E000-0x1E7FF - Outside/Ship
0x1E800-0x1ED2F - Caves with Acid
0x1ED30-0x1F25F - Caves with Acid variant 1
0x1F260-0x1F78F - Caves with Acid variant 2
0x1F790-0x1FB6F - Powerups and Refills
0x1FB70-0x1FFFF - Free Space
*/
}
var viewdat = function(){
    var loc = epointers[selected]
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    var loc = parseInt(""+d.toString(16)+""+e+"", 16)
    console.log(loc)
    e = 0
    d = 0
    //objnum
    var objects = []
var rawObjects = []
    while(e != 4){
            var p = d*4
            if(byteArray[loc + p] != "ff"){
		    var type = byteArray[loc + p + 1]
		    if(logObjectList[type] != undefined){
		    type = logObjectList[parseInt(type,16)]
		    }
                objects[d] = "Object "+d+" - ID:"+byteArray[loc + p]+", Type:"+type+", X:"+byteArray[loc + p + 2]+", Y:"+byteArray[loc + p + 3]+"</p>"
                d += 1
            } else {
                e = 4
                if(d === 0){
                objects = "No objects on current screen"
                }
            }
        }
if(objects[document.getElementById("objselect").selectedIndex]!=undefined){
    document.getElementById("OBJData").innerHTML = objects[document.getElementById("objselect").selectedIndex]} else {
document.getElementById("OBJData").innerHTML = "Invalid object. It doesn't exist."
}
}
var deleteobj = function(input){
    renderroom()
    var loc = epointers[selected]
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    var loc = parseInt(""+d.toString(16)+""+e+"", 16)
    console.log(loc)
    e = 0
    d = 0
    //objnum
    var objects = []
    while(e != 4){
            var p = d*4
            if(byteArray[loc + p] != "ff"){
                objects[d] = [""+byteArray[loc + p]+"",""+byteArray[loc + p + 1]+"",""+byteArray[loc + p + 2]+"",""+byteArray[loc + p + 3]+""]
                d += 1
            } else {
                e = 4
            }
        }
    d -= 1
    var p = input*4
    console.log("deleting object "+input+", with "+d+" total")
    objnum -= 1
    if(input < d){
        var f = d-input
        console.log(""+f+" objects were orphaned")
        var g = d*4
        byteArray[loc + p] = byteArray[loc + g]
        byteArray[loc + 1 + p] = byteArray[loc + 1 + g]
        byteArray[loc + 2 + p] = byteArray[loc + 2 + g]
        byteArray[loc + 3 + p] = byteArray[loc + 3 + g]       
            
        byteArray[loc + g] = "ff"
        byteArray[loc + 1 + g] = "ff"
        byteArray[loc + 2 + g] = "ff"
        byteArray[loc + 3 + g] = "ff"
        console.log("fixed all orphaned objects")
    } else {
        var g = d*4
        byteArray[loc + g] = "ff"
        byteArray[loc + 1 + g] = "ff"
        byteArray[loc + 2 + g] = "ff"
        byteArray[loc + 3 + g] = "ff"
    }
}
var deleted = function(){
    deleteobj(document.getElementById("objselect").selectedIndex)
}
/*var addbank = function(n, s){
if (totalbanksadded <= 255){
var e = 0
var g = n*parseInt("4000", 16)
var f = byteArray.length
if(s===undefined){
var bank = document.getElementById("bankselect").selectedIndex
} else {
var bank = s
}
    while(e != parseInt(0x4000)){
	var h = f + e
	if(s===undefined){
	byteArray[h] = byteArray[parseInt(startbank[bank],16)+e]
      } else {
	byteArray[h] = byteArray[s*parseInt(0x4000)+e]
      }
	e += 1
    }
    var bankPointers = n+16
    while(startbank[bankPointers-9] === undefined){
var h = parseInt(0x4000)*bankPointers
startbank[bankPointers-9] = h.toString(16)
bankPointers -= 1
}*/

var addbank = function(n, s){
if (totalbanksadded <= 255){
var e = 0
var g = n*parseInt("4000", 16)
var f = byteArray.length
var bank = document.getElementById("bankselect").selectedIndex
if(s != undefined){
bank = s-9
}
counter = 0
    while(e != parseInt(0x4000)){
	var h = f + e
if (s < 0) {
	byteArray[h] = byteArray[(parseInt(0x4000)*s)+e]
    e += 1
} else {
	byteArray[h] = byteArray[parseInt(startbank[bank],16)+e]
    e += 1}
    }

    var bankPointers = n+16
    while(startbank[bankPointers-9] === undefined){
var h = parseInt(0x4000)*bankPointers
startbank[bankPointers-9] = h.toString(16)
bankPointers -= 1
}

    if(n === 1){
    console.log("added 1 bank")
    } else {
    console.log("added "+n+" banks("+totalbanksadded+" total)")
    }
var byteLength = byteArray.length/parseInt(0x4000)
byteLength -= 1
    document.getElementById("bankselect").innerHTML +="<option>"+byteLength.toString(16)+"</option>"
    totalbanksadded += n
    console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 7 + e
                //parent[g] = "<option>"+(e+16).toString(16)+"</option>"
                e += 1
            } else if(parent.childNodes.length >= 254 && s === undefined){
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                e += 1
                break
            }
        }
    }
}
}

var frame = new CustomEvent('EnterFrame')

    setInterval(function(){window.dispatchEvent(frame)}, 1000/10)
window.addEventListener("EnterFrame", function(){
if(hexout !=""){
if(fileChange === false){
decode()
fileChange = true}}
})
window.addEventListener("mousedown", function(){

        renderroom()
        changeTileset(imagetileset)
	drawChunkImageData(document.getElementById("edit").getContext("2d"),imageDatas)
	drawgrid(document.getElementById("edit").getContext("2d"))
})
window.addEventListener("mouseup", function(){

        renderroom()
        changeTileset(imagetileset)
	drawChunkImageData(document.getElementById("edit").getContext("2d"),imageDatas)
	drawgrid(document.getElementById("edit").getContext("2d"))
})

