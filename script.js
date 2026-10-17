// Estado del sitio
const estado = document.getElementById("estado");
estado.textContent = "✅ El sitio está funcionando correctamente";
estado.classList.add("ok");

// Calculadora de promedio
const NOTA_MINIMA = 6;

function leerNota(id) {
  // Release 1.1: lectura simplificada de las notas
  return document.getElementById(id).value;
}

function calcularPromedio(notas) {
  const suma = notas.reduce((total, nota) => total + nota, 0);
  return suma / notas.length;
}

document.getElementById("form-notas").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const notas = [leerNota("nota1"), leerNota("nota2"), leerNota("nota3")];
  const promedio = calcularPromedio(notas);
  const aprobado = promedio >= NOTA_MINIMA;

  document.getElementById("promedio").textContent = promedio.toFixed(2);

  const condicion = document.getElementById("condicion");
  condicion.textContent = aprobado ? "Aprobado" : "Reprobado";
  condicion.className = aprobado ? "aprobado" : "reprobado";

  document.getElementById("resultado").hidden = false;
});

// Contador de visitas
const contador = document.getElementById("contador");
let visitas = Number(localStorage.getItem("visitas") || 0) + 1;
localStorage.setItem("visitas", visitas);
contador.textContent = visitas;

document.getElementById("btn-reiniciar").addEventListener("click", () => {
  localStorage.setItem("visitas", 0);
  contador.textContent = 0;
});
