import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evaluationIdToEvaluationName'
})
export class EvaluationIdToEvaluationNamePipe implements PipeTransform {

  transform(evaluation_id: number, evaluation: any[]): string {
    const matiere = JSON.parse(localStorage.getItem("matieres") || "");
    const ev = evaluation.find(ev => ev.id === evaluation_id);
    const matiereName = matiere.find((elt:any) => elt.id == ev.id);

    return ev ? matiereName.nom : 'N/A';
  }

}
