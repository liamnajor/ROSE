var objectList = [
[parseInt(0x01), 'Tsumuri'],    

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
//convert to logical array, add entries above if needed. TODO: load from a JSON file for configuration with custom hacks
var logObjectList = []
var counter = 0
//generate log(ical)ObjectList
while (counter!=objectList.length){
    logObjectList[objectList[counter][0]]=objectList[counter][1]
    document.getElementById("OBJType").innerHTML += "<option>"+objectList[counter][1]+"</option>"
  counter+=1
}
