const fs = require('fs');

//Lectura del archivo de texto
var texto = fs.readFileSync("./assets/texto.txt", {encoding:"utf-8"});
const token = texto.split(' ');

//Se imprime la informacion del archivo en el siguiente orden: Nombre del almacen, valor neto de las compras, valor neto de las devoluciones
//Aqui se hace la suposicion de que esta información la provee el archivo de texto
//Los tokens separadores son un espacio vacio ' '
console.log(token);

//Declaracion de variables
var cont = 1;
var nombre = ' ';
var neto = 0;
var devolucion = 0;

//Ciclo que recorre los tokens
for (const objeto in token)
{
    const dato = token[objeto];

    if(cont == 1)
    {
        nombre = dato;
        cont = cont+1;
    }
    else if(cont == 2)
    {
        neto = dato;
        cont = cont+1;
    }
    else
    {
        devolucion = dato;
        cont = 1;
        //Evaluacion de los datos de un almacen para saber si es o no aplicable al descuento e impresion del resultado
        if (neto>500 && devolucion<(neto*0.15))
        {
            console.log('El almacen ',nombre,' es aplicable para el 8% de descuento');
        }
        else if (neto<500)
        {
            console.log('El almacen ',nombre,' no es aplicable para el descuento porque el valor neto no es de minimo 500');
        }
        else
        {
            console.log('El almacen ',nombre,' no es aplicable para el descuento porque las devoluciones superan el 15% del valor neto');
        }
        console.log(' ');
    }
}