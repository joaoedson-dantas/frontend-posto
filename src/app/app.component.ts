import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend-posto';
  constructor(private primeNGConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
}
