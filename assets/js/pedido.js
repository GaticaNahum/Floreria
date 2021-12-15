const urlP = "http://localhost:5000";


const createPedido = async() => {
    let place = document.getElementById('autocomplete').value;
    let price = localStorage.getItem("price");
    let idUser = localStorage.getItem("idUser");
    let idArreglo = localStorage.getItem("idArreglo");

    if (place == "") {
        Swal.fire({
            title: "Rellena los campos faltantes",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    } else {

        $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: urlP + '/pedido/create',
            data: { place, price, idUser, idArreglo }
        }).done(res => {
            if (res.status === 200) {

                Swal.fire({
                    title: "Se realizo la compra correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Hubo un problema al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
            }
        });
    }
};


const findPedidos = async id => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlP + '/pedido/' + localStorage.getItem("idUser")
    }).done(function(res) {
        content = "";
        res = res.arreglo;


        for (let i = 0; i < res.length; i++) {
            content += `
            <tr class="text-center">
                <td>${res[i].status ==1?"Pendiente":"Enviado"?"Entregado":"Confirmado"}</td>
                <td>${res[i].price}</td>
                <td>${res[i].place} </td>
                <td>${res[i].orderDate} </td>
                <td>${res[i].deadLine}</td>
            </tr>
                `;
        };
        $("#pedido > tbody").html(content)
    });
};
findPedidos();


const findPedidosAll = async id => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlP + '/pedido'
    }).done(function(res) {
        content = "";
        res = res.listPedidos;
        for (let i = 0; i < res.length; i++) {
            content += `
            <tr class="text-center">
                <td>${res[i].status ==1?"Pendiente":"Enviado"?"Entregado":"Confirmado"}</td>
                <td>${res[i].price}</td>
                <td>${res[i].place} </td>
                <td>${res[i].orderDate} </td>
                <td>${res[i].deadLine}</td>
                <td>${res[i].idUser ==2?"Kemish":"Thayli"}</td>
            </tr>
                `;
        };
        $("#admon > tbody").html(content)
    });
};
findPedidosAll();