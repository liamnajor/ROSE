var el = document.getElementById("dummy")
window.addEventListener("keydown", function(e){
    console.log(e)
    if(e.key === "a"){
        memory.write("FF9B", "09")
    }
    if(e.key === "s"){
        memory.write("D050", "05")
        memory.write("D051", "FF")
        memory.write("D052", "05")
        memory.write("D055", "04")
        memory.write("D053", "FF")
        memory.write("D054", "FF")
        memory.write("D081", "FF")
        memory.write("D082", "FF")
        memory.write("D045", "FF")
    }
    var beam = memory.read("D816")
    if(e.key === "1"){
        //D055 saved
        //D04D equipped
    }
})