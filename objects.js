/*old
var objectList = [
[parseInt(0x00), 'Tsumuri'],    

[4, 'Skreek spawner'],

[9, 'Drivel'],

[parseInt(0x12), 'Yumbo'],
    
[parseInt(0x14), 'Hornoad'],

[27, 'Chute Leech'],
    
[32, 'Horizontal Needler'],
[33, 'Vertical Needler'],

[48, 'vertical(?) moheek'],

[49, 'horizontal(?) moheek'],

[74, 'Wallfire'],

[101, 'Septogg'],

[104, 'Moto'],

[106, 'Halzyn'],

[107, 'Ramulken'],

[110, 'Proboscum'],

[128, 'Plasma Beam in Orb'],

[129, 'Plasma Beam'],
    
[130, 'Ice Beam in Orb'],

[131, 'Ice Beam'],

[132, 'Wave Beam in Orb'],

[133, 'Wave Beam'],

[134, 'Spazer in Orb'],

[135, 'Spazer'],

[136, 'Morph Ball Bombs in Orb'],

[137, 'Morph Ball bombs'],

[138, 'Screw Attack in Orb'],

[139, 'Screw Attack'],

[140, 'Varia Suit in Orb'],

[141, 'Varia Suit'],

[142, 'High Jump in Orb'],

[143, 'High Jump'],

[144, 'Space Jump in Orb'],

[145, 'Space Jump'],

[146, 'Spider Ball in Orb'],

[147, 'Spider Ball'],

[148, 'Spring Ball in Orb'],

[149, 'Spring Ball'],

[150, 'Energy Tank in Orb'],

[151, 'Energy Tank'],

[152, 'Missile Tank in Orb'],

[153, 'Missile Tank'],

[154, 'Blob Thrower'],

[155, 'Energy Restore Orb'],

[156, 'Arachnus'],

[157, 'Missile Restore'],

[160, 'Alpha Metroid, pre shed'],

[162, 'Metroid Egg'],

[163, 'Gamma Metroid'],

[164, 'Alpha Metroid, post shed'],

[166, 'Metroid Egg Clone'],

[173, 'Zeta Metroid, pre shed'],

[179, 'Omega Metroid'],

[206, 'Larva Metroid'],

[208, 'Flitt'],

[209, 'Meboid(?)'],

[211, 'Gravitt'],

[216, 'Gullugg']]
*/
/*$00	Tsumari A
$01	Tsumari B
$04	Skreek
$09	Drivel
$12	Small bugs
$14	Hornoad
$16	Senjoo
$19	Gawron spawner A
$1A	Gawron spawner B
$1B	Chute leech
$1E	Autrack (flipped)
$1F	Wallfire (flipped)
$20	Needler A
$21	Needler B
$28	Skorp (up)
$29	Skorp (down)
$2A	Skorp (right)
$2B	Skorp (left)
$2C	Glow fly
$30	Moheek A
$31	Moheek B
$34	Rock Icicle
$3C	Yumee spawner A
$3D	Yumee spawner B
$40	Octroll
$41	Autrack
$46	Autoad
$4A	Wallfire
$51	Gunzoo
$5C	Autom
$63	Shirk
$65	Septogg
$68	Moto
$6A	Halzyn
$6B	Ramulken
$6D	Metroid event musical stinger
$6E	Proboscum (flipped)
$72	Proboscum
$75	Missile block
$76	Arachnus
$77	Arachnus
$78	Arachnus
$79	Arachnus
$7A	Arachnus
$80	Plasma beam orb
$81	Plasma beam
$82	Ice beam orb
$83	Ice beam
$84	Wave beam orb
$85	Wave beam
$86	Spazer beam orb
$87	Spazer beam
$88	Bombs orb
$89	Bombs
$8A	Screw attack orb
$8B	Screw attack
$8C	Varia suit orb
$8D	Varia suit
$8E	Hi-jump boots orb
$8F	Hi-jump boots
$90	Space jump orb
$91	Space jump
$92	Spider ball orb
$93	Spider ball
$94	Spring ball orb
$95	Spring ball
$96	Energy tank orb
$97	Energy tank
$98	Missile tank orb
$99	Missile tank
$9A	Blob thrower
$9B	Energy refill
$9C	Arachnus orb
$9D	Missile refill
$A0	Alpha metroid (hatching variant)
$A3	Gamma metroid
$A4	Alpha metroid
$A6	Baby metroid
$AD	Zeta metroid
$B3	Omega metroid
$CE	Larval Metroid
$D0	Flitt (vanishing type)
$D1	Flitt (moving type)
$D2	Stalagtite (unused, intangible)
$D3	Gravitt
$D8	Gullugg
$DB	Baby metroid egg preview (intangible)
$F8	Missile door*/
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
