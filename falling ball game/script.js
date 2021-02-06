$(function(){
    let character = $("#character");
    let game = $("#game");
    let interval;
    let both = 0;
    let counter = 0;
    var currentblocks = [];
    
    function move_left() {
        let left = $("#character").offset().left
        if (left > 0) {
            character.offset().left = left - 1 + "px";
        }
    }
    
    function move_right() {
        let left = $("#character").offset().left
        if (left < 380) {
            character.offset().left = left + 1 + "px";
        }
    }
    
    document.addEventListener("keydown", (event) => {
        if (both === 0) {
            both++;
            if (event.key === "ArrowLeft") {
                interval = setInterval(move_left, 1);
            }
            if (event.key === "ArrowRight") {
                interval = setInterval(move_right, 1);
            }
        }
    });
    
    document.addEventListener("keyup", () => {
        clearInterval(interval);
        both = 0;
    });

    var blocks = setInterval(() => {
        if (counter > 0) {
            let block_last = $("#block" + (counter - 1));
            let hole_last = $("#hole" + (counter - 1));
            var block_last_top = $(block_last).offset().top
            var hole_last_top = $(hole_last).offset().top
        }
        if (block_last_top < 400 || counter === 0) {
            let block = document.createElement("div");
            let hole = document.createElement("div");
            block.setAttribute("class", "block");
            hole.setAttribute("class", "hole");
            block.setAttribute("id", "block" + counter);
            hole.setAttribute("id", "hole" + counter);
            block.style.top = block_last_top + 100 + "px";
            hole.style.top = hole_last_top + 100 + "px";
    
            let random = Math.floor(Math.random() * 360);
            hole.style.left = random + "px";
    
            game.append(hole);
            game.append(block);
            currentblocks.push(counter);
            counter++;
        }
        var character_top = $(character).offset().top
        var character_left = $(character).offset().left
    
        var drop = 0;
        if(character_top <=0){
            alert("Game Over. Score : "+ (counter-9 ))
            clearInterval(blocks)
            location.reload()
        }
        for (var i = 0; i < currentblocks.length; i++) {
            let current = currentblocks[i];
            let ihole = $("#hole" + current);
            let iblock = $("#block" + current);
            let iblockTop = $(iblock).offset().top
            let ihole_left = $(ihole).offset().left
            iblock.offset().top= iblockTop - 0.5 + "px";
            ihole.offset().top = iblockTop - 0.5 + "px";
    
            if (iblockTop < -20) {
                currentblocks.shift();
                iblock.remove();
                ihole.remove();
            }
            if (iblockTop - 20 < character_top && iblockTop > character_top) {
                drop++;
                if (ihole_left <= character_left && ihole_left + 20 >= character_left) {
                    drop = 0
                }
            }
        }
        if (drop == 0) {
            if (character_top < 480) {
                character.offset().top = character_top + 2 + "px";
            }
        } else {
            character.offset().top = character_top - 0.5 + "px";
            
        }
    }, 10);
})

