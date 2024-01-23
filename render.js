var roomTransitionOffset=0
var added = false
var placedBlocks = []
var scrolls=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f",]
var placeBlock = function(ctx, x, y, tile){
        var edittile = true
        if(tile === undefined){
        edittile = false}
        var x = Math.floor(x/16)
        var y = Math.floor(y/16)
        var pos = parseInt(""+y.toString(16)+""+x.toString(16)+"", 16)
        var posb = ""+parseInt(chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].pointer+"00", 16)
        posb -= parseInt("4000", 16)
        posb += parseInt(startbank[document.getElementById("bankselect").selectedIndex], 16)
        posb += pos
        if(edittile === true){
            byteArray[posb] = tile
            chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[pos] = tile
        var xpos = parseInt(tile.substr(1, 2), 16)*16
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = x*16
        var yclear = y*16
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
    
        } else {
            console.error("exception: tile not selected")
        }

        }
var addBytes = function(bytes, start){
var counter = 0
var bytesString = bytes
bytes = bytesString.split(" ")
while(counter != bytes.length){
byteArray[parseInt(start)]=bytes[counter]
counter += 1
}
}
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
           ctx.fillStyle = style;
        } else {
	   ctx.fillStyle = "white";
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
var selected
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
var objnum
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
//drawgrid(ctx)
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
    //adds pre defined bytes (instead of the pointers in the metatile) at the defined points in the array
    /*if(graphicsData[select.selectedIndex][3]!=undefined){
    if(graphicsData[select.selectedIndex][3][tiles+1]!=undefined){
        indexByte=byteArray[graphicsData[select.selectIndex][3][tiles+1]+graphicsData[select.selectIndex][3][0]]
    }}*/
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
var loadtileset = function(){
    var samusimg = new Image(16, 32);
    samusimg.src = "Object Sprites/samus.png"
    samus = samusimg
    //var select = document.getElementById("tileset")
    var tileset = new Image(256, 128);
    //tileset.putImageData=generateTileSet(metatileOffset,graphicsOffset)
    //var selected = select.selectedIndex+9
    //tileset.src = "Tilesets/"+selected.toString(16)+".png";
    imagetileset =  document.getElementById("tilesetimage")
    changeTileset(imagetileset)
    //tileset.putImageData(generateTileset(graphicsData[select.selectedIndex][1],graphicsData[select.selectedIndex][0]))
    //drawgrid(tilectx)
}
var renderCurrentScreen = function(xOffset,yOffset,xsize,ysize){
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
//select current tile within the chunk
var currentTile = chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[i]
        //0 = 7f
//grab rendering context and add offsets for future edit canvas expansion
        var renderer = roomedit.getContext("2d")

        //pre implimentation zero out
        xOffset = 0
        yOffset = 0

        if(x != undefined ||x != null){
        if(xOffset >= 0){
            roomedit.width += xOffset
        }
        if(yOffset >= 0){
            roomedit.height += yOffset
        }} else {
            xOffset = 0
            yOffset = 0
        } 
        xpos += xOffset
        ypos += yOffset
//draw the processed tile at the processed position
placeBlock(renderer,xpos*16,ypos*16, currentTile)

//renderer.drawImage(imagetileset,tilex*16,tiley*16,16,16,xpos*16,ypos*16,16,16)
        i += 1
        }
        var pos = selected.toString(16)
        var bank = document.getElementById("bankselect").selectedIndex + 9
       
        if(byteArray[parseInt("4E75", 16)] === "0"+bank.toString(16)+""){
            if(byteArray[20073] === "0"+pos.substr(0, 1)+""){
                if(byteArray[20075] === "0"+pos.substr(1, 2)+""){
                    var x = parseInt(byteArray[20074], 16)
                    var y = parseInt(byteArray[20072], 16)
                    var ctx = roomedit.getContext("2d")
                    ctx.drawImage(samus, x-1, y-11)
                    //ctx.drawImage(imagetileset,0,0,16,16,x,y+16,16,32)
                }
            }
        }
        var loc = epointers[selected]
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        var loc = parseInt(""+d.toString(16)+""+e+"", 16)
        //ID,type,x,y
        e = 0
        d = 0
        var ctx = roomedit.getContext("2d")
        while(e != 4){
            var p = d*4
            var x = p+2
            var y = p+3
            if(e === 0){
                if(byteArray[loc + p] != "ff"){
                    e = 2
                } else {
                    e = 4
                }
            }
            if(e === 2){
                drawObj(ctx,parseInt(byteArray[loc + x], 16), parseInt(byteArray[loc + y], 16), byteArray[loc + p])
                d += 1
                e = 0
            }
        }
        objnum = d
    }
var renderbank = function(){
    var input = document.getElementById("bankselect") //select element, loads a bank
    var canvas = document.getElementById("edit")
    var ctx = canvas.getContext("2d")
    var roomedit = document.getElementById("roomedit")
    var tileset = document.getElementById("tilesetimage")
    if(added != true){
added = true
        tileset.addEventListener("mousedown", function(e){
        var ctx = this.getContext("2d")
	ctx.fillStyle = "white";
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        tile = bank
        ctx.clearRect(0, 0, 256, 256);
        changeTileset(imagetileset)
        //drawgrid(ctx, "white")
        //drawgrid(ctx, "white")
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        ctx.beginPath();
        ctx.moveTo(x-1,y-1);
        ctx.lineTo(x-1,y+17);
        ctx.lineTo(x+17,y+17);
        ctx.lineTo(x+17,y-1);
        ctx.lineTo(x-1,y-1);
        ctx.stroke();      
            
    })
    roomedit.addEventListener("mousedown", function(e){

    if(document.getElementById("mode").selectedIndex === 0){
        var ctx = this.getContext("2d")
	placeBlock(ctx,e.offsetX,e.offsetY,tile)
        } else if(document.getElementById("mode").selectedIndex === 1){
        var ctx = this.getContext("2d")
        var ID = document.getElementById("OBJID").value
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var type = objectList[document.getElementById("OBJType").selectedIndex][0]
        var loc = document.getElementById("enemy-dat").value
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        loc = parseInt(""+d.toString(16)+""+e+"", 16)
        
        if(objnum <= 15){
            //drawObj(ctx,sx, sy, type)
        var num = objnum*4
        if(sy.toString(16) === "0"){
            sy = "00"
        } else {
            var yy = sy.toString(16)
            sy = yy
        }
        if(sx.toString(16) === "0"){
            sx = "00"
        } else {
            var yy = sx.toString(16)
            sx = yy
        }
        byteArray[loc+num] = ID
        byteArray[loc+num+1] = type.toString(16)
        byteArray[loc+num+2] = sx
        byteArray[loc+num+3] = sy
        byteArray[loc+num+4] = "ff"
        objnum += 1
        k += 1
renderCurrentScreen()
    
        } else {
            window.alert("16 is the object limit per screen")
renderCurrentScreen()
    
        }
        
    } else if(document.getElementById("mode").selectedIndex === 2){
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var ctx = this.getContext("2d")
        spawn(byteArray, sx.toString(16), sy.toString(16))
        renderCurrentScreen()
    } else {
        console.log("unimplemented")
    }
    })
    roomedit.addEventListener("mousemove", function(e){

    if(document.getElementById("mode").selectedIndex === 0){
        var ctx = this.getContext("2d")
        if(e.buttons === 1){
            placeBlock(ctx,e.offsetX,e.offsetY,tile)
        }
    } else {
        
    }
    })
    canvas.addEventListener("mousedown", function(e){
	var simplePalette = [0,255,127]
var array = []
for(let e = 0; e!=256;e+=1){
	array[e]=new Uint8ClampedArray(1024)}
	generateArray(array, simplePalette,chunks)
	var roomTransition = "ff"
        var pointertext = document.getElementById("pointers")
        var scrollSelect = document.querySelector("#scroll")
        var transtext = document.getElementById("rtransition")
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        var epointertext = document.getElementById("enemy-dat")
        selected = parseInt(bank, 16)
        pointertext.value = pointers[selected]
        transtext.value = room_transitions[selected]
        var RTO =  parseInt("142E5",16)+(parseInt(""+transtext.value.substr(2,2)+""+transtext.value.substr(0,2)+"",16)*2)//+parseInt(""+transtext.value.substr(2,2)+"0",16)
        scrollSelect.value = scroll[selected]
        epointertext.value = epointers[selected]
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, 256, 256);
	drawChunkImageData(ctx,imageDatas)//.putImageData(imageData, 0, 0)
        //drawgrid(ctx)
        //drawgrid(ctx)
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        ctx.beginPath();
        ctx.moveTo(x-1,y-1);
        ctx.lineTo(x-1,y+17);
        ctx.lineTo(x+17,y+17);
        ctx.lineTo(x+17,y-1);
        ctx.lineTo(x-1,y-1);
        ctx.stroke();
renderCurrentScreen()
    setInterval(function(){window.dispatchEvent(frame)}, 1000/10)
        pointertext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)
            var select = selected * 2
            var locp = loc + select
            byteArray[locp] = pointertext.value.substr(0, 2)
            byteArray[locp+1] = pointertext.value.substr(2, 4)
            pointers[selected] = pointertext.value
renderCurrentScreen()
        }
        transtext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
            var select = selected * 2
            var locp = loc + select
            byteArray[locp] = transtext.value.substr(0, 2)
            byteArray[locp+1] = transtext.value.substr(2, 4)
            room_transitions[selected] = transtext.value
            //document.getElementById("room transition").value=byteArray[parseInt(transtext.value,16)]
        }
        scrollSelect.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
            var locp = loc + selected
            byteArray[locp] = scrolls[scrollSelect.selectedIndex]
            scroll[selected] = scrolls[scrollSelect.selectedIndex]
        }
         epointertext.onchange=function(){
            var selection = input.selectedIndex*512
            var loc = parseInt("C2E0", 16)+selection
            var locp = loc + selected
            epointers[selected] = epointertext.value
            byteArray[loc] = epointertext.value
            }

            //document.getElementById("roomTransition").innerHTML = ""+RTO.toString(16)+":"+byteArray[RTO]+","+byteArray[RTO+1]+""+roomTransition+""
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
            var j = 12
            while(parseInt(byteArray[offset+i],16)!=parseInt("FF",16)){
            if(i===0){roomTransition=""}
                roomTransition += ""+byteArray[offset+i]+","
            i +=1}
             //console.log(""+RTO+",""+transtext.value.substr(2,2)+""+transtext.value.substr(0,2)+"")
            document.getElementById("roomTransitionHeader").innerHTML = ""+RTO.toString(16)+":"+transtext.value.substr(2,2)+""+transtext.value.substr(0,2)+"-"+byteArray[RTO+1]+","+byteArray[RTO]+""
            //document.getElementById("roomTransitionHeader").innerHTML = ""+RTO.toString(16)+":"+byteArray[RTO+1]+","+byteArray[RTO]+";"
            document.getElementById("roomTransition").value = roomTransition
            roomTransitionOffset=offset
    })}
    loadtileset()    
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
    point = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[point] = ""+byteArray[locp]+""+byteArray[locp+1]+""
        point += 2
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }
    point = 0
    var p = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[p] = ""+byteArray[locp]+""+byteArray[locp+1]+""
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
}
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
var spawn = function(byteArray, x, y){
    hex = selected.toString(16)
    byteArray[20068] = ""+y+""
    byteArray[20069] = "0"+hex.substr(0, 1)+""
    byteArray[20070] = ""+x+""
    byteArray[20071] = "0"+hex.substr(1, 2)+""
    byteArray[20072] = ""+y+""
    byteArray[20073] = "0"+hex.substr(0, 1)+""
    byteArray[20074] = ""+x+""
    byteArray[20075] = "0"+hex.substr(1, 2)+""
    var bank = document.getElementById("bankselect").selectedIndex + 9
    byteArray[parseInt("4E75", 16)] = "0"+bank.toString(16)+""
    console.log("set spawn to bank "+bank.toString(16)+" on screen "+hex.toString(16)+", at x "+x+" and y "+y+".")
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
}
var viewdat = function(){
    var loc = epointers[selected]
    var e = loc.substr(2, 4)
    var d = parseInt(e, 16)
    d += parseInt("80", 16)
    e = loc.substr(0, 2)
    var loc = parseInt(""+d.toString(16)+""+e+"", 16)
    e = 0
    d = 0
    //objnum
    var objects = []
var rawObjects = []
    while(e != 4){
            var p = d*4
            if(byteArray[loc + p] != "ff"){
		    var type = byteArray[loc + p + 1]
		    if(logObjectList[parseInt(type, 16)] != undefined){
		    type = logObjectList[parseInt(type,16)]
		    }
                objects[d] = "Object "+d+" - ID:"+byteArray[loc + p]+", Type:"+type+", X:"+byteArray[loc + p + 2]+", Y:"+byteArray[loc + p + 3]+"</p>"
                d += 1
            } else {
                e = 4
                if(d === 0){
                objects = "No objects on current screen"
                }
            }
renderCurrentScreen()
    
        }
if(objects[document.getElementById("objselect").selectedIndex]!=undefined){
    document.getElementById("OBJData").innerHTML = objects[document.getElementById("objselect").selectedIndex]} else {
document.getElementById("OBJData").innerHTML = "Invalid object. It doesn't exist."
}
enableElement("OBJData")
disableElement("viewDat")
disableElement("object manager")
enableElement("object manager","position: absolute; left: 50px; top: 280px; border: 1px solid #000000; width: 286px; height: 485px")
}
var deleteobj = function(input){
    var loc = epointers[selected]
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
            if(byteArray[loc + p] != "ff"){
                objects[d] = [""+byteArray[loc + p]+"",""+byteArray[loc + p + 1]+"",""+byteArray[loc + p + 2]+"",""+byteArray[loc + p + 3]+""]
                d += 1
            } else {
                e = 4
            }
        }
    d -= 1
    var p = input*4
    console.log("deleting object "+input+", with "+d+" total")
    objnum -= 1
    if(input < d){
        var f = d-input
        console.log(""+f+" objects were orphaned")
        var g = d*4
        byteArray[loc + p] = byteArray[loc + g]
        byteArray[loc + 1 + p] = byteArray[loc + 1 + g]
        byteArray[loc + 2 + p] = byteArray[loc + 2 + g]
        byteArray[loc + 3 + p] = byteArray[loc + 3 + g]       
            
        byteArray[loc + g] = "ff"
        byteArray[loc + 1 + g] = "ff"
        byteArray[loc + 2 + g] = "ff"
        byteArray[loc + 3 + g] = "ff"
        console.log("fixed all orphaned objects")
    } else {
        var g = d*4
        byteArray[loc + g] = "ff"
        byteArray[loc + 1 + g] = "ff"
        byteArray[loc + 2 + g] = "ff"
        byteArray[loc + 3 + g] = "ff"
    }
renderCurrentScreen()
    
}
var deleted = function(){
    deleteobj(document.getElementById("objselect").selectedIndex)
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
