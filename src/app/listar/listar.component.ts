import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Usuarios } from '../usuarios/Usuarios';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public User: Usuarios[];
  constructor(
    private usuarioService: UsuariosService,
    private toasterAler: ToastrService
  ) { }

  ngOnInit(): void {

    this.usuarioService.getUser().subscribe(
      (params: Usuarios[]) => {
        this.User = params;
        console.log(this.User);
      }
    )
  }


  eliminar(id: number, e: any) {
    var card: any = e.path[2];
    let valor = confirm("Esta seguro de eliminar este usuario ?");
    if (valor) {
      console.log("eliminando.....")
      card.classList.add("hidden");
      this.usuarioService.deleteUser(id).subscribe(
        (del) => {
          console.log(del)

          this.toasterAler.error("Usuario Eliminado", del.message);
        }
      )

    }

  }

}
