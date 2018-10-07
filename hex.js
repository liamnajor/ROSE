// main
var hexout
function main()
{
	var session = new Session([]);

	Globals.Instance.initialize(session);
}

// extensions

function StringExtensions()
{
	// extension class
}
{
	String.prototype.padLeft = function(lengthToPadTo, charToPadWith)
	{
		var thisPadded = this;

		while (thisPadded.length < lengthToPadTo)
		{
			thisPadded = 
				charToPadWith + thisPadded;
		}

		return thisPadded;
	}
}

// classes

function Converter()
{
	// static class
}
{

	Converter.bytesToStringHexadecimal = function(bytes)
	{
		var returnValue = "";

		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			var byteAsStringHexadecimal = 
				byte.toString(16).padLeft(2, '0');

			returnValue += byteAsStringHexadecimal;
		}

		return returnValue;
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
}

function Globals()
{
	// do nothing
}
{
	Globals.Instance = new Globals();
	
	Globals.prototype.initialize = function(session)
	{
		this.session = session;
		this.session.domElementUpdate();
	}
}

function Session(bytes)
{
	this.bytes = bytes;
	this.finalNibble = "";
}
{
	// dom

	Session.prototype.domElementUpdate = function()
	{
		if (this.domElement == null)
		{
			var divSession = document.createElement("div");
			var divFileOperations = document.createElement("div");
            divFileOperations.id = "div"
		
			var inputFileToLoad = document.createElement("input");
			inputFileToLoad.type = "file";
            inputFileToLoad.id = "File"
			inputFileToLoad.onchange = this.inputFileToLoad_Changed.bind(this);
			divFileOperations.appendChild(inputFileToLoad);
			divSession.appendChild(divFileOperations);

			var divCursor = document.createElement("div");
			
			var divMain = document.getElementById("divMain");
			divMain.appendChild(divSession);

			this.domElement = divSession;
		}

		var bytesAsStringHexadecimal = Converter.bytesToStringHexadecimal
		(
			this.bytes
		);
		hexout = bytesAsStringHexadecimal + this.finalNibble;
    }

	// events


	Session.prototype.inputFileToLoad_Changed = function(event)
	{
		var inputFileToLoad = event.target;
		var fileToLoad = inputFileToLoad.files[0];
		if (fileToLoad != null)
		{
	  		var fileReader = new FileReader();
			fileReader.onload = this.inputFileToLoad_Changed_Loaded.bind(this); 
	   		fileReader.readAsBinaryString(fileToLoad);
		}
	}

	Session.prototype.inputFileToLoad_Changed_Loaded = function(fileLoadedEvent) 
	{
		var dataAsBinaryString = fileLoadedEvent.target.result;

		this.bytes = [];

		for (var i = 0; i < dataAsBinaryString.length; i++)
		{
			var byte = dataAsBinaryString.charCodeAt(i);
			this.bytes.push(byte);
		}

		this.domElementUpdate();
	}

}
