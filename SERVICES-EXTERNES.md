# Services et dépendances externes

Audit du code exporté le 27 octobre 2026.

| Fonction | Service / dépendance | Fonctionnement |
| --- | --- | --- |
| Formulaire de contact | Messagerie du visiteur, via `mailto:` | Prépare un e-mail à request@sophieysaye.com. Aucun envoi automatique, aucun serveur de formulaire, aucune base de données. Le visiteur doit envoyer le message. |
| Réseau social | Instagram | Lien vers https://www.instagram.com/sophieysaye_/. Aucun contenu Instagram embarqué ; aucune connexion avant un clic. |
| Téléphone | Application de téléphone du visiteur, via `tel:` | Liens vers les numéros belge et français. |
| Analytics | Aucun | Aucun script de mesure d’audience ou pixel publicitaire dans le code exporté. |
| Polices | Aucun service distant | Pragmatica Extended Bold est fournie dans assets/pragmatica-extended-bold.woff2. Arial / sans-serif servent de polices de repli système. Aucun Google Fonts, Adobe Fonts ou CDN de polices. |
| Scripts tiers / bibliothèques / CDN | Aucun | JavaScript natif fourni dans js/. Aucun téléchargement de bibliothèque. |
| Hébergement de la version en ligne | ChatGPT Sites | La version privée publiée utilise l’hébergement et le contrôle d’accès ChatGPT. L’archive est statique et autonome : elle ne dépend pas de cette authentification et n’en reproduit pas la protection d’accès. |

Le document HTML comporte une métadonnée Google `notranslate` : ce n’est pas un appel à un service Google.
Le lien Free Font Download du fichier de licence est une référence documentaire, pas une ressource chargée par le site.

## Licence de la police

Le fichier assets/font-license.txt livré avec la police indique « Personal use only » et exclut l’usage commercial et la redistribution modifiée. La présence du fichier dans cette copie technique ne constitue pas une autorisation d’exploitation commerciale. Pour une publication commerciale, obtenir une licence adaptée ou remplacer la police. Le fichier de licence d’origine est conservé intégralement.
