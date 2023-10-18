import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);


const updateVhProperty = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  
  // Aggiorna il valore iniziale al caricamento della pagina
  updateVhProperty();
  
  // Aggiorna il valore quando la finestra viene ridimensionata
  window.addEventListener("resize", updateVhProperty);

app.use(router);

app.mount('#app');
