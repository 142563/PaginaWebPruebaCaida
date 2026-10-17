# Tarea para Codex: Release 1.1 (introduce un bug a propósito)

> **Contexto para el compañero:** esto es un ejercicio de clase. Le pasas este archivo
> a Codex para que prepare la `release/1.1`. La release trae un **bug intencional**
> en la calculadora de promedio. Cypress debe detectarlo y el dueño del repo
> (Julio) lo arreglará con un `hotfix/1.1.1`.
>
> **No arregles el bug.** Ese es el trabajo del hotfix.

---

## Instrucciones para Codex

Trabaja en el repositorio `PaginaWebPruebaCaida`. Sigue los pasos **exactamente**
y en orden. No modifiques ningún otro archivo ni las pruebas de Cypress.

### 1. Crear la rama de release desde `main`

```bash
git checkout main
git pull origin main
git checkout -b release/1.1
```

### 2. Cambiar la versión en `index.html`

En el `<footer>`, cambia:

```html
Versión <span data-cy="version">1.0</span>
```

por:

```html
Versión <span data-cy="version">1.1</span>
```

### 3. "Refactor" de `leerNota` en `script.js` (aquí va el bug)

Reemplaza esta función:

```js
function leerNota(id) {
  return Number(document.getElementById(id).value);
}
```

por esta versión (debe quedar **exactamente así**):

```js
function leerNota(id) {
  // Release 1.1: lectura simplificada de las notas
  return document.getElementById(id).value;
}
```

Por qué esto rompe la página: `.value` devuelve **texto**, así que la suma
concatena (`0 + "7" + "8" + "9"` = `"0789"`) y el promedio sale `263.00`
en lugar de `8.00`. Además, notas de 4, 5 y 6 salen **Aprobado** cuando deberían
salir **Reprobado**.

### 4. Comprobar que Cypress detecta el error

```bash
npm install
npm test
```

> Si `npm test` dice que no encuentra el binario de Cypress, ejecuta
> `npx cypress install` y vuelve a correr `npm test`.

**Resultado esperado:** `2 passing`, **`4 failing`**. Fallan las pruebas de la
calculadora, por ejemplo:

```
expected <strong#promedio> to have text '8.00', but the text was '263.00'
```

Si todas las pruebas pasan, el bug no quedó bien aplicado: revisa el paso 3.

### 5. Commit y push de la release

```bash
git add index.html script.js
git commit -m "Release 1.1: simplifica lectura de notas y sube versión"
git push -u origin release/1.1
```

En GitHub, la pestaña **Actions** mostrará el workflow **Pruebas Cypress** en
rojo ❌ para la rama `release/1.1`.

### 6. Fusionar la release a `main` (publicar la versión rota)

```bash
git checkout main
git merge --no-ff release/1.1 -m "Merge release/1.1"
git tag v1.1
git push origin main --tags
```

En 1 o 2 minutos GitHub Pages publica la versión 1.1 y la página queda con el
fallo visible:

👉 https://142563.github.io/PaginaWebPruebaCaida/

Pruébalo en la página: ingresa **7, 8 y 9** → muestra **Promedio: 263.00**.

### 7. Avisar al dueño del repo

Avisa a Julio que la `v1.1` está publicada y que Cypress falla. Él hará el
`hotfix/1.1.1`.

---

## Checklist final (Codex debe confirmar)

- [ ] Rama `release/1.1` creada desde `main`
- [ ] Versión cambiada a `1.1` en `index.html`
- [ ] `leerNota` ya no usa `Number(...)`
- [ ] `npm test` termina con `4 failing` (pruebas de la calculadora)
- [ ] `release/1.1` subida a GitHub
- [ ] `release/1.1` fusionada en `main` con el tag `v1.1` y subida
