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
  fronteras: string[] = [];

  //UI

  cargando: boolean = false;

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
          this.miForm.get('pais')?.reset('');
          this.cargando = true;
        }),

        switchMap(region => this.paisesService.getPaisesPorRegion(region)) // switchMap muda o resultado de get('region') para getPaisesPorRegion
      )
      .subscribe(paises => {
        this.paises = paises;     
        this.cargando = false;   
      });


      //Cuando cambia el pais
      this.miForm.get('pais')?.valueChanges
      .pipe(
        tap((_) => {
          this.fronteras = [];
          this.miForm.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap(codigo => this.paisesService.getPaisPoCodigo(codigo))
      )
      .subscribe(pais => {
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      })
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
