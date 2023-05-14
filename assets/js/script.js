// Variables globales... al final enredaron el código
const index = [true, true, true];
const range = [0, 5, 11, 17];
const promesas = [[], [], []];
let generador = [];

// El generador para mostrar a los personajes de a 1 en la página
function* generator(personajes) {
	for (let i = 0; i < personajes.length; i++) {
		yield personajes[i];
	}
}

// La clase personaje que guarda a todos los tipejos. Incluido a última hora.
class Personaje {
	constructor(nombre, altura, peso) {
		this.nombre = nombre;
		this.altura = altura;
		this.peso = peso;
	}
}

//! Supuestamente esta función debería esperar a que todos los fetch se cumplan antes de continuar.
//! Aparentemente ahora si cumple bien su función.
async function cargar(num) {
	if (index[num - 1]) {
		let j = 0;
		for (let i = range[num - 1]; i < range[num]; i++) {
			promesas[num - 1][j] = buscar(i + 1);
			j++;
		}
		index[num - 1] = false;

		//*Media sobrecargada esta función.... hace muchas cosas. Ahora verifica que se 
		//*cumplan todas las promesas antes de inicializar a los generadores.
		await Promise.all(promesas[num - 1]).then((personaje) => {
			document.querySelector(".modal-body").innerHTML = "";
			createModal(personaje, num);
			modal.style.display = "block";
			generador[num - 1] = generator(personaje);
		});

		//*Y ahora, una vez creado los generadores empieza a mostrar a los personajes de a 1.
	} else {
		createCard(generador[num - 1].next().value, num);
	}
}

// TODO No entendí como implementar correctamente el fetch como para capturar correctamente el error
// TODO del response.ok cuando este daba error de tipo 400. Eventualmente hice que todo fuese resolve()
// TODO para poder usar un Promise.all
function buscar(num) {
	let dir = "https://swapi.dev/api/people/" + num + "/";
	return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(dir);
			if (response.ok) {
				let personaje = await response.json();
				let { name, height, mass } = personaje;
				let nuevoPersonaje = new Personaje(name, height, mass);
				resolve(nuevoPersonaje);
			} else {
				alert(`Personaje no encontrado\n${dir}`);
				resolve();
			}
		} catch (err) {}
	});
}

//* Creando las tarjetas en la página. Estas aparecen de 1 utilizando generadores.
function createCard(personaje, num) {
	const node = document.querySelector(`.sector-${num}`);
	if (personaje != undefined) {
		node.innerHTML += `<div class="card card-${num}">
						<div class="btnDiv">
							<button class="btn btn-${num}"></button>
						</div>
						<div>
							<h2>${personaje.nombre}</h2>
							<p>Estatura: ${personaje.altura}, Peso: ${personaje.peso} kg.</p>
						</div>
					</div>`;
	}
}

//* Creando el modal, este muestra a todos los personajes de 1 vez.
function createModal(personajes, num) {
	const modal = document.querySelector(".modal-body");
	//console.log(personajes, num);
	personajes.forEach((personaje) => {
		if (personaje != undefined) {
			modal.innerHTML += `<div class="card card-${num}">
						<div>
							<h2>${personaje.nombre}</h2>
							<p>Estatura: ${personaje.altura}, Peso: ${personaje.peso} kg.</p>
						</div>
					</div>`;
		}
	});
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
