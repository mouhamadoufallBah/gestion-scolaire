import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasseIdToClassnamePipe } from './pipes/classe/classe-id-to-classname.pipe';
import { EvaluationIdToEvaluationNamePipe } from './pipes/evaluation/evaluation-id-to-evaluation-name.pipe';
import { MatiereIdToMatiereNamePipe } from './pipes/matiere/matiere-id-to-matiere-name.pipe';


@NgModule({
  declarations: [
    ClasseIdToClassnamePipe,
    EvaluationIdToEvaluationNamePipe,
    MatiereIdToMatiereNamePipe

  ],
  imports: [
    CommonModule
  ],

  exports:[
    ClasseIdToClassnamePipe,
    EvaluationIdToEvaluationNamePipe,
    MatiereIdToMatiereNamePipe
  ]
})
export class SharedModule { }
