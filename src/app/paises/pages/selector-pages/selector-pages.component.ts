import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html'
  
})
export class SelectorPagesComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder,
              private paisesService: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //cuando cambie la region
    this.miForm.get('region')?.valueChanges
    .subscribe(
      region => {
        console.log(region);

        this.paisesService.getPaisesPorRegion(region)
        .subscribe(paises=> {
          console.log(paises);

          this.paises = paises;
        })
      })
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
