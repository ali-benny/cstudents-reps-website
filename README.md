# Rappresentanti

Piattaforma web dei rappresentanti del corso di laurea magistrale in Computer Science dell'Università di Bologna.

## Funzionalità

- **Homepage moderna** con comunicazioni e informazioni sui rappresentanti
- **Sistema di comunicazioni** con filtri per categoria e priorità
- **Questionario studenti** per la valutazione dei corsi
- **Contatti rappresentanti** con email e Telegram
- **Design responsive** ottimizzato per mobile e desktop

## Tecnologie

- Vue 3 + TypeScript
- Vite per il build
- Tailwind CSS + DaisyUI per lo styling
- Vue Router per la navigazione

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

# How to

## Come metto un campo required?

Aggiungo alla classe del componente il campo `required`. Esempio:

```html
<cs-input v-model="name" label="Nome" required></cs-input>
```

Per avere una ui che indichi che il campo è obbligatorio, aggiungo la classe `validator` al componente. Esempio:
Vedi la documentazione di daisyui per ulteriori l'uso nei specifici componenti: https://daisyui.com/components/validator/

```html
<select class="select validator">
  <option value="" disabled selected>Seleziona un'opzione</option>
  <option value="1">Opzione 1</option>
  <option value="2">Opzione 2</option>
</select>
```
