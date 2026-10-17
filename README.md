# Ejercicio: Página Caída

Página web estática publicada con GitHub Pages.

## Dinámica del ejercicio

1. El dueño crea el repositorio y publica la página.
2. Un compañero (colaborador) sube un cambio que "rompe" la página.
3. El dueño detecta el error y lo soluciona.

👉 Guía paso a paso con GitFlow (release → hotfix → GitHub Pages): [GITFLOW.md](GITFLOW.md)

## Cómo corregir un error subido por otra persona

```bash
git pull                 # traer los cambios del compañero
git log --oneline        # ver qué commit introdujo el error
git show <commit>        # ver exactamente qué cambió
```

Luego, una de dos:

- **Revertir el commit completo:** `git revert <commit>`
- **Corregir a mano:** editar el archivo, luego `git add . && git commit -m "Corrige error"`

Y finalmente `git push`.
