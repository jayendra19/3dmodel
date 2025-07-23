# Ready Player Me Avatar Lip-Sync Demo

This project demonstrates loading a Ready Player Me avatar (GLB with visemes) and animating its mouth using browser TTS and morph targets in React/three.js.

## Setup
1. Export your avatar GLB from Ready Player Me with visemes (?morphTargets=Oculus Visemes).
2. Place it in `public/models/avatar.glb`.
3. Run `npx gltfjsx ./public/models/avatar.glb` to generate `src/components/Avatar.jsx`.
4. Install dependencies: `npm install`.
5. Start the app: `npm start`.

## Features
- Lip-sync via SpeechSynthesisUtterance.onboundary
- Mouth animation through morph-target influences
- No extra server or TTS provider needed

## For production
Consider Rhubarb or Microsoft Speech SDK for more accurate viseme timing.
