const urlA = "http://localhost:5000";


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
                    <button type="button" data-bs-toggle="modal" data-bs-target="#modalModificarAuto" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                </td>
            /tr>
                `;
        }
        $("#productos > tbody").html(content);
    });
};
findArreglo();



const getByIdF = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlA + '/producto/' + id
    }).done(res => {
        console.log(res);
    });
};

const getInfoArreglo = async id => {
    let arreglo = await getByIdF(id);

    document.getElementById('descripcionInfo').value = arreglo.arreglo[0].description;
    document.getElementById('categoriaInfo').value = arreglo.arreglo[0].idCategoria;
}