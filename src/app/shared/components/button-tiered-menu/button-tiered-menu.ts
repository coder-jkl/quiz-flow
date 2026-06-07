import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-tiered-menu',
  imports: [TieredMenuModule, Button],
  templateUrl: './button-tiered-menu.html',
  styleUrl: './button-tiered-menu.scss',
})
export class ButtonTieredMenu {
  public items = input.required<MenuItem[]>();

  public save() {
    // this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }
}
