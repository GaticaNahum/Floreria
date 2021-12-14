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
                    title: "Se ha creado correctamente",
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