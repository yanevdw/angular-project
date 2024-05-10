import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matHome,
  matInsertChartOutlined,
  matSearch,
} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ matHome, matSearch, matInsertChartOutlined })],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
