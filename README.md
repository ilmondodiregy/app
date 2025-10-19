# Gestione Attività PWA

Progressive Web App ottimizzata per iPad per gestire ordini, spese e scorte.

## 🚀 Quick Start

### Deploy su GitHub Pages

1. Carica tutti i file nella root del repository
2. Vai su Settings → Pages  
3. Source: Deploy from a branch
4. Branch: main, Folder: / (root)
5. Salva e attendi 1-2 minuti
6. Accedi all'URL fornito

### Installazione su iPad

1. Apri Safari su iPad
2. Visita l'URL di GitHub Pages
3. Tap icona "Condividi" (↑)
4. "Aggiungi a Home"
5. L'app è pronta!

## ✨ Caratteristiche

- ✅ Funzionamento offline
- 💾 Dati salvati localmente
- 📸 Supporto fotocamera
- 📊 Export Excel e PDF
- 🎨 UI moderna e responsive
- ⚡ Zero configurazione

## 📁 Struttura File

- `index.html` - Pagina principale
- `app.js` - Logica applicazione
- `manifest.json` - Config PWA
- `package.json` - Dipendenze (opzionale)
- `.gitignore` - Esclusioni Git

## 🔧 Sviluppo Locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## 📱 Funzionalità

### Ordini
- Gestione ordini clienti
- Filtri avanzati
- Export Excel/PDF

### Spese  
- Tracciamento spese
- Calcolo totali
- Report export

### Scorte
- Inventario prodotti
- Upload foto
- Movimenti magazzino

## 💡 Note

- Tutti i dati sono salvati in localStorage
- L'app funziona completamente offline
- Le immagini sono compresse automaticamente
- Export richiede connessione (prima volta)

## 🆘 Supporto

- Console browser (F12) per debug
- Controlla che app.js sia >60KB
- Verifica manifest.json con "start_url": "./"

---

**Made with ❤️ for iPad**