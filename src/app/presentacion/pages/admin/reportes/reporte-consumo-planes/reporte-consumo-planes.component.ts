import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { take } from 'rxjs';
import { IConsumoPlanes } from '../../../../../dominio/entidades/consumo/consumo.interface';
import { CoreService } from '../../../../../infraestructura/service/core-service.service';

@Component({
  selector: 'app-reporte-consumo-planes',
  imports: [ButtonModule,TableModule,ToastModule],
  templateUrl: './reporte-consumo-planes.component.html',
})
export class ReporteConsumoPlanesComponent implements OnInit{

  consumoPlanes!: IConsumoPlanes[];

  constructor(
    private coreService: CoreService,
  ){}

  ngOnInit(): void {
    this.obtenerConsumoPlanes();
  }

  async obtenerConsumoPlanes(){
    (await this.coreService
        .obtenerPlanes())
        .pipe(take(1))
        .subscribe({
          next:(resultado:IConsumoPlanes[]) =>{
            this.consumoPlanes = resultado
          },
          error: error=>{
            alert(error)
          }
        })
  }
}
