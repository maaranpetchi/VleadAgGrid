import { LicenseManager } from 'ag-grid-enterprise';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-053951}_MTczNzUwNDAwMDAwMA==de3d312b484f7534d0511942e188c086");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
