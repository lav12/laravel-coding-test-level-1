import { Component, ViewChild, OnInit, AfterViewInit, Optional, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { EventIndexService } from './index.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent implements OnInit, AfterViewInit {


  @ViewChild('search', { static: false }) search: any;


  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private eventIndexService: EventIndexService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {


    this.getData('no_loading');

    this.columns = [
      { prop: 'name', name: 'Name' },
      { prop: 'slug', name: 'Slug' },
      { prop: 'startAt', name: 'Start At' },
      { prop: 'endAt', name: 'End At' }
    ];
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }


  page = {
    limit: 5,
    count: 0,
    offset: 0,
    pageSize: 5,
    curPage: 0
  };

  public result: Array<object> = [];
  public rows: Array<object> = [];
  public columns: Array<object>;
  loadingIndicator: boolean = true;

  setEventPager(pageInfo: {
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
    curPage?: number;
  }) {
    this.page.offset = pageInfo.offset;
    this.getData('loading');
  }

  getData(action): void {

    action === 'loading' ? this.loadingIndicator=true : this.loadingIndicator=false ;

    this.eventIndexService
      .index(
        this.page.offset + 1
      )
      .subscribe({
        next:val => {
          this.result = val.response.data;
          this.rows = [...this.result];

          this.page.count = val.response.total;
          this.page.pageSize = val.response.per_page;
          this.page.curPage = val.response.current_page;
          this.loadingIndicator=false;
        },
        error : err => { }
      });
  }

  expand_show_card: boolean = false;
  show_data: Array<object> = [];
  show_data_name: string;
  show_data_slug: string;
  show_data_startAt: string;
  show_data_endAt: string;

  show(value) {
    
    this.expand_show_card = true;
    this.card_edit_display = false;

    //fetch info by ID
    this.eventIndexService
      .show(
        value
      )
      .subscribe({
        next:val => {
          

          this.show_data_name = val.response.name;
          this.show_data_slug = val.response.slug;
          this.show_data_startAt = val.response.startAt;
          this.show_data_endAt = val.response.endAt;

        },
        error:err => { }
      });

  }

  edit_uuid: string = '';
  edit(value) {
   
    this.card_edit_display = true;
    this.expand_show_card = false;

    this.edit_uuid = value;

    //fetch info by ID
    this.eventIndexService
      .show(
        value
      )
      .subscribe({
        next:val => {
        
          // Set Values
          this.edit_event_form.controls["name"].setValue(val.response.name);
          this.edit_event_form.controls["slug"].setValue(val.response.slug);
          this.edit_event_form.controls["start_at"].setValue(val.response.startAt);
          this.edit_event_form.controls["end_at"].setValue(val.response.endAt);

        },
        error:err => { }
      });


  }

 


  edit_event_form = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: ['', Validators.required],
    start_at: ['', [Validators.required]],
    end_at: ['', [Validators.required]],
  });

  btn_loading_submit: boolean = false;
  card_edit_display: boolean = false;
  card_show_hide: boolean = false;

  onFormSubmit() {

    this.btn_loading_submit = true;

    const uuid = this.edit_uuid;
    const name = this.edit_event_form.value.name;
    const slug = this.edit_event_form.value.slug;
    const start_at = this.edit_event_form.value.start_at;
    const end_at = this.edit_event_form.value.end_at;

    this.eventIndexService.update(uuid, name, slug, start_at, end_at).subscribe({
      next:val => {
        this.onRefresh();
        this.getData('no_loading');
      },
      error:err => {
      }
    });
  }

  onRefresh() {
    this.btn_loading_submit = false;
    this.edit_event_form.reset();
    this.card_edit_display = false;
  }




  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // const count = this.page.count;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.result[0]);
    // assign filtered matches to the active datatable
    this.rows = this.result.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }




  delete_uuid : string = '';
  deleteEvent(value, ){
    this.delete_uuid = value;

    // call for confirmation box
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then(
      (confirmed) => 
      
      this.eventIndexService.delete(this.delete_uuid).subscribe({
        next:val=>{
         
          this.getData('loading');
        },
        error:err=>{
        }
      })
      )
     .catch(
      () => 
      console.log('User dismissed the dialog'));


    // 
  }





} //end of export