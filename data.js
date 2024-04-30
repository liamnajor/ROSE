var OBJManagerStyle="position: absolute; left: 50px; top: 280px; border: 1px solid #000000; width: 286px; height: 425px"
//graphics data format: graphics offset, metatile offset, name, sprite offset

var graphicsData=[[parseInt("1C000",16),parseInt("20880",16),"Bubbles, Ruins 3 Catacombs"],
[parseInt("1C800",16),parseInt("20A80",16),"Inside Ruins"],
[parseInt("231BC",16),parseInt("20C80",16),"Final Ruins"],
[parseInt("1E000",16),parseInt("21280",16),"Outside/Ship",parseInt("1B520",16)],
[parseInt("1D800",16), parseInt("21080",16),"First/Last Caves"],
[parseInt("1E800",16),parseInt("21480",16),"Acid Caves (Acid Mid)"],
[parseInt("1ED30",16),parseInt("21594",16),"Acid Caves (Acid down)"],
[parseInt("1F260",16),parseInt("216A8",16),"Acid Caves (Acid up)"],
[parseInt("229BC",16),parseInt("217BC",16),"Outside Ruins"]]

var roomTransitionOpcodes=[
["0x","COPY_DATA","bb ssss dddd llll"],//x=0, data, x=1, bg, x=2, spr, bb=source bank, ssss=source pointer, dddd=destination pointer, llll=length (in bytes)
["1x","TILETABLE"],/*Tile Tables
0 - finalLab
1 - ruinsInside
2 - plantBubbles
3 - queen
4 - caveFirst
5 - surface
6 - lavaCavesEmpty
7 - lavaCavesFull
8 - lavaCavesMid
9 - ruinsExt*/
["2x","COLLISION"],/*Collision Tables
0 - plantBubbles
1 - ruinsInside
2 - queen
3 - caveFirst
4 - surface
5 - lavaCaves
6 - ruinsExt
7 - finalLab*/
["3x","SOLIDITY"],/*Solidity Values
0 - plantBubbles
1 - ruinsInside
2 - queen
3 - caveFirst
4 - surface
5 - lavaCaves
6 - ruinsExt
7 - finalLab*/
["4b","WARP","b,yx"],//b = bank. 2 bytes, 4{bank} {y}{x}
["50","ESCAPE_QUEEN"],
["60","DAMAGE","aa,ss"],//aa=acid damage, ss=spike damage
["70","EXIT_QUEEN"],
["8a","ENTER_QUEEN","bb,bb,cc,cc,dd,dd,ee,ee"],/* Transition to the Queen Fight, 8a
Handles a lot of special stuff regarding the queen fight, but not everything.

Form: 8a bbbb cccc dddd eeee

a: Bank for current room ($F)
b: Scroll Y position ($F48)
c: Scroll X position ($EAE)
d: Samus Y position ($F02)
e: Samus X position ($EDE)*/
["90","IF_MET_LESS","nn,xx,xx"],/*Conditional Operator
Syntax: 9* nn xxxx

Operands:

nn - Number of Metroids
xxxx - Transition index
“If the amount of Metroids remaining is less than or equal 'nn', then jump to and do transition 'xxxx' instead.”

This is how the game handles lowering (and raising) acid levels. Keep in mind that earthquakes are handled elsewhere.

Note that this uses the real Metroid counter (memory address $D089), which also accounts for the Metroids in the endgame. Also keep in mind that this value is in binary coded decimal.*/
["A0","FADEOUT"],
["Bx","LOAD","bb,xx,xx"],
/*:
x=1, load bg
x=2, load sprite
bb - source bank
xxxx - source pointer
BG Graphics Pages
07:4000 plantBubbles
07:4800 ruinsInside
07:5000 queenBG
07:5800 caveFirst
07:6000 surfaceBG
07:6800 lavaCavesA
07:6D30 lavaCavesB
07:7260 lavaCavesC
08:71BC	finalLab
08:79BC	queenSPR
Sprite Graphics Pages
06:5920 enemiesA
06:5D20 enemiesB
06:6120 enemiesC
06:6520 enemiesD
06:6920 enemiesE
06:6D20 enemiesF
06:7120 arachnus
06:7520 surfaceSPR
08:59BC	metAlpha
08:5DBC	metGamma
08:61BC	metZeta
08:65BC	metOmega
08:69BC	ruinsExt
08:71BC	finalLab
08:79BC	queenSPR*
* Note: queenSPR is loaded using the “0*” operator because it uses a nonstandard amount of tiles.*/
["Cx","SONG"],/*
0 - No change in music.
    - Silences the roar from "song" A below
1 - "The Last Metroid"
2 - Queen Fight
3 - Inside Ruins
4 - Main Tunnels
5 - Ambience 1
6 - Ambience 2
7 - Ambience 3 (bugs)
8 - Omega Metroid Area
9 - Final Ruins
A - No music: SFX - Metroid Queen roar (persists)
B - Final Alarm
C - Metroid Fight
D - Ambience 4
E - SFX: Earthquake
F - Metroid Defeated*/
["Dx","ITEM"],/*Load Message/Special Graphics
This loads the graphics for the orb, the desired item, the item font (well, up to the number 2), and the corresponding text string to VRAM.

0 - Save ... (just for the message)
1 - Plasma Beam
2 - Ice Beam
3 - Wave Beam
4 - Spazer
5 - Bombs
6 - Screw Attack
7 - Varia Suit
8 - High Jump Boots
9 - Space Jump
A - Spider Ball
B - Spring Ball
C - Energy Tank (unused)
D - Missile Tank (unused)
E - Energy (i.e. refill; again, unused)
F - Missiles (i.e. refill; unused)
Note that, for the last 4 items, their sprites are always in VRAM, and they don't cause text strings to appear, so this is unnecessary for them.*/
["FF","END_DOOR"],//terminating op
]

var objectList = [
[parseInt(0x00),"Tsumari A"],
[parseInt(0x01),"Tsumari B"],
[parseInt(0x04),"Skreek"],
[parseInt(0x09),"Drivel"],
[parseInt(0x12),"Small bugs"],
[parseInt(0x14),"Hornoad"],
[parseInt(0x16),"Senjoo"],
[parseInt(0x19),"Gawron spawner A"],
[parseInt(0x1A),"Gawron spawner B"],
[parseInt(0x1B),"Chute leech"],
[parseInt(0x1E),"Autrack (flipped)"],
[parseInt(0x1F),"Wallfire (flipped)"],
[parseInt(0x20),"Needler A"],
[parseInt(0x21),"Needler B"],
[parseInt(0x28),"Skorp (up)"],
[parseInt(0x29),"Skorp (down)"],
[parseInt(0x2A),"Skorp (right)"],
[parseInt(0x2B),"Skorp (left)"],
[parseInt(0x2C),"Glow fly"],
[parseInt(0x30),"Moheek A"],
[parseInt(0x31),"Moheek B"],
[parseInt(0x34),"Rock Icicle"],
[parseInt(0x3C),"Yumee spawner A"],
[parseInt(0x3D),"Yumee spawner B"],
[parseInt(0x40),"Octroll"],
[parseInt(0x41),"Autrack"],
[parseInt(0x46),"Autoad"],
[parseInt(0x4A),"Wallfire"],
[parseInt(0x51),"Gunzoo"],
[parseInt(0x5C),"Autom"],
[parseInt(0x63),"Shirk"],
[parseInt(0x65),"Septogg"],
[parseInt(0x68),"Moto"],
[parseInt(0x6A),"Halzyn"],
[parseInt(0x6B),"Ramulken"],
[parseInt(0x6D),"Metroid event musical stinger"],
[parseInt(0x6E),"Proboscum (flipped)"],
[parseInt(0x72),"Proboscum"],
[parseInt(0x75),"Missile block"],
[parseInt(0x76),"Arachnus"],
[parseInt(0x77),"Arachnus"],
[parseInt(0x78),"Arachnus"],
[parseInt(0x79),"Arachnus"],
[parseInt(0x7A),"Arachnus"],
[parseInt(0x80),"Plasma beam orb"],
[parseInt(0x81),"Plasma beam"],
[parseInt(0x82),"Ice beam orb"],
[parseInt(0x83),"Ice beam"],
[parseInt(0x84),"Wave beam orb"],
[parseInt(0x85),"Wave beam"],
[parseInt(0x86),"Spazer beam orb"],
[parseInt(0x87),"Spazer beam"],
[parseInt(0x88),"Bombs orb"],
[parseInt(0x89),"Bombs"],
[parseInt(0x8A),"Screw attack orb"],
[parseInt(0x8B),"Screw attack"],
[parseInt(0x8C),"Varia suit orb"],
[parseInt(0x8D),"Varia suit"],
[parseInt(0x8E),"Hi-jump boots orb"],
[parseInt(0x8F),"Hi-jump boots"],
[parseInt(0x90),"Space jump orb"],
[parseInt(0x91),"Space jump"],
[parseInt(0x92),"Spider ball orb"],
[parseInt(0x93),"Spider ball"],
[parseInt(0x94),"Spring ball orb"],
[parseInt(0x95),"Spring ball"],
[parseInt(0x96),"Energy tank orb"],
[parseInt(0x97),"Energy tank"],
[parseInt(0x98),"Missile tank orb"],
[parseInt(0x99),"Missile tank"],
[parseInt(0x9A),"Blob thrower"],
[parseInt(0x9B),"Energy refill"],
[parseInt(0x9C),"Arachnus orb"],
[parseInt(0x9D),"Missile refill"],
[parseInt(0xA0),"Alpha metroid (hatching variant)"],
[parseInt(0xA3),"Gamma metroid"],
[parseInt(0xA4),"Alpha metroid"],
[parseInt(0xA6),"Baby metroid"],
[parseInt(0xAD),"Zeta metroid"],
[parseInt(0xB3),"Omega metroid"],
[parseInt(0xCE),"Larval Metroid"],
[parseInt(0xD0),"Flitt (vanishing type)"],
[parseInt(0xD1),"Flitt (moving type)"],
[parseInt(0xD2),"Stalagtite (unused, intangible)"],
[parseInt(0xD3),"Gravitt"],
[parseInt(0xD8),"Gullugg"],
[parseInt(0xDB),"Baby metroid egg preview (intangible)"],
[parseInt(0xF8),"Missile door"]]

//convert to logical array, add entries above if needed. TODO: load from a JSON file for configuration with custom hacks
var logObjectList = []
var counter = 0
//generate log(ical)ObjectList
while (counter!=objectList.length){
    logObjectList[objectList[counter][0]]=objectList[counter][1]
    document.getElementById("OBJType").innerHTML += "<option>"+objectList[counter][1]+"</option>"
  counter+=1
}
window.addEventListener("selectstart", function(event) {
  event.preventDefault();
});
