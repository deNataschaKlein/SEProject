This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

Git Flow installieren [https://www.atlassian.com/de/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/de/git/tutorials/comparing-workflows/gitflow-workflow)

In den Settings prüfen, ob Prettier und ESLint eingerichtet sind

```bash
npm run dev
```

## Einrichtung
Im obersten Ordner eine Datei mit dem Namen „ .env.local“ erstellen und deinen ANON_key zu supabase einfügen:

Mit dem Befehl „npm run dev“, können sie dann das Projekt starten, gegebenenfalls müssen sie noch Pakete, wie beispielsweise Next, nachinstallieren. 


## Commit-Regeln
Es wird nach dem Git Flow Prinzip gearbeitet. Das bedeutet es gibt einen Develop, Integration und Master Branch. 
Master-Branch: Deployment aufs Produktiv-System

Integration-Branch: Deployment aufs integrations-System

Develop-Branch: Von hier werden neue Features abgezweigt. Es landen nur fertige Features in den Develop Branch, wenn sie die DoD erfüllen.

### Nützliche Terminal Befehle
neuen Feature Branch anlegen `git flow feature start TICKET-NUMMER_Name`

## CSS
 Globale Variabeln werden in `src > styles > globals.css` angelegt.

CSS Klassen werden nach [BEM](https://getbem.com/introduction/) geschrieben 

CSS wird in Separaten Dateien als [CSS Modules](https://css-tricks.com/css-modules-part-1-need/) beschrieben

## Definition of Done


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
