'use strict';
let elementYouPressed = document.querySelector('#youPressed');
let elementKeyCode = document.querySelector('#keyCode');
let lastSevenKeysHistory = [];
let keysHistorySize = 21;
let elementHistoryLast7KeyPresses = document.querySelector('#historyLast7KeyPresses');

document.addEventListener('keydown', function(e){
  // console.log(e, e.key, e.ctrlKey, e.keyCode);
  // console.log(getKeyPressedAndKeyCode(e));
  let {keyPressed, keyCode} = getKeyPressedAndKeyCode(e);
  // console.log(keyCode, keyPressed);
  elementYouPressed.innerHTML=`You pressed &nbsp;<span class='keyPressed historyItem'>${keyPressed}<span>`;
  elementKeyCode.innerHTML = keyCode;
  elementKeyCode.className = 'historyItem keyPressed';

  
  updateHistoryLastNKeys(keyPressed);
});


function getKeyPressedAndKeyCode(e){
  let keyPressed = "";
  let keycode=null;
  if(e.ctrlKey && e.altKey){
    keyPressed = `Ctrl + Alt`;
    if(e.key.toLocaleLowerCase() !== 'alt'){
      keyPressed += ` + ${e.key}`;
    }     
  }else if(e.ctrlKey || e.altKey){
    if(e.ctrlKey){
      keyPressed = `Ctrl`;
    }else{
      keyPressed = `Alt`;
    }
    if(e.key.toLocaleLowerCase() !== 'alt' && e.key.toLocaleLowerCase() !== 'control'){
      keyPressed += ` + ${e.key}`;
    } 
  }else if(e.shiftKey){
    keyPressed = `Shift`;
    if(e.key.toLocaleLowerCase() !== 'shift'){
      keyPressed += ` + ${e.key}`;
    } 
  }else{
    keyPressed = e.key;
  }
  keycode = e.keyCode;
  
  return {keyPressed: keyPressed, keyCode: keycode};
}


function updateHistoryLastNKeys(keyPressed){
  console.log(lastSevenKeysHistory);
  lastSevenKeysHistory.push(keyPressed);
  if(lastSevenKeysHistory.length >=keysHistorySize){
    lastSevenKeysHistory.shift();
  }

  elementHistoryLast7KeyPresses.innerHTML="";
  for(let key of lastSevenKeysHistory){
    let li = document.createElement('li');
    li.className='keyPressedHistory';
    let textNode= document.createTextNode(key);
    li.appendChild(textNode);
    elementHistoryLast7KeyPresses.appendChild(li);
    console.log(key);
  }
  
}