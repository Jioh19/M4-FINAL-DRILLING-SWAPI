let index = [true, true, true];

function cargar(num) {
	if(index[num-1]) {
		for (let i = 0; i < 5; i++) {
			buscar((num - 1) * 5 + 1 + i + index[num - 1], num);
		}
		index[num-1] = false;
	}
}

async function buscar(num, origen) {
	let dir = "https://swapi.dev/api/people/" + num + "/";
	fetch(dir)
		.then((response) => response.json())
		.then((personaje) => {
            createCard(personaje, origen);
		});
}

function createCard(personaje, num) {
    const node = document.querySelector(`.sector-${num}`);
    node.innerHTML += `<div class="card card-${num}">
						<div class="btnDiv">
							<button class="btn btn-${num}"></button>
						</div>
						<div>
							<h2>${personaje.name}</h2>
							<p>Estatura: ${personaje.height}, Peso: ${personaje.mass} kg.</p>
						</div>
					</div>`;
}