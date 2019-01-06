var chunknum = parseInt(localStorage.getItem("chunkNum"), 10)
if(chunknum === null){
    localStorage.setItem("chunkNum", "59")    
    chunknum = parseInt(localStorage.getItem("chunkNum"), 10)
}
const scale = 16;
const detail = 16;
const precision = 1;
let elevation;
let color;
let normal;
let previousElevation;
const biomes = [
	{
		name: "desert",
		proba: ({ temperature, altitude, terrain, dryness }) => (dryness*2 + temperature + 1-terrain) /4
	},
	{
		name: "forest",
		proba: ({ temperature, altitude, terrain, dryness }) => ((1-dryness)*2 + temperature) /3
	},
	{
		name: "grassland",
		proba: ({ temperature, altitude, terrain, dryness }) => (1-dryness + (1-terrain)*2) /3
	},
	{
		name: "tundra",
		proba: ({ temperature, altitude, terrain, dryness }) => (dryness + 1-temperature) /2
	},
	{
		name: "ocean",
		proba: ({ temperature, altitude, terrain, dryness }) => (1-dryness + 1-altitude) /2
	},
];
const whatBiome = (climate) => biomes.sort((a,b) => a.proba(climate) < b.proba(climate))[0].name;

function setup() {
	createCanvas(16, 16);
	noLoop();
	colorMode(HSB, 1);
	noiseDetail(detail);
	noStroke();
}

function draw() {
	let higherVal = 0;
	let higherPt = [0, 0];
	for (let x = 0; x < width; x+=precision) {
		for (let y = 0; y < height; y+=precision) {
		
			elevation = getElevation(x, y);

			if (elevation <= .5) {
				elevation /= 2; // océans profonds
			}

			if (x > 0 && y > 0 && x < width && y < height) {
				topLeftElev = getElevation(x - precision, y - precision);
				if (topLeftElev <= .5) {
					topLeftElev *= .97;
				}
				bottomRightElev = getElevation(x + precision, y + precision);
				if (bottomRightElev <= .5) {
					bottomRightElev *= .97;
				}
				normal = (topLeftElev - bottomRightElev) / precision;
			} else {
				normal = 0;
			}
			
			color = mapColorFunctions(elevation);
			fill(...color); rect(x, y, precision, precision);
			fill(0, 0, 0, normal*10); rect(x, y, precision, precision); // normal map

			if (elevation > higherVal) {
				higherVal = elevation;
				higherPt = {x: x, y: y};
			}

		}
	}
}

const getElevation = (x, y) => 1 - noise((x)*(1/scale), (y)*(1/scale));
const limit = (val, min, max) => val >= max ? max : val <= min ? min : val;

mapColorFunctions = (elev, biome) => {
	const h = 1- limit(elev*1.1, 0, .9);
	const s = round(elev)/2+.5;
	const l = .05+elev*.90;

	return [h, s, l];
}
var out = []
var outChunk = function(){
var o = []
var canvas = document.getElementById("defaultCanvas0");
var ctx = canvas.getContext("2d")
var imgData = ctx.getImageData(0, 0, 16, 16);
var e = 0
var f = 0
while (e != 1024){
    out[f] = []
    out[f][0] = imgData.data[e]
    out[f][1] = imgData.data[e+1]
    out[f][2] = imgData.data[e+2]
    e += 4
    f += 1
}
    e = 0
    while(e != 256){
        var h = out[e][0]+out[e][1]+out[e][2]
        var b = h/2
        var g = Math.floor(b)
        if(g >= 16){
        o[e] = g.toString(16)
        } else {
        o[e] = "0"+g.toString(16)+""
        }
        e += 1
    }
    out = o
    return o
}

var canvas = document.getElementById("defaultCanvas0");
if(chunknum <= 58){
    setTimeout(function(){
    outChunk();
    canvas.style = "display:none;"
    localStorage.setItem("chunk"+chunknum+"", out)
    chunknum += 1
    localStorage.setItem("chunkNum", ""+chunknum+"")
    document.getElementById("display_count").innerHTML = chunknum
    setTimeout(function(){
        location.reload()
    }, 9)
}, 1)
} else if (chunknum === 58 && localStorage.getItem("mapbank") === null){
        setTimeout(function(){
    outChunk();
    canvas.style = "display:none;"
    localStorage.setItem("map", out)}, 1)
    var bank = prompt("bank to replace(hex value, 9-F):", 0)
    localStorage.setItem("mapbank", bank)
    } else {
        console.log("stopped")
    }
