var h = false
//var output
var Con = {}
var frames = 0
var tick = new CustomEvent('tick')

        setInterval(function(){
        window.dispatchEvent(tick)
        frames += 1
        }, 1000/100)

window.addEventListener("tick", function(){
    
    if(frames >= 5 && h === true){
        memory.write("FF9B", "c")
        h = false
    }
})

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

Con.stringHexadecimalToBytes = function(string)
	{
		var returnValues = [];

		var nibblesForByteCurrent = [];

		for (i = 0; i < string.length; i++)
		{
			var charForNibble = string[i];
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

    var stringload = function(e){
    	
    	var blobby = encode(false)
    	FileLoad(blobby)
        h = true
    }
 var memory = {
        write:function(address, valstring){
	gameboy.memoryWriter[parseInt(""+address+"", 16)](gameboy, parseInt(""+address+"", 16), parseInt(""+valstring+"", 16))},
        read:function(address){
	gameboy.memoryReader[parseInt(""+address+"", 16)](gameboy, parseInt(""+address+"", 16))}}
