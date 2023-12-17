import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';
import { TanksEvent } from '../../../../models/enums/TanksEnums/TanksEvent';
import { EventActionTank } from '../../../../models/interfaces/Tanks/event/EventActionTank';

@Component({
  selector: 'app-tanks-table',
  templateUrl: './tanks-table.component.html',
  styleUrl: './tanks-table.component.scss',
})
export class TanksTableComponent {
  @Input() public tanks: Array<GetTanksResponse> = [];
  @Output() public tanksEvent = new EventEmitter<EventActionTank>();

  public tankSelected: GetTanksResponse | null = null;
  public fuelTankEvent = TanksEvent.ADD_FUEL_EVENT;

  handleFillTankEvent(action: string, id?: number): void {
    if (action && action !== '') {
      // armazenar o envento -> recber um objeto, com a action o id, se não tiver o id, armazena no envento apenas a a action
      const tankEventData = id && id !== 0 ? { action, id } : { action };

      // EMITIR O VALOR DO EVENTO
      this.tanksEvent.emit(tankEventData);
    }
  }
}
