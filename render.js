//var startbank = ["24000","28000","2C000","30000","34000","38000","3C000"]
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
    var addbankelement = function(){
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        
        while(e != startbank.length - 7){
            var g = 16 + e
            var select = document.createElement("option")
            select.innerHTML = g.toString(16)
            parent.appendChild(select)
            e += 1
        }
    }
    totalbanksadded = c.length/parseInt("4000", 16)
    }
var changeTileset = function(tile){
    var ctx = document.getElementById("tilesetimage").getContext("2d")
    ctx.drawImage(tile, 0, 0)
    console.log("drew tileset")
}
var loadtileset = function(){
    var samusimg = new Image(16, 32);
    samusimg.src = "Object Sprites/samus.png"
    samus = samusimg
    var objimg = new Image(16, 16)
    objimg.src = "Object Sprites/placeholderOBJ.png"
    obj = objimg
    var select = document.getElementById("tileset")
    var tileset = new Image(256, 128);
    var selected = select.selectedIndex+9
    tileset.src = "Tilesets/"+selected.toString(16)+".png";
    imagetileset =  tileset
}
var renderbank = function(){
    var input = document.getElementById("bankselect") //select element, loads a bank
    var canvas = document.getElementById("edit")
    var ctx = canvas.getContext("2d")
    var roomedit = document.getElementById("roomedit")
    var tileset = document.getElementById("tilesetimage")
    tileset.addEventListener("mousedown", function(e){
        var ctx = this.getContext("2d")
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        tile = bank
        console.log(""+bank+","+tile+"")
        ctx.clearRect(0, 0, 256, 256);
        changeTileset(imagetileset)
        drawgrid(ctx, "#FF0000")
        drawgrid(ctx, "#FF0000")
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
    var renderroom = function(){
        var d = 0
        while(d != 256){
        var xpos = d
        var ypos = 0
        while(xpos >= 16){
            xpos -= 16
            ypos += 1
        }
        var currentbyte = chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[d]
        //0 = 7f
        var tilex = parseInt(currentbyte, 16)
        var tiley = 0
        while(tilex > 16){
            tilex -= 16
            tiley += 1
        }
        var renderer = roomedit.getContext("2d")
        renderer.drawImage(imagetileset,tilex*16,tiley*16,16,16,xpos*16,ypos*16,16,16)
        d += 1
        }
        var pos = selected.toString(16)
        var bank = document.getElementById("bankselect").selectedIndex + 9
        if(c[parseInt("4E75", 16)] === "0"+bank.toString(16)+""){
            if(c[20073] === "0"+pos.substr(0, 1)+""){
                if(c[20075] === "0"+pos.substr(1, 2)+""){
                    var x = parseInt(c[20074], 16)
                    var y = parseInt(c[20072], 16)
                    var ctx = roomedit.getContext("2d")
                    ctx.drawImage(samus, x, y+10)
                    //ctx.drawImage(imagetileset,0,0,16,16,x,y+16,16,32)
                }
            }
        }
        console.log(epointers[selected])
        var loc = epointers[selected]
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        var loc = parseInt(""+d.toString(16)+""+e+"", 16)
        console.log(loc)
        //ID,type,x,y
        e = 0
        d = 0
        var ctx = roomedit.getContext("2d")
        while(e != 4){
            var p = d*4
            var x = p+2
            var y = p+3
            if(e === 0){
                if(c[loc + p] != "ff"){
                    e = 2
                } else {
                    e = 4
                }
            }
            if(e === 2){
                ctx.drawImage(obj, parseInt(c[loc + x], 16), parseInt(c[loc + y], 16))
                console.log("drew object number "+d+" at X:"+c[loc + x]+" and Y:"+c[loc + y]+"")
                console.log("obj"+d+":"+c[loc + p]+" "+c[loc + p + 1]+" "+c[loc + x]+" "+c[loc + y]+" ")
                d += 1
                e = 0
            }
        }
        objnum = d
    }
    roomedit.addEventListener("mousedown", function(e){
    var placeblock = function(ctx){
        var edittile = true
        if(tile === null || tile === undefined){
            edittile = false
        }
        var pos = parseInt(""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+"", 16)
        var posb = ""+parseInt(chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].pointer+"00", 16)
        posb -= parseInt("4000", 16)
        posb += parseInt(startbank[input.selectedIndex], 16)
        posb += pos
        if(edittile === true){
            c[posb] = tile
            chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[pos] = tile
        } else {
            console.error("exception: tile not selected")
            console.log("edits not applied")
        }
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var xpos = parseInt(tile.substr(1, 2), 16)*16
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = x*16
        var yclear = y*16
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }
    var k = 0
    //for some wacko reason, 2 objects were being placed at once. K fixes this.
    if(document.getElementById("mode").selectedIndex === 0){
        var ctx = this.getContext("2d")
        placeblock(ctx)
    } else if(document.getElementById("mode").selectedIndex === 1){
        if(k === 0){
        var ctx = this.getContext("2d")
        var ID = document.getElementById("OBJID").value
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var type = document.getElementById("OBJType").value
        var loc = document.getElementById("enemy-dat").value
        var e = loc.substr(2, 4)
        var d = parseInt(e, 16)
        d += parseInt("80", 16)
        e = loc.substr(0, 2)
        loc = parseInt(""+d.toString(16)+""+e+"", 16)
        
        if(objnum <= 15){
            ctx.drawImage(obj, sx, sy)
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
        c[loc+num] = ID
        c[loc+num+1] = type
        c[loc+num+2] = sx
        c[loc+num+3] = sy
        c[loc+num+4] = "ff"
        objnum += 1
        k += 1
        } else {
            window.alert("16 is the object limit per screen")
        }
        } else if(k === 1){
            k = 0
        }
        //ctx.drawImage(objects[(parseInt(type, 16)][2],objects[(parseInt(type, 16)][0],objects[(parseInt(type, 16)][1])
    } else if(document.getElementById("mode").selectedIndex === 2){
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var sy = y*16
        var sx = x*16
        var ctx = this.getContext("2d")
        //ctx.drawImage(samus, sx*16, y*16)
        //ctx.drawImage(imagetileset,0,0,16,16,x*16,y*16,16,16)
        ctx.drawImage(samus, sx, sy-7)
        spawn(c, sx.toString(16), sy.toString(16))
    } else {
        console.log("unimplemented")
    }
    })
    
    roomedit.addEventListener("mousemove", function(e){
    if(document.getElementById("mode").selectedIndex === 0){
    var placeblock = function(ctx){
        var edittile = true
        if(tile === null || tile === undefined){
            edittile = false
        }
        var pos = parseInt(""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+"", 16)
        var posb = ""+parseInt(chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].pointer+"00", 16)
        posb -= parseInt("4000", 16)
        posb += parseInt(startbank[input.selectedIndex], 16)
        posb += pos
        if(edittile === true){
            c[posb] = tile
            chunks[parseInt(pointers[selected], 16)-parseInt("45", 16)].chunk[pos] = tile
        } else {
            console.error("exception: tile not selected")
            console.log("edits not applied")
        }
        var x = Math.floor(e.offsetX/16)
        var y = Math.floor(e.offsetY/16)
        var xpos = parseInt(tile.substr(1, 2), 16)*16
        var ypos = parseInt(tile.substr(0, 1), 16)*16
        var xclear = x*16
        var yclear = y*16
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }
        var ctx = this.getContext("2d")
        if(e.buttons === 1){
            placeblock(ctx)
        }
    } else {
        console.log("only placing one at a time for your sanity")
    }
    })
    canvas.addEventListener("mousedown", function(e){
        var pointertext = document.getElementById("pointers")
        var scrolltext = document.getElementById("scroll")
        var transtext = document.getElementById("rtransition")
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        var epointertext = document.getElementById("enemy-dat")
        selected = parseInt(bank, 16)
        console.log(""+bank+","+selected+"")
        pointertext.value = pointers[selected]
        transtext.value = room_transitions[selected]
        scrolltext.value = scroll[selected]
        epointertext.value = epointers[selected]
        ctx.clearRect(0, 0, 256, 256);
        drawgrid(ctx)
        drawgrid(ctx)
        ctx.fillStyle = "#000000";
        var x = Math.floor(e.offsetX/16)*16
        var y = Math.floor(e.offsetY/16)*16
        ctx.beginPath();
        ctx.moveTo(x-1,y-1);
        ctx.lineTo(x-1,y+17);
        ctx.lineTo(x+17,y+17);
        ctx.lineTo(x+17,y-1);
        ctx.lineTo(x-1,y-1);
        ctx.stroke();
        //renderroom()
        pointertext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)
            var select = selected * 2
            var locp = loc + select
            c[locp] = pointertext.value.substr(0, 2)
            c[locp+1] = pointertext.value.substr(2, 4)
            pointers[selected] = pointertext.value
            console.log("changed chunk pointer at "+locp.toString(16)+" to "+pointertext.value+"")
        }
        transtext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
            var select = selected * 2
            var locp = loc + select
            c[locp] = transtext.value.substr(0, 2)
            c[locp+1] = transtext.value.substr(2, 4)
            room_transitions[selected] = transtext.value
            console.log("changed room transition at "+locp.toString(16)+" to "+transtext.value+"")
        }
        scrolltext.onchange=function(){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
            var locp = loc + selected
            c[locp] = scrolltext.value
            scroll[selected] = scrolltext.value
            console.log("changed scroll data at "+locp.toString(16)+" to "+scrolltext.value+"")
        }
         epointertext.onchange=function(){
            var selection = input.selectedIndex*512
            var loc = parseInt("C2E0", 16)+selection
            var locp = loc + selected
            epointers[selected] = epointertext.value
            c[loc] = epointertext.value
             console.log("changed object pointer at "+locp.toString(16)+" to "+epointertext.value+"")
            }
/*            var e = ""+epointer1+""+epointer2+""
            var f = parseInt(e, 16)
            var i = 0
            var enemies = []
            while(c[f] != "ff"){
                var ID = c[parseInt(""+epointer1+"", 16)]
                var type = c[parseInt(""+epointer1+"", 16) + 1]
                var xpos = c[parseInt(""+epointer1+"", 16) + 2]
                var ypos = c[parseInt(""+epointer1+"", 16) + 3]
                f += 4
                eneimies[e] = [ID, type, xpos, ypos]
                i += 1
            }
            console.log(enemies.length)*/
        renderroom()
    })
    var drawgrid = function(ctx, style){
        if(style != undefined||style != null){
           ctx.fillStyle = style;
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
    drawgrid(ctx)
    drawgrid(ctx)
    loadtileset()    
    var tilectx = document.getElementById("tilesetimage").getContext("2d")
    drawgrid(tilectx)
    drawgrid(tilectx)
    var point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)
        var p = point *2
        var locp = loc + p
        pointers[point] = ""+c[locp]+""+c[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("300", 16)
        var p = point *2
        var locp = loc + p
        room_transitions[point] = ""+c[locp]+""+c[locp+1]+""
        point += 1
    }
    point = 0
    while(point != 256){
        var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("200", 16)
        var locp = loc + point
        scroll[point] = c[locp]
        point += 1
    }
    point = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[point] = ""+c[locp]+""+c[locp+1]+""
        point += 2
        //add 8 to second byte to get actual enemy location(pointers are little-endian)
    }
    point = 0
    var p = 0
    while(point != 512){
        var selection = input.selectedIndex*512
        var loc = parseInt("C2E0", 16)+selection
        var locp = loc + point
        epointers[p] = ""+c[locp]+""+c[locp+1]+""
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
        var e = 0
        while(e != 256){
            var loc = parseInt(startbank[input.selectedIndex], 16)+parseInt("500", 16)
            var hex = chunks[point].pointer
            var pointer = parseInt(""+hex+"00", 16)
            pointer -= parseInt("4500", 16)
            loc += pointer
            var locp = loc + e
            chunks[point].chunk[e] = c[locp]
            e += 1
        }
        point += 1
    }
    console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 16 + e
                var select = document.createElement("option")
                select.innerHTML = g.toString(16)
                parent.appendChild(select)
                e += 1
            } else {
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                break
            }
        }
    }
    totalbanksadded = c.length/parseInt("4000", 16)
}
/*set spawn template(need to implement the save editor first to get the pointer locations)*/
var spawn = function(c, x, y){
    hex = selected.toString(16)
    c[20068] = ""+y+""
    c[20069] = "0"+hex.substr(0, 1)+""
    c[20070] = ""+x+""
    c[20071] = "0"+hex.substr(1, 2)+""
    c[20072] = ""+y+""
    c[20073] = "0"+hex.substr(0, 1)+""
    c[20074] = ""+x+""
    c[20075] = "0"+hex.substr(1, 2)+""
    var bank = document.getElementById("bankselect").selectedIndex + 9
    c[parseInt("4E75", 16)] = "0"+bank.toString(16)+""
    window.alert("warning: collision data might not be right, expect glitches.")
    
    console.log("set spawn to bank "+bank.toString(16)+" on screen "+hex.toString(16)+", at x "+x+" and y "+y+".")
    //TODO: set metatiles, graphics properly
    var tileset = document.getElementById("tileset").selectedIndex + 9
    var sel = tileset.toString(16)
    if(sel === "9"){
    tilebank = "07"
    tiles1 = "40"
    tiles0 = "00"
    metatiles1 = "48"
    metatiles0 = "80"
    collision1 = "41"//correct
    collision0 = "80"
    } else if(sel === "a"){
    tilebank = "07"
    tiles1 = "48"
    tiles0 = "00"
    metatiles1 = "4A"
    metatiles0 = "80"
    collision1 = "42"//unknown
    collision0 = "80"
    } else if(sel === "b"){
    tiles1 = "71"
    tiles0 = "BC"
    tilebank = "08"
    metatiles1 = "4C"
    metatiles0 = "80"
    collision1 = "42"//unknown
    collision0 = "80"
    } else if(sel === "c"){
    tilebank = "07"
    tiles1 = "60"
    tiles0 = "00"
    metatiles1 = "52"
    metatiles0 = "80"
    collision1 = "45"//correct
    collision0 = "80"
    } else if(sel === "d"){
    tilebank = "07"
    tiles1 = "58"
    tiles0 = "00"
    metatiles1 = "50"
    metatiles0 = "80"
    collision1 = "44"//unknown, might be ruins interior
    collision0 = "80"
    } else if(sel === "e"){
    var c = parseInt(prompt("select acid caves varient, 1-3, 1 being acid all up, 2 being middle, and 3 being lowered"), 10)
    if (c === 1){
        tiles1 = "68"
        tiles0 = "00"
        metatiles1 = "56"
        metatiles0 = "A8"
        console.log("acid not lowered")
    } else if(c === 2){
        tiles1 = "6D"
        tiles0 = "30"
        metatiles1 = "54"
        metatiles0 = "80"
        console.log("acid lowered halfway")
    } else if (c === 3){
        tiles1 = "72"
        tiles0 = "60"
        metatiles1 = "55"
        metatiles0 = "94"
        console.log("acid lowered fully")
    }
    tilebank = "07"
    collision1 = "46" //correct, but glitchy
    collision0 = "80"
    } else if(sel === "f"){
    tiles1 = "69"
    tiles0 = "BC"
    tilebank = "08"
    metatiles1 = "57"
    metatiles0 = "BC"
    collision1 = "47"//correct, I think...
    collision0 = "80"
    } else {
        window.alert("INVALID TILESET(this should be impossable to trigger, please tell me how you did it)")
    }
    //(base values) 4E6F	$6000	graphics

    //(base values) 4E71    $5280  	Metatile

    //(base values) 4E73    $4580   collision
    /*use scroll borders to clip screen location of the camera at spawn (low priority)
    stop down:
0F
0E
0D
0C
0B
0A
09
08
stop up:
0F
0E
0D
0C
07
06
05
04
stop left:
0F
0E
0B
07
0A
06
03
02
stop right: 
0F
0D
0B
09
07
05
03
01

00-Free Scroll
01-Stop Scrolling Right
02-Stop Scrolling Left
03-Vertical Shaft
04-Stop Scrolling Up
05-Stop Scrolling Up Right Corner
06-Stop Scrolling Up Left Corner
07-Vertical Shaft End Up
08-Stop Scrolling Down
09-Stop Scrolling Down Right
0A-Stop Scrolling Down Left
0B-Vertical Shaft End Down
0C-Hallway
0D-Hallway End Right
0E-Hallway End Left
0F-No Scroll


Metatile Definitions
0x20880-0x20A7F - Bubbles, Ruins 3 Catacombs
0x20A80-0x20C7F - Inside Ruins
0x20C80-0x20E7F - Final Ruins
0x20E80-0x2107F - Queen's Room
0x21080-0x2127F - First/Last Caves
0x21280-0x2147F - Outside/Ship
0x21480-0x21593 - Acid Caves (Acid Mid)
0x21594-0x218A7 - Acid Caves (Acid Down)
0x216A8-0x217BB - Acid Caves (Acid Up)
0x217BC-0x219BB - Outside Ruins

Collision Data
0x20080-0x2087F - 0x100 per tileset
20080(4080) - ???(set 1)
20180(4180) - ???(set 2)
20280(4280) - ???(set 3)
20380(4380) - ???(set 4)
20480(4480) - ???(set 5)
20580(4580) - outside/ship(set 6)
20680(4680) - ???(set 7)
20780(4780) - ???(set 8)

Tiles
0x1C000-0x1C7FF - Bubbles, Ruins 3 Catacombs
0x1C800-0x1CFFF - Inside Ruins
0x1D000-0x1D7FF - Queeny
0x1D800-0x1DFFF - First/Last Caves
0x1E000-0x1E7FF - Outside/Ship
0x1E800-0x1ED2F - Caves with Acid
0x1ED30-0x1F25F - Caves with Acid variant 1
0x1F260-0x1F78F - Caves with Acid variant 2
0x1F790-0x1FB6F - Powerups and Refills
0x1FB70-0x1FFFF - Free Space
*/
}
var viewdat = function(){
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
    var objects = ""
    while(e != 4){
            var p = d*4
            if(c[loc + p] != "ff"){
                objects += ""+d+":"+c[loc + p]+" "+c[loc + p + 1]+" "+c[loc + p + 2]+" "+c[loc + p + 3]+"\n"
                d += 1
            } else {
                e = 4
                if(d === 0){
                objects = "No objects on current screen"
                }
            }
        }
    window.alert(objects)
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
            if(c[loc + p] != "ff"){
                objects[d] = [""+c[loc + p]+"",""+c[loc + p + 1]+"",""+c[loc + p + 2]+"",""+c[loc + p + 3]+""]
                d += 1
            } else {
                e = 4
            }
        }
    d -= 1
    var p = input*4
    console.log("deleting object "+input+", with "+d+" total")
    if(input < d){
        var f = d-input
        console.log(""+f+" objects were orphaned")
        var g = d*4
        c[loc + p] = c[loc + g]
        c[loc + 1 + p] = c[loc + 1 + g]
        c[loc + 2 + p] = c[loc + 2 + g]
        c[loc + 3 + p] = c[loc + 3 + g]       
            
        c[loc + g] = "ff"
        c[loc + 1 + g] = "ff"
        c[loc + 2 + g] = "ff"
        c[loc + 3 + g] = "ff"
        console.log("fixed")
    } else {
        var g = d*4
        c[loc + g] = "ff"
        c[loc + 1 + g] = "ff"
        c[loc + 2 + g] = "ff"
        c[loc + 3 + g] = "ff"
    }
}
var deleted = function(){
    deleteobj(document.getElementById("objselect").selectedIndex)
}
var addbank = function(n){
if (totalbanksadded <= 256){
var e = 0
var g = n*parseInt("4000", 16)
var f = c.length
    while(e <= 512){
	var h = f + e
	c[h] = "00"
    c[h+1] = "45"
    e += 2
    }
    e = 0
    while(e != 256){
	var h = f + e + 512
	c[h] = "0f"
    e += 1
    }
    e = 0
    while(e != g-256-512){
	var h = f + e + 512 + 256
	c[h] = "00"
    c[h+1] = "00"
    e += 2
    }

    
    if(n === 1){
    console.log("added 1 bank")
    } else {
    console.log("added "+n+" banks("+totalbanksadded+" total)")
    }
    totalbanksadded += n
    console.log(totalbanksadded)
    if(startbank.length >= 8){
        var e = 0
        var parent = document.getElementById("bankselect")
        while(e != startbank.length - 7){
            if(parent.childNodes.length <= 254){
                var g = 16 + e
                var select = document.createElement("option")
                select.innerHTML = g.toString(16)
                parent.appendChild(select)
                e += 1
            } else {
                window.alert("TOO MANY BANKS! The Great Depression will plague your hack...")
                break
            }
        }
    }
} else {
    window.alert("it would be useles to add anymore banks, you wack job. what do you need more then 256 for?!! assuming samus is 2 meters tall, each tile would be 1 meter. there are 256 screens of 256 tiles in those 256 banks. there is no way you need about 256^3 (or 16777216, or 16777.216 kilometers, or about 65 square kilometers) meters worth of space(unless you are using those banks for something else...in which case, tell me what,and open your hex editor.")
}
}