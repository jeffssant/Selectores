import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html'
  
})
export class SelectorPagesComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    region: ['', Validators.required]
  });

  regiones: string[] = [];

  constructor(private fb: FormBuilder,
              private paisesService: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
