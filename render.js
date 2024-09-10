var drawObj=function(ctx,x,y,type){
ctx.beginPath()
ctx.lineWidth = 3;
ctx.strokeStyle = 'red';
ctx.rect(x,y,16,16)
ctx.font = "12px Arial";
ctx.fillStyle = 'orange';
ctx.fillText(""+type+"", x+1, y+12);
ctx.stroke()
}
var captureMode = false
var borderX=0
var borderY=0
/*
<option value="00">[0,0,0,0]Free Scroll</option>
<option value="01">[0,1,0,0]Stop Scrolling Right</option>
<option value="02">[0,0,0,1]Stop Scrolling Left</option>
<option value="03">[0,1,0,1]Shaft</option>
<option value="04">[0,0,1,0]Stop Scrolling Up</option>
<option value="05">[0,1,1,0]Stop Scrolling Up Right Corner</option>
<option value="06">[0,0,1,1]Stop Scrolling Up Left Corner</option>
<option value="07">[0,1,1,1]Shaft End Up</option>
<option value="08">[1,0,0,0]Stop Scrolling Down</option>
<option value="09">[1,1,0,0]Stop Scrolling Down Right</option>
<option value="0a">[0,1,0,1]Stop Scrolling Down Left</option>
<option value="0b">[1,1,0,1]Shaft End Down</option>
<option value="0c">[1,0,1,0]hallway</option>
<option value="0d">[1,1,1,0]hallway end right</option>
<option value="0e">[1,0,1,1]hallway end left</option>
<option value="0f">[1,1,1,1]no scroll</option> [down,right,up,left]
*/ 
var scrollMask = [
[0,0,0,0],//free scroll
[0,0,1,0],//stop right
[1,0,0,0],//stop left
[1,0,1,0],//shaft
[0,0,0,1],//stop up
[0,0,1,1],//stop up right
[1,0,0,1],//stop up left
[1,0,1,1],//shaft end up
[0,1,0,0],//stop down
[0,1,1,0],//stop down right
[1,1,0,0],//stop down left
[1,1,1,0],//shaft end down
[0,1,0,1],//hall
[0,1,1,1],//hall end right
[1,1,0,1],//hall end left
[1,1,1,1]//no scroll
]
var prevXOffset = 0
var prevYOffset = 0
var drawSquare = function(ctx, x, y, xOffset, yOffset, width, height, color, faces){
	    if(!color){var color = 'red';}
	    if(!faces){
	        var faces = [1,1,1,1]
	    }
	    ctx.strokeStyle  = color
	    //if(document.getElementById("roomedit").width/256 <= 16 || document.getElementById("roomedit").height/256 <= 16){
	    ctx.beginPath();
	    ctx.moveTo((x)+xOffset,(y)+yOffset);//move to single pixel offset from origin
        if(faces[0]===1){
        ctx.lineTo((x)+xOffset,(y+(height))+yOffset);//line down from left
        ctx.stroke();
        } 
        ctx.moveTo((x)+xOffset,(y+(height))+yOffset);//move to end position
        if(faces[1]===1){
        ctx.lineTo((x+(width))+xOffset,(y+(height))+yOffset);//line right from bottom left
        ctx.stroke();
        }
        ctx.moveTo((x+(width))+xOffset,(y+(height))+yOffset);//move to end position
        if(faces[2]===1){
        ctx.lineTo((x+(width))+xOffset,(y)+yOffset);//line up from bottom right
        ctx.stroke();
        } 
        ctx.moveTo((x+(width))+xOffset,(y)+yOffset)//move to  end position
	    if(faces[3]===1){
        ctx.lineTo((x)+xOffset,(y)+yOffset);//line left from top right
        ctx.stroke();
        }
        }
        var appendData = function(e, divisor){
        if(!divisor){
            var divisor = 16
            selectedChunk = parseInt(""+Math.floor(e.offsetY/divisor).toString(16)+""+Math.floor(e.offsetX/divisor).toString(16)+"",16)
            var currentChunk = selectedChunk
            subSelectedChunk = 0
        } else {
            drawSquare(document.getElementById("roomedit").getContext("2d"),(Math.floor(e.offsetX/divisor)*256)+1,(Math.floor(e.offsetY/divisor)*256)+1,0,0,255,255)
            
	    borderX =Math.floor(e.offsetX/divisor)*256
	    borderY =Math.floor(e.offsetY/divisor)*256
            subSelectedChunk =  parseInt(""+Math.floor(e.offsetY/divisor).toString(16)+""+Math.floor(e.offsetX/divisor).toString(16)+"",16)
            var currentChunk = selectedChunk + subSelectedChunk
        }
        while(currentChunk > 255){
        currentChunk -= 256}
	    roomTransition = 'ff'
        pointertext = document.getElementById("pointers")
        scrollSelect = document.querySelector("#scroll")
        transtext = document.getElementById("rtransition")
        epointertext = document.getElementById("enemy-dat")
        pointertext.value = pointers[currentChunk]
        transtext.value = room_transitions[currentChunk]
        scrollSelect.value = scroll[currentChunk]
        epointertext.value = epointers[document.getElementById("bankselect").selectedIndex][currentChunk]
        
    
	    }
var addFile = function(src,type){
var jsonData = []
var file = document.createElement("script")
file.src=src
file.type=type
file.id="data identifier "+jsonData.length+""
document.body.appendChild(file)
if(type==="application/json"){
console.log(document.getElementById("data identifier "+jsonData.length+""))
    jsonData[jsonData.length]=JSON.parse(document.getElementById("data identifier "+jsonData.length+"").innerHTML)
}
}
var renderedChunks = []
var roomTransitionOffset=0
var added = false
var placedBlocks = []
var scrolls=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f",]
var offsetLog = []
    var placeBlock = function(ctx, x, y, tile){
        var edittile = true
        var xOffset = Math.floor(x/256)//xOffset and yOffset are in screens
        var yOffset = Math.floor(y/256)
        var chunkOffset = xOffset + (yOffset * 16)
        var currentChunk = selectedChunk + chunkOffset
        while(currentChunk > 255){
        currentChunk -= 256}
        var x = Math.floor(x/16)-(xOffset*16)//x and y coordinate position of tile, in tiles (16x16 pixels)
        var y = Math.floor(y/16)-(yOffset*16)
        var pos = parseInt(""+y.toString(16)+""+x.toString(16)+"", 16)//parse tile position
        //console.log(""+xOffset+","+yOffset+","+x+","+y+","+chunkOffset+","+selectedChunk+","+currentChunk+"")
        //offsetLog[offsetLog.length]=[xOffset,yOffset,x,y,currentChunk]
        var pointer = ""+parseInt(chunks[parseInt(pointers[currentChunk], 16)-parseInt("45", 16)].pointer+"00", 16)//get chunk pointer
        pointer -= parseInt("4000", 16)//jump to pointer relative position
        pointer += parseInt(startbank[document.getElementById("bankselect").selectedIndex], 16)//jump to start of selected bank
        pointer += pos//add tile position
        if(!tile){//checks for selected tile, if not, skip writing to the byte array or (?) editing the minimap tiles, and grabs the tile already present at the selected location
        edittile = false
        var tile =chunks[parseInt(pointers[currentChunk], 16)-parseInt("45", 16)].chunk[pos]}
        if(edittile === true){
            byteArray[pointer] = tile
            chunks[parseInt(pointers[currentChunk], 16)-parseInt("45", 16)].chunk[pos] = tile
            var i = selectedChunk + ((document.getElementById("roomedit").height/256)*16) + document.getElementById("roomedit").width/256
            if(i > 256){i = 255}
    /*while(i != selectedChunk){
        if(renderedChunks[i]=== pointers[currentChunk]){
            var y = Math.floor(i/16)
            var x = i-y
            renderCurrentScreen(x,y)
        }
        i-=1
    }*/
            }
        var xpos = parseInt(tile.substr(1, 2), 16)*16//xpos and ypos are tileset positions for selected tile
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = (x*16)+(xOffset*256)
        var yclear = (y*16)+(yOffset*256)
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
    }
/*var addBytes = function(bytes, start){
var counter = 0
var bytesString = bytes
bytes = bytesString.split(" ")
while(counter != bytes.length){
byteArray[parseInt(start)]=bytes[counter]
counter += 1
}
}*/
var expandedROM = false
var expandROM = function(){
if(expandedROM === false){
/*

Moehr code begin


//Edit @0148:
//a hex edit to the header cart size 04 (512) to accomodate the extra banks
addBytes("04",0x148)

//;hijack @3DE2:
addBytes("CD 60 3F C9 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF",0x3D02)

//;new code @3F60
//;table:
//;must have as many entries as you have level data banks
//;or will allow loading of bad data from random opcode values
addBytes("10 11 12 13 14 15 16",0x3F60)
//;opcodes for code below
addBytes("FA 58 D0 D6 09 5F 16 00 21 7f 3f 19 7E EA 4E D0 EA 00 21 CD 00 40 3E 02 EA 4E D0 EA 00 21 C9",0x3F67)

//;then lastly, paste all of bank 3 to bank 10, 11, 12, 13, 14, 15, 16
//quick and dirty. REALLY dirty.
addbank(1,2)//10
addbank(1,2)//11
addbank(1,2)//12
addbank(1,2)//13
addbank(1,2)//14
addbank(1,2)//15
addbank(1,2)//16
addbank(1,15)//17
addbank(1,15)//18
addbank(1,15)//19
addbank(1,15)//1A
addbank(1,15)//1B
addbank(1,15)//1C
addbank(1,15)//1D
addbank(1,15)//1E*/
addbank(1)
expandedROM === true
} else {
addbank(1)}}

var startbank = ["24000","28000","2C000","30000","34000","38000","3C000"]
var imageDatas = []
var prevTileset
var drawChunkImageData = function(ctx,imageDatas){
var c = 0
for (let y = 0; y != 16; y += 1) {
for (let x = 0; x != 16; x += 1) {
var data = new ImageData(imageDatas[parseInt(pointers[c],16)-parseInt("45",16)], 16)
ctx.putImageData(data, x*16, y*16)
c += 1
}
}
drawgrid(document.getElementById("edit").getContext("2d"))
}
arrayGenerated = false
var tilectx = document.getElementById("tilesetimage").getContext("2d")
var drawgrid = function(ctx, style){
        if(style != undefined||style != null){
           ctx.strokeStyle = style;
        } else {
	   ctx.strokeStyle = "white";
        }
        var x = 0
        while(x != 272){
            ctx.beginPath();
            ctx.moveTo(0,x);
            ctx.lineTo(256,x);
            ctx.stroke();
            x += 16
        }
        x = 0
        while(x != 272){
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,256);
            ctx.stroke();
            x += 16
        }
    }
var fileChange = false
var totalbanksadded = 0
var pointers = []
var epointers = []
var room_transitions = []
var scroll = []
var chunks = []
var selectedChunk
var subSelectedChunk
var prevbank
var tile
var imagetileset
var tiles0 = "00"
var tiles1 = "60"
var metatiles0 = "80"
var metatiles1 = "52"
var collision0 = "80"
var collision1 = "45"
var tilebank = "07"
var samus
var obj
var objnums = []
var k = 0
/*function stringTo8BitBinary(inputString) {
    let binaryResult = '';
    for (let i = 0; i < inputString.length; i++) {
        let charCode = inputString.charCodeAt(i);
        binaryResult += charCode.toString(2).padStart(8, '0');
    }
    return binaryResult;
}*/
var select = document.getElementById("tileset")

function B16toBinary(hexidecimalNumber) {
    
    return  parseInt(hexidecimalNumber,16).toString(2).padStart(8, '0');
}
var tilesetData=[]
var appendPointers=function(){
tilesetData=[]
graphicsData[select.selectedIndex][1]=parseInt(document.getElementById("metatilePointers").value,16)
graphicsData[select.selectedIndex][0]=parseInt(document.getElementById("graphicsPointers").value,16)

}
var changeTileset = function(tile){
document.getElementById("tilesetName").innerHTML = graphicsData[select.selectedIndex][2]
document.getElementById("metatilePointers").value=graphicsData[select.selectedIndex][1].toString(16)
document.getElementById("graphicsPointers").value=graphicsData[select.selectedIndex][0].toString(16)
    var ctx = document.getElementById("tilesetimage").getContext("2d")
    //ctx.drawImage(tile, 0, 0)
    generateTileset(graphicsData[select.selectedIndex][1],graphicsData[select.selectedIndex][0],graphicsData[select.selectedIndex][3],ctx)
}

    var generateTileset = function(metatileOffset,graphicsOffset,spriteOffset,ctx){
    var bitValues=[0,255,170,85]
    //relative position variables
    var x = 0
    var y = 0
    //tile counter
    var tiles = 0
    
    var canvas = document.getElementById("tilesetimage")
    if (tilesetData[select.selectedIndex] === undefined||tilesetData[select.selectedIndex] === 0){
    var imageData=new Uint8ClampedArray(canvas.width*canvas.height*4)
    while(tiles!=512){
    var iterate = function(){
    //calculate index offset
    var indexByte=parseInt(byteArray[metatileOffset+tiles],16)
        graphicsOffset=graphicsData[select.selectedIndex][0]
        metatileOffset=graphicsData[select.selectedIndex][1]
        spriteOffset=graphicsData[select.selectedIndex][3]
    //load sprite graphics
    if(indexByte > parseInt("B0",16) && indexByte < parseInt("EF",16) && spriteOffset!=undefined){
        //indexByte=parseInt(byteArray[graphicsData[select.selectedIndex][3]+tiles],16)//extra graphics, 1B520
        graphicsOffset=spriteOffset
        indexByte-=parseInt("B0",16)
    }
    var bitnumy=0
    while(bitnumy<8){
    //grab 2 bytes to join together
    var byte=byteArray[graphicsOffset+(indexByte*16)+(bitnumy*2)]
    var byte2=byteArray[graphicsOffset+(indexByte*16)+(bitnumy*2)+1]
    //convert to bits
    var bits2=B16toBinary(byte).split("")
    var bits=B16toBinary(byte2).split("")
    var bitnumx=0
    while(bitnumx<8){
    //join the bits
    var dualBit=parseInt(""+bits[bitnumx]+""+bits2[bitnumx]+"",2)
    //calculate offset
    var offset = (x*32)+(bitnumx*4)+(y*canvas.width*32)+(bitnumy*(canvas.width*4))
    //multiply bit values into RGBA Array
    if(indexByte > parseInt("Ef",16)){
    imageData[offset]=0
    imageData[offset+1]=0
    imageData[offset+2]=0
    imageData[offset+3]=255
    } else {
    imageData[offset]=bitValues[dualBit]
    imageData[offset+1]=bitValues[dualBit]
    imageData[offset+2]=bitValues[dualBit]
    imageData[offset+3]=255
    } 
    bitnumx+=1}
    
    bitnumy+=1}}
    
    //top left tile
    iterate()
    x += 1
    
    tiles += 1
    //top right tile
    iterate()
    x-=1
    y+=1
    tiles += 1
    //bottom left tile
    iterate()
    x += 1
    
    tiles += 1
    //bottom right tile
    iterate()
    x+=1
    y-=1
    tiles += 1
    if(x >= 32){
    x=0
    y+=2
    }
    }
    var data=new ImageData(imageData, canvas.width, canvas.height)
    ctx.putImageData(data,0,0)
    tilesetData[select.selectedIndex]=data} else {
    ctx.putImageData(tilesetData[select.selectedIndex],0,0)
    }
    //return imageData
    }
var loadImages = function(){
    var samusimg = new Image(16, 32);
    samusimg.src = "Object Sprites/samus.png"
    samus = samusimg
    //var select = document.getElementById("tileset")
    //var tileset = new Image(256, 128);
    //tileset.putImageData=generateTileSet(metatileOffset,graphicsOffset)
    //var selected = select.selectedIndex+9
    //tileset.src = "Tilesets/"+selectedChunk.toString(16)+".png";
    //tileset.putImageData(generateTileset(graphicsData[select.selectedIndex][1],graphicsData[select.selectedIndex][0]))
}
var renderCurrentScreen = function(xOffset,yOffset){

        var renderer = roomedit.getContext("2d")
//xOffset+= Math.floor(document.getElementById("roomedit").width/512)
//xOffset += 2
var chunkOffset = xOffset+(yOffset*16)
        var currentChunk = selectedChunk+chunkOffset
        objnums[currentChunk] =0
        while(currentChunk > 255){
        currentChunk -= 256}
//console.log(""+xOffset+","+yOffset+","+chunkOffset+","+Math.floor(document.getElementById("roomedit").width/512)+"")
disableElement("OBJData")
enableElement("viewDat")
disableElement("object manager")
enableElement("object manager",OBJManagerStyle)
        var i = 0
//start drawing loop, for 256 tiles
        while(i < 256){
//xpos and ypos are the tiles position on the coordinate plane, which can be determined with simple iterative subtraction
        var xpos = i
        var ypos = 0
        while(xpos >= 16){
            xpos -= 16
            ypos += 1
        }        
//draw the processed tile at the processed position
placeBlock(renderer,(xpos*16)+(xOffset*256),(ypos*16)+(yOffset*256))//xpos and ypos are in tiles, and offset x and y are in screens (16x16 tiles)


//renderer.drawImage(imagetileset,tilex*16,tiley*16,16,16,xpos*16,ypos*16,16,16)
        i += 1
        }
        
        var pos = currentChunk.toString(16)
        var bank = document.getElementById("bankselect").selectedIndex + 9
        checkSpawn(pos, xOffset, yOffset)    
        var loc = epointers[document.getElementById("bankselect").selectedIndex][parseInt(pos,16)]//loc = pointer string
        //console.log(loc)
        var byte1 = loc.substr(2, 4)
        //byte 1 (e) is the first byte of a 2 byte pointer, and temporary placeholder for the second byte
        var byte2 = parseInt(byte1, 16)
        //byte 2 (d) is the second byte of the pointer, parsed from the temporary bufer value byte 1
        byte2 += parseInt("80", 16)//add offset of 0x80
        byte1 = loc.substr(0, 2)//clear buffer of byte 2 by overwriting it with byte 1
        var loc = parseInt(""+byte2.toString(16)+""+byte1+"", 16)//byte 1 is already a string, so no need to... stringify? I guess?
        //M2 enemy format: ID,type,x,y, 4 bytes
        byte1 = 0
        byte2 = 0
        var ctx = roomedit.getContext("2d")
        while(byte1 != 4){
            var p = byte2*4//p = pointer
            var x = p+2
            //at least x and y make sense...they are positions, meaning P is the pointer. ID = Pointer(+0, right at the pointed offset) and type = pointer+1  
            var y = p+3
            var t = p+1//t = type
            if(byte1 === 0){
                if(byteArray[loc + p] != 'ff'){//check for terminating operator at pointer location
                    byte1 = 2
                } else {
                    byte1 = 4
                }
            }
            if(byte1 === 2){
                drawObj(ctx,parseInt(byteArray[loc + x], 16)+(xOffset*256), parseInt(byteArray[loc + y], 16)+(yOffset*256), byteArray[loc + p])
                objnums[currentChunk] += 1
                byte2 += 1
                byte1 = 0
            }
        }
    }
    var renderCurrentScreens=function(width,height,chunkSelect){
    renderedChunks = []
    //get width and height of viewport in screens
    if(width===undefined){
        var width=Math.floor(document.getElementById("roomedit").width/256)
    } else if(document.getElementById("roomedit").width < width*256){
         document.getElementById("roomedit").width = width*256
    }
    if(height===undefined){
        var height=Math.floor(document.getElementById("roomedit").height/256)
    } else if(document.getElementById("roomedit").height < height*256){
         document.getElementById("roomedit").height = height*256
    }
    var x = width-1
    var y = height-1
    while(x > -1){
        while(y > -1){
            if(!chunkSelect){
               renderCurrentScreen(x,y)
            } else {
               renderCurrentScreen(x,y, chunkSelect)}
            
            y-=1
        }
        y=height-1
        x-=1
    }
  var x = width
    var y = height
    while(x > -1){
        while(y > -1){  
drawSquare(document.getElementById("roomedit").getContext("2d"),x*256,y*256,0,0,254,254,"green",scrollMask[parseInt(scroll[selectedChunk + (x + (y*16))],16)])
y-=1
        }
        y=height
        x-=1
    }
    }
var renderbank = function(addEventListeners){
    var input = document.getElementById("bankselect") //select element, loads a bank
    var canvas = document.getElementById("edit")
    var ctx = canvas.getContext("2d")
    var roomedit = document.getElementById("roomedit")
    var tileset = document.getElementById("tilesetimage")
    if(added != true && addEventListeners === true){
added = true
        tileset.addEventListener("mousedown", function(e){
        var tilesetOverlay=document.getElementById("tilesetOverlay")    
        if(document.getElementById("tilesetOverlay")===null){
            var tilesetOverlayElement = document.createElement("canvas")
            tilesetOverlayElement.id="tilesetOverlay"
            tilesetOverlayElement.width=18
            tilesetOverlayElement.height=18
            tilesetOverlayElement.style="display:none;"
            document.getElementById("tileset manager").appendChild(tilesetOverlayElement)
            tilesetOverlay=document.getElementById("tilesetOverlay")
            var contx = tilesetOverlay.getContext("2d")
            contx.strokeStyle = 'red';
            contx.beginPath();
            contx.moveTo(0,0);
            contx.lineTo(0,18);
            contx.stroke();
            contx.lineTo(18,18);
            contx.stroke();
            contx.lineTo(18,0);
            contx.stroke();
            contx.lineTo(0,0);
            contx.stroke();
        }
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        tile = bank
        //imagetileset.getContext("2d").clearRect(0, 0, 256, 256);
        changeTileset(imagetileset)
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        y += 40
        x += 5
        tilesetOverlay.style="position:absolute;top:"+y+"px;left:"+x+"px;z-index:10"
        
    })
    roomedit.addEventListener("contextmenu",function(event){
        if(captureMode === false){
        event.preventDefault()
        }
    },false);
    roomedit.addEventListener("mousedown", function(e){
        if(e.buttons === 1){
        if(document.getElementById("mode").selectedIndex === 1){
        
        //var ctx = this.getContext("2d")
        var ID = document.getElementById("OBJID").value
        var ox = Math.floor(e.offsetX/256)
        var oy = Math.floor(e.offsetY/256)//object offset from base chunk
        //var offset = ox + (oy*16)
        var currentChunk = selectedChunk+(ox + (oy*16))//+offset
        //if(ox === 0 && oy === 0 || subSelectedChunk === (ox+(oy*16))){
        var x = e.offsetX-(ox*256)
        var y = e.offsetY-(oy*256)//object position on screen, in pixels
        var sy = Math.floor(y/16)*16
        var sx = Math.floor(x/16)*16//object position on screen, in pixels, normalized
        var type = objectList[document.getElementById("OBJType").selectedIndex][0]
        
        /*var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[p] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        p += 1
        //add 8 to second byte to get actual enemy location(pointers are little-endian)*/
        var selection = (document.getElementById("bankselect").selectedIndex*512)+(currentChunk*2)
        var locp = parseInt("C2E0", 16)+selection
        var loc = parseInt(""+(parseInt(byteArray[locp+1],16)+128).toString(16)+""+byteArray[locp]+"",16)
        var loc1 = parseInt(""+(parseInt(byteArray[locp+3],16)+128).toString(16)+""+byteArray[locp+2]+"",16)
        //var loc2 = parseInt(""+(parseInt(byteArray[locp+5],16)+128).toString(16)+""+byteArray[locp+4]+"",16)
        //var loc3 = parseInt(""+(parseInt(byteArray[locp+7],16)+128).toString(16)+""+byteArray[locp+6]+"",16)
        //console.log(""+loc.toString(16)+" "+loc1.toString(16)+" "+loc2.toString(16)+" "+loc3.toString(16)+"")
        if(objnums[currentChunk] <= 15){
            //drawObj(ctx,sx, sy, type)
        var num = objnums[currentChunk]*4
        
        //string formatting corrrection. who knew that javascript does not act like z80 binary.
        //y
        if(sy < 15){
            sy = "0"+sy.toString(16)+""
        } else {
            sy =  sy.toString(16)
        }
        //x
        if(sx < 15){
            sx = "0"+sx.toString(16)+""
        } else {
            
            sx = sx.toString(16)
        }
        
        if(type < 15){
            type = "0"+type.toString(16)+""
        } else {
            type =  type.toString(16)
        }
        //0xFDAD-0xFFFF - Free Space
        //check nearest neigbor enemy data pointer for overlap
        if(byteArray[loc+num+1] === 'ff'){
        console.error("object list allocation exceeded")
        /*if(document.getElementById("repointMode").checked === true){
        console.log("creating new list in free space at 0xE244-0xE2FF and 0xFDAD-0XFFFF")
            var t = parseInt("E2FF",16)
            if(byteArray[t]!="00"){console.log("???")}
            while(byteArray[t]!="00" && t < 46){//1st free space:0xE2FF-0xE244=187, 187/4=46.75 
                t += 1
            }
            if(t>46){
                t = parseInt("FDAD",16)
                while(byteArray[t]!='00' && t < 198){//2nd free space 0xFFFF-0xFDAD=594, 594/4=198
                    t += 1
                }
                if(t > 198){
                    window.alert("You have completely filled the ROM with objects as it is currently allocated")
                }
            }
            var loct=t.toString(16)
            loc=t
            var i = 0
            while(i!=64){
                byteArray[loc+i]='ff'
                i+=1
            }
            var a = parseInt(loct.substr(2,2),16)
            var b = parseInt(loct.substr(0,2),16)-parseInt("80",16)
            objnums[selectedChunk] = 0
            epointers[document.getElementById("bankselect").selectedIndex][selectedChunk]=""+a.toString(16)+""+b.toString(16)+""
            byteArray[locp+2] = a.toString(16)
            byteArray[locp+3] = b.toString(16)
            }*/
        } else {
        console.log("within range of pointed list")
        /*var selection = input.selectedIndex*512
        var locp = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[p] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        p += 1*/
        //append data to bytearray
        byteArray[loc+num] = ID
        byteArray[loc+num+1] = type
        byteArray[loc+num+2] = sx
        byteArray[loc+num+3] = sy
        byteArray[loc+num+4] = 'ff'
        objnums[currentChunk] += 1
        renderCurrentScreens()
        drawObj(document.getElementById("roomedit").getContext("2d"),parseInt(sx,16)+(ox*256),parseInt(sy,16)+(oy*256), parseInt(type,16))
        //console.log(""+ID+" "+x+" "+y+" "+sx+" "+sy+" "+type+" "+loc.toString(16)+"")
        }
        } else {
        console.error("16 objects max per screen, and that's pushing it in this engine")
        }
    
        //} else {
        //console.error("Editing objects outside the selected zone is not yet supported. Working on it.")
        //}
        
    } else if(document.getElementById("mode").selectedIndex === 2){
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        spawn(sx,sy)
        //renderCurrentScreens()
    } else {
        console.log("unimplemented")
    }
    } else if(e.buttons === 2){
    renderCurrentScreens()
    appendData(e,256)
    }
    })
    roomedit.addEventListener("mousemove", function(e){

    if(e.buttons === 1){
        if(document.getElementById("mode").selectedIndex === 0){
            placeBlock(document.getElementById("roomedit").getContext("2d"),e.offsetX,e.offsetY,tile)//,chunkOffset,screenOffsetX,screenOffsetY,true)
            }
        }
    })
    
    roomedit.addEventListener("mouseup", function(e){
    if(e.button === 0){
        renderCurrentScreens()
        }
        var y = Math.floor((selectedChunk + subSelectedChunk)/16)
        var x = (selectedChunk + subSelectedChunk)-y
        drawSquare(document.getElementById("roomedit").getContext("2d"),borderX+1,borderY+1,0,0,255,255)
    })
    var roomTransition = 'ff'
        var pointertext = document.getElementById("pointers")
        var scrollSelect = document.querySelector("#scroll")
        var transtext = document.getElementById("rtransition")
        var bank = 0
        var epointertext = document.getElementById("enemy-dat")
        
    	    
    canvas.addEventListener("mousedown", function(e){
    
	var simplePalette = [0,255,127]
var array = []
for(let e = 0; e!=256;e+=1){
	array[e]=new Uint8ClampedArray(1024)}
	generateArray(array, simplePalette,chunks)
	    appendData(e)
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, 256, 256);
	    drawChunkImageData(ctx,imageDatas)//.putImageData(imageData, 0, 0)
        drawgrid(ctx,"black")
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        var xOffset = 0
        var yOffset = 0
        drawSquare(ctx, x, y, 0,0,document.getElementById("roomedit").width/16,document.getElementById("roomedit").height/16)
        if((x+document.getElementById("roomedit").width/16)+1 > 256){
        drawSquare(ctx, x, y, -256,16,document.getElementById("roomedit").width/16,document.getElementById("roomedit").height/16)
        console.log("x overflow")}
        if((y+document.getElementById("roomedit").height/16)+1 > 240){
        drawSquare(ctx, x, y, -256,-240,document.getElementById("roomedit").width/16,document.getElementById("roomedit").height/16)
        console.log("y overflow")}
        
        
        
renderCurrentScreens()
drawSquare(document.getElementById("roomedit").getContext("2d"),1,1,0,0,255,255)
borderX = 0
borderY = 0
    setInterval(function(){window.dispatchEvent(frame)}, 1000/10)
    document.getElementById("editWidth").value = Math.floor(document.getElementById("roomedit").width/256)
    document.getElementById("editHeight").value = Math.floor(document.getElementById("roomedit").height/256)
    document.getElementById("editHeight").onchange = function(){
        document.getElementById("roomedit").height = document.getElementById("editHeight").value*256
        renderCurrentScreens()
    }
    document.getElementById("editWidth").onchange = function(){
        document.getElementById("roomedit").width = document.getElementById("editWidth").value*256
        renderCurrentScreens()
    }
    
    document.getElementById("captureMode").onchange = function(){
        captureMode = document.getElementById("captureMode").checked
        console.log("capture mode:"+document.getElementById("captureMode").checked+"")
    
    }
        pointertext.onchange=function(){
        var currentChunk = selectedChunk + subSelectedChunk
            var loc = parseInt(startbank[input.selectedIndex], 16)
            var select = currentChunk * 2
            var locp = loc + select
            byteArray[locp] = pointertext.value.substr(0, 2)
            byteArray[locp+1] = pointertext.value.substr(2, 4)
            pointers[currentChunk] = pointertext.value
renderCurrentScreens()
        }
        transtext.onchange=function(){
        var currentChunk = selectedChunk + subSelectedChunk
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
            var locp = loc + (currentChunk * 2)
            byteArray[locp] = transtext.value.substr(0, 2)
            byteArray[locp+1] = transtext.value.substr(2, 4)
            room_transitions[currentChunk] = transtext.value
            //document.getElementById("room transition").value=byteArray[parseInt(transtext.value,16)]
        }
        scrollSelect.onchange=function(){
        var currentChunk = selectedChunk + subSelectedChunk
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
            var locp = loc + currentChunk
            byteArray[locp] = scrolls[scrollSelect.selectedIndex]
            scroll[currentChunk] = scrolls[scrollSelect.selectedIndex]
            renderCurrentScreens()
        }
        epointertext.onchange=function(){
        var currentChunk = selectedChunk + subSelectedChunk
            var selection = input.selectedIndex*512
            var loc = parseInt("C2E0", 16)+selection
            var locp = loc + currentChunk
            epointers[input.selectedIndex][currentChunk] = epointertext.value
            byteArray[locp] = epointertext.value.substr(0,2)
            byteArray[locp+1] = epointertext.value.substr(2,2)
            renderCurrentScreens()
            }

            //document.getElementById("roomTransition").innerHTML = ""+RTO.toString(16)+":"+byteArray[RTO]+","+byteArray[RTO+1]+""+roomTransition+""
            //var RTO = parseInt("142E5",16)+((parseInt(""+transtext.value.substr(3,1)+""+transtext.value.substr(2,1)+"",16)+parseInt(""+transtext.value.substr(0,2)+"",16))*2)
            var str1 = parseInt(""+transtext.value.substr(2,2)+"0",16)
            var str2 = parseInt(""+transtext.value.substr(0,2)+"",16)
            var str = parseInt(""+transtext.value.substr(2,2)+""+transtext.value.substr(0,2)+"",16)
            if(str >= parseInt("200",16)){
            str = str % 0x0200}
            var RTO = parseInt("142E5",16)+(str*2)//146E5 is theoretically the max. 
            var offset = parseInt("1"+byteArray[RTO+1]+""+byteArray[RTO]+"",16)
            
            document.getElementById("roomTransition").onchange = function(){
            console.log("beep")
                var i = 0
                var stringArray = document.getElementById("roomTransition").value.split(",")
                while(i!=stringArray.length-1){
                byteArray[roomTransitionOffset+i]=stringArray[i]
                console.log(stringArray[i])
                i += 1
                }
            }
            var i = 0;
            while(parseInt(byteArray[offset+i],16)!=parseInt('ff',16)){
            if(i===0){roomTransition=""}
                roomTransition += ""+byteArray[offset+i]+","
            i +=1}
             //console.log(""+RTO+",""+transtext.value.substr(2,2)+""+transtext.value.substr(0,2)+"")
            document.getElementById("roomTransitionHeader").innerHTML = ""+RTO.toString(16)+"(142E5+"+(RTO-parseInt("142e5",16)).toString(16)+"):"+str.toString(16).padStart(4, '0')+" - "+offset.toString(16)+""
            //document.getElementById("roomTransitionHeader").innerHTML = ""+RTO.toString(16)+":"+byteArray[RTO+1]+","+byteArray[RTO]+";"
            document.getElementById("roomTransition").value = roomTransition
            roomTransitionOffset=offset
    })
}
    loadImages()
    imagetileset =  document.getElementById("tilesetimage")
    changeTileset(imagetileset)
    var point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)
        var p = point *2
        var locp = loc + p
        pointers[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
        var p = point *2
        var locp = loc + p
        room_transitions[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
        var locp = loc + point
        scroll[point] = byteArray[locp]
        point += 1
    }
    /*point = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }*/
    point = 0
    var p = 0
    epointers[input.selectedIndex]=[]
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[input.selectedIndex][p] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        p += 1
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }
    point = 0
    while(point != 59){
        var chunk = parseInt("45", 16)
        chunk += point
        chunks[point] = {}
        chunks[point].pointer = chunk.toString(16)
        chunks[point].chunk = []
        chunks[point].collisions = []
        var e = 0
        while(e != 256){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("500", 16)
            var hex = chunks[point].pointer
            var pointer = parseInt(""+hex+"00", 16)
            pointer -= parseInt("4500", 16)
            loc += pointer
            var locp = loc + e
            chunks[point].chunk[e] = byteArray[locp]
            chunks[point].collisions[e] = collisionData[document.getElementById("tileset").selectedIndex][parseInt(byteArray[locp],16)]
            e += 1
        }
        point += 1
    }
    //console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 16 + e
                //var select = document.createElement("option")
                //select.innerHTML = g.toString(16)
                //parent.appendChild(select)
                e += 1
            } else {
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                break
            }
        }
    }
    totalbanksadded = Math.floor(byteArray.length/parseInt("4000", 16))
}//renderbank closing bracket
var generateArray = function(array, simplePalette,chunks){

for (let x = 0; x != 59; x += 1){

for (let p = 0; p < 1024; p += 4) {
  array[x][p] = simplePalette[chunks[x].collisions[Math.floor(p/4)]];// R value
  array[x][p+1] = array[x][p];  // G value
  array[x][p+2] = array[x][p] // B value
  array[x][p+3] = 255;  // A value
}
}
imageDatas=array
}
var checkSpawn = function(pos, xOffset, yOffset){    
var bank = document.getElementById("bankselect").selectedIndex + 9    
if(byteArray[parseInt("4E75", 16)] === "0"+bank.toString(16)+""){
            if(byteArray[20073] === "0"+pos.substr(0, 1)+""){
                if(byteArray[20075] === "0"+pos.substr(1, 2)+""){
                    var x = parseInt(byteArray[20074], 16)+(xOffset*256)
                    var y = parseInt(byteArray[20072], 16)+(yOffset*256)
                    var ctx = roomedit.getContext("2d")
                    ctx.drawImage(samus, x-1, y-11)
                    //ctx.drawImage(imagetileset,0,0,16,16,x,y+16,16,32)
                }
            }
        }

}
var spawn = function(x, y){
    var xOffset = Math.floor(x/256)
    var yOffset = Math.floor(y/256)//get  and normalize screen positions
    var xPos = x-(xOffset*256)
    var yPos = y-(yOffset*256)//get samus position by subtracting normalized screen position from mouse position. 
    var currentChunk = selectedChunk + ((yOffset*16)+xOffset)//add screen offsets to current chunk
        while(currentChunk > 255){
        currentChunk -= 256}//clamp maximum chunk value
    //var screenY = Math.floor(currentChunk/16)
    //var screenX = currentChunk - (screenY*16)
    //console.log("screen - X"+xOffset+",Y:"+yOffset+"; pixel - X:"+xPos+",Y:"+yPos+"")
    chunkString = currentChunk.toString(16)
    //var yPosString = Math.floor(currentChunk/16).toString(16)
    //var xPosString = (currentChunk - parseInt(yPosString, 16)).toString(16)
    var xPosString = xPos.toString(16)
    var yPosString = yPos.toString(16)
    console.log(""+xPosString+" "+yPosString+"")
    if(parseInt(xPosString,16) < 16){
        xPosString = "0"+xPos.toString(16)+""
        console.log("x is below 16...RIGHT?!!")
    }
    if(parseInt(yPosString,16) < 16){
        yPosString = "0"+yPos.toString(16)+""
        console.log("y is below 16...RIGHT?!!")
    }
    console.log(""+chunkString+" "+xPos+" "+yPos+" "+xPosString+" "+yPosString+"")
    byteArray[20068] = yPosString//pixel Y position Samus
    byteArray[20069] = "0"+chunkString.substr(0,1)+""//screen y 
    byteArray[20070] = xPosString//pixel x
    byteArray[20071] = "0"+chunkString.substr(1,1)+""//screen X
    byteArray[20072] = yPosString//pixel y Camera
    byteArray[20073] = "0"+chunkString.substr(0,1)+""//screen Y
    byteArray[20074] = xPosString//pixel x
    byteArray[20075] = "0"+chunkString.substr(1,1)+""//screen x
    var bank = document.getElementById("bankselect").selectedIndex + 9
    byteArray[parseInt("4E75", 16)] = "0"+bank.toString(16)+""
    console.log("set spawn to bank "+bank.toString(16)+" on screen "+chunkString+", at x "+xPos+" and y "+yPos+"")
    var tileset = document.getElementById("tileset").selectedIndex + 9
    var sel = document.getElementById("tileset").selectedIndex
    var collisions = [1,2,0,5,4,6,6,6,7]
    
    if(sel===1){
    byteArray[parseInt("4E76",16)]="5E"}
    tilebank = "0"+Math.floor(graphicsData[select.selectedIndex][0]/parseInt("4000",16)).toString("16")+""
    var offset = (tilebank-1)*parseInt("4000",16)
    var str=(graphicsData[select.selectedIndex][0]-offset).toString(16).split("")//.split("")
    tiles0	= ""+str[2]+""+str[3]+""
    tiles1 = ""+str[0]+""+str[1]+""
    
    var offset = 7*parseInt("4000",16)
    var str=(graphicsData[select.selectedIndex][1]-offset).toString(16).split("")//.split("")
    
    metatiles0 =  ""+str[2]+""+str[3]+""
    metatiles1 =  ""+str[0]+""+str[1]+""

    collision1 = "4"+collisions[sel]+""
    collision0 = "80"
    checkSpawn(chunkString,xOffset,yOffset)
}
var viewdat = function(draw){/*
    var loc = epointers[selectedChunk+subSelectedChunk]
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    var loc = parseInt(""+d.toString(16)+""+e+"", 16)
    e = 0
    d = 0
    //objnum
    while(e != 4){\
    
            var p = d*4
            
//renderCurrentScreens()
    
        }
        */
//var pos = currentChunk.toString(16)
        //var bank = document.getElementById("bankselect").selectedIndex + 9
        //checkSpawn(pos, xOffset, yOffset)       
        var loc = epointers[document.getElementById("bankselect").selectedIndex][selectedChunk+subSelectedChunk]//loc = pointer string
        var byte1 = loc.substr(2, 4)
        //byte 1 (e) is the first byte of a 2 byte pointer, and temporary placeholder for the second byte
        var byte2 = parseInt(byte1, 16)
        //byte 2 (d) is the second byte of the pointer, parsed from the temporary bufer value byte 1
        byte2 += parseInt("80", 16)//add offset of 0x80
        byte1 = loc.substr(0, 2)//clear buffer of byte 2 by overwriting it with byte 1
        var loc = parseInt(""+byte2.toString(16)+""+byte1+"", 16)//byte 1 is already a string, so no need to... stringify? I guess?
        //M2 enemy format: ID,type,x,y, 4 bytes
        byte1 = 0
        byte2 = 0
        var ctx = roomedit.getContext("2d")
        var objects = []
        var rawObjects = []
        //ok done. the names made SOME sense, but single letters suck as names regardless without some kind of clarification, even a comment ^ 
        while(byte1 != 4){
            var p = byte2*4//p = pointer
            if(byteArray[loc + p] != 'ff'){
		    var type = byteArray[loc + p + 1]
		    if(logObjectList[parseInt(type, 16)] != undefined){
		    type = logObjectList[parseInt(type,16)]
		    }
                objects[byte2] = "Object "+byte2+" - ID:"+byteArray[loc + p]+", Type:"+type+", X:"+byteArray[loc + p + 2]+", Y:"+byteArray[loc + p + 3]+"</p>"
                byte2 += 1
            } else {
                byte1 = 4
                if(byte2 === 0){
                document.getElementById("OBJData").innerHTML = "No objects on current screen"
                }
            }
            //t = type
            /*
            if(byte1 === 0){
                if(byteArray[loc + p] != "ff"){//check for terminating operator at pointer location
                    byte1 = 2
                } else {
                    byte1 = 4
                }
            }
            if(byte1 === 2){
                drawObj(ctx,parseInt(byteArray[loc + x], 16)+(xOffset*256), parseInt(byteArray[loc + y], 16)+(yOffset*256), byteArray[loc + p])
                byte2 += 1
                byte1 = 0
            }*/
        }
        if(draw===true){
if(objects[document.getElementById("objselect").selectedIndex]!=undefined){
    document.getElementById("OBJData").innerHTML = objects[document.getElementById("objselect").selectedIndex]} else {
document.getElementById("OBJData").innerHTML = "Invalid object. It doesn't exist."
}
enableElement("OBJData")
disableElement("viewDat")
disableElement("object manager")
enableElement("object manager","position: absolute; left: 50px; top: 280px; border: 1px solid #000000; width: 286px; height: 485px")
}
return objects
}
/*var editobj = function(input,newObject,chunk){
    if(!chunk){
        var currentChunk = selectedChunk+subSelectedChunk
    } else {
        var currentChunk = chunk
    }
    while(currentChunk >= 256){
    currentChunk -= 255
    }

    if(!newObject){
        var newObject = {ID:"ff",type:"ff",sx:"ff",sy:"ff"}
        var loc = epointers[currentChunk]
        console.log("deleting object "+input+" out of "+objnums[currentChunk]+" total")
        objnums[currentChunk] -= 1
    } else {
        var loc = newObject.loc
        objnums[currentChunk] += 1
        var input = objnums[currentChunk]
    }
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    loc = parseInt(""+d.toString(16)+""+e+"", 16)
    console.log(loc)
    e = 0
    d = 0
    var length = viewdat().length
    while(e != 4){
            var p = d*4
            if(byteArray[loc + p] != "ff"){
                d += 1
            } else {
                e = 4
            }
        }
    //objnums[currentChunk]=length
    var p = input*4
    
    var g = length*4
    if(objnums[currentChunk] <= 15){
        if(document.getElementById("objselect").selectedIndex < d){
        console.log(""+document.getElementById("objselect").selectedIndex-d+" objects were orphaned")
        byteArray[loc + p] = byteArray[loc + g]
        byteArray[loc + 1 + p] = byteArray[loc + 1 + g]
        byteArray[loc + 2 + p] = byteArray[loc + 2 + g]
        byteArray[loc + 3 + p] = byteArray[loc + 3 + g]       
        console.log("fixed all orphaned objects")
        }        
        
        byteArray[loc + g] = newObject.ID.toString(16)
        byteArray[loc + 1 + g] = newObject.type.toString(16)
        byteArray[loc + 2 + g] = newObject.sx.toString(16)
        byteArray[loc + 3 + g] = newObject.sy.toString(16)
        } else {
            window.alert("16 is the object limit per screen")
    
        }
    /*} else {
        byteArray[loc + g] = newObject.ID.toString(16)
        byteArray[loc + 1 + g] = newObject.type.toString(16)
        byteArray[loc + 2 + g] = newObject.sx.toString(16)
        byteArray[loc + 3 + g] = newObject.sy.toString(16)
    }*//*
renderCurrentScreens()
    
}*/

var deleteObj = function(input){
    var loc = epointers[document.getElementById("bankselect").selectedIndex][selectedChunk+subSelectedChunk]
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    var loc = parseInt(""+d.toString(16)+""+e+"", 16)
    console.log(loc)
    e = 0
    d = 0
    //objnum
    var objects = []
    while(e != 4){
            var p = d*4
            if(byteArray[loc + p] != 'ff'){
                objects[d] = [""+byteArray[loc + p]+"",""+byteArray[loc + p + 1]+"",""+byteArray[loc + p + 2]+"",""+byteArray[loc + p + 3]+""]
                d += 1
            } else {
                e = 4
            }
        }
    d -= 1
    var p = input*4
    console.log("deleting object "+input+", with "+d+" total")
    objnums[selectedChunk] -= 1
    if(input < d){
        console.log(""+d-input+" objects were orphaned")
        var g = d*4
        byteArray[loc + p] = byteArray[loc + g]
        byteArray[loc + 1 + p] = byteArray[loc + 1 + g]
        byteArray[loc + 2 + p] = byteArray[loc + 2 + g]
        byteArray[loc + 3 + p] = byteArray[loc + 3 + g]       
            
        byteArray[loc + g] = 'ff'
        byteArray[loc + 1 + g] = 'ff'
        byteArray[loc + 2 + g] = 'ff'
        byteArray[loc + 3 + g] = 'ff'
        console.log("fixed all orphaned objects")
    } else {
        var g = d*4
        byteArray[loc + g] = 'ff'
        byteArray[loc + 1 + g] = 'ff'
        byteArray[loc + 2 + g] = 'ff'
        byteArray[loc + 3 + g] = 'ff'
    }
renderCurrentScreens()
    
}


var deleted = function(){
    deleteObj(document.getElementById("objselect").selectedIndex)
}
/*var addbank = function(n, s){
if (totalbanksadded <= 255){
var e = 0
var g = n*parseInt("4000", 16)
var f = byteArray.length
if(s===undefined){
var bank = document.getElementById("bankselect").selectedIndex
} else {
var bank = s
}
    while(e != parseInt(0x4000)){
	var h = f + e
	if(s===undefined){
	byteArray[h] = byteArray[parseInt(startbank[bank],16)+e]
      } else {
	byteArray[h] = byteArray[s*parseInt(0x4000)+e]
      }
	e += 1
    }
    var bankPointers = n+16
    while(startbank[bankPointers-9] === undefined){
var h = parseInt(0x4000)*bankPointers
startbank[bankPointers-9] = h.toString(16)
bankPointers -= 1
}*/

var addbank = function(n, s){
if (totalbanksadded <= 255){
var e = 0
var g = n*parseInt("4000", 16)
var f = byteArray.length
var bank = document.getElementById("bankselect").selectedIndex
if(s != undefined){
bank = s-9
}
counter = 0
    while(e != parseInt(0x4000)){
	var h = f + e
if (s < 0) {
	byteArray[h] = byteArray[(parseInt(0x4000)*s)+e]
    e += 1
} else {
	byteArray[h] = byteArray[parseInt(startbank[bank],16)+e]
    e += 1}
    }

    var bankPointers = n+16
    while(startbank[bankPointers-9] === undefined){
var h = parseInt(0x4000)*bankPointers
startbank[bankPointers-9] = h.toString(16)
bankPointers -= 1
}

    if(n === 1){
    console.log("added 1 bank")
    } else {
    console.log("added "+n+" banks("+totalbanksadded+" total)")
    }
var byteLength = byteArray.length/parseInt(0x4000)
byteLength -= 1
    document.getElementById("bankselect").innerHTML +="<option>"+byteLength.toString(16)+"</option>"
    totalbanksadded += n
    console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 7 + e
                //parent[g] = "<option>"+(e+16).toString(16)+"</option>"
                e += 1
            } else if(parent.childNodes.length >= 254 && s === undefined){
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                e += 1
                break
            }
        }
    }
}
}

var frame = new CustomEvent('EnterFrame')

    setInterval(function(){window.dispatchEvent(frame)}, 1000/10)
window.addEventListener("EnterFrame", function(){
if(hexout !=""){
if(fileChange === false){
decode()
fileChange = true}}
})
