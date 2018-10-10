var c = []
var output
var Converter = {}
function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
Converter.stringHexadecimalToBytes = function(stringHexadecimal)
	{
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
        return dataAsBlob
        }
    var stringload = function(){
    var ROM = localStorage.getItem('ROM');
    var bytes = ROM
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
    output = ""+q+""
    var r = c.length - 147456 
    var z = r / 16383
    var y = ""+z+""
    var b = y.split(".")
    var value = ""
    var str =  output
    var e = str.split(" ");
    var d = 1
    var j = ""
    while (d <= e.length){
        j += ""+e[d]+""
        d += 2
    }
    c = j.split(",")
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
    var blobby = blobToFile(save(w), "m2.gb")
    
    FileLoad(blobby)
}
/*	gameboy.memoryWriter[parseInt(""+address+"", 16)](gameboy, parseInt(""+address+"", 16), parseInt(""+valstring+"", 16))

	gameboy.memoryReader[parseInt(""+address+"", 16)](gameboy, parseInt(""+address+"", 16))*/
