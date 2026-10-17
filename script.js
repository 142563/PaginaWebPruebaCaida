const estado = document.getElementById("estado");
estado.textContent = "✅ El sitio está funcionando correctamente";
estado.classList.add("ok");

const contador = document.getElementById("contador");
let visitas = Number(localStorage.getItem("visitas") || 0) + 1;
localStorage.setItem("visitas", visitas);
contador.textContent = visitas;

document.getElementById("btn-reiniciar").addEventListener("click", () => {
  localStorage.setItem("visitas", 0);
  contador.textContent = 0;
});
