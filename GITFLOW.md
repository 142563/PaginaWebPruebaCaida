# Guía GitFlow: release con error → Cypress → hotfix → GitHub Pages

Ramas que usamos (todas salen de `main`):

| Rama | Quién | Para qué |
|------|-------|----------|
| `main` | Julio | Lo que está publicado en GitHub Pages |
| `release/1.1` | Compañero | Nueva versión (trae el bug) |
| `hotfix/1.1.1` | Julio | Arreglar el bug que llegó a producción |

```
main        ●──────────────●─────────────────●   v1.0 → v1.1 (rota) → v1.1.1 (arreglada)
             \            /  \               /
release/1.1   ●──── bug ─●    \             /
                               hotfix/1.1.1 ●── fix
```

---

## Paso 1 — Compañero: release 1.1 con el bug

```bash
git clone https://github.com/142563/PaginaWebPruebaCaida.git
cd PaginaWebPruebaCaida
npm install
npm test          # debe salir 6 passing (la v1.0 está bien)
```

Luego le pasa a Codex el archivo [BUG_RELEASE_1.1_CODEX.md](BUG_RELEASE_1.1_CODEX.md).
Codex crea `release/1.1`, mete el bug, comprueba que Cypress falla y fusiona en `main`.

👉 GitHub Pages publica la v1.1 y **la calculadora da resultados absurdos**.

---

## Paso 2 — Julio: detectar el error

```bash
git checkout main
git pull origin main --tags
npm install
npm test                 # Cypress local: 4 failing
npm run test:web         # Cypress contra la página publicada: también falla
git log --oneline --graph
git diff v1.0 v1.1       # qué cambió en la release
```

En GitHub, **Actions → Pruebas Cypress** también aparece en rojo ❌.

---

## Paso 3 — Julio: crear `hotfix/1.1.1` desde `main` y arreglar

```bash
git checkout -b hotfix/1.1.1 main
```

Corregir el código hasta que:

```bash
npm test                 # 6 passing
```

Subir también la versión a `1.1.1` en el footer de `index.html`.

```bash
git add .
git commit -m "Hotfix 1.1.1: corrige cálculo del promedio"
git push -u origin hotfix/1.1.1
```

Actions debe quedar en verde ✅ para `hotfix/1.1.1`.

---

## Paso 4 — Julio: fusionar el hotfix en `main` y publicar

Por Pull Request en GitHub (`hotfix/1.1.1 → main`) o por consola:

```bash
git checkout main
git merge --no-ff hotfix/1.1.1 -m "Merge hotfix/1.1.1"
git tag v1.1.1
git push origin main --tags
```

Esperar 1–2 minutos y confirmar:

```bash
npm run test:web         # 6 passing contra la página publicada
```

---

## Paso 5 — Limpieza (opcional)

```bash
git branch -d hotfix/1.1.1 release/1.1
git push origin --delete hotfix/1.1.1 release/1.1
```

> Nota: en GitFlow "completo" también existe `develop`, y el hotfix se fusiona
> en `main` **y** en `develop`. En este ejercicio todo sale de `main`.
