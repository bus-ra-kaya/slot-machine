const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  "A" :{count: 3},
  "B" :{count: 4},
  "C" :{ count: 6},
  "D" : {count: 8}
};

let balance= {total:0, amount:0};
let triesLeft =1;

gameStart = (lastBalance=0) => {
  let amount = parseInt (document.getElementById("balanceInput").value);
  let total = amount+lastBalance;
    return {total,amount};
}

const symbolList = () => {
  const symbols = [];
  for (const[symbol,{count,}] of Object.entries(SYMBOLS_COUNT)){
    for (let i= 0; i < count; i++){
      symbols.push(symbol);
    }
  }
  return symbols;
}
const reels = (symbols) => {
  const reelSymbols = [...symbols];
const reels = [];
for (let i=0;i <COLS; i++) {
  reels.push([]);
  for (let j=0;j<ROWS; j++) {
    const randomIndex = Math.floor(Math.random()* reelSymbols.length)
    const selectedSymbol = reelSymbols[randomIndex];
    reels[i].push(selectedSymbol);
    reelSymbols.splice(randomIndex,1);
  }
}
return reels;
}

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printReels = (reels) => {
  for (let i=0; i< ROWS; i++){
    for (let j=0; j <COLS; j++){
      let link; 
      switch (reels[i][j]){
      case ("A"):
        link = 'icons/icons8-euro-money-50.png';
        break;
      case ("B"):
        link = 'icons/icons8-money-box-50.png';
        break;
      case ("C"): 
      link = 'icons/icons8-split-money-50.png';
      break;
      case ("D"):
      link = 'icons/icons8-money-with-wings-50.png';
      break;
      }
      
      document.getElementById('reel'+ (i+1) +(j+1)).innerHTML ='<img src= "' + link +  '" alt="icon">';
    
  }
}
}

SpinResult = (reels,bal) => {
  let winLines =0;
  for (let i=0; i <ROWS; i++){
      if(reels[i][0] == reels[i][1] && reels[i][1] == reels[i][2]){
        winLines +=1
      }
    }
 bal *= winLines;
return {winLines, bal};
}

game = () => {
 
  const symbols = symbolList();
  const reelList = reels(symbols);
  const TransposedReels = transpose(reelList);
  printReels(TransposedReels);
  runResult = SpinResult(reelList,balance.amount);

  if (runResult.winLines >= 1){
  document.getElementById('modalOutcome').style.display= 'flex';
  document.getElementById('winLoseText').innerHTML = "Looks like you've made " +runResult.bal + " dollars! Added to your account.";
    balance.total += runResult.bal;
  document.getElementById('balance').innerHTML = "Bal: " + (balance.total) + "$";
   }
  else {
  triesLeft--;
  if (triesLeft >= 0){
  document.getElementById('winLoseText').innerHTML = "Looks like you weren't lucky :< I'll let you try again!";
  document.getElementById('modalOutcome').style.display= 'flex';
  }
  else {
      
        balance.total -= balance.amount;
        document.getElementById('balance').innerHTML = "Bal: " + (balance.total) + "$";    
        document.getElementById('loseText').innerHTML = "Aw sorry babe, not your lucky day it seems. ";
        document.getElementById('SecondLoss').style.display= 'flex';
      triesLeft = 1;
    }
  }
}

document.getElementById('submitButton').addEventListener('click', () => {
  document.getElementById('modal2').style.display='none'; 
  balance = gameStart(balance.total);
  document.getElementById('balance').innerText = `Bal: $${balance.total}`;
}
  );
document.getElementById('spin-button').addEventListener('click', () => game());

document.getElementById('modal').addEventListener('click', () =>{
   document.getElementById('modal2').style.display='flex'; 
   document.getElementById('modal').style.display='none';});

document.getElementById('modalOutcome').addEventListener('click', () => {
  document.getElementById('modalOutcome').style.display='none';
})

document.getElementById('SecondLoss').addEventListener('click',() => {
  document.getElementById('modal2').style.display= 'flex'; 
  document.getElementById('SecondLoss').style.display='none';
})

