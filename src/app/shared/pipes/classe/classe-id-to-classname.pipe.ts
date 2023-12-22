import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classeIdToClassname'
})
export class ClasseIdToClassnamePipe implements PipeTransform {

  transform(classe_id: number, classes: any[]): string {
    const classe = classes.find(classe => classe.id === classe_id);
    // console.log(classe)
    // console.log(classe_id)
    return classe ? classe.nom : 'N/A';
  }

}
