const urlA = "http://localhost:5000";

//Crear un arreglo

const createArreglo = async() => {
    let name = document.getElementById('nombreArreglo').value;
    let description = document.getElementById('descripcionArreglo').value;
    let price = document.getElementById('precioArreglo').value;
    let quantity = document.getElementById('cantidadArreglo').value;

    if (name !== "" || description !== "", price !== "", quantity !== "") {

        $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: urlA + '/producto/create',
            data: { name, description, price, quantity }
        }).done(res => {
            if (res.status === 200) {

                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
                findArreglo();
            } else {
                Swal.fire({
                    title: "Hubo un error al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
                findArreglo();
            }
        });
    } else {
        Swal.fire({
            title: "Rellena los campos primero",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }
};


const findArreglo = async() => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlA + '/producto'
    }).done(function(res) {
        content = "";
        res = res.listProducto;


        for (let i = 0; i < res.length; i++) {
            content += `
            <tr class="text-center">
                <td>${res[i].idArreglo}</td>
                <td>${res[i].name}</td>
                <td>${res[i].price}</td>
                <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                <td>${res[i].quantity}</td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoArreglo(${res[i].idArreglo})'  data-target='#detallesProducto'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button data-toggle='modal' onclick='getInfoUpdateArreglo(${res[i].idArreglo})' data-target='#update' class='btn btn-warning'><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getId(${res[i].idArreglo})' data-target='#delete' ><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
        }
        $("#productos > tbody").html(content);
    });
};
findArreglo();

//Obtener Id del arreglo seleccionado

const getByIdF = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlA + '/producto/' + id
    }).done(res => {
        console.log(res);
    });
};

//Obtener la información del arreglo

const getInfoArreglo = async id => {
    let arreglo = await getByIdF(id);

    document.getElementById('descripcionInfo').value = arreglo.arreglo[0].description;

}

//Obtener informacion para actualizar

const getInfoUpdateArreglo = async id => {
    let arreglo = await getByIdF(id);

    document.getElementById('id_update').value = id
    document.getElementById('name_update').value = arreglo.arreglo[0].name
    document.getElementById('descripcion_update').value = arreglo.arreglo[0].description
    document.getElementById('price_update').value = arreglo.arreglo[0].price
    document.getElementById('quantity_update').value = arreglo.arreglo[0].quantity
};

//Actualizar arreglo

const updateArreglo = async() => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;

    $.ajax({
        type: 'POST',
        url: urlA + '/producto/update/' + id,
        data: { name }
    }).done(function(res) {
        findArreglo();
    });
};

const deleteArreglo = async() => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/producto/delete/' + id
    }).done(res => {
        findArreglo();

    });
};


const getId = async id => {
    document.getElementById("id_delete").value = id;


};