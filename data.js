var localstoragesupported = true
try {
  eval('localStorage.setItem("test", "test")')
}
catch(error) {
  console.error(error);
  localstoragesupported = false
}
console.log(localstoragesupported)
var c = []
var hex = null
var adresses = {//I know I spelled addresses wrong, but I'd already copy-pasted all the shit below and this was quicker
        items:[["DF97","E041"],["DDC9","E023"],["DE49","DFE7"],["DFBF","DFFA"],"DD89","DF58","DDE5","DED2","DFA6","DA24"],
        graphics:[["14725","14DE2","150B2","1510C","15255","15531"],["14743","14759","15072","150D3","1520E","1527A","153BC","15525","1552F"],["15095","150BB","15529"],["14C22","150B4","150C2","15199","15527","1552B"],"15132",["150A6","15533"],"15084",["154FE","15500","15523"],["14804","1498F","15026","15521","1552D"],["14C0C","15047"]]
    }
var testhack = function(){
    //opens gameboy emulator in a new tab/window
        localStorage.setItem("opened", "true")
        window.open("GB_Emu/index.xhtml")
}
	var converter = function(input)
	{
        var stringHexadecimal = ""+input+""
		var returnValues = [];

		var nibblesForByteCurrent = [];

		for (i = 0; i < stringHexadecimal.length; i++)
		{
			var charForNibble = stringHexadecimal[i];
			var nibbleAsInt = parseInt(charForNibble, 16);
			if (isNaN(nibbleAsInt) == false)
			{
				nibblesForByteCurrent.push(nibbleAsInt);
				if (nibblesForByteCurrent.length == 2)
				{
					var byte = 
						(nibblesForByteCurrent[0] << 4) 
						+ nibblesForByteCurrent[1];
					returnValues.push(byte);
					nibblesForByteCurrent.length = 0;
				}
			}			
		}

		return returnValues;
	}	

	var save = function(bytes)
	{
        this.bytes = bytes
		var dataAsArrayBuffer = new ArrayBuffer(this.bytes.length);
		var dataAsArrayUnsigned = new Uint8Array(dataAsArrayBuffer);
	    for (var i = 0; i < this.bytes.length; i++) 
		{
			dataAsArrayUnsigned[i] = this.bytes[i];
		}
    	var dataAsBlob = new Blob([dataAsArrayBuffer], {type:'bytes'});

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(dataAsBlob);
        if (document.getElementById("filename").value === ""){
            link.download = "data.bin"
        } else {
            link.download = document.getElementById("filename").value
        }
		link.click();
        return dataAsBlob
    }


var button = function(){
    if(localstoragesupported === true){
    var ROM = localStorage.getItem('ROM');
    if(ROM === null || ROM === undefined || hexout != ""){
        var bytes = hexout
        localStorage.setItem("ROM", bytes)
        console.log("saved to local storage")
    } else {
        hexout = ROM
        var bytes = ROM
        console.log("loaded from local storage")
    }} else {
        var ROM = hexout
        var bytes = ROM
        console.log("loaded from local file, local storage overridden/not supported")
    }
    var e = bytes.length
    var p = 0
    var i = e/2
    while(e >= 0){
        var counter = e/2 -1
        var b = e - 2
        var res = bytes.substr(b, e)
        c[counter] = res.substr(0, 2)
        e = b
    }
    renderbank()
}
var encode = function(){
    var value = ""
    var bytes = hexout
    //c[parseInt({address in hexidecimal}, 16) OR {address in base-10] = {replacement}
    //(base values) 4E6F	$6000	graphics
    c[parseInt("4E6F", 16)]	= tiles0
    c[parseInt("4E70", 16)] = tiles1

    //(base values) 4E71    $5280  	Metatile
    c[parseInt("4E71", 16)] = metatiles0
    c[parseInt("4E72", 16)] = metatiles1

    //(base values) 4E73    $4580   collision
    c[parseInt("4E73", 16)] = collision0
    c[parseInt("4E74", 16)]	= collision1
    c[parseInt("4E6E", 16)] = tilebank
    var i = 0
    while(i <= bytes.length){
        value += ""+c[i]+""
        i += 1
    }
    
    if(localstoragesupported === true){
    localStorage.setItem("ROM", ""+value+"")
    console.log("saved output to local storage")
    }
    var saver = Converter.stringHexadecimalToBytes(value)
    var m = 262143
    var w = []
    var v = 0
    while(v <= m){
        w[v] = saver[v]
        v += 1
    }
    console.log("encoding complete")
    save(w)
}
main();
document.getElementById("sorter").addEventListener("click", function(e){
    if (e.button === 0){
    button()}
})
document.getElementById("encode").addEventListener("click", function(e){
    if (e.button === 0){
    encode(true)}
})
document.getElementById("tileset").addEventListener("change", function() {
    loadtileset()
})
document.getElementById("bankselect").addEventListener("change", function() {
    renderbank()
})

document.getElementById("spawn").addEventListener("click", function(e){
    if (e.button === 0){
    var y = prompt("samus y position, pixels(hexadecimal, 00-FF)")
    var x = prompt("samus x position, pixels(hexadecimal, 00-FF)")
    spawn(c, x, y)}
})