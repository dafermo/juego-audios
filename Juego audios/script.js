$(function () {

    var anim_id;
    
    // guardamos algunos objetos del dom necesarios
    
    var container = $('#container');
    var player = $('#player');
    var barra = $('.barra');
    var barra_1 = $('#barra_1');
    var barra_2 = $('#barra_2');
    var barra_3 = $('#barra_3');
    var barra_4 = $('#barra_4');
    var linea = $('linea');
    var linea_1 = $('#linea_1');
    var linea_2 = $('#linea_2');
    var linea_3 = $('#linea_3');
    var linea_4 = $('#linea_4');
    var linea_5 = $('#linea_5');
    var linea_6 = $('#linea_6');
    var linea_7 = $('#linea_7');
    var linea_8 = $('#linea_8');
    var linea_9 = $('#linea_5');
    var linea_10 = $('#linea_6');
    var linea_11 = $('#linea_7');
    var linea_12 = $('#linea_8');
    var restart_div = $('#restart_div');
    var restart_button = $('#restart');
    var score = $('#score');
    var string = $('#string');
    
    // setup inicial 
    
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var player_height = parseInt(player.height());
    var player_width = parseInt(player.width());
    var barra_2_height = parseInt(barra_2.height());
    var barra_2_width = parseInt(barra_2.width());
    var barra_1_height = parseInt(barra_1.height());
    var barra_1_width = parseInt(barra_1.width());
    
    // otras declaraciones 
    
    var game_over = false;
    
    var score_cont = 0;
    
    var speed = 7;
    var linea_speed = 3;
    
    var move_up = false;
    var move_down = false;
    var move_left = false;
    var move_right = false;
    
    // codigo del juego aqui
    
    
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });
    
    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });
    
    function left() {
        if (game_over === false && parseInt(player.css('left')) > 0) {
            player.css('left', parseInt(player.css('left')) - 7);
            move_left = requestAnimationFrame(left);
        }
    }
    
    function right() {
        if (game_over === false && parseInt(player.css('left')) < container_width - player_width) {
            player.css('left', parseInt(player.css('left')) + 7);
            move_right = requestAnimationFrame(right);
        }
    }
    
    function up() {
        if (game_over === false && parseInt(player.css('top')) > 0) {
            player.css('top', parseInt(player.css('top')) - 7);
            move_up = requestAnimationFrame(up);
        }
    }
    
    function down() {
        if (game_over === false && parseInt(player.css('top')) < container_height - player_height) {
            player.css('top', parseInt(player.css('top')) + 7);
            move_down = requestAnimationFrame(down);
        }
    }
    
    // declaramos anim_id para reiniciar las animaciones y escribimos que es repeat
    
    anim_id = requestAnimationFrame(repeat);
    
    const rollSound = new Audio("Audios/1.wav");

    function repeat(){
     if(game_over === false){

            
        
         barra_izq(barra_1);
         barra_izq(barra_2);
         barra_izq(barra_3);
         barra_izq(barra_4);

         linea_izq(linea_1);
         linea_izq(linea_2);
         linea_izq(linea_3);
         linea_izq(linea_4);
         linea_izq(linea_5);
         linea_izq(linea_6);
         linea_izq(linea_7);
         linea_izq(linea_8);
  


         if (collision(player, barra_1) || collision(player, barra_2) || collision(player, barra_3) || collision(player, barra_4)){
             score_cont++;
             
                      

         }
         document.getElementById("score").innerHTML = score_cont;
    
         anim_id = requestAnimationFrame(repeat);
     }


    
    }

    var sounds;
        function initializeSound(){
        sounds = new HTMLUnknownElement({
            urls: ['/Audios/1.wav','/audios/2.wav','/audios/3.wav','/audios/4.wav'],
            loop: false,
            sprite: {
                piano_1: [0],
                piano_2: [1],
                piano_3: [2],
                piano_4: [3]
            }
        });
   
    }

    if (collision(player, barra_1) ){
       
        sounds.play('piano_1')
        $("#pop1").play();

    }

    if (collision(player, barra_2) ){
       
        sounds.play('piano_2')
                 

    }

    if (collision(player, barra_2) ){
       
        sounds.play('piano_3')
                 

    }

    if (collision(player, barra_2) ){
       
        sounds.play('piano_4')
                 

    }
    

    function linea_izq(linea){
        var linea_actual_izq = parseInt(linea.css('right'));
        if(linea_actual_izq > container_width){
            linea_actual_izq = 0;
        }
        linea.css('right', linea_actual_izq + linea_speed);
    
    
    }
    
    function barra_izq(barra){
        var actual_right = parseInt(barra.css('right'));
    
        if(actual_right > container_width){
            actual_right = 0;
            var barra_top = parseInt(Math.random() * (container_height - barra_1_height));
            barra.css('top', barra_top);
        }
    
        barra.css('right', actual_right + speed);
    
    }
    
    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }
    
    // codigo de colisiones
    
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
    
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    
    });



function newFunction() {
    $('audio#pop')[1].play();
}

