import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  zodiacoForm = new FormGroup({
    nombre: new FormControl(''),
    apellidoPaterno: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    dia: new FormControl(''),
    mes: new FormControl(''),
    ano: new FormControl(''),
    sexo: new FormControl('')
  });

  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  edad: number = 0;
  signo: string = '';
  imagenSigno: string | null = null;

  calcularEdad() {

    this.nombre = this.zodiacoForm.get('nombre')?.value || '';
    this.apellidoPaterno = this.zodiacoForm.get('apellidoPaterno')?.value || '';
    this.apellidoMaterno = this.zodiacoForm.get('apellidoMaterno')?.value || '';

    const dia = Number(this.zodiacoForm.get('dia')?.value);
    const mes = Number(this.zodiacoForm.get('mes')?.value);
    const ano = Number(this.zodiacoForm.get('ano')?.value);


    if (!dia || !mes || !ano || mes < 1 || mes > 12 || dia < 1 || dia > 31 || ano > new Date().getFullYear()) {
      this.edad = 0;
      this.signo = 'Fecha inválida';
      this.imagenSigno = null;
      return;
    }

    const fechaNacimiento = new Date(ano, mes - 1, dia);
    const hoy = new Date();

    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    if (hoy.getMonth() < mes - 1 || (hoy.getMonth() === mes - 1 && hoy.getDate() < dia)) {
      this.edad--;
    }

    this.calcularSignoChino(ano);
  }

  calcularSignoChino(ano: number) {
    const signosChinos = [
      { nombre: 'Rata', imagen: 'https://www.clarin.com/2023/09/23/SrOtpEeIU_2000x1500__1.jpg' },
      { nombre: 'Buey', imagen: 'https://mundofengshui.es/wp-content/uploads/2021/12/Signo-Buey-Bufalo.jpg' },
      { nombre: 'Tigre', imagen: 'https://www.clarin.com/2023/09/21/K8Y2WDIQW_360x240__1.jpg' },
      { nombre: 'Conejo', imagen: 'https://www.clarin.com/2023/09/23/TSN1Cvpys_360x240__1.jpg' },
      { nombre: 'Dragón', imagen: 'https://www.clarin.com/2023/09/21/V5P0tfWc8_2000x1500__1.jpg' },
      { nombre: 'Serpiente', imagen: 'https://e.radio-grpp.io/xlarge/2023/01/18/552855_1376480.jpg' },
      { nombre: 'Caballo', imagen: 'https://e.radio-grpp.io/xlarge/2023/01/18/portada_001300.jpg' },
      { nombre: 'Cabra', imagen: 'https://e.radio-grpp.io/xlarge/2023/01/19/055005_1376963.jpg' },
      { nombre: 'Mono', imagen: 'https://e.radio-grpp.io/xlarge/2023/01/19/410841_1377029.jpg' },
      { nombre: 'Gallo', imagen: 'https://www.clarin.com/2023/09/23/H8ZAu5YSv_2000x1500__1.jpg' },
      { nombre: 'Perro', imagen: 'https://www.clarin.com/2023/09/23/Ixgbzc0gg_2000x1500__1.jpg' },
      { nombre: 'Cerdo', imagen: 'https://www.clarin.com/2023/09/23/QfDbtBnk1_2000x1500__1.jpg' }
    ];

    const ciclo = (ano - 1924) % 12;
    
    this.signo = signosChinos[(ciclo + 12) % 12].nombre;
    this.imagenSigno = signosChinos[(ciclo + 12) % 12].imagen;
  }
}
