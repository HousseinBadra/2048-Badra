export default class Tile{
  #tileElement
  #x
  #y
  #value
  constructor(tilecontainer,value = Math.random() >0.5 ? 2: 4){
  this.#tileElement=document.createElement('div')
  this.#tileElement.classList.add('tile')
  this.value=value
  tilecontainer.appendChild(this.#tileElement)
  }
  get value(){
    return this.#value
  }
  set value(v){
    this.#value=v
    this.#tileElement.textContent=v
    let bglightness=100-Math.log(v)*9
    this.#tileElement.style.setProperty('--background-lightness',`${bglightness}%`)
    this.#tileElement.style.setProperty('--text-lightness',`${bglightness<50 ? 90 :10}%`)
  
  }
  set x(values){
    this.#x=values
    this.#tileElement.style.setProperty('--x',values)
    //this.#tileElement.style.left=`${2 + 22*values}vmin`
  }
  set y(values){
    this.#y=values
    this.#tileElement.style.setProperty('--y',values)
 //   this.#tileElement.style.top=`${2+22*values}vmin`
  }
  remove(){
    this.#tileElement.remove()
  }
  waitfortrans(animation =false){
    return new Promise(resolve =>{
    this.#tileElement.addEventListener(animation ? 'animationend' : 'transitionend',resolve,{once:true})
  })
}
}
