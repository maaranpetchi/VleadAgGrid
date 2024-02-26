import { LicenseManager } from 'ag-grid-enterprise';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

LicenseManager.setLicenseKey("Using_this_AG_Grid_Enterprise_key_MTczNzUwNDAwMDAwMA==de3d312b484f7534d0511942e188c086");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  LicenseManager.setLicenseKey("Using_this_AG_Grid_Enterprise_key_MTczNzUwNDAwMDAwMA==de3d312b484f7534d0511942e188c086");
