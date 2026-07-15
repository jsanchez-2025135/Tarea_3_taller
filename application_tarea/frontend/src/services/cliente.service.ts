import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // Ajusta la URL si tu API usa un puerto o ruta diferente
  private apiUrl = 'http://localhost:3000/clientes'; 

  constructor(private http: HttpClient) { }

  // 1. AGREGA ESTA FUNCIÓN si no existía, o cambia su nombre para que coincida con getClientes:
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // 2. Aquí ya debes tener tu método de agregar, similar a este:
  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}