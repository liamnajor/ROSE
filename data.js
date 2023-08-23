//var localstoragesupported = true

var startbank = []
/*try {
  eval('localStorage.setItem("test", "test")')
}
catch(error) {
  console.error(error);
  localstoragesupported = false
}
console.log(localstoragesupported)*/
var byteArray = []
var hex = null
var addresses = {
        items:[["DF97","E041"],["DDC9","E023"],["DE49","DFE7"],["DFBF","DFFA"],"DD89","DF58","DDE5","DED2","DFA6","DA24"],
        graphics:[["14725","14DE2","150B2","1510C","15255","15531"],["14743","14759","15072","150D3","1520E","1527A","153BC","15525","1552F"],["15095","150BB","15529"],["14C22","150B4","150C2","15199","15527","1552B"],"15132",["150A6","15533"],"15084",["154FE","15500","15523"],["14804","1498F","15026","15521","1552D"],["14C0C","15047"]]
    }
var testhack = function(){
    /*/opens gameboy emulator in a new tab/window
        //localStorage.setItem("opened", "true")
        window.open("GB_Emu/index.xhtml")*/
        windowingInitialize()
        startGame(encode(false))
setTimeout(function(){        
gameboy.canvas.height = 144
gameboy.canvas.width = 160
gameboy.recomputeDimension()}, 100)
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

	var save = function(bytes, output)
	{
        this.bytes = bytes
		var dataAsArrayBuffer = new ArrayBuffer(this.bytes.length);
		var dataAsArrayUnsigned = new Uint8Array(dataAsArrayBuffer);
	    for (var i = 0; i < this.bytes.length; i++) 
		{
			dataAsArrayUnsigned[i] = this.bytes[i];
		}
    	var dataAsBlob = new Blob([dataAsArrayBuffer], {type:'bytes'});
if(output === true){
		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(dataAsBlob);
        if (document.getElementById("filename").value === ""){
            link.download = "data.bin"
        } else {
            link.download = document.getElementById("filename").value
        }
		link.click();}
        return dataAsBlob
    }

//only enables elements disabled with the same method as disableElement below
var enableElement = function(element, style){
document.getElementById(element).style = style
}
var disableElement = function(element){
document.getElementById(element).style = "display:none;"
}
disableElement("OBJData")
var hideEmu = function(){
    disableElement("gameboy_shell")
    enableElement("showEmulator","display:block")
}
var showEmu = function(){
    enableElement("gameboy_shell","display:block;background-color: rgb(255, 0, 0)")
    disableElement("showEmulator")
}
var enableOnScreenButtons = function(){

    disableElement("show")
    enableElement("hide")
    enableElement("d_pad")
    enableElement("d_pad_up")
    enableElement("arrow_up")
    enableElement("d_pad_left_right")
    enableElement("d_pad_left")
    enableElement("arrow_left")
    enableElement("d_pad_right")
    enableElement("arrow_right")
    enableElement("d_pad_center")
    enableElement("d_pad_down")
    enableElement("arrow_down")
    enableElement("a_button_group")
    enableElement("b_button_group")
    enableElement("select_button_group")
    enableElement("start_button_group")
    
    document.getElementById("gameboy_shell").style.height = "275px"
}
var disableOnScreenButtons = function(){

    enableElement("show")
    disableElement("hide")
    disableElement("d_pad")
    disableElement("d_pad_up")
    disableElement("arrow_up")
    disableElement("d_pad_left_right")
    disableElement("d_pad_left")
    disableElement("arrow_left")
    disableElement("d_pad_right")
    disableElement("arrow_right")
    disableElement("d_pad_center")
    disableElement("d_pad_down")
    disableElement("arrow_down")
    disableElement("a_button_group")
    disableElement("b_button_group")
    disableElement("select_button_group")
    disableElement("start_button_group")
    
/*
    document.getElementById("show").style.display = ""
    document.getElementById("hide").style.display = "none"
    document.getElementById("d_pad").style.display = "none"
    document.getElementById("d_pad_up").style.display = "none"
    document.getElementById("arrow_up").style.display = "none"
    document.getElementById("d_pad_left_right").style.display = "none"
    document.getElementById("d_pad_left").style.display = "none"
    document.getElementById("arrow_left").style.display = "none"
    document.getElementById("d_pad_right").style.display = "none"
    document.getElementById("arrow_right").style.display = "none"
    document.getElementById("d_pad_center").style.display = "none"
    document.getElementById("d_pad_down").style.display = "none"
    document.getElementById("arrow_down").style.display = "none"
    document.getElementById("a_button_group").style.display = "none"
    document.getElementById("b_button_group").style.display = "none"
    document.getElementById("select_button_group" ).style.display = "none"
    document.getElementById("start_button_group").style.display = "none"*/
    document.getElementById("gameboy_shell").style.height = "110px"
}

    document.getElementById("show").style.display = "none"
    hideEmu()
var decode = function(){
document.getElementById("filename").innerHTML= document.getElementById("File").files[0].name
    /*if(localstoragesupported === true){
    var ROM = localStorage.getItem('ROM');
    if(ROM === null || ROM === undefined || hexout != ""){
        var bytes = hexout
        localStorage.setItem("ROM", bytes)
        console.log("saved to local storage")
    } else {
        hexout = ROM
        var bytes = ROM
        console.log("loaded from local storage")
    }} else {*/
        var ROM = hexout
        var bytes = ROM
        //console.log("loaded from local file, local storage overridden/not supported")
    //}
    var e = bytes.length
    var p = 0
    var i = e/2
    while(e >= 0){
        var counter = e/2 -1
        var b = e - 2
        var res = bytes.substr(b, e)
        byteArray[counter] = res.substr(0, 2)
        
if(counter===parseInt("2800B",16) && byteArray[counter]==="00"){
byteArray[counter] ="45"
}
e = b
    }
    var s = parseInt("24000", 16)
    var h = 0
    var hs = byteArray.length
    console.log(hs.toString(16))
    while (s != hs){
        startbank[h] = s.toString(16)
        s += parseInt("4000", 16)
        h += 1
        if(h >= 256){
            break
        }
    }
    renderbank(true)
    if(byteArray.length > parseInt(0x40000)){
var counter = byteArray.length-parseInt(0x40000)
var c= 0
		while(counter >= parseInt(0x4000)){
           document.getElementById("bankselect").innerHTML +="<option>"+(c+16).toString(16)+"</option>"
console.log("bleep")
counter -= parseInt(0x4000)
c+=1
        }

}
    tiles0=byteArray[parseInt("4E6F", 16)]
    tiles1=byteArray[parseInt("4E70", 16)]

    metatiles0=byteArray[parseInt("4E71", 16)] 
    metatiles1=byteArray[parseInt("4E72", 16)] 

    collision0=byteArray[parseInt("4E73", 16)] 
    collision1= byteArray[parseInt("4E74", 16)]	
    tilebank=byteArray[parseInt("4E6E", 16)]
}
var encode = function(output){
    var value = ""
    var bytes = hexout
    //byteArray[parseInt({address in hexidecimal}, 16) OR {address in base-10] = {replacement}
    //(base values) 4E6F	$6000	graphics
    byteArray[parseInt("4E6F", 16)]	= tiles0
    byteArray[parseInt("4E70", 16)] = tiles1

    //(base values) 4E71    $5280  	Metatile
    byteArray[parseInt("4E71", 16)] = metatiles0
    byteArray[parseInt("4E72", 16)] = metatiles1

    //(base values) 4E73    $4580   collision
    byteArray[parseInt("4E73", 16)] = collision0
    byteArray[parseInt("4E74", 16)]	= collision1
    byteArray[parseInt("4E6E", 16)] = tilebank
    if(localStorage.getItem("mapbank") != null){
        var mapp = localStorage.getItem("map")
        var map = mapp.split(",",260)
        var selected = parseInt(localStorage.getItem("mapbank"), 16)*16384
        var f = selected - 16384
        var e = 0
        var g = 0
        while(e <= 512){
            var h = f + e
            byteArray[h] = "00"
            var num = Math.floor(parseInt(map[g], 16)/4)
            if(num > 58){
                num = 58
            }
            num+=69
            byteArray[h+1] = num.toString(16)
            e += 2
            g += 1
            }
            e = 0
            while(e <= 256){
            var h = f + e + 512
            byteArray[h] = "00"
            e += 1
            }
            e = 0
        while(e <= 512){
            var h = f + e + 512 + 256
            byteArray[h] = "00"
            byteArray[h+1] = "00"
            e += 2
            }
            e = 1280
            var h = f + e //+ 512 + 256 + 512
            g = 0
            console.log(h)
                while(g != 58){
                    var chunk = localStorage.getItem("chunk"+g+"").split(",", 512)
                    var i = 0
                    while (i != 256){
                        var b = g*256
                        byteArray[i+h+b] = chunk[i]
                        i += 1
                        e += 1
                    }
                    g += 1
                    console.log(""+g+","+e+"")
                }
            
        }
    var i = 0
    while(i <= bytes.length){
        value += ""+byteArray[i]+""
        i += 1
    }
    /*
    if(localstoragesupported === true){
    localStorage.setItem("ROM", ""+value+"")
    console.log("saved output to local storage")
    }*/
    var saver = Converter.stringHexadecimalToBytes(value)
    var m = byteArray.length
    var w = []
    var v = 0
    while(v <= m){
        w[v] = saver[v]
        v += 1
    }
    console.log("encoding complete")
    if(output === true){
    save(w, true)} else if(output === false){
    return save(w)
    }
}
main();
document.getElementById("encode").addEventListener("click", function(e){
    if (e.button === 0){
    encode(true)}
})
document.getElementById("tileset").addEventListener("change", function() {
    loadtileset()
})
document.getElementById("bankselect").addEventListener("change", function() {
    renderbank(false)

})
 var closeFilePane=function() {
disableElement("file manager")
enableElement("openFilePane","position: absolute; top: 40px; left: 50px;")
}
var openFilePane=function() {
disableElement("openFilePane")
enableElement("file manager", "position: absolute; top: 40px; left: 50px; border: 1px solid #000000; width: 329px; height: 220px;")
}
var closeObjectPane=function() {
disableElement("object manager")
enableElement("openObjectPane","position: absolute; left: 50px; top: 280px")
disableElement("OBJData")
enableElement("viewDat")
}
var openObjectPane=function() {
disableElement("openObjectPane")
enableElement("object manager","position: absolute; left: 50px; top: 280px; border: 1px solid #000000; width: 286px; height: 350px")
}
var closeTilesetPane=function() {
disableElement("tileset manager")
enableElement("openTilesetPane","position:absolute; top: 40px; right: 50px;")
}
var openTilesetPane=function() {
disableElement("openTilesetPane")
enableElement("tileset manager","position:absolute; top: 40px; right: 50px;border: 1px solid #000000; width: 260px; height: 465px")
}
document.getElementById("objselect").onchange = function(){
disableElement("OBJData")
enableElement("viewDat")
disableElement("object manager")
enableElement("object manager","position: absolute; left: 50px; top: 280px; border: 1px solid #000000; width: 286px; height: 425px")

}
