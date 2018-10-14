var startbank = ["24000","28000","2C000","30000","34000","38000","3C000"]//all are placeholders, besides F
var pointers = []
var room_transitions = []
var scroll = []
var chunks = []
var selected
var prevbank
var tile
var imagetileset
var changeTileset = function(tile){
    var ctx = document.getElementById("tilesetimage").getContext("2d")
    ctx.drawImage(tile, 0, 0)
    console.log("drew tileset")
}
var loadtileset = function(){
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
        console.log(posb.toString(16))
        console.log(pos.toString(16))
        console.log(xpos)
        console.log(ypos)
        console.log(x)
        console.log(y)
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }
        var ctx = this.getContext("2d")
        placeblock(ctx)
    })
    roomedit.addEventListener("mousemove", function(e){
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
        console.log(posb.toString(16))
        console.log(pos.toString(16))
        console.log(xpos)
        console.log(ypos)
        console.log(x)
        console.log(y)
        ctx.drawImage(imagetileset,xpos,ypos,16,16,xclear,yclear,16,16)
        renderroom()
    }
        var ctx = this.getContext("2d")
        if(e.buttons === 1){
            placeblock(ctx)
        }
    })
    canvas.addEventListener("mousedown", function(e){
        var pointertext = document.getElementById("pointers")
        var scrolltext = document.getElementById("scroll")
        var transtext = document.getElementById("rtransition")
        var bank = ""+Math.floor(e.offsetY/16).toString(16)+""+Math.floor(e.offsetX/16).toString(16)+""
        selected = parseInt(bank, 16)
        console.log(""+bank+","+selected+"")
        pointertext.value = pointers[selected]
        transtext.value = room_transitions[selected]
        scrolltext.value = scroll[selected]
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
        /*while(e != 256){
            //DOES NOT WORK
            var hex = chunks[point].pointer
            var pointer = parseInt(hex, 16)
            pointer -= parseInt("40", 16)
            //
            var byte = c[parseInt(startbank[input.selectedindex], 16)+parseInt("500", 16)+pointer+e]
            chunks[point].chunk[e] = byte
            e += 1
        }*/
        point += 1
    }
}
/*
var input = document.getElementById("bankselect")
document.getElementById("tiles").getContext("2d").drawImage("Tilesets/"+parseInt(input.selectedIndex+8, 16)+"", 0, 0, 256, 128)*/