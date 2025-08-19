import './style.css'

const jugador: HTMLDivElement = document.querySelector<HTMLDivElement>('#jugador')
const enemigo: HTMLDivElement = document.querySelector<HTMLDivElement>('#enemigo')

const contadorPutos = {
  jugador: 0,
  enemigo: 0
}

enum Elemento {
  TIJERAS = 0,
  PAPEL = 1,
  PIEDRA = 2,
  LAGARTO = 3,
  SPOCK = 4
}

const elementoImagen: Record<Elemento, string> = {
  [Elemento.TIJERAS]: "✂️",
  [Elemento.PAPEL]: "📄",
  [Elemento.PIEDRA]: "🪨",
  [Elemento.LAGARTO]: "🦎",
  [Elemento.SPOCK]: "🖖"
}

const reglas = {
  [Elemento.TIJERAS]: [Elemento.PAPEL, Elemento.LAGARTO],
  [Elemento.PAPEL]: [Elemento.PIEDRA, Elemento.SPOCK],
  [Elemento.PIEDRA]: [Elemento.LAGARTO, Elemento.TIJERAS],
  [Elemento.LAGARTO]: [Elemento.SPOCK, Elemento.PAPEL],
  [Elemento.SPOCK]: [Elemento.TIJERAS, Elemento.PIEDRA]
}

const elegirElemento = (jugador: Elemento, enemigo: Elemento): void => {
  if (reglas[jugador].includes(enemigo)) {
    contadorPutos.jugador += 1
  } else if (jugador === enemigo) {
    return
  }
  else {
    contadorPutos.enemigo += 1
  }
}

const actualizarPutaje = (div: HTMLDivElement, putaje: number, texto: string, imagen: string) => {
  const putajeDiv: HTMLDivElement = div.querySelector<HTMLDivElement>(".putaje")!
  putajeDiv.innerText = putaje.toString()

  const textoDiv: HTMLDivElement = div.querySelector<HTMLDivElement>(".texto")!
  textoDiv.innerText = texto

  const imagenDiv: HTMLDivElement = div.querySelector<HTMLDivElement>(".imagen")!
  imagenDiv.innerText = imagen
}

const actualizarPutos = (elementoJuegador: Elemento, elementoEnemigo: Elemento) => {
  actualizarPutaje(jugador, contadorPutos.jugador, Elemento[elementoJuegador], elementoImagen[elementoJuegador])  
  actualizarPutaje(enemigo, contadorPutos.enemigo, Elemento[elementoEnemigo], elementoImagen[elementoEnemigo])  
}

export const juegar = (elementoJuegadorNumero: number) => {
  const elementoJugador: Elemento = elementoJuegadorNumero
  const elementoEnemigo: Elemento = Math.floor(Math.random() * 5)

  elegirElemento(elementoJugador, elementoEnemigo)
  actualizarPutos(elementoJugador, elementoEnemigo)
}

export const reiniciar = () => {
  contadorPutos.jugador = 0
  contadorPutos.enemigo = 0

  actualizarPutaje(jugador, 0, "", "...")  
  actualizarPutaje(enemigo, 0, "", "...")  
} 


(window as any).juegar = juegar;
(window as any).reiniciar = reiniciar;