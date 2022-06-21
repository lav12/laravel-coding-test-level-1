
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { EventsModule } from './events/events.module';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
   
  ],
  declarations: [
    PagesComponent,
  ],
  providers:[
    ConfirmationDialogService,
  ]
})
export class PagesModule {
}
