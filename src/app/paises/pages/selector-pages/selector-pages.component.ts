import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html'
  
})
export class SelectorPagesComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    region: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
