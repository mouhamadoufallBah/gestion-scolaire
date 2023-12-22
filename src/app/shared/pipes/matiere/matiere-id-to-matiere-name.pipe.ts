import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matiereIdToMatiereName'
})
export class MatiereIdToMatiereNamePipe implements PipeTransform {


  transform(matiere_id: number, matieres: any[]): string {
    const matiere = matieres.find(matiere => matiere.id === matiere_id);
    return matiere ? matiere.nom : 'N/A';
  }

}
