function vaiARegistrazione() {
    window.location.href = "./Registrazione.html";
}


function vaiAlCatalogo() {

    let nome = document.getElementById("inputNome").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let categoria = document.getElementById("inputCategoria").value;

    window.location.href = `Catalogo.html?nome=${nome}&prezzo=${prezzo}&categoria=${categoria}`;
}

function vaiAlCatalogoCategoria(category) {
    window.location.href = `Catalogo.html?categoria=${category}`;
}

window.addEventListener("load", function () {
    console.log("sono in una nova pagina");
    if (window.location.href.includes("Catalogo.html")) {
        
        let url = new URL(window.location.href);
        let prezzo = url.searchParams.get("prezzo");
        let nome = url.searchParams.get("nome");
        let categoria = url.searchParams.get("categoria");
        let limiteListaInferiorePrezzo;
        let limiteListaSuperiorePrezzo;

        if(prezzo === "") {   
            limiteListaInferiorePrezzo === "";
            limiteListaSuperiorePrezzo === "";
        } else if (prezzo === "0-100") {
            limiteListaInferiorePrezzo = 0;
            limiteListaSuperiorePrezzo = 100;
        } else if (prezzo === "100-200") {
            limiteListaInferiorePrezzo = 100;
            limiteListaSuperiorePrezzo = 200;
        } else if (prezzo === "200-300") {
            limiteListaInferiorePrezzo = 200;
            limiteListaSuperiorePrezzo = 300;
        } else if (prezzo === "300") {
            limiteListaInferiorePrezzo = 300;
            limiteListaSuperiorePrezzo = Infinity;
        }

        filtraProdottiCatalogo(nome, limiteListaInferiorePrezzo, limiteListaSuperiorePrezzo, categoria);
    } else {
        console.log("non sono nel catalogo");
    }

})


function filtraProdottiCatalogo(nome, limiteListaInferiorePrezzo, limiteListaSuperiorePrezzo, categoria) {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {

            let prodotti = data;
            console.log(prodotti)


            let prodottiFiltrati = prodotti.filter((prodotto) => {
                return (!limiteListaSuperiorePrezzo || (prodotto.price >= limiteListaInferiorePrezzo && prodotto.price <= limiteListaSuperiorePrezzo)) &&
                    (!nome || prodotto.title.includes(nome)) &&
                    (!categoria || prodotto.category === categoria);
            })
           visualizzaProdotti(prodottiFiltrati);
        }).catch((error) =>
            console.log(error));

}








function visualizzaProdotti(prodotti) {

    let container = document.getElementById("container-cards");

    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];

        container.innerHTML += `
        <div class="container-cards">

        <div class="cards-catalogo">
            <div>
                <img src="${prodotto.image}" alt="" style="width: 248px;height: 250px;border-bottom: 1px solid black;padding: 10px;">
            </div>

            <div style="position: relative;left: 10px;">
                <div style="width: 80px;height: 20px; color: white;">${prodotto.price}</div>
            </div>

            <div style="padding: 10px;">
                <div class="div-h3">
                    <h3 style="color: white;">${prodotto.title}</h3>
                </div>
                <div class="div-p">
                    <p style="color: white;">${prodotto.description}</p>
                </div>
            </div>



            <div style="position: relative;left: 150px;">
                <button
                    style="width: 80px;height: 20px; background-color:#FF8C00;border-radius: 20px; color: white;">Acquista</button>
            </div>

        </div>`;

    }
}


