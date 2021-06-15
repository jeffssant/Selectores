import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";


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
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder,
              private paisesService: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //cuando cambie la region
    /* this.miForm.get('region')?.valueChanges
    .subscribe(
      region => {
        this.paisesService.getPaisesPorRegion(region)
        .subscribe(paises=> {
          this.paises = paises;
        })
      }) */

      this.miForm.get('region')?.valueChanges
      .pipe(

        tap((_) => {
          this.miForm.get('pais')?.reset('')
        }),

        switchMap(region => this.paisesService.getPaisesPorRegion(region)) // switchMap muda o resultado de get('region') para getPaisesPorRegion
      )
      .subscribe(paises => {
        this.paises = paises;        
      });


      //Cuando cambia el pais
      this.miForm.get('pais')?.valueChanges
      .subscribe(pais => console.log(pais))
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
