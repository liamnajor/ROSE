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
    var ROM = localStorage.getItem('ROM');
    if(ROM === null || ROM === undefined || document.getElementById("Bytes").value != ""){
        var bytes = document.getElementById("Bytes").value
        localStorage.setItem("ROM", bytes)
        console.log("saved to local storage")
    } else {
        document.getElementById("Bytes").value = ROM
        var bytes = document.getElementById("Bytes").value
    }
    localStorage.setItem("playROM", "")
    var e = bytes.length
    var p = 0
    var i = e/2
    var g = 0, d = 0, a = 0, x = 0, h = 0, w = 0, f = ""
    while(d <= i){
        if (g === 16){
            g = 0
            a += 1
        }
        if (a === 16){
            a = 0
            x += 1
        }
        if (x === 16){
            x = 0
            h += 1
        }
        if (h === 16){
            h = 0
            w += 1
        }
        f += "0x"+w.toString(16)+""+h.toString(16)+""+x.toString(16)+""+a.toString(16)+""+g.toString(16)+""
        d += 16
        g += 16
    }
    while(e >= 0){
        var counter = e/2 -1
        var b = e - 2
        var res = bytes.substr(b, e)
        c[counter] = res.substr(0, 2)
        e = b
    }
    var t = c.length
    var k = 0
    var j = 0
    var q = ""
    while(t >= 16){
        var u = j + 14
        var n = f.substr(j, u)
        var z = n.substr(0, 7)
        q += ""+z+" "
        var l = k + 15
        j += 7
        while(l >= k){
            q += ""+c[k]+","
            k += 1
        }
        q += " "
        t -= 16
    }
    hex = q
    var r = c.length - 147456 
    var z = r / 16383
    var y = ""+z+""
    var b = y.split(".")
    renderbank()
}
var encode = function(){
    var value = ""
    var bytes = document.getElementById("Bytes").value
    /*var str = ""+hex+""
    var e = str.split(" ");
    var d = 1
    var j = ""
    while (d <= e.length){
        j += ""+e[d]+""
        d += 2
    }
    c = j.split(",")*/
    //c[parseInt({address in hexidecimal}, 16) OR {address in base-10] = {replacement}
    var i = 0
    while(i <= bytes.length){
        value += ""+c[i]+""
        i += 1
    }
    var saver = Converter.stringHexadecimalToBytes(value)
    c = saver
    var m = 262143
    var w = []
    var v = 0
    while(v <= m){
        w[v] = saver[v]
        v += 1
    }
    save(w)
    window.alert("encoding complete")
}
main();
