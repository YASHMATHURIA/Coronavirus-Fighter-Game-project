function load_image()
{
    virus = new Image;
    virus.src = "assests/v1.png";
    player_image= new Image;
    player_image.src = "assests/superhero.png";
    gem_image =new Image;
    gem_image.src = "assests/gemm.png";
}
function init()
{
    canvas =document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    Wid=700;
    Heig=400;
    canvas.width= Wid;
    canvas.height=Heig; 
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed :20,
    };
    e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed :30,
    };
    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed :40,
    };
    enemy= [e1,e2,e3];
    player={
        x : 20,
        y : Heig/2,
        w : 60,
        h: 60,
        speed :20,
        moving :"false",
    }
    gem={
        x : Wid-100,
        y : Heig/2,
        w : 60,
        h: 60,
    }
    canvas.addEventListener('mousedown',function()
    {
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function()
    {
        player.moving = false;
    });
    score = 0;
    game_over= false;
}

function draw()
{
    pen.clearRect(0,0,Wid,Heig);
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    for(let i=0;i<enemy.length;i++)
  {
    pen.drawImage(virus,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h); 
  }

  pen.fillText("score "+ score,10,10);
}

function colliding(b1,b2)
{
   if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30)
   {
       return true;
   }
   return false;
}
function update()
{
    if(player.moving==true)
    {
        player.x=player.x+player.speed;
        score =score +20;
    }
    
    for(let i=0;i<enemy.length;i++)
    {
         if(colliding(enemy[i],player)==true)
        {
          score=score- i*100;
          if(score<0)
          {
              game_over=true;
              alert("Game Over");
          }
        }
    }

    if(colliding(gem,player)==true)
    {
        game_over=true;
        draw();
     alert("You score "+ score);
    }
    for(let i=0;i<enemy.length;i++)
    {
     enemy[i].y = enemy[i].y+enemy[i].speed;
     if(enemy[i].y>Heig-enemy[i].h || enemy[i].y<0)
     {
         enemy[i].speed = enemy[i].speed*-1;
     }
    }
}

function gameloop()
{
    if(game_over==true)
    {
       clearInterval(f);
    }
    draw();
    update();
}
load_image();
init();
var f=setInterval(gameloop,100);