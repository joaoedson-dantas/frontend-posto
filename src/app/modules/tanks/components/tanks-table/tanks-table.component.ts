import { Component, Input } from '@angular/core';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';

@Component({
  selector: 'app-tanks-table',
  templateUrl: './tanks-table.component.html',
  styleUrl: './tanks-table.component.scss',
})
export class TanksTableComponent {
  // está recebendo informações do componente pai.
  @Input() public tanks: Array<GetTanksResponse> = [];
  public tankSelected!: GetTanksResponse;
}
