# TruckTracker

Application React Native (Expo) pour suivre une petite flotte de camions
répartis en trois onglets : **En service**, **À l'arrêt**, **En maintenance**.

## Stack technique

- Expo SDK 54 (React Native 0.81, React 19.1) + TypeScript
- React Navigation v7 : Bottom Tabs + Stack imbriqué par onglet
- Context API (`TrucksContext`) comme seule source de vérité pour les camions
- NativeWind v4 (Tailwind CSS pour React Native)

## Installation

```bash
npm install
npx expo install --fix   # aligne les versions exactes avec le SDK installé
npx expo start
```

> Si vous aviez déjà lancé `npm install` avant cette version du projet,
> supprimez `node_modules`, `package-lock.json` et le dossier `.expo` puis
> relancez `npm install` :
> - NativeWind est volontairement figé sur `4.1.23` (pas `^4.1.23`), la
>   version que l'équipe NativeWind recommande elle-même pour Expo SDK 54.
> - Cette version de NativeWind s'appuie sur **Reanimated v3**, qui ne
>   fonctionne qu'avec l'**ancienne architecture** de React Native — d'où
>   `"newArchEnabled": false` dans `app.json` et le plugin
>   `react-native-reanimated/plugin` dans `babel.config.js`.
> - `babel-preset-expo` est listé explicitement pour éviter tout souci de
>   résolution/hoisting.

Scannez le QR code avec l'app Expo Go (Android/iOS), ou lancez `npx expo start --web`.

## Structure du projet

```
App.tsx                      Point d'entrée : Provider + Navigator
src/
  types/truck.ts             Types Truck / TruckStatus
  constants/status.ts        Labels, couleurs et noms d'onglets par statut
  data/data.ts                Camions de démarrage (données en mémoire)
  utils/truck.ts              isOilChangeDue() — logique de l'alerte vidange
  context/TrucksContext.tsx   État global + addTruck/updateTruck/deleteTruck/changeStatus
  navigation/
    types.ts                  Types des routes de chaque Stack
    TruckStack.tsx             Stack imbriqué : Liste -> Détail -> Formulaire
    RootNavigator.tsx          Tab Navigator (3 onglets, un TruckStack chacun)
  screens/
    TruckListScreen.tsx        Liste filtrée par statut + bouton "+"
    TruckDetailScreen.tsx      Détail, changement de statut, modifier, supprimer
    TruckFormScreen.tsx        Formulaire d'ajout/modification avec validation
  components/
    TruckCard.tsx               Carte d'un camion dans la liste
    StatusBadge.tsx             Pastille de statut colorée
    OilBadge.tsx                 Badge rouge "Vidange due"
    FormInput.tsx                Champ de formulaire avec label + erreur
    AppButton.tsx                 Bouton réutilisable (primary/outline/danger)
```

## Comment ça marche

- **Une seule source de données** : `TrucksProvider` (dans `App.tsx`) enveloppe
  toute l'app. Les trois onglets appellent tous `getTrucksByStatus()` sur le
  même contexte — il n'y a jamais de copie locale des camions.
- **Navigation imbriquée** : chaque onglet possède son propre `TruckStack`
  (Liste → Détail → Formulaire). Le statut d'un onglet est fixé une fois pour
  toutes via `initialParams` sur l'écran `TruckList`.
- **Changer le statut** : `TruckDetailScreen` appelle `changeStatus()` du
  contexte. Comme les listes lisent en direct depuis ce même contexte, le
  camion apparaît immédiatement dans son nouvel onglet, sans rechargement.
- **Alerte vidange** : purement dérivée, voir `isOilChangeDue()` dans
  `utils/truck.ts` — aucune donnée supplémentaire stockée.
