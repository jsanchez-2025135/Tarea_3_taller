import { Component } from '@angular/core';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClienteFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Como el formulario y la lista ahora viven juntos en el mismo componente,
  // ya no necesitas controlar el ViewChild ni el evento desde aquí. ¡Mucho más fácil!
}