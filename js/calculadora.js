/*********************************
Autor: José Carmona Cervera
Fecha creación: 30/11/2020
Última modificación: 10/12/2020 
Versión: 1.00
***********************************/
window.addEventListener('load', () => {


    var mArriba = document.querySelector("#mostradorArriba"); //La pantalla superior con datos para el usuario.
    var mAbajo = document.querySelector("#mostradorAbajo");//La pantalla inferior con datos para el usuario.
    var listoParaBorrar = false; //Cuando damos el resultado de una operación y escribimos otro número, ese nuevo número inicia otra operación.
    var operador //para los distintos operadores a la hora de hacer operaciones sencillas.
    var primerNum; //para guardar el primer número de las operaciones.
    var segunNum; //para guardar el segundo número de las operaciones.
    var tieneComa = false; //para comprobar si tiene coma.


    /**
     * Los distintos listener para cada uno de los botones numéricos y la coma. 
     **/
    document.querySelector("#nueve").addEventListener('click', () => {
        seleccionar(9);
    })
    document.querySelector("#ocho").addEventListener('click', () => {
        seleccionar(8);
    })
    document.querySelector("#siete").addEventListener('click', () => {
        seleccionar(7);
    })
    document.querySelector("#seis").addEventListener('click', () => {
        seleccionar(6);
    })
    document.querySelector("#cinco").addEventListener('click', () => {
        seleccionar(5);
    })
    document.querySelector("#cuatro").addEventListener('click', () => {
        seleccionar(4);
    })
    document.querySelector("#tres").addEventListener('click', () => {
        seleccionar(3);
    })
    document.querySelector("#dos").addEventListener('click', () => {
        seleccionar(2);
    })
    document.querySelector("#uno").addEventListener('click', () => {
        seleccionar(1);
    })
    document.querySelector("#cero").addEventListener('click', () => {
        seleccionar(0);
    })
    document.querySelector("#coma").addEventListener('click', () => {
        if (!tieneComa) {
            seleccionar(".");
            tieneComa = true;
        }
    })

    /**
     * @description Función para mostrar los números en el mostrador, controlando si vamos a meter un número nuevo o añadir información al ya introducido.
     * @param num El número que queremos mostrar en el mostrador.
     **/
    function seleccionar(num) {
        if (!listoParaBorrar) {
            if (mAbajo.value === "0") {
                mAbajo.value = num;
            }
            else {
                mAbajo.value += num;
            }
        } else { //Lo que estaba en mAbajo estaba listo para ser borrado.
            mAbajo.value = num;
            listoParaBorrar = false;
        }
    }
    /**
     * @description Función para controlar el uso de los botones de operación basicos.
     * @param operadorIntroducido El operador que vamos a usar.
     **/
    function usarOperador(operadorIntroducido) {
        if (listoParaBorrar) {
            if (!isNaN(parseFloat(mAbajo.value))) {
                operador = operadorIntroducido;
                primerNum = mAbajo.value;
                mArriba.value = `${primerNum} ${operador}`;
            }
        }
        else {
            if (isNaN(primerNum)) {
                listoParaBorrar = true;
                tieneComa = false;
                operador = operadorIntroducido;

                if (mAbajo.value != "") {
                    primerNum = parseFloat(mAbajo.value);
                    mArriba.value = `${primerNum} ${operador}`;
                }
            }
            else {

                if (listoParaBorrar) {
                    operador = operadorIntroducido;
                    mArriba.value = `${primerNum} ${operador}`;
                } else {

                    primerNum = resultado();
                    mAbajo.value = primerNum;
                    operador = operadorIntroducido;
                    mArriba.value = `${primerNum} ${operador}`;
                    listoParaBorrar = true;
                    tieneComa = false;
                }
            }
        }
    }

    /**
     * @description Función para darnos el resultado en caso de operaciones básicas.
     **/
    function resultado() {
        if (!isNaN(primerNum)) {
            segunNum = parseFloat(mAbajo.value);
            switch (operador) {

                case "+":
                    return primerNum + segunNum;
                case "-":
                    return primerNum - segunNum;
                case "*":
                    return primerNum * segunNum;
                case "/":
                    if (segunNum === 0) {
                        alert("No se puede dividir por cero");
                        return 0;
                    } else {
                        return primerNum / segunNum;
                    }
            }
        }
    }

    /**
    * Los listeners para cuando pulsamos algún botón con operaciones básicas.
    **/
    document.querySelector("#suma").addEventListener('click', () => {
        usarOperador("+");
    })
    document.querySelector("#resta").addEventListener('click', () => {
        usarOperador("-");
    })
    document.querySelector("#multiplicacion").addEventListener('click', () => {
        usarOperador("*");
    })
    document.querySelector("#division").addEventListener('click', () => {
        usarOperador("/");
    })


    /**
     * Un listener para cuando pulsamos el botón de igual.
    */
    document.querySelector("#igual").addEventListener('click', () => {
        if (!isNaN(primerNum)) {
            listoParaBorrar = true;
            tieneComa = false;
            mAbajo.value = resultado();
            primerNum = "nada";
            operador = "";
            mArriba.value = "";
        }
    })

    /**
     * Un listener para cuando pulsamos el botón de atrás, borrando el último número que pusimos.
    */
    document.querySelector("#atras").addEventListener('click', () => {
        if (mAbajo.value.length > 1) {
            if (mAbajo.value[mAbajo.value.length - 1] == ".")
                tieneComa = false;
            mAbajo.value = mAbajo.value.substring(0, mAbajo.value.length - 1)
        }
        else
            mAbajo.value = 0;
    })

    /**
     * Un listener para cuando pulsamos el botón de C, borrando todo.
    */    
    document.querySelector("#borrarC").addEventListener('click', () => {
        mArriba.value = "";
        mAbajo.value = 0;
        primerNum = "nada";
    })

    /**
     * Un listener para cuando pulsamos el botón de CE, borrando el mostrador inferior.
    */
    document.querySelector("#borrarCE").addEventListener('click', () => {
        mAbajo.value = "0";
        tieneComa = false;
    })

    /**
     * Un listener para cuando pulsamos el botón de ±, cambiando el signo del elemento en mostrador inferior.
    */
    document.querySelector("#masMenos").addEventListener("click", () => {
        if (!isNaN(parseFloat(mAbajo.value)))
            mAbajo.value = parseFloat(mAbajo.value) * -1;
    })

    /**
     * Un listener para cuando pulsamos el botón de raiz cuadrada.
    */
    document.querySelector("#raizCu").addEventListener("click", () => {
        mArriba.value = "";
        if (parseFloat(mAbajo.value) > 0) {
            if (!isNaN(primerNum)) {
                mArriba.value += `√${mAbajo.value}`;
                mAbajo.value = Math.sqrt(mAbajo.value);
            }
            else {
                mArriba.value += `√${mAbajo.value}`;
                mAbajo.value = Math.sqrt(mAbajo.value);
                listoParaBorrar = true;
                tieneComa = false;
            }
        }
        else
            alert("No se puede hacer la raíz cuadrada de cero");
    })

    /**
     * Un listener para cuando pulsamos el botón de por Ciento.
    */
    document.querySelector("#porCiento").addEventListener('click', () => {
        mArriba.value = "";
        if (!isNaN(primerNum)) {
            mAbajo.value = (primerNum * mAbajo.value) / 100;
            listoParaBorrar = true;
            tieneComa = false;
        }
    })

    /**
     * Un listener para cuando pulsamos el botón de 1/x.
    */
    document.querySelector("#unoEquis").addEventListener('click', () => {
        mArriba.value = "";
        if (!isNaN(primerNum)) {
            mArriba.value += `1/${mAbajo.value}`;
            mAbajo.value = 1 / parseFloat(mAbajo.value);
        }
        else {
            mArriba.value += `1/${mAbajo.value}`;
            if (mAbajo.value == 0) {
                alert("Error: División por cero");
            }
            else {
                mAbajo.value = 1 / parseFloat(mAbajo.value);
            }
            listoParaBorrar = true;
            tieneComa = false;
        }
    })
})