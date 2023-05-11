// Variables globales... al final enredaron el código
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
		await Promise.all(promesas).then(() => {
			document.querySelector(".modal-body").innerHTML = "";
			modal.style.display = "block";
		});
	}
}

// TODO No entendí como implementar correctamente el fetch como para capturar correctamente el error
// TODO del response.ok cuando este daba error de tipo 400
async function buscar(num, origen) {
	let dir = "https://swapi.dev/api/people/" + num + "/";
	fetch(dir)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				alert(`Personaje no encontrado\n${dir}`);
			}
		})
		.then((personaje) => {
			if (personaje) {
				createCard(personaje, origen);
			}
		});
}

//* Creando las tarjetas en la página y en el modal
function createCard(personaje, num) {
	const node = document.querySelector(`.sector-${num}`);
	const modal = document.querySelector('.modal-body');
	node.innerHTML += `<div class="card card-${num}">
						<div class="btnDiv">
							<button class="btn btn-${num}"></button>
						</div>
						<div>
							<h2>${personaje.name}</h2>
							<p>Estatura: ${personaje.height}, Peso: ${personaje.mass} kg.</p>
						</div>
					</div>`;
	modal.innerHTML += `<div class="card card-${num}">
						<div>
							<h2>${personaje.name}</h2>
							<p>Estatura: ${personaje.height}, Peso: ${personaje.mass} kg.</p>
						</div>
					</div>`;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
