/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {

	/**
	 * Inicialitza els paràmetres del joc i crea el canvas
	 * @constructor
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 * @param {number} amount -  nombre de quadrats per fila de la quadrícula
	 */
	constructor(width,height,amount) {
		//esto es lo primero que se llama
		this.width = width;
		this.height = height;
		this.amount = amount;
		this.start();
		this.initCanvas(width, height)
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	
	initCanvas(width, height) {

		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;

		document.getElementsByTagName("body")[0].appendChild(canvas)

		this.context = canvas.getContext("2d");

	
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.puntuacio = 0;
		this.serp = [[0,0]];
		this.dir = [1,0];
		
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x,y,color) {
		let mida = this.width/this.amount;
		this.context.beginPath();
		this.context.fillStyle=color;
		this.context.fillRect(mida*y,mida*x, mida, mida);
		this.context.stroke();

	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.context.beginPath();
		this.context.fillStyle="#FFFFFF";
		this.context.fillRect(0, 0, this.height, this.width);
		this.context.stroke();
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		this.drawSquare(this.serp[0][0],this.serp[0][1],"red")
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x,y) {
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		let result = [0,0];

		let x = (this.serp[0][0] + this.dir[0]);
		let y = (this.serp[0][1] + this.dir[1]);
		result[0] = x % this.amount;
		result[1] = y % this.amount;
		if (x < 0) result[0] = this.amount+x;
		if (y < 0) result[1] = this.amount+y;
		return result;
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear();
		let novaSerp = this.newTile();
		this.serp[0] = novaSerp;
		this.drawSnake();
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	
	//	Arriba		- 38
	//	Abajo		- 40
	//	Izquierda	- 37
	//	Derecha		- 39
	input(e) {
		e = e || window.event;
		this.dir = game.direction;
		if (e.keyCode == '37'){
			this.dir = [0,-1];
		}
		else if (e.keyCode == '39'){
			this.dir = [0,1];
		}
		else if (e.keyCode == '38'){
			this.dir = [-1,0];
		}
		else if (e.keyCode == '40'){
			this.dir =[1,0]
		}
	}
}

let game = new Game(3500,3500,150); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms