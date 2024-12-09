resultado=document.querySelector('#resultado');

function Seguro(marca,year,tipo){ 
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.calculoSeguro = function() {
    const cantidadBase=3000;
    let cantidad=0;
    let marcaReal='';

    switch(this.marca){  
        case "1":   
            cantidad = cantidadBase * 1.15;
            marcaReal = 'Americano';
            break;
        case "2":  
            cantidad = cantidadBase * 1.05;
            marcaReal = 'Asiático';
            break;
        case "3":  
            cantidad = cantidadBase * 1.25;
            marcaReal = 'Europeo';
            break;
        default:
            break;
    }

    let tipoReal='';
    switch(this.tipo){
        case 'basico':
            cantidad *= 1.05;
            tipoReal='Básico'
            break;
        case 'completo':
            cantidad *= 1.15;
            tipoReal='Completo'
            break;
        default:
            break;
    }

    const yearNow = new Date().getFullYear();

    cantidad-=(yearNow-this.year)*20

    return [cantidad,marcaReal,tipoReal];
}

function UI(){}

UI.prototype.seleccionYear = function() {
    const year=document.querySelector('#year');

    const yearNow = new Date().getFullYear();
    for(i=yearNow+1;i >= yearNow-10; i--){
        const option = document.createElement('option');
        if(i === yearNow+1){
            option.value='seleccionar';
            option.textContent = '- Seleccionar -';
        }else {
            option.value=i;
            option.textContent = i;
        }        
        year.appendChild(option);        
    }
}

UI.prototype.mostrarResultado = function(seguro,total,marcaReal) {
    const res = document.createElement('DIV');
    res.classList.add('mt-10','invento');
    
    res.innerHTML=`
    <p class='header'>CÁLCULO DEL SEGURO</p>
    <p class='font-bold'>Marca: <span class='font-normal'> ${marcaReal}</span></p>
    <p class='font-bold'>Año: <span class='font-normal'>${seguro.year}</span></p>
    <p class='font-bold'>Tipo: <span class='font-normal capitalize'>${seguro.tipo}</span></p>
    <p class='font-bold'>Total: <span class='font-normal'>${Math.round(total)} €</span></p>
    `    
    resultado.appendChild(res);
}

UI.prototype.eliminarError = function() {
    if(document.querySelector('.invento')){
        document.querySelector('.invento').remove();
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.seleccionYear();
})

eventListeners();
function eventListeners(){
    const btnSubmit = document.querySelector('button[type="submit"]');
    btnSubmit.addEventListener('click',validacion);
}


function validacion(e){
    e.preventDefault();
    const marca=document.querySelector('#marca').value;
    const year=document.querySelector('#year').value;
    const tipo=document.querySelector('input[name="tipo"]:checked').value;    
    
    const cargando = document.querySelector('#cargando');

    ui.eliminarError();
    
    if(marca==='seleccionar' || year==='seleccionar'){
        const mensajeError=document.createElement('P');
        mensajeError.classList.add('mensaje','error','mt-10');
        mensajeError.textContent='TODOS LOS CAMPOS SON OBLIGATORIOS, REVISE LA SELECCIÓN';
        resultado.appendChild(mensajeError);

        setTimeout (() => {
            mensajeError.remove();
        },3000)

        return;
    }

    cargando.style.display='block';

    setTimeout (() => {
        cargando.style.display='none';
        const seguro = new Seguro(marca,year,tipo);
        const total = seguro.calculoSeguro()[0];   
        const marcaReal = seguro.calculoSeguro()[1];      

        ui.mostrarResultado(seguro,total,marcaReal);
    },3000)

}



/* ui; */
/* >
< */

