/*********************************
 Autor: José Carmona Cervera
 Fecha creación: 30/11/2020
 Última modificación: 10/12/2020 
 Versión: 1.00
***********************************/

/** 
 * Constructor de la clase contacto, para cada uno de los contactos de la agenda.
 * @param  {} nombre 
 * @param  {} apellidos
 * @param  {} telefono
 * @param  {} nacimiento
 */

function Contacto(nombre, apellidos, telefono, nacimiento) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.nacimiento = nacimiento;
}

var nuevo = false; //Variable que me permite ver si el contacto es nuevo o es una modificación de uno ya existente.

var contactos = new Array(); //Array donde guardaremos los contactos de la agenda. No hay que controlar el tamaño mínimo porque los arrays de js pueden almacenar 2^32-1 elementos.

Date.prototype.toString = function () { return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate(); } //función para el formateo correcto de la fecha.

fechaHoy = new Date(); //para almacenar la fecha de hoy y controlar que no se metan nacimientos posteriores a hoy.

//Introducción de datos inicial.
contactos.push(new Contacto("Trixie", "Mattel", "927110856", "1980-03-12"));
contactos.push(new Contacto("Katya", "Zamolodchikova", "123456789", "1970-04-10"));
contactos.push(new Contacto("Manila", "Luzon", "234567891", "1994-05-02"));
contactos.push(new Contacto("Latrice", "Royale", "345678912", "1972-10-01"));
contactos.push(new Contacto("Crystal", "Methyd", "678954321", "1991-07-07"));


/**
 * Para generar la tabla con la información de los contactos.
 */
function generarTabla() {
    for (var i = 0; i < contactos.length; i++) {
        document.write("<tr>");
        document.write("<td>" + contactos[i].nombre + "</td>");
        document.write("<td>" + contactos[i].apellidos + "</td>");
        document.write("<td>" + contactos[i].telefono + "</td>");
        document.write("<td>" + contactos[i].nacimiento + "</td>");
        document.write("</tr>");
    }
    infoContacto(0);
    document.getElementById('nId').value = 1; //Para que el número de registro inicial sea el primero.
}

/**
 * Para ver el siguiente contacto.
 */
function contactoSiguiente() {
    activarBotonBorrar(); 
    id = document.getElementById('nId').value;

    if (id > contactos.length - 1) {
        window.alert("Este es el último contacto registrado.");
    }
    else {
        id++;
        reiniciarIndicadores(id);
        infoContacto(id - 1);
    }
}

/**
 * Para ver el contacto anterior.
 */
function contactoAnterior() {
    activarBotonBorrar();
    id = document.getElementById('nId').value;

    if (id <= 1) {
        window.alert("Este es el primer contacto registrado.");
    }
    else {
        id--;
        reiniciarIndicadores(id);
        infoContacto(id - 1);
    }
}

/**
 * Para ver el último contacto registrado.
 */
function ultimoContacto() {
    activarBotonBorrar(); 
    reiniciarIndicadores(contactos.length);
    infoContacto(contactos.length - 1);
}

/**
 *  Para ver el primer contacto registrado.
 */
function primerContacto() {
    activarBotonBorrar(); 
    reiniciarIndicadores(1);
    infoContacto(0);
}

/**
 * Para volver a activar el botón de borrar, que puede haber quedado desactivado después de pulsar el botón de nuevo contacto.
 */
function activarBotonBorrar(){
    document.getElementById('borrar').removeAttribute('disabled'); 
}

/**
 * Para que en el campo teléfono sólo metamos números.
 */
function sinLetras(evento) {
    var charCode = (evento.which) ? evento.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        window.alert("Debes introducir solo números, no letras.");
        return false;
    }
    return true;
}

/**
 * Para comprobar que el teléfono tenga un formato adecuado.
  */
function regexTelef(telefono) {
    if (!(/^\d{9}$/.test(telefono))) { return false; }
    else { return true; }
}


/**
 * Para cuando queremos añadir un nuevo contacto. Nos borra todos los campos, nos habilita los botones que pudieran estar deshabilitados y nos deshabilita el botón de borrar.
 */
function nuevoContacto() {

    document.getElementById('nombre').value = null;
    document.getElementById('apellidos').value = null;
    document.getElementById('telefono').value = null;
    document.getElementById('nacimiento').value = null;
    document.getElementById('borrar').setAttribute('disabled', true);
    document.getElementById('guardar').removeAttribute('disabled');
    document.getElementById('nombre').removeAttribute('disabled');
    document.getElementById('apellidos').removeAttribute('disabled');
    document.getElementById('telefono').removeAttribute('disabled');
    document.getElementById('nacimiento').removeAttribute('disabled');
    nuevo = true;
}

/**
 * Tanto para guardar un nuevo contacto como para guardar los datos modificados de un contacto ya registrado.
 */
function guardarContacto() {
    if (nuevo) {

        //Valores nuevos para guardar un nuevo contacto.
        nuevoNombre = document.getElementById('nombre').value;
        nuevoApellidos = document.getElementById('apellidos').value;
        nuevoTelefono = document.getElementById('telefono').value;
        nuevoNacimiento = document.getElementById('nacimiento').value;

        if (nuevoNombre != '') {

            if (nuevoTelefono !== '' && !regexTelef(nuevoTelefono)) //Pasamos la expresión regular para ver que el teléfono fijo tiene una estructura correcta.
            {
                window.alert("El teléfono tiene que tener mínimo 9 dígitos.");
            }
            else if (nuevoNacimiento.toString() > fechaHoy.toString()) { //Comprobamos que no se ha introducido una fecha de nacimiento posterior al día de hoy.
                window.alert("La fecha de nacimiento es posterior a la fecha de hoy y no se puede viajar en el tiempo.");
            }
            else { //Los datos son correctos.


                contactos.push(new Contacto(nuevoNombre, nuevoApellidos, nuevoTelefono, nuevoNacimiento));


                //Con el nuevo contacto validado y añadido, creamos una nueva fila en la tabla para mostrar los datos del nuevo contacto.
                var tabla = document.getElementById("tablaContactos");
                var nuevaFila = tabla.insertRow(contactos.length);
                var casillaNombre = nuevaFila.insertCell(0);
                var casillaApellidos = nuevaFila.insertCell(1);
                var casillaTelefono = nuevaFila.insertCell(2);
                var casillaNacimiento = nuevaFila.insertCell(3);

                casillaNombre.innerHTML = nuevoNombre;
                casillaApellidos.innerHTML = nuevoApellidos;
                casillaTelefono.innerHTML = nuevoTelefono;
                casillaNacimiento.innerHTML = nuevoNacimiento;


                reiniciarIndicadores(contactos.length);
                infoContacto(contactos.length - 1); //Mostramos el contacto recién añadido.
                nuevo = false;

                //Desbloqueamos todos los botones que pudieran estar bloqueados.
                activarBotonBorrar();
                document.getElementById('mostrar').removeAttribute('disabled');
                document.getElementById('primerContacto').removeAttribute('disabled');
                document.getElementById('contactoAnterior').removeAttribute('disabled');
                document.getElementById('contactoSiguiente').removeAttribute('disabled');
                document.getElementById('ultimoContacto').removeAttribute('disabled');
                document.getElementById('guardar').removeAttribute('disabled');
                document.getElementById('nId').removeAttribute('disabled');
            }
        }
        else { //El campo nombre está vacío.
            window.alert("No se puede introducir un nombre vacío.");
        }
    }
    else { //nuevo == false.

        if (document.getElementById('nombre').value != '') {

            id = (document.getElementById('nId').value) - 1;
            contactos[id].nombre = document.getElementById('nombre').value;
            contactos[id].apellidos = document.getElementById('apellidos').value;

            if (document.getElementById('telefono').value !== '' && !regexTelef(document.getElementById('telefono').value)) //Pasamos la expresión regular para ver que el teléfono fijo tiene una estructura correcta.
            {
                window.alert("El teléfono tiene que tener mínimo 9 dígitos.");
            }
            else if (document.getElementById('nacimiento').value.toString() > fechaHoy.toString()) //Comprobamos que no se ha introducido una fecha de nacimiento posterior al día de hoy.
            {
                window.alert("La fecha de nacimiento es posterior a la fecha de hoy y no se puede viajar en el tiempo.");
            }
            else {
                contactos[id].telefono = document.getElementById('telefono').value;
                contactos[id].nacimiento = document.getElementById('nacimiento').value;


                var tabla = document.getElementById("tablaContactos");
                tabla.deleteRow(id + 1); //Para editar la información del contacto, borramos la columna y volvemos a crearla en la misma posición con la nueva info.
                var filaModificada = tabla.insertRow(id + 1);

                var casillaNombre = filaModificada.insertCell(0);
                var casillaApellidos = filaModificada.insertCell(1);
                var casillaTelefono = filaModificada.insertCell(2);
                var casillaNacimiento = filaModificada.insertCell(3);


                casillaNombre.innerHTML = document.getElementById('nombre').value;
                casillaApellidos.innerHTML = document.getElementById('apellidos').value;
                casillaTelefono.innerHTML = document.getElementById('telefono').value;
                casillaNacimiento.innerHTML = document.getElementById('nacimiento').value;
            }
        }
        else { //El nombre está vacio.
            window.alert("No se puede introducir un nombre vacío.");
        }
    }
}

/**
 * Para eliminar al contacto cuya información aparezca en ese momento en pantalla. Se borra del array contactos y de la tabla.
 */
function borrarContacto() {
    id = document.getElementById('nId').value - 1;
    contactos.splice(id, 1);
    document.getElementById('tablaContactos').deleteRow(id + 1);

    if (contactos.length > 0) { //Si quedan contactos, pasamos a mostrar el primero.
        reiniciarIndicadores(1);
        infoContacto(0);
    }
    else if (contactos.length == 0) { //Si no hay contactos, lo único que puedes hacer es añadir un contacto dándole al botón "nuevo".
        document.getElementById('mostrar').setAttribute('disabled', true);
        document.getElementById('primerContacto').setAttribute('disabled', true);
        document.getElementById('contactoAnterior').setAttribute('disabled', true);
        document.getElementById('contactoSiguiente').setAttribute('disabled', true);
        document.getElementById('ultimoContacto').setAttribute('disabled', true);
        document.getElementById('guardar').setAttribute('disabled', true);
        document.getElementById('borrar').setAttribute('disabled', true);
        document.getElementById('nombre').setAttribute('disabled', true);
        document.getElementById('apellidos').setAttribute('disabled', true);
        document.getElementById('telefono').setAttribute('disabled', true);
        document.getElementById('nacimiento').setAttribute('disabled', true);
        document.getElementById('nId').setAttribute('disabled', true);
        document.getElementById('indicador').innerHTML = "&nbsp;&nbsp;0 de 0&nbsp;&nbsp;";
        document.getElementById('nombre').value = null;
        document.getElementById('apellidos').value = null;
        document.getElementById('telefono').value = null;
        document.getElementById('nacimiento').value = null;
    }
}

/**
 * Para actualizar el campo de Número de Registro y el indicador de "Registro X de Y".
 * @param  {} id El id del contacto que queremos mostrar en el campo de Número de Registro.
 */
function reiniciarIndicadores(id) {
    document.getElementById('nId').value = id;
    document.getElementById('indicador').innerHTML = "&nbsp;&nbsp;" + id + " de " + contactos.length + "&nbsp;&nbsp;";
}

/**
 * Para mostrar la información de un contacto en el apartado de información.
 * @param  {} id El id del contacto que queremos mostrar en el campo de información.
 */
function infoContacto(id) {
    document.getElementById('nombre').value = contactos[id].nombre;
    document.getElementById('apellidos').value = contactos[id].apellidos;
    document.getElementById('telefono').value = contactos[id].telefono;
    document.getElementById('nacimiento').value = contactos[id].nacimiento;
}

/**
 * Para usar el botón de búsqueda en base al id de contacto.
 */
function verContacto() {
    var id = document.getElementById("nId").value; //Cogemos el id del campo de Número de Registro.

    if (id <= 0 || id > contactos.length) {
        window.alert("Ese id no está en nuestra base de datos.");
        primerContacto();
    }
    else {
        reiniciarIndicadores(id);
        id--;
        if (id >= 0 && id <= contactos.length) {
            infoContacto(id);
        }
    }
}





