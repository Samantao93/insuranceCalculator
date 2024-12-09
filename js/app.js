resultado=document.querySelector('#resultado');

function Seguro(marca,year,tipo){ 
    this.marca = marca.value;
    this.year = year.value;
    this.tipo = tipo.value;
}

const ui = new UI();
function UI(){    
    const btnSubmit = document.querySelector('button[type="submit"]');
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
    
    btnSubmit.addEventListener('click',listener);

}


function listener(e){
    e.preventDefault();
    const marca=document.querySelector('#marca');
    const year=document.querySelector('#year');
    const tipo=document.querySelector('input[name="tipo"]:checked');
    
    const cargando = document.querySelector('#cargando');
    
    if(marca.value==='seleccionar' || year.value==='seleccionar'){
        const mensajeError=document.createElement('P');
        mensajeError.classList.add('error');
        mensajeError.textContent='TODOS LOS CAMPOS SON OBLIGATORIOS, REVISE LA SELECCIÓN';
        resultado.appendChild(mensajeError);

        setTimeout (() => {
            mensajeError.remove();
        },3000)

        return;
    }

    cargando.style.display='block';

    if(document.querySelector('.correcto')){
        document.querySelector('.correcto').remove();
    }

    setTimeout (() => {
        cargando.style.display='none';
        const seguro = new Seguro(marca,year,tipo);
        calculoSeguro(seguro);
    },3000)

}

function calculoSeguro(seguro) {
    const {marca,year,tipo} = seguro;
    let cantidadBase=3000;
    let cantidad=0;
    let marcaReal='';

    switch(marca){  
        case "1":   
            cantidad = cantidadBase * 1.15;
            marcaReal = 'Americano';
            console.log(`Americano: ${cantidad}`);
            break;
        case "2":  
            cantidad = cantidadBase * 1.05;
            marcaReal = 'Asiático';
            console.log(`Asiático: ${cantidad}`);
            break;
        case "3":  
            cantidad = cantidadBase * 1.25;
            marcaReal = 'Europeo';
            console.log(`Europeo: ${cantidad}`);
            break;
        default:
            break;
    }

    switch(tipo){
        case 'basico':
            cantidad *= 1.05;
            console.log(`Basico: ${cantidad}`);
            break;
        case 'completo':
            cantidad *= 1.15;
            console.log(`Completo: ${cantidad}`);
            break;
        default:
            break;
    }

    const yearNow = new Date().getFullYear();

    cantidad=cantidad-(yearNow-year)*20

    const res = document.createElement('DIV');
    res.classList.add('correcto');
    res.innerHTML=`
        RESULTADO DEL SEGURO

        Marca: ${marcaReal};
        Año: ${year};
        Tipo: ${tipo};
        Cantidad: ${Math.round(cantidad)}
    `    
    resultado.appendChild(res);
}

/* ui; */
/* >
< */

