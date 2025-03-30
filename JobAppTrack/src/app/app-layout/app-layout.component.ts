import { Component } from '@angular/core';
import { AppHeaderComponent } from "../app-header/app-header.component";
import { AppSidebarComponent } from "../app-sidebar/app-sidebar.component";
import { AppFooterComponent } from "../app-footer/app-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet,AppHeaderComponent, AppSidebarComponent, AppFooterComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
