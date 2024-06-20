let ballsWeHave = 5;

document.querySelector("#pokeBalls").value = ballsWeHave;
document.querySelector("#pokeballsDisplay").innerText = ballsWeHave;
let pokeballsHolder = document.querySelector("#pokeBalls");
let rndPokeNo = 1 + Math.round(Math.random() * (248));
console.log(rndPokeNo);

async function playGame(){

    let gameStatus = document.querySelector("#gameStart");
    let pokemon = await fetchPokemon (rndPokeNo);
    console.log(pokemon);
    switch (gameStatus.value) {
        case "1":
            document.querySelector("#btn-container").innerHTML='<button class="btn btn-info" id="btn">Catch A Pokemon!</button>';
            document.querySelector("#pokemon-container").innerHTML = '<div id="pokemon"></div>';
            gameStatus.value = 2;

            document.querySelector("#pokemon").innerHTML = '<img src="' + pokemon.photo + '" alt="" style="width: 300px; height: 300px;">';
            resetButton();
            break;

        case "2":
            pokeballsHolder.value = pokeballsHolder.value - 1;
            document.querySelector("#pokeballsDisplay").innerText = pokeballsHolder.value;
            if (Math.random() < 0.5) {
                gameStatus.value = 3;
                document.querySelector("#btn-container").innerHTML = '<button class="btn btn-danger" id="btn"> Inspect Your Pokemon </button>';

            } else {
                if (pokeballsHolder.value == 0) {
                    console.log("Ran Out Of Balls");
                    document.querySelector("#pokemon-container").innerHTML = "<h1>Ran Out Of Balls</h1>";
                    document.querySelector("#btn-container").innerHTML = "";
                    return;
                }
                document.querySelector("#btn-container").innerHTML = '<button disabled class="btn btn-info" id="btn">Look For Pokemons!</button>';
                setTimeout(async function () {
                    document.querySelector("#btn").disabled = false;
                 }, 1000);
            }
            break;
        case "3":
            document.querySelector("#pokemon").innerHTML = '<h1>Pokemon</h1>';
            document.querySelector("#btn-container").innerHTML = "";
            gameStatus.value = 3;
            break;

        default:
            break;
        
     }
    resetButton();
        
 }

 document.querySelector("#btn").addEventListener("click", playGame);
 function resetButton() {
    const btn = document.querySelector("#btn");
    if (btn) {
        btn.removeEventListener("click", playGame);
        btn.addEventListener("click", playGame);
    }
}

// async function pokemonInfo(rndPokeNo) {

//     const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + rndPokeNo);
//     const data = await response.json();

//     return{
//         name: data.name,



//     }



async function fetchPokemon(rndPokeNo) {

    const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + rndPokeNo);
    const data = await response.json();
    return {
        name: data.name,
        photo: data.sprites.front_default,
        stats: {
            hp : Math.round(data.stats[0].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),
            attack : Math.round(data.stats[1].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),
            defence : Math.round(data.stats[2].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),
        }
    };
}


document.querySelector("#btn").addEventListener("click", playGame);