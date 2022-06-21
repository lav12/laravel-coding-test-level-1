
import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { EventCreateService } from './create.service';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';

@Component({
  selector: 'ngx-create',
  styleUrls: ['./create.component.scss'],
  templateUrl: './create.component.html',
})
export class CreateComponent {

  constructor(
    private menuService: NbMenuService,
    private formBuilder: FormBuilder,
    private eventCreateService: EventCreateService,
    private toastrService: NbToastrService
    ) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }



  create_event_form = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: ['', Validators.required],
    start_at: ['', [Validators.required]],
    end_at: ['', [Validators.required]],
  });

  btn_loading_submit: boolean = false;

  onFormSubmit() {

    this.btn_loading_submit = true;
    
    const name = this.create_event_form.value.name;
    const slug = this.create_event_form.value.slug;
    const start_at = this.create_event_form.value.start_at;
    const end_at = this.create_event_form.value.end_at;

    this.eventCreateService.create(name, slug, start_at, end_at).subscribe({
      next:val => {
        this.onRefresh();
        this.showToast('success','Success', 'New event created');
       
      },
      error:err => {
        // console.log("erroe",err.error.message);
        this.showToast('danger','Failed', 'New event not created');
      }
    });
  }

  onRefresh() {
    this.btn_loading_submit = false;
    this.create_event_form.reset();
  }


  
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(body,`${titleContent}`,config);
  }



}
