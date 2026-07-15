import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent implements OnInit {
  /**
   * Se emite cada vez que un cliente se agrega correctamente,
   * por si el componente padre necesita enterarse.
   */
  @Output() clienteAgregado = new EventEmitter<void>();

  clienteForm: FormGroup;
  
  // Aquí almacenamos la lista que se dibuja en la tabla del HTML
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      codigo_cliente: [''], 
      nombre_cliente: ['', Validators.required],
      direccion_cliente: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerClientes(); // Cargamos los clientes existentes al iniciar la pantalla
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => console.error('Error al obtener clientes:', err),
    });
  }

  guardar(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const cliente: Cliente = this.clienteForm.value;

    this.clienteService.agregarCliente(cliente).subscribe({
      next: () => {
        this.clienteForm.reset();
        this.clienteAgregado.emit();
        this.obtenerClientes(); // Recargamos la lista automáticamente al guardar un nuevo cliente
      },
      error: (err) => console.error('Error al agregar cliente:', err),
    });
  }
}