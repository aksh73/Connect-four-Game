var playerA=prompt("Player One: Enter your Name, you will be blue");
var playerB=prompt("Player Two: Enter your Name, you will be red");
var colA="rgb(85, 150, 255)"; //blue
var colB="rgb(237, 45, 75)";//red
//strings in the form of rgb for jquery instead of hex code
var gameOn=true;
var table = $('table tr'); //jquery call to table tr
// table will contain all the tr

// to check at which row and col no did the winner started from
// for debugging purpose
function reportWin(row,col)       // row =row index
{                                 //col=column index
  console.log("you started winning at:");
  console.log(row);
  console.log(col);
}

//grab all the tr of the table, select the given row index and find all the td corresponding to it(7)
//then select the given col index and we will get the desired cell
//.find('button') is used to select the circular region of the button whose radius has been changed.
//without using .find('button') square background will get the colour
function changeColor(row,col,color)
{
  return table.eq(row).find('td').eq(col).find('button').css("background-color",color);
}

function returnColor(row,col) // will return current color of the cell
{
  return table.eq(row).find('td').eq(col).find('button').css("background-color");
}

//this will take column index and return the bottom row index  that is still grey
function checkBottomRow(col)
{
  for(var r=5; r>=0 ; --r)
  {
    var currentColour=returnColor(r,col);
    if(currentColour==='rgb(128, 128, 128)')
    {
      return r;
    }
  }
}

function checkColourMatch(one,two,three,four)
{
  return (one===two && one===three && one===four  && one!=='rgb(128, 128, 128)' && one !==undefined );
}
// undefined: to make sure we dont accidentally check outside the table cells while checking for the win

//horizontal win check function
//for every row 4 checks are to be made
function checkHorizontalWin()
{
  for(var r=0; r<6;++r)
  {
    for(var c=0;c<4;++c)
    {
      if(checkColourMatch(returnColor(r,c) , returnColor(r,c+1) , returnColor(r,c+2) , returnColor(r,c+3)))
      {
        console.log('hor');
         reportWin(r,c);
         return true;
      }
      else
      {
        continue;
      }
    }
  }
}

function checkVerticalWin()
{
  for(var c=0; c<7;++c)
  {
    for(var r=0;r<3;++r)
    {
      if(checkColourMatch(returnColor(r,c) , returnColor(r+1,c) , returnColor(r+2,c) , returnColor(r+3,c)))
      {
        console.log('ver');
         reportWin(r,c);
         return true;
      }
      else
      {
        continue;
      }
    }
  }
}

function checkDiagonalWin()
{
  for(var c=0; c<5;++c)
  {
    for(var r=0;r<7;++r)
    {
      if(checkColourMatch(returnColor(r,c) , returnColor(r+1,c+1) , returnColor(r+2,c+2) , returnColor(r+3,c+3)))
      {
        console.log('diag');
         reportWin(r,c);
         return true;
      }
      else if (checkColourMatch(returnColor(r,c) , returnColor(r-1,c+1) , returnColor(r-2,c+2) , returnColor(r-3,c+3)))
      {
        console.log('diag');
         reportWin(r,c);
         return true;
      }
      else
      {
        continue;
      }
    }
  }
}

var currentPlayer=1;
var currentName=playerA;
var currentColour=colA;
//begin with player1
$('h3').text(playerA+" It is your turn ,pick a column to drop in!" );
$('.hello button').on('click',function(){
  var c=$(this).closest('td').index();          // cwill recognise what column the player clicked on
  //this: what col the player picked on
  // closest: find closest cell to this and find its index
  var bottomRow=checkBottomRow(c);
  changeColor(bottomRow,c,currentColour);
  if(checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin())
  {
    $('h1').text(currentName+" You have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }
//if the flow continues then noone has won till now
  currentPlayer=currentPlayer* -1;

  if(currentPlayer===1)
    {
      currentName=playerA;
      $('h3').text(currentName +" it is your turn.");
      currentColour=colA;
    }
  else
  {
    currentName=playerB;
      $('h3').text(currentName +" it is your turn.");
      currentColour=colB;
  }
})
