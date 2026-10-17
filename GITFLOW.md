# Guía GitFlow: release con error → hotfix → GitHub Pages

Ramas que usamos (todas salen de `main`):

| Rama | Quién | Para qué |
|------|-------|----------|
| `main` | Julio | Lo que está publicado en GitHub Pages |
| `release/1.1` | Compañero | Nueva versión (aquí mete el error) |
| `hotfix/1.1.1` | Julio | Arreglar el error que llegó a producción |

```
main      ●──────────────●─────────────────●   (v1.0 → v1.1 rota → v1.1.1 arreglada)
           \            /  \               /
release/1.1 ●──●──────●     \             /
                              hotfix/1.1.1 ●──●
```

---

## Paso 0 — Julio: preparar `main` y GitHub Pages

```bash
git remote add origin https://github.com/TU_USUARIO/ejercicio-pagina-caida.git
git push -u origin main
git tag v1.0
git push origin v1.0
```

En GitHub:
- **Settings → Pages** → Branch: `main`, carpeta `/ (root)` → Save.
- **Settings → Collaborators** → agregar al compañero.

La página queda en `https://TU_USUARIO.github.io/ejercicio-pagina-caida/`.

---

## Paso 1 — Compañero: crea `release/1.1` y mete el error

```bash
git clone https://github.com/TU_USUARIO/ejercicio-pagina-caida.git
cd ejercicio-pagina-caida
git checkout -b release/1.1 main
```

Error sugerido: en `script.js`, línea 1, cambiar `"estado"` por `"estdo"`:

```js
const estado = document.getElementById("estdo");
```

Así el JavaScript falla y la página se queda en "Comprobando..." y el contador en 0.

```bash
git add script.js
git commit -m "Release 1.1: cambios en script"
git push -u origin release/1.1
```

Luego en GitHub abre un **Pull Request** `release/1.1 → main` y lo fusiona
(o lo hace por consola):

```bash
git checkout main
git merge --no-ff release/1.1 -m "Merge release/1.1"
git tag v1.1
git push origin main --tags
```

👉 GitHub Pages se actualiza en 1–2 minutos y **la página aparece rota**.

---

## Paso 2 — Julio: detectar el error

```bash
git checkout main
git pull
git log --oneline --graph
```

Abrir la página publicada → **F12 → Console**. Se ve algo como:

```
Uncaught TypeError: Cannot set properties of null (setting 'textContent')
```

Ver qué cambió en la release:

```bash
git diff v1.0 v1.1
```

---

## Paso 3 — Julio: crear `hotfix/1.1.1` desde `main` y arreglar

```bash
git checkout -b hotfix/1.1.1 main
```

Corregir `script.js` (volver a `"estado"`):

```js
const estado = document.getElementById("estado");
```

```bash
git add script.js
git commit -m "Hotfix 1.1.1: corrige id del elemento estado"
git push -u origin hotfix/1.1.1
```

---

## Paso 4 — Julio: fusionar el hotfix en `main` y publicar

Por Pull Request en GitHub (`hotfix/1.1.1 → main`) o por consola:

```bash
git checkout main
git merge --no-ff hotfix/1.1.1 -m "Merge hotfix/1.1.1"
git tag v1.1.1
git push origin main --tags
```

👉 GitHub Pages se vuelve a publicar y **la página funciona otra vez**
(revisar en **Actions** o **Settings → Pages** que el deploy terminó).

---

## Paso 5 — Limpieza (opcional)

```bash
git branch -d hotfix/1.1.1 release/1.1
git push origin --delete hotfix/1.1.1 release/1.1
```

> Nota: en GitFlow "completo" también existe `develop`, y el hotfix se fusiona
> en `main` **y** en `develop`. En este ejercicio todo sale de `main`, así que
> solo fusionamos en `main`.
