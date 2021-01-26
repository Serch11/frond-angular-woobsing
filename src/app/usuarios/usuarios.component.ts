import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Usuarios } from './Usuarios';
import { UsuariosService } from './../usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  User: Usuarios[];
  form: FormGroup;
  id: number = 0;
  constructor(
    private usuairoService: UsuariosService,
    private FormBuilder: FormBuilder,
    private toastAler: ToastrService,
    private router: Router,
    private activate: ActivatedRoute
  ) {

    this.form = FormBuilder.group({
      id: 0,
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      correo: ["", Validators.required],
      telefono: ["", Validators.required],
    })
  }

  ngOnInit(): void {

    this.activate.params.subscribe(
      (datos) => {
        console.log(datos)
        this.id = datos.id;
        console.log(this.id);

        if (this.id) {
          this.usuairoService.getOneUsuario(this.id).subscribe(
            (user: any) => {
              this.form.patchValue({
                id: user.id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                correo: user.correo,
                telefono: user.telefono
              })

            }
          )
        }
      }
    );

  }

  guardarUsuario() {

    if (this.id === 0 || this.id === undefined) {
      this.agregarUsuario();
    } else {
      console.log("editar Usuarios")
      this.actualizarUsuarios();
    }


  }

  actualizarUsuarios() {
    this.User = this.form.value;
    console.log(this.id)
    console.log(this.User)
    this.usuairoService.updateUsuarios(this.id, this.User).subscribe(
      (User) => {
        console.log("usuario actualizado")
        this.toastAler.success("usuario Actualizado", "Usuario actualizado con exito")
        console.log(User);
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['listado-usuario'])
        }, 2000);

      }
    )
  }

  agregarUsuario() {
    this.User = this.form.value;
    this.usuairoService.saveUsuarios(this.User).subscribe(
      (User) => {
        this.toastAler.success("usuario Creado", "Usuario creado con exito")
        console.log(User);
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['listado-usuario'])
        }, 2000);
      }
    )
  }

}
