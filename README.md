# Hery Rasolofoarimanana — Portfolio (Kopenao)

Site portfolio statique pour Hery Rasolofoarimanana, réalisateur audiovisuel, designer 3D
et concepteur créatif, fondateur de l'agence **Kopenao** (Madagascar).

Site 100% statique : HTML, CSS et JavaScript pur (aucun framework, aucun build,
aucune base de données, aucun backend).

## Structure du projet

```
index.html        Page unique contenant toutes les sections du site
css/styles.css     Système de design (couleurs, typographie, mise en page, animations)
js/script.js       Thème clair/sombre, navigation mobile, révélation au scroll,
                   galerie de projets filtrable, formulaire de contact
assets/            Images (portrait, etc.)
```

## Ouvrir le site en local

Aucune installation n'est nécessaire. Deux options :

- **Le plus simple** : double-cliquer sur `index.html` pour l'ouvrir dans un navigateur.
- **Recommandé** (pour un rendu identique à la production, notamment pour les vidéos
  intégrées) : lancer un petit serveur local depuis le dossier du projet, par exemple :
  ```bash
  python -m http.server 8000
  ```
  puis ouvrir `http://localhost:8000` dans un navigateur.

## Mettre à jour les projets / vidéos (Showreel)

La galerie de projets est générée depuis un tableau JavaScript, dans `js/script.js`,
repérable par le commentaire `PROJECTS`. Chaque entrée ressemble à ceci :

```js
{ id: "p1", title: "Titre du projet", category: "Réalisation", youtubeId: "XXXXXXXXXXX" }
```

Pour remplacer une vidéo :

1. Récupérer l'identifiant YouTube de la vidéo (la partie après `v=` dans l'URL
   YouTube, ex : `https://www.youtube.com/watch?v=XXXXXXXXXXX`).
2. Remplacer la valeur de `youtubeId` par ce nouvel identifiant.
3. Adapter `title` et `category` si besoin.
4. `category` doit être l'une des valeurs suivantes pour rester compatible avec les
   filtres : `Réalisation`, `Design 3D`, `Institutionnel`, `Événementiel`.

Pour ajouter ou supprimer un projet, ajouter ou retirer une entrée du tableau — aucune
autre modification n'est nécessaire, la grille et les filtres se mettent à jour
automatiquement.

Les identifiants vidéo actuellement dans le tableau sont des **exemples de
démonstration** (marqués `// REMPLACER par le vrai lien`) : à remplacer par les vrais
projets avant mise en ligne.

## Mettre à jour les liens de contact

Les liens Portfolio / LinkedIn / Kopenao (section Contact de `index.html`, dans
`.social-links`) sont actuellement des `href="#"` à remplacer par les vraies URLs.
