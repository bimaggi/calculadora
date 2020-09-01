(function(win,doc){
    'use strict'
let $visor=doc.querySelector('[data-js="tela"]')
let $numbers=doc.querySelectorAll('[data-js="button number"]')
let $operator=doc.querySelectorAll('[data-js="operadores"]')
let $clean=doc.querySelector('[data-id="clean"]')
let $equal=doc.querySelector('[data-id="equal"]')
    



Array.prototype.forEach.call($numbers,function(button){
    button.addEventListener('click',inseriNumeroNoVisor,false)
})
Array.prototype.forEach.call($operator,function(button){
    button.addEventListener('click',inserirOperadorNoVisor,false)
})
$clean.addEventListener('click',limparvisor,false)

$equal.addEventListener('click',calcular,false)




function inseriNumeroNoVisor(){
    $visor.value += this.value
   }

function inserirOperadorNoVisor(){
    $visor.value=removeUltimoOperador($visor.value)
    $visor.value += this.value
}
function removeUltimoOperador(number){  
    if( verificarSeUltimoValoréumOperador(number)){
            return number.slice(0,-1)
    }
    return number
    
}
function verificarSeUltimoValoréumOperador(number){
   let todosOperadores=['+','-','*','/','=']
   let ultimoValor=number.split('').pop()
   return todosOperadores.some(function(operador){
       return operador === ultimoValor
   })
}
 
function limparvisor(){
    $visor.value = '0'
}

function calcular(){
   $visor.value=removeUltimoOperador($visor.value); 
   let todosValores= $visor.value.match(/\d+[+ \- * /]?/g);
   $visor.value= todosValores.reduce(function(acumulado,atual){
   let primeiroValor= acumulado.slice(0,-1);
   let operador=acumulado.split('').pop()
   let ultimoValor=removeUltimoOperador(atual)
   let ultimoOperador=verificarSeUltimoValoréumOperador(atual) ? atual.split('').pop() :'';
   
   switch(operador){
       case '+':
           return (+(primeiroValor) + +(ultimoValor)) + ultimoOperador;
           break;
           case '-':
               return (+(primeiroValor) - +(ultimoValor)) + ultimoOperador;
               break;
               case '*':
                    return (+(primeiroValor) * +(ultimoValor)) + ultimoOperador;
                    break;
                    case '/':
                       return (+(primeiroValor) / +(ultimoValor)) + ultimoOperador;
                        break;
       } 
     })
     
     
}
})(window,document)




