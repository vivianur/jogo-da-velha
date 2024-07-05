import { Component } from '@angular/core';
import { GameService } from '../../shared/services/game.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { HighlightPlayerDirective } from '../../directives/highlight-player.directive';
import { PlayerNamePipe } from '../../pipes/player-name.pipe';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ PlayerNamePipe, HighlightPlayerDirective, NgIf, NgFor, NgClass],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',

})
export class GameComponent {
  board!: string[][];
  currentPlayer!: string;
  winner: string = '';
  playWithBot: boolean = false;


  constructor(public gameService: GameService) {

  }

  ngOnInit(): void {
    this.newGame();
  }

  ChangeMode(){
    this.playWithBot =!this.playWithBot;
    this.newGame();
    this.reset();
  }
 
  newGame(): void {
    this.gameService.resetGame();
    this.updateGame();
  }

  makeMove(row: number, col: number): void {
    
    this.gameService.makeMoveBotMode(row, col, this.playWithBot)
      // this.gameService.makeMove(row, col);
      this.updateGame();
  }

  updateGame(): void {
    this.board = this.gameService.getBoard();
    this.currentPlayer = this.gameService.getCurrentPlayer();
    this.winner = this.gameService.getWinner();
   
  }
  reset(){
    this.gameService.gameInfo.set({playerXWin:0, playerOWin:0, draw:0})

  }
}
