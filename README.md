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
| `config.js`    | Adresse et clé publique Supabase pour la synchronisation en ligne (vide = site 100 % local). |
| `supabase.sql` | Script à exécuter une fois dans Supabase : crée la table et les règles d'accès. |
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

## Synchroniser l'avancement entre appareils (Supabase, gratuit)

Sans configuration, l'avancement reste dans le navigateur. Avec Supabase (base de
données gratuite), tu te connectes avec ton email et un mot de passe, et le site
récupère ton avancement à chaque connexion, sur n'importe quel appareil.

### 1. Créer le projet Supabase (5 min)

1. Va sur <https://supabase.com>, clique sur **Start your project** et crée un compte
   (tu peux te connecter avec GitHub).
2. **New project** : nom `suivi-splunk`, choisis un mot de passe de base de données
   (garde-le de côté, il ne sert pas au site), région **Europe (Paris ou Frankfurt)**,
   offre **Free**. Attends une à deux minutes que le projet soit prêt.

### 2. Créer la table

1. Dans le menu de gauche : **SQL Editor** → **New query**.
2. Copie-colle tout le contenu de `supabase.sql`, puis clique sur **Run**.
   Le message *Success. No rows returned* est normal.

La table `progress` contient une ligne par utilisateur. Les règles RLS garantissent que
chacun ne peut lire et modifier que sa propre ligne.

### 3. Régler la connexion

1. **Authentication → URL Configuration** :
   - **Site URL** : `https://hamzabenazouz.github.io/suivi-splunk/`
   - **Redirect URLs** : ajoute la même adresse.
   C'est là que mène le lien de confirmation envoyé par email.
2. **Authentication → Sign In / Providers → Email** : laisse **Email** activé.
   *Confirm email* peut rester activé (recommandé).

### 4. Récupérer les deux valeurs publiques

Bouton **Connect** en haut du projet (ou **Project Settings → API / API Keys**) :

- **Project URL**, du type `https://abcdefghijklmnop.supabase.co`
- la clé **publishable** (`sb_publishable_...`) ou, à défaut, la clé **anon public** (`eyJ...`).

⚠️ Ne prends **jamais** la clé `service_role` / `secret` : elle donne tous les droits et
ne doit pas être publiée.

### 5. Mettre à jour le site sur GitHub

1. Dans ton dépôt `suivi-splunk`, ouvre `config.js` → icône ✏️ (*Edit this file*)
   et remplis les deux valeurs :
   ```js
   window.SYNC_CONFIG = {
     supabaseUrl: "https://abcdefghijklmnop.supabase.co",
     supabaseKey: "sb_publishable_xxxxxxxxxxxxxxxx"
   };
   ```
2. **Commit changes**.
3. Si ce n'est pas déjà fait, envoie aussi la nouvelle version de `index.html`
   (**Add file → Upload files**), ainsi que `supabase.sql` si tu veux le garder dans le dépôt.
4. Attends une à deux minutes, puis recharge le site (Ctrl + F5).

### 6. Première connexion

1. Sur le site, la carte **Paramètres et sauvegarde** affiche maintenant
   **☁ Synchronisation en ligne**.
2. Saisis ton email et un mot de passe (8 caractères minimum), puis clique sur
   **Créer mon compte**.
3. Ouvre l'email de Supabase et clique sur le lien : tu reviens sur le site, déjà connecté.
   Sinon, clique sur **Se connecter**.
4. À la première connexion, l'avancement déjà présent dans ce navigateur est envoyé dans
   la base. Sur tes autres appareils, il suffit de te connecter.

### 7. Fermer les inscriptions (recommandé)

Une fois ton compte créé : **Authentication → Sign In / Providers** → désactive
**Allow new users to sign up**. Personne d'autre ne pourra créer de compte sur ta base.

### Comment ça marche au quotidien

- Chaque case cochée, note ou réglage est enregistré dans le navigateur, puis envoyé
  à Supabase environ une seconde plus tard.
- À l'ouverture du site, et quand tu reviens sur l'onglet, le site récupère la version
  la plus récente. Si deux appareils ont modifié l'avancement, **la modification la plus
  récente l'emporte**.
- Tu restes connecté d'une visite à l'autre. **Se déconnecter** garde l'avancement
  dans ce navigateur.
- Hors ligne, rien n'est perdu : l'envoi se fait au retour du réseau.
- Le projet Supabase gratuit est mis en pause après 7 jours sans aucune activité.
  Il suffit de le réactiver depuis le tableau de bord Supabase (bouton **Restore**).

## Où est enregistré mon avancement ?

Sans Supabase, les cases cochées sont enregistrées **dans ton navigateur**
(localStorage), pas sur GitHub. Concrètement :

- rien de personnel n'est envoyé ni publié : le dépôt public ne contient que le planning ;
- l'avancement est propre à chaque navigateur et à chaque appareil ;
- vider les données du site dans le navigateur efface l'avancement.

Pour ne rien perdre ou passer d'un appareil à l'autre, utilise les boutons
**Exporter l'avancement** / **Charger un fichier de suivi** du site (fichier JSON). C'est aussi comme ça que tu récupères
l'avancement déjà saisi dans le fichier `suivi_splunk.html` ouvert en local :
exporte depuis l'ancien, importe dans le site en ligne.

## Bon à savoir

- Le dépôt étant public, n'importe qui ayant l'adresse peut voir le planning
  (mais pas ton avancement, qui est dans le navigateur ou dans ta base Supabase privée).
- L'URL et la clé publique dans `config.js` sont faites pour être visibles : sans compte
  connecté, elles ne donnent accès à aucune donnée.
- Si le planning Excel change, le site doit être régénéré puis `index.html` remplacé.
