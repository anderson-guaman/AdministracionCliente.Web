import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { take } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NuevoPlanComponent } from './nuevo-plan/nuevo-plan.component';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { IPlan } from '../../../../dominio/entidades/plan/plan.interface';
import { PlanService } from '../../../../infraestructura/service/plan.service';


@Component({
  selector: 'app-plam',
  imports: [ButtonModule,TableModule,ToastModule],
  templateUrl: './plan.component.html',
  providers: [DynamicDialogRef]
})
export class PlanComponent implements OnInit{

  planes: IPlan[]=[];
  tipoDocumentos:[] = [];

  constructor(
    private planService: PlanService,
    private dynamicDialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
    this.obtenerPlanes();
  }

  abrirNuevoPlan(){
    this.dynamicDialogRef = this.dialogService
      .open(NuevoPlanComponent,
        {
          header: 'Nuevo Plan',
          width: '50vw',
          modal: true,
          contentStyle: { overflow: 'auto' },
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
        }
      );

        this.dynamicDialogRef.onClose.subscribe(() => {
          this.ngOnInit();
        });

  }

  abrirDialogEditar(plan:IPlan){}
  eliminarCliente(plan: IPlan){}
  verNotas(plan:IPlan){}

  async obtenerPlanes(){
    (await this.planService
    .obtenerPlanes())
    .pipe(take(1))
    .subscribe({
      next:(resultado:IPlan[]) =>{
        this.planes = resultado
      },
      error: error=>{
        alert(error)
      }
    })
  }
}
