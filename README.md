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
assets/designs/    Visuels de la section "Design graphique" (à ajouter)
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
{ id: "p1", title: "Titre du projet", category: "Réalisation", description: "Courte description.", date: "2025-08-31", youtubeId: "XXXXXXXXXXX" }
```

Pour remplacer une vidéo :

1. Récupérer l'identifiant YouTube de la vidéo (la partie après `v=` dans l'URL
   YouTube, ex : `https://www.youtube.com/watch?v=XXXXXXXXXXX`).
2. Remplacer la valeur de `youtubeId` par ce nouvel identifiant.
3. Adapter `title`, `description`, `category` et `date` si besoin.
4. `category` doit être l'une des valeurs suivantes pour rester compatible avec les
   filtres : `Réalisation`, `Design 3D`, `Institutionnel`, `Événementiel`.

`date` (format `"AAAA-MM-JJ"`, `"AAAA-MM"` ou `"AAAA"` selon la précision connue, ou
`null` si inconnue) n'est qu'un repère de lecture : **l'ordre affiché sur le site est
l'ordre des entrées dans le tableau**, rien n'est trié automatiquement. Pour changer
l'ordre d'affichage, déplacer l'entrée à la position voulue dans le tableau.

Un projet sans vidéo pour l'instant peut être ajouté avec `youtubeId: null` : une
vignette « Vidéo à venir » s'affiche automatiquement à la place du lecteur, le temps
d'ajouter le vrai lien.

Pour ajouter ou supprimer un projet, ajouter ou retirer une entrée du tableau — aucune
autre modification n'est nécessaire, la grille et les filtres se mettent à jour
automatiquement.

Les vidéos se lisent directement sur la page (lecteur intégré via `lite-youtube-embed`),
sans redirection vers YouTube. Au survol, chaque carte s'incline légèrement en 3D en
suivant le curseur (effet désactivé sur écran tactile et si l'utilisateur préfère moins
d'animations, voir `applyTiltEffect` dans `js/script.js`).

## Mettre à jour la section Design graphique

La galerie de créations graphiques (section "Design graphique") est générée depuis un
tableau JavaScript, dans `js/script.js`, repérable par le commentaire `DESIGNS`. Chaque
entrée ressemble à ceci :

```js
{ id: "d1", title: "Titre du visuel", category: "Identité visuelle", description: "Courte description.", image: "assets/designs/design-1.jpg" }
```

Pour ajouter un vrai visuel :

1. Déposer le fichier image dans le dossier `assets/designs/`.
2. Faire correspondre le chemin `image` de l'entrée au nom du fichier déposé
   (ou modifier le chemin pour qu'il pointe vers le bon fichier).
3. Adapter `title`, `description` et `category` si besoin.
4. `category` doit être l'une des valeurs suivantes pour rester compatible avec les
   filtres : `Identité visuelle`, `Affiche`, `Rendu 3D`, `Habillage TV`.

Tant qu'aucun fichier n'existe au chemin indiqué, une vignette de remplacement
("Visuel à venir") s'affiche automatiquement à la place de l'image — aucune action
supplémentaire n'est nécessaire, il suffit d'ajouter les fichiers plus tard.

## Mettre à jour les liens de contact

Les liens Portfolio / LinkedIn / Kopenao (section Contact de `index.html`, dans
`.social-links`) sont actuellement des `href="#"` à remplacer par les vraies URLs.
