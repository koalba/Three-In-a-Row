'use strict'

let d = document

let nodeMain = d.querySelector('.playScreen__tablero')
let winMenuP1 = d.querySelector('.winMenuP1')
let winMenuP2 = d.querySelector('.winMenuP2')

let tableroRows = []
let tableroColumns = []
let tableroDiagonales = [[], []]

let last = 'x'
let clickCounter = 0

let points_p1 = 0
let points_p2 = 0

let players = [
    {
        name: 'PLAYER-1',
        points: 0
    },
    {
        name: 'PLAYER-2',
        points: 0
    }
]

function createTablero( param_celdas ){

    let nodeTablero = d.createElement('ul')
    nodeTablero.classList.add('tablero')

    if(last === 'x'){
        nodeTablero.classList.add('p1-turn')
    } else {
        nodeTablero.classList.add('p2-turn')
    }

    nodeTablero.setAttribute('style', `--columns: ${param_celdas}`)

    for( let i = 0; i < param_celdas; i++){

        let nodeRow = d.createElement('div')
        nodeRow.classList.add('tablero__row')

        for(let c = 0; c < param_celdas; c++){
            let nodeCelda = d.createElement('div')
            nodeCelda.classList.add('tablero__celda')
            nodeCelda.dataset.row = i
            nodeCelda.dataset.column = c

            nodeCelda.addEventListener('click', function(){
    
                if(this.innerHTML === ''){
                    this.innerHTML = '<div class="ficha"></div>'
                    this.classList.add('active')

                    addTablero( param_celdas , this)
                }
    
            })

            nodeRow.appendChild(nodeCelda)
        }

        nodeTablero.appendChild(nodeRow)

    }

    nodeMain.appendChild(nodeTablero)

    tableroRows = []
    tableroColumns = []
    tableroDiagonales = []

    for(let t = 0; t < param_celdas; t++){
        tableroRows.push([])
        tableroColumns.push([])
        for(let t2 = 0; t2 < param_celdas; t2++){
            tableroRows[t].push('')
            tableroColumns[t].push('')
        }
    }

}


function addTablero( param_celdas , elemento){
    let row = elemento.dataset.row
    let column = elemento.dataset.column
    
    if(tableroRows[row][column] === ''){
        let ficha = elemento.querySelector('.ficha')
        if(last === 'x'){
            last = 'O'
            ficha.classList.add('ficha--j1')
            clickCounter ++
            d.querySelector('.tablero').classList.remove('p1-turn')
            d.querySelector('.tablero').classList.add('p2-turn')
        } else {
            last = 'x'
            ficha.classList.add('ficha--j2')
            clickCounter ++
            d.querySelector('.tablero').classList.remove('p2-turn')
            d.querySelector('.tablero').classList.add('p1-turn')
        }

        ficha.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
            </svg>
            `

        tableroRows[row][column] = last
        tableroColumns[column][row] = last
        diagonal( param_celdas )
    }

    checkTablero( param_celdas )
}

function diagonal( param_celdas ){
    let diagonal_1 = []
    let diagonal_2 = []

    for(let i = 0; i < param_celdas; i++){
        diagonal_1.push(tableroRows[i][i])
        diagonal_2.push(tableroRows[i][(param_celdas - 1)-i])
    }

    tableroDiagonales[0] = diagonal_1
    tableroDiagonales[1] = diagonal_2
}

function checkTablero( param_celdas ){

    let conditionJ1 = (element) => element === 'x'
    let conditionJ2 = (element) => element === 'O'

    for( let i = 0; i < param_celdas; i++){

        if (tableroRows[i].every( conditionJ2 ) === true || tableroColumns[i].every( conditionJ2 ) === true || ( i < 2 && tableroDiagonales[i].every( conditionJ2 ) === true)){

            last = 'x'
            addPoints( 'p1' )

            winMenuP1.classList.add('active')

            let refTime = setTimeout(function(){
                d.querySelector('.tablero').remove()
            }, 500)

            return

        } else if(tableroRows[i].every( conditionJ1 ) === true || tableroColumns[i].every( conditionJ1 ) === true || ( i < 2 && tableroDiagonales[i].every( conditionJ1 ) === true)){

            last = 'O'
            addPoints( 'p2' )

            winMenuP2.classList.add('active')

            let refTime = setTimeout(function(){
                d.querySelector('.tablero').remove()
            }, 500)

            return

        }
    }

    checkEmpate( param_celdas )

}

function checkEmpate( param_celdas, number){
    if( clickCounter === param_celdas*param_celdas){
        last = "x"

        evenMenu.classList.add('active')

        let refTime = setTimeout(function(){
            d.querySelector('.tablero').remove()
        }, 500)

    }
}

function addPoints( player ){

    if( player === 'p1' ){
        points_p1 ++
    } else if ( player === 'p2' ){
        points_p2 ++
    }

    d.querySelector('#p1-counter').innerHTML = points_p1
    d.querySelector('#p2-counter').innerHTML = points_p2
}

d.querySelector('#p1-input').onkeyup = function(){
    if(this.value !== ''){
        d.querySelectorAll('.player--1').forEach(element => element.innerHTML = this.value.toUpperCase())
    } else {
        d.querySelectorAll('.player--1').forEach(element => element.innerHTML = 'PLAYER -1')
    }
}

d.querySelector('#p2-input').onkeyup = function(){
    if(this.value !== ''){
        d.querySelectorAll('.player--2').forEach(element => element.innerHTML = this.value.toUpperCase())
    } else {
        d.querySelectorAll('.player--2').forEach(element => element.innerHTML = 'PLAYER-2')
    }
}

d.querySelectorAll('.restart').forEach( element => element.addEventListener('click', function(){
    points_p1 = 0
    points_p2 = 0
    addPoints('')

    last = 'x'
    clickCounter = 0;

    startMenu.classList.remove('hidden')
    evenMenu.classList.remove('active')
    d.querySelectorAll('.winMenu').forEach( element => element.classList.remove('active'))
}))

d.querySelectorAll('.start').forEach(element => element.addEventListener('click', function(){

    clickCounter = 0

    startMenu.classList.add('hidden')
    evenMenu.classList.remove('active')
    createTablero(+this.value)
    d.querySelectorAll('.winMenu').forEach( element => element.classList.remove('active'))

}))