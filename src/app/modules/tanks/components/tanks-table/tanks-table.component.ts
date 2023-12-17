import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';
import { TanksEvent } from '../../../../models/enums/TanksEnums/TanksEvent';
import { EventActionTank } from '../../../../models/interfaces/Tanks/event/EventActionTank';
import { FillTankResponse } from '../../../../models/interfaces/Tanks/response/GetAllFillTankResponse';

@Component({
  selector: 'app-tanks-table',
  templateUrl: './tanks-table.component.html',
  styleUrl: './tanks-table.component.scss',
})
export class TanksTableComponent {
  @Input() public tanks: Array<GetTanksResponse> = [];
  @Input() public fillTankList: Array<FillTankResponse> = [];
  @Output() public tanksEvent = new EventEmitter<EventActionTank>();

  public tankSelected: GetTanksResponse | null = null;
  public fuelTankEvent = TanksEvent.ADD_FUEL_EVENT;

  handleFillTankEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const tankEventData = id && id !== 0 ? { action, id } : { action };
      // EMITIR O VALOR DO EVENTO
      this.tanksEvent.emit(tankEventData);
    }
  }
}
