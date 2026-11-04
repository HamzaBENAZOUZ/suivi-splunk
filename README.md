# Suivi formation Splunk

Site personnel de suivi de ma formation Splunk (SPLK-1001 → SPLK-1002 → SPLK-1003) :
planning sur 26 semaines, cases à cocher par séance, scénarios optimiste / pessimiste,
interface FR / EN, thème sombre / clair.

Le site est un simple fichier HTML, sans dépendance ni étape de build. Il fonctionne
tel quel sur GitHub Pages.

## Contenu du dossier

| Fichier        | Rôle |
|----------------|------|
| `index.html`   | Le site de suivi (tout est dedans : style, données, script). |
| `404.html`     | Page affichée si une adresse n'existe pas, avec un lien de retour. |
| `favicon.svg`  | Icône de l'onglet du navigateur. |
| `.nojekyll`    | Dit à GitHub Pages de publier les fichiers tels quels, sans passer par Jekyll. |
| `README.md`    | Ce fichier. |

## Publier sur GitHub Pages

### 1. Créer le dépôt

1. Connecte-toi sur <https://github.com> puis clique sur **New** (ou va sur <https://github.com/new>).
2. Nom du dépôt : par exemple `splunk-suivi`.
3. Visibilité : **Public** (GitHub Pages est gratuit pour les dépôts publics).
4. Ne coche rien d'autre, puis clique sur **Create repository**.

### 2. Envoyer les fichiers

**Option A, depuis le navigateur (le plus simple)**

1. Dézippe `site-github-pages.zip` sur ton ordinateur.
2. Dans le dépôt vide, clique sur **uploading an existing file**.
3. Glisse-dépose **le contenu** du dossier (pas le dossier lui-même) :
   `index.html`, `404.html`, `favicon.svg`, `README.md`.
4. Clique sur **Commit changes**.
5. Le fichier `.nojekyll` est caché sur la plupart des ordinateurs et peut être oublié
   au glisser-déposer. Pour l'ajouter : **Add file → Create new file**, nomme-le
   `.nojekyll`, laisse-le vide, puis **Commit changes**. (Il n'est pas indispensable
   pour ce site, mais il évite tout traitement inutile par GitHub.)

**Option B, en ligne de commande (git)**

```bash
cd site-github-pages
git init
git add .
git commit -m "Site de suivi Splunk"
git branch -M main
git remote add origin https://github.com/<ton-identifiant>/splunk-suivi.git
git push -u origin main
```

### 3. Activer GitHub Pages

1. Dans le dépôt : **Settings → Pages**.
2. **Source** : *Deploy from a branch*.
3. **Branch** : `main`, dossier `/ (root)`, puis **Save**.
4. Attends une à deux minutes, puis recharge la page : l'adresse s'affiche en haut,
   du type `https://<ton-identifiant>.github.io/splunk-suivi/`.

## Mettre à jour le site

Remplace `index.html` dans le dépôt (**Add file → Upload files**, ou `git push`).
GitHub Pages republie tout seul en une à deux minutes. Si tu ne vois pas le changement,
fais un rechargement forcé (Ctrl + F5, ou Cmd + Maj + R sur Mac).

## Où est enregistré mon avancement ?

Les cases cochées sont enregistrées **dans ton navigateur** (localStorage), pas sur GitHub.
Concrètement :

- rien de personnel n'est envoyé ni publié : le dépôt public ne contient que le planning ;
- l'avancement est propre à chaque navigateur et à chaque appareil ;
- vider les données du site dans le navigateur efface l'avancement.

Pour ne rien perdre ou passer d'un appareil à l'autre, utilise les boutons
**Exporter l'avancement** / **Charger un fichier de suivi** du site (fichier JSON). C'est aussi comme ça que tu récupères
l'avancement déjà saisi dans le fichier `suivi_splunk.html` ouvert en local :
exporte depuis l'ancien, importe dans le site en ligne.

## Bon à savoir

- Le dépôt étant public, n'importe qui ayant l'adresse peut voir le planning
  (mais pas ton avancement).
- Si le planning Excel change, le site doit être régénéré puis `index.html` remplacé.
