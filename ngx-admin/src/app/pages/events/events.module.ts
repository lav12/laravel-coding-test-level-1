import { EventCreateService } from './create/create.service';

import { NgModule } from '@angular/core';
import { NbSpinnerModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventIndexService } from './index/index.service';
import { routedComponents} from './events-routing.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
    EventsRoutingModule,
    NgxDatatableModule,
    NbSpinnerModule,
    
    ReactiveFormsModule,
    NbDialogModule,
    
  ],
  declarations: [
    ...routedComponents
   
  ],
  providers:[
    EventIndexService,
    EventCreateService
  ]
})
export class EventsModule { }

