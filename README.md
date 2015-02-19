# Louise de Montalembert project

## Getting Started
**Ce paragraph ne concerne que les developers.**

    $ npm install
    $ bower install
    $ gulp init (pas indispensable mais permet de mettre a jour les fichiers)

##info

Le dossier app sert au developement de l'application et le dossier dist contient tout les fichiers pret a etre heberge 
en production. Il se peut que le bundle ne soit pas minifier pour changer ca uncomment la ligne 48 du gulpfile.js et 
relance la command gulp.

##todo
- Ecrire quelque tests?
- Ajouter des commandes pour les slideshow (arrows?, control?)
- Peaufiner le reste avec Louise


## Note Louise

HOME PAGE :

- pour la typo, tout passer en helvetica sans serif ; **v**
- passer la typo de : graphiste et directeur artistique, mon numéro, à propos, à 14 px ; **v**
- baisser le corps de la typo des légendes à 11px ; o
- mettre "louise de montalembert" en bold. **v**
- agrandir l'espace entre le à propos et le début des légendes : 
margin-top: 150px; **v**
height: calc(100% - 300px); **v**
(-> je suis passée par inspecter l'élément)
- passer le margin-bottom: 5px; des légendes projets sur la page d'accueil à margin-bottom: 10px; **v**
- enlever les majuscules à louise de montalembert, **v** (changement depuis parse.com)
- enlever le saut de ligne après louise de montalembert ou passer le margin-bottom de louise de montalembert à 5 px, **v**
- ajouter le lien contact en dessous du téléphone **v** (ajouter dans parse et changer le style du lien)
- ajouter des numéros aux légendes (qui devraient se répéter à côté des images cf la maquette du site) **v**
- ajouter les images sur la home page (cf site, sera-t-il possible de gérer la position et la taille des images + que ça soit responsive ? )
- ajouter les liens vers magneto, portfolio, source et F.O.R.G.E en bas à gauche en fixe.  **v**

PAGE PROJET : 

- garder le header colonne de gauche (mon nom + prénom + à propos etc)
- positionner la légende comme sur la maquette / en colonne 
- recalculer la hauteur des images de manière à ce qu'il n'y ait jamais de scrawl dans la hauteur de la page. 
- enlever le "home" pour retourner à la première page, 
- ajouter une croix en haut à droite (cf maquette) 
—> je peux te l'envoyer au besoin au format png à la bonne taille