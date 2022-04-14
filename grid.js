const Grid_size=4;
const Cell_size=20;
const Cell_gap=2;




export default class Grid{
  #cells
  
  constructor(gridelement){
    gridelement.style.setProperty('--cell-size',`${Cell_size}vmin`)
    gridelement.style.setProperty('--grid-size',`${Grid_size}`)
    gridelement.style.setProperty('--gap',`${Cell_gap}vmin`)
    this.#cells=createCellElements(gridelement).map((cellelement,index)=>{
      return new Cell(cellelement,index%Grid_size,Math.floor(index/Grid_size))
    
    })
  }
  get cellsbyColumn(){
   /* return this.#cells.reduce((cellsgrid,cell)=>{
      cellsgrid[cell.x] =cellsgrid[cell.x] ||[]
      cellsgrid[cell.y][cell.x] =cell
      return cellsgrid
    },[])*/
    return this.#cells.reduce((cellgrid,cell)=>{
      cellgrid[cell.x][cell.y]=cell
      return cellgrid
    },[[],[],[],[]])
  }
  get cellsbyRow(){
   /* return this.#cells.reduce((cellsgrid,cell)=>{
      cellsgrid[cell.y] =cellsgrid[cell.y] ||[]
      cellsgrid[cell.y][cell.x] =cell
      return cellsgrid
    },[])*/
    return this.#cells.reduce((cellgrid,cell)=>{
      cellgrid[cell.y][cell.x]=cell
      return cellgrid
    },[[],[],[],[]])
  }
  get cells(){
    return this.#cells
  }
  get #emptyCells(){
    return this.#cells.filter(cell =>  cell.tile == null)
  }
  randomEmptyCell(){
    const randomIndex=Math.floor(Math.random()* this.#emptyCells.length)
    return this.#emptyCells[randomIndex]
  }
  
}

class Cell{
  #cellElement
  #x 
  #y
  #tile
  #mergetile
  constructor(cellElement,x,y){
    this.#x=x
    this.#y=y
    this.#cellElement=cellElement
  }
  get x(){
    return this.#x
  }
  get y(){
    return this.#y
  }
  get tile(){
    return this.#tile
  }
  set tile(value){
    this.#tile =value
    if (this.#tile==null) return
    this.#tile.x=this.#x
    this.#tile.y=this.#y
  }
  get mergetile(){
    return this.#mergetile
  }
  set mergetile(value){
    this.#mergetile=value
    if(value ==null ) return
    this.#mergetile.x=this.#x
    this.#mergetile.y=this.#y
  }
  canaccept(tiles){
    if (this.tile === null || this.tile == undefined) return true
    return  (this.mergetile==null  && this.#tile.value==tiles.value)
  }
  mergeTiles(){
    if(this.tile==null ||this.mergetile == null) return
    this.tile.value =this.tile.value *2
    this.mergetile.remove()
    this.mergetile=null
  }
  
}


function createCellElements(gridelement){
  let arr=[]
  for(let i=0;i<Grid_size * Grid_size;i++){
    const elem=document.createElement('div')
    elem.classList.add('cell')
    gridelement.appendChild(elem)
    arr.push(elem)
  }
  return arr
}
