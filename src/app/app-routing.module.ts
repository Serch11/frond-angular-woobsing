import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path: 'listado-usuario', component:ListarComponent},
  {path: 'crear-usuario',component:UsuariosComponent},
  {path: 'crear-usuario/:id',component:UsuariosComponent},
  {path: '', redirectTo:"listado-usuario",pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
