const urlA = "http://localhost:5000";


//Imagen to Base64

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        }
    })
}

//Crear un arreglo

const createArreglo = async ()=>{
    let name = document.getElementById('nombreArreglo').value;
    let description = document.getElementById('descripcionArreglo').value;
    let price = document.getElementById('precioArreglo').value;
    let quantity = document.getElementById('cantidadArreglo').value;
    let image = document.getElementById('imagenArreglo').files[0];

    if(name == "" || description == ""|| price == ""|| quantity== "" || image == null){
        Swal.fire({
            title: "Rellena los campos faltantes",
            confirmButtonText: "Aceptar",
            icon: "error",
            })
    }else{
        
            const imagen = await blobToBase64(image);

        $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: urlA+ '/producto/create',
            data: { name, description, price, quantity, imagen }
        }).done(res => {
            if(res.status === 200){
            
                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                    });
                    findArreglo();
            }else{
                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                    });
                    findArreglo();
            }
        });
    }   
};

//Encontrar arreglo

const findArreglo = async() => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlA + '/producto'
    }).done(function(res) {
        content = "";
        res = res.listProducto;


        for (let i = 0; i < res.length; i++) {
            let array8 = new Uint8Array(res[i].imagen.data);
            var imagen = new TextDecoder().decode(array8);
            content += `
            <tr class="text-center">
                <td>${res[i].idArreglo}</td>
                <td>${res[i].name}</td>
                <td>${res[i].price}</td>
                <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                <td>${res[i].quantity}</td>
                <td>
                <img src= "data:image/*;base64,${imagen}" class = "d-block w-100" alt="">
                </td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoArreglo(${res[i].idArreglo})'  data-target='#detallesProducto'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button data-toggle='modal' onclick='getInfoUpdateArreglo(${res[i].idArreglo})' data-target='#update' class='btn btn-warning'><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getId(${res[i].idArreglo})' data-target='#delete' ><i class="fas fa-trash"></i></button>
                </td>
            /tr>
                `;
        }
        $("#productos > tbody").html(content);
    });
};

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

const updateArreglo = async () => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let description = document.getElementById('descripcion_update').value;
    let price = document.getElementById('price_update').value;
    let quantity = document.getElementById('quantity_update').value;

    $.ajax({
        type: 'POST',
        url: urlA+ '/producto/update/' + id,
        data: { name,description, price, quantity }
    }).done(function (res) {
        findArreglo();
    });
};

//Dar de baja un arreglo

const deleteArreglo = async () => {
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

findArreglo();