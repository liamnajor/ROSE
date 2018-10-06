var startbank = ["24000","28000","2C000","30000","34000","38000","3C000"]//all are placeholders, besides F
var pointers = []
var room_transitions = []
var scroll = []
var chunks = []
var selected
var renderbank = function(){
    var input = document.getElementById("bankselect") //select element, loads a bank
    var canvas = document.getElementById("edit")
    var ctx = canvas.getContext("2d")
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
        //ctx
        drawgrid()
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
    })
    var drawgrid = function(){
        ctx.clearRect(0, 0, 256, 256);
        ctx.fillStyle = "#000000";
        var x = 0
        while(x != 256){
            ctx.beginPath();
            ctx.moveTo(0,x);
            ctx.lineTo(256,x);
            ctx.stroke();
            x += 16
        }
        x = 0
        while(x != 256){
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,256);
            ctx.stroke();
            x += 16
        }
    }
    drawgrid()
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