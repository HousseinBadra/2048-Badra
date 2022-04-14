import Grid from './grid.js'
import Tile from './Tile.js'
let gameboard=document.querySelector('.game-board')
let grid=new Grid(gameboard)

grid.randomEmptyCell().tile=new Tile(gameboard)
grid.randomEmptyCell().tile=new Tile(gameboard)

const control=document.querySelector('.control')
function setInput(){
  control.addEventListener('click',handleinput,{once:true})
}
setInput()
 async function handleinput(e){
  const elem=e.target.parentNode
  let quit=false;
  /*elem.classList.contains('moveup') ?  await moveup() : elem.classList.contains('movedown') ? await movedown() : elem.classList.contains('moveright') ? await moveright() :elem.classList.contains('moveleft') ? await moveleft() : quit=true*/
  if(elem.classList.contains('moveup')){
    if(!canmoveup()){
      setInput()
      return
    }
  await moveup()
  }
  else if(elem.classList.contains('movedown')){
    if(!canmovedown()){
      setInput()
      return
    }
    await movedown()
  }
  else if(elem.classList.contains('moveright')){
    if(!canmoveright()){
      setInput()
      return
    }
    await moveright()
  }
  else if(elem.classList.contains('moveleft')){
    if(!canmoveleft()){
      setInput()
      return
    }
    await moveleft()
  }
  else{
    quit=true
  }
  if(quit){
    setInput()
    return
  };
  grid.cells.forEach(cell=>cell.mergeTiles())
  let newone=new Tile(gameboard)
  grid.randomEmptyCell().tile=newone
  if(!canmoveup() && !canmovedown() && !canmoveleft() && !canmoveright()){
    newone.waitfortrans(true).then(()=>{alert('you lose')
      window.location='./'
    })
  }
  else{
  setInput()}
  
 }
 
function moveup(){
  return slideTiles(grid.cellsbyColumn)
  
}
function movedown(){
  return slideTiles(grid.cellsbyColumn.map((grp)=>{
    return [...grp.reverse()]
  }))
}
function moveleft(){
  return slideTiles(grid.cellsbyRow)
}
function moveright(){
  return slideTiles(grid.cellsbyRow.map((grp)=>{
    return [...grp.reverse()]
  }))
}

function slideTiles(cells){
  return Promise.all(
  cells.flatMap((group)=>{
    const promises=[]
    for(let i=1;i<group.length;i++){
      let cell=group[i]
      if(cell.tile ==null || cell.tile== undefined ) continue
      let lastvalid;
    for(let j=i-1;j>=0;j--){
      let movetocell=group[j]
      if(!movetocell.canaccept(cell.tile)) break
      lastvalid=movetocell
    }
    if(lastvalid !=null){
      promises.push(cell.tile.waitfortrans())
      if(lastvalid.tile != null){
        lastvalid.mergetile =cell.tile
      }
      else{
        lastvalid.tile=cell.tile
      }
      cell.tile= null
    }
    }
    return promises
  }))
}

function canmoveup(){
  return canmove(grid.cellsbyColumn)
}
function canmovedown(){
  return canmove(grid.cellsbyColumn.map((grp)=>{
    return [...grp.reverse()]
  }))
}
function canmoveleft(){
  return canmove(grid.cellsbyRow)
}
function canmoveright(){
  return canmove(grid.cellsbyRow.map((grp)=>{
    return [...grp.reverse()]
  }))
}

function canmove(arr){
  return arr.some((grps)=>{
    return grps.some((cell,index)=>{
      if(index==0)return false
      if(cell.tile == null) return false
      const moveto=grps[index-1]
      return moveto.canaccept(cell.tile)
      
    })
  })
}
