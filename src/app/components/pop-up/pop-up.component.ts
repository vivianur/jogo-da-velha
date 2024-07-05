import { Component, Input, inject } from '@angular/core';
import { GameService } from '../../shared/services/game.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  gameservice = inject(GameService)
 

  closePopup() {
    this.gameservice.popupMessage.set({message:'', color:''})
  }

  
}
