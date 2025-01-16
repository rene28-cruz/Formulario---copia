import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Importa el módulo tradicional

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));