document.addEventListener("DOMContentLoaded",function(){
    crearGaleria();//para que se cree la galeria luego de que cargue todo
    navFija();//para que observe un elemento
});

function crearGaleria(){
    const galeria = document.querySelector(".galeriaImagenes");

    for(let i = 1; i <=12; i++){//RECORREMOS CON UN FOR DESDE 1 = 1RA IMAGEN HASTA 12=UTLIMA IMG INCLUSIVE
        const imagen = document.createElement("IMG");//CREAMOS 1 VARIABLE DE IMAGEN
        imagen.src = `build/img/thumb/${i}.webp`;//esto sera el url de la img y creara 1 img por cad i q haya
            
        //AÑADIMOS LA FUNCION MOSTRARIMAGEN
        imagen.onclick = mostrarImagen;//le asignamos la funcion al evento pnclick
        imagen.dataset.imagenId = i;//ACA LE ASIGNAMOS UN NUEVO ATRIBUTO A CADA IMAGEN = I = NUMERO DE ITERACION
        const lista = document.createElement("LI");//CREAMOS 1 LI POR CADA IMG
        lista.appendChild(imagen);//GUARDAMOS LA IMAGEN EN LA LISTA
        galeria.appendChild(lista);//GUARDAMOS LOS LI EN LA "GALERIA" O UL PADRE
    }
}
function mostrarImagen(e){//parametro e
    console.log(e.target.dataset.imagenId);//e.target es a q le dimos click, con dataset leemos ese atributo;
    const id = parseInt ( e.target.dataset.imagenId); //convertimos el id en un tipo number
    const imagenG = document.createElement("IMG");//CREAMOS OTRA IMAGEN
    imagenG.src = `../build/img/grande/${id}.webp`;//LE PASAMOS LA UBICACION DE LA IMAGEN DEPENDIENDO SU ID;
    
    const overlay = document.createElement("DIV");//creamos un div para "cubrir" el html
    overlay.appendChild(imagenG);//metemos la img creada en esta func en el overlay
    overlay.classList.add("overlay");//le creamos una clase al overlay

    //PARA CERRAR LA IMAGEN
    const cerrarImg = document.createElement("P");
    cerrarImg.textContent = "X";
    cerrarImg.classList.add("botonCerrar");
    overlay.appendChild(cerrarImg);//lo añadimos al overlay

    function remove(){//FUNCION PARA ELIMIAR LA CLASE QUE AGREGA OVERFLOW HIDDEN
        overlay.remove();
        body.classList.remove("fijarBody");
    }
    //AL PRESIONAR LA X Y EL OVERLAY CERRAR 
    overlay.onclick = remove;//al hacer click en el overlay se cierra tambien
    cerrarImg.onclick = remove; //creamos la arrow para q al hacer click se "elimine" el overlay

    //MOSTRAR LA IMG DEL OVERLAY EN HTML
    const body = document.querySelector("body");//directamente en el body metemos el overlay
    body.appendChild(overlay);
    body.classList.add("fijarBody");//FIJAMOS EL BODY AL HACER SCROLL CUANDO ESTAMOS EN EL OVERLAY
    //EN CSS AGREGAMOS OVERFLOW:HIDDEN;
}

function navFija(){
    const barra = document.querySelector(".header");//el menu de navegacion
    //RESGISTRAR LA INTERSECCION A OBSERVAR
    //entries nos dara la informacion del elem a observar
    const observer = new IntersectionObserver(function(entries){
        //isIntersecting es un valor de entries, este nos dice T o F si esta visible o no
        if(entries[0].isIntersecting){
            barra.classList.remove("fijo");//si el elemento esta visible le sacamos la clase
        }else{
            console.log("desaparecio");
            barra.classList.add("fijo");//si no esta visible le agregamos la clase 
        }
    })
    //ELEMENTO A OBSERVAR
    //metodo observe es del mismo new InterseccionObserver toma 1 elem a observar
    observer.observe(document.querySelector(".festival"))
}