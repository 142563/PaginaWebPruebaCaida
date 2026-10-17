# Ejercicio: Página Caída

Página web estática publicada con GitHub Pages, con una **calculadora de promedio**
y pruebas automáticas con **Cypress**.

👉 https://142563.github.io/PaginaWebPruebaCaida/

## Dinámica del ejercicio

1. **Julio (dueño)** publica la `v1.0` funcional en `main`.
2. **El compañero** crea `release/1.1` con un bug, siguiendo
   [BUG_RELEASE_1.1_CODEX.md](BUG_RELEASE_1.1_CODEX.md) (se lo pasa a Codex).
3. **Cypress** detecta el error (localmente con `npm test` y en GitHub Actions).
4. **Julio** lo corrige en `hotfix/1.1.1` y vuelve a publicar.

Guía completa de ramas: [GITFLOW.md](GITFLOW.md)

## Pruebas con Cypress

```bash
npm install      # instala Cypress
npm test         # prueba el index.html local
npm run test:web # prueba la página publicada en GitHub Pages
npm run cy:open  # abre Cypress con interfaz gráfica
```

Con la página bien: **6 passing**. Con el bug de la release 1.1: **4 failing**.

Las pruebas también corren solas en GitHub (**Actions → Pruebas Cypress**) en
cada push y Pull Request.
