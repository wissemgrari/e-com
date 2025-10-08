import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar.component";
import { Footer } from './shared/components/footer/footer.component';
import {ToastComponent} from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, Navbar, Footer, ToastComponent],
})
export class App {}
