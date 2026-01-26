import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[], texto: string, columna: string): any[] {
    if (texto === '') {
      return lista;
    }

    if (!lista) {
      return [];
    }

    texto = texto.toLowerCase();

    return lista.filter(item => {
      if (item[columna]) {
        return item[columna].toString().toLowerCase().includes(texto);
      }
      return false;
    });
  }

}
