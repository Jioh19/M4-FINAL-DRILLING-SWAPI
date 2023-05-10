const index = [true, true, true];
const range = [0, 5, 11, 17];
const promesas = [];

//! Supuestamente esta función debería esperar a que todos los fetch se cumplan antes de continuar.
async function cargar(num) {
	if (index[num - 1]) {
		for (let i = range[num - 1]; i < range[num]; i++) {
			promesas[i] = buscar(i + 1, num);
		}
		index[num - 1] = false;
	}
	await Promise.all(promesas).then(() => {
		console.log(promesas);
	});
}

// TODO No entendí como implementar correctamente el fetch como para capturar correctamente el error
// TODO del response.ok cuando este daba error de tipo 400
async function buscar(num, origen) {
	let dir = "https://swapi.dev/api/people/" + num + "/";
	fetch(dir)
		.then((response) => response.json())
		.then((personaje) => {
			if (personaje.detail != "Not found") {
				createCard(personaje, origen);
			}
		})
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
