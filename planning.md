# AJRRADY WEBSITE BUILD INSTRUCTIONS

## ROLE

Act as a senior full-stack developer, UI/UX designer, and product engineer.

Build the AJRRADY website as a real professional production website.

Do not write phrases like:

* "The document says..."
* "According to the documentation..."
* "La documentation officielle indique..."
* "Based on the provided document..."

Use the organization information naturally as final website content.

The website should feel complete, official, clean, and professional.

---

# TECH STACK

Use:

* Next.js
* React
* TypeScript
* Tailwind CSS

Optional:

* Framer Motion for subtle animations
* Lucide React for icons

---

# DESIGN RULES

Follow the approved design exactly.

Do not redesign the homepage.

Do not add unnecessary sections.

Do not invent content.

Do not use stock images.

Use only assets from the `/public` folder:

* LOGO.png
* LOGO.jpg
* SymboleAJRRADY.png
* Landingpage.jpg
* Favicon.png

Brand colors:

* Purple: #6A0DAD
* Green: #16A34A
* White: #FFFFFF
* Light background: #F8F8FC
* Dark text: #1F2937

Typography must be clean, readable, and professional.

Make sure font sizes are balanced:

* Hero title should be large and bold.
* Paragraphs should be readable.
* Footer text should not be too small.
* Mobile text should scale properly.

---

# WEBSITE TYPE

This is a professional showcase website, not an admin dashboard.

However, build it with clean reusable components as if it could later become a full CRUD app.

Use a clean project architecture:

* components
* data
* pages or app routes
* sections
* lib
* types

Keep content in reusable data files so it can later be connected to a database or CMS.

---

# NAVIGATION

All navigation links must work.

Navbar links:

* Accueil
* À Propos
* Nos Actions
* Réalisations
* FEC-SY
* Galerie
* Contact
* Adhérer

Buttons must work:

* Découvrir Nos Actions → `/nos-actions`
* Adhérer → `/adhesion`
* Contact → `/contact`
* FEC-SY → `/fec-sy`
* Galerie → `/galerie`

No dead links.

No empty pages.

No broken buttons.

---

# OFFICIAL INFORMATION

Name:
AJRRADY

Full Name:
Association des Jeunes Ressortissants, Résidents et Amis pour le Développement de Youkounkoun

Slogan:
Unis pour servir, engagés pour développer Youkounkoun.

Website:
https://www.ajrrady.org

Phone:
+224 628 70 27 34

Email:
[contact@ajrrady.org](mailto:contact@ajrrady.org)

Location:
Youkounkoun, Koundara – Guinée

Legal Nature:
Association communautaire à but non lucratif

Head Office:
Conakry – Commune de Tombolia – Lansanaya Barrage, République de Guinée

Area of Intervention:
Youkounkoun, Préfecture de Koundara, Région Administrative de Boké, avec une représentation locale et des ressortissants établis à travers la Guinée et à l'étranger.

---

# PAGES TO BUILD

## 1. HOME PAGE `/`

Keep the homepage exactly like the approved design.

Sections:

* Header/Navbar
* Hero
* Domaines d’intervention
* Footer

Do not overload the homepage.

Hero title:

UNIS POUR SERVIR,
ENGAGÉS POUR DÉVELOPPER
YOUKOUNKOUN

Hero paragraph:

AJRRADY est une organisation communautaire engagée dans la promotion du développement durable à travers l’éducation, la culture, le sport, la santé, l’environnement, la solidarité et la mobilisation de la diaspora.

Hero buttons:

* Découvrir Nos Actions
* Adhérer

Domaines:

* Éducation
* Culture
* Sport
* Santé
* Environnement
* Solidarité
* Diaspora

---

## 2. À PROPOS `/a-propos`

Include:

* Présentation
* Historique
* Mission
* Vision
* Valeurs

Vision:

Faire de Youkounkoun une communauté unie, dynamique, solidaire et prospère, portée par une jeunesse responsable et engagée dans le développement durable.

Mission:

AJRRADY est une organisation communautaire engagée dans le développement durable de Youkounkoun à travers l’éducation, la culture, le sport, la santé, l’environnement, la solidarité et la mobilisation de la diaspora.

Values:

* Solidarité
* Unité
* Engagement communautaire
* Respect des traditions
* Hospitalité et vivre-ensemble
* Intégrité et transparence
* Responsabilité
* Excellence
* Inclusion
* Protection de l'environnement

---

## 3. NOS ACTIONS `/nos-actions`

Use clean cards.

Actions:

* Développement communautaire
* Éducation
* Culture
* Sport
* Santé
* Environnement et développement durable
* Solidarité
* Diaspora

---

## 4. RÉALISATIONS `/realisations`

Display only documented achievements:

* Promotion de l’éducation et de l’excellence scolaire
* Distribution de kits scolaires
* Organisation de retraites stratégiques
* Réhabilitation des infrastructures scolaires
* Rénovation de la Brigade de Gendarmerie de Youkounkoun
* Construction du magasin communautaire agricole
* Construction du hangar multifonctionnel des femmes
* Festival Culturel et Sportif de Youkounkoun
* Construction et aménagement du Stade Loni Allotène
* Mobilisation communautaire et solidarité
* Campagnes de sensibilisation et de reboisement

---

## 5. FEC-SY `/fec-sy`

Build a clean festival page.

Title:
Festival Culturel et Sportif de Youkounkoun

Subtitle:
FEC-SY

Content:

Le FEC-SY est l’événement phare de l’AJRRADY. Il valorise le patrimoine culturel, sportif et humain de Youkounkoun, renforce le vivre-ensemble et mobilise les communautés autour du développement local.

Edition 2026:

Deuxième édition prévue du 10 juillet au 11 août 2026.

Participation attendue:

* Sénégal
* Gambie
* Guinée-Bissau
* Préfecture de Gaoual
* Ensemble des sous-préfectures de Koundara

Important:
Do not write "La documentation indique".
Write it as direct professional content.

---

## 6. GALERIE `/galerie`

Simple gallery page.

Use provided images only.

If there are no gallery photos yet, create a clean empty state:

Les photos officielles seront bientôt disponibles.

Do not use stock images.

---

## 7. ADHÉSION `/adhesion`

Build a simple membership page.

Include form fields:

* Nom
* Prénom
* Téléphone
* Email
* Ville
* Pays
* Profession
* Message

Button:
Envoyer la demande

No backend required yet.

Use a clean form UI.

---

## 8. CONTACT `/contact`

Include:

* Phone
* Email
* Website
* Location
* Contact form

Contact form fields:

* Nom
* Email
* Sujet
* Message

Button:
Envoyer le message

---

# FOOTER

Footer must be professional and readable.

The current footer text is too small. Increase font size and spacing.

Footer background:
Purple gradient

Top accent:
Green line

Footer columns:

## AJRRADY

Association des Jeunes Ressortissants, Résidents et Amis pour le Développement de Youkounkoun

Unis pour servir, engagés pour développer Youkounkoun.

## LIENS RAPIDES

* Accueil
* À Propos
* Nos Actions
* Réalisations
* FEC-SY
* Galerie
* Contact

## NOS ACTIONS

* Éducation
* Culture
* Sport
* Santé
* Environnement
* Solidarité
* Diaspora

## CONTACT

+224 628 70 27 34
[contact@ajrrady.org](mailto:contact@ajrrady.org)
[www.ajrrady.org](http://www.ajrrady.org)
Youkounkoun, Koundara – Guinée

## SUIVEZ-NOUS

Facebook:
https://www.facebook.com/profile.php?id=61590795758568

Instagram:
https://www.instagram.com/ajrrady_/

LinkedIn:
https://www.linkedin.com/company/ajrrady

YouTube:
https://www.youtube.com/channel/UCPKJ1dicFi2TvyGnzAzbDjw

Copyright:

© 2026 AJRRADY. Tous droits réservés.

---

# SEO

Add SEO metadata for every page.

Meta title:
AJRRADY | Association pour le Développement de Youkounkoun

Meta description:
AJRRADY est une association engagée dans l’éducation, la culture, le sport, la santé, l’environnement, la solidarité et le développement durable de Youkounkoun.

Keywords:

* santé communautaire
* santé publique
* prévention sanitaire
* développement local
* association guinéenne
* Youkounkoun
* AJRRADY

Generate:

* sitemap.xml
* robots.txt
* Open Graph metadata
* Favicon
* Social preview image

---

# QUALITY CHECK

Before finishing:

* All routes must work.
* All navbar links must work.
* All footer links must work.
* All buttons must route correctly.
* No placeholder lorem ipsum.
* No fake statistics.
* No stock images.
* No broken images.
* No console errors.
* Mobile version must be clean.
* Footer must be readable.
* Text sizes must be professional.
* Homepage must match the approved design.
* Content must be written as final website copy, not as explanation from a document.

---

# FINAL GOAL

Build a simple, professional, official website for AJRRADY.

It must look exactly like the approved design, remain clean, and use only verified organization content.
