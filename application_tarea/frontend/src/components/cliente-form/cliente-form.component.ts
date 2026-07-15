import { Component, OnInit } from '@angular/core';
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
  clienteForm: FormGroup;
  // Guardamos la lista de clientes que se mostrará en la tabla
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
    this.obtenerClientes(); // Cargamos la lista al iniciar
  }

  obtenerClientes(): void {
    // Necesitamos asegurarnos de que tu 'clienteService' tenga este método para consultar todos los clientes
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
        this.obtenerClientes(); // Recargamos la tabla automáticamente al guardar con éxito
      },
      error: (err) => console.error('Error al agregar cliente:', err),
    });
  }
}