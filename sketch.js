var largeur = 900; 
var hauteur = 900; 
var diametre = 100; 
var posX = 50;
var posY = 50;
var small = 40;
var posObstacleX = [];
var posObstacleY = [];
var direction =    [];
var h_v =          [];
var gauche_droite =[1, -1];
var nombre_ennemies = 5;
var game_over = false;
var score_final;



function setup() {
    createCanvas(largeur, hauteur);
    frameRate(60)
    for (var index=0; posObstacleX.length<nombre_ennemies; index++){
        posObstacleX.push(random(largeur));
        posObstacleY.push(random(largeur));
        direction.push(round(random(1,2)));
        
        
        let r=random(10);
        if(r>5){
            h_v.push(-1);
        }
        else{
            h_v.push(1);
        }
    }

}


function draw() {
    if(game_over==false){
    background(0);
    nom();
    timer();
    update_position_cercle();
    dessiner_cercle();
    test_collision();
    obstacle(); 
    block_out_of_screen();
    }
    else{
        background(0);
        stroke(175);
        strokeWeight(3);
        fill(0,255,0);
        textSize(50);
        text('GAME OVER \n votre score:' + score_final,300,400);
    }
}

function dessiner_cercle(){
    push();

    noFill();
    stroke(113, 255, 41 );
    strokeWeight(4);
    ellipse(posX,posY,diametre, diametre);
    
    pop();

}

function nom(){
    push();
    stroke(175);
    strokeWeight(15);
    fill(0,255,0);
    textSize(50);
    text('SPACE INVADER', 250,450);
    pop();
}
 

function update_position_cercle(){
    
    if (keyIsDown(RIGHT_ARROW)){
 
        posX=posX+5;
     }
     
     if (keyIsDown(DOWN_ARROW)){

         posY=posY+5;
      }
     
      if (keyIsDown(LEFT_ARROW)){

         posX=posX-5;
      }
     
     if (keyIsDown(UP_ARROW)){

         posY=posY-5;
      }

}

function block_out_of_screen(){
    push();
    if (posX-diametre/2<0){
        posX=0+diametre/2;
        stroke(255,0,0);
        strokeWeight(10);
        line( 0,900,0,0); 
    }
    else if(posX+diametre/2>900){
        posX =900-diametre/2;
        stroke(255,0,0);
        strokeWeight(10);
        line(900,0,900,900);
    }

    if(posY-diametre/2<0){
        posY=0+diametre/2;
        stroke(255,0,0);
        strokeWeight(10);
        line(0,0,900,0);
    }
    else if(posY+diametre/2>900){
        posY=900-diametre/2;
        stroke(255,0,0);
        strokeWeight(10);
        line(900,900,0,900);
    }
    strokeWeight(4);

    pop();
    

}

function obstacle(){
    push();

    for (var index=0; index<posObstacleX.length; index++){
        if(h_v[index]==1){
            posObstacleX[index] = posObstacleX[index] + direction[index] * 5 ;
            if (posObstacleX[index]>900){
            direction[index]=direction[index]*-1;
            }

            if(posObstacleX[index]<0){
            direction[index]=direction[index]*-1;
            }
        }

        else if(h_v[index]==-1){
            posObstacleY[index] = posObstacleY[index] + direction[index] * 5 ;
            if (posObstacleY[index]>900){
            direction[index]=direction[index]*-1;
            }

            if(posObstacleY[index]<0){
            direction[index]=direction[index]*-1;
            }
        }
        stroke(255);
        fill(0,255,0);
        circle(posObstacleX[index],posObstacleY[index],small);
    }
    pop();
}

function test_collision(){
    push();
    for (var index=0; index<posObstacleX.length; index++){

        let d= dist(posX,posY,posObstacleX[index],posObstacleY[index]);
        let millisecond = millis();

        if(d<70){
            stroke(0,255,0);
            strokeWeight(3);
            fill(255,0,0);
            ellipse(posX,posY,diametre, diametre); 
            score_final= round(millisecond/1000);
            game_over = true;   
        }
    }
    pop();
}

function timer(){
    push();
    let millisecond = millis();
    textSize(45);
    fill(0,255,0);
    noStroke();
    text('Score: \n' + round(millisecond/1000), 350, 800);
    pop();

}
