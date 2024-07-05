// src/app/game.service.ts
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Gameinfo } from '../models/gameinfo';
import { PopUpMesasge } from '../models/popupmessage';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameInfo:WritableSignal<Gameinfo> =  signal({playerXWin:0, playerOWin:0, draw:0})
  public popupMessage:WritableSignal<PopUpMesasge> = signal({message:'', color:''})
  private board!: string[][];
  private currentPlayer!: string;
  private winner!: string ;
  private clickAudio: HTMLAudioElement | any;
  private winAudio: HTMLAudioElement | any;
  private cancelAudio: HTMLAudioElement | any;

  constructor(){
    if(typeof document !== 'undefined'){
      this.clickAudio = new Audio();
    this.clickAudio.src = '../../../assets/sounds/click.mp3';
    this.winAudio = new Audio();
    this.winAudio.src = '../../../assets/sounds/win.mp3';
    this.cancelAudio = new Audio();
    this.cancelAudio.src = '../../../assets/sounds/cancel.mp3';
  }
  }

  resetGame() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = '';
  }

  getBoard() {
    return this.board;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getWinner() {
    return this.winner;
  }

  makeMove(row: number, col: number) {
  
    if (!this.board[row][col] && !this.winner) {
      this.clickAudio.play().catch((error:string) => console.error('Error playing click sound:', error));
      this.board[row][col] = this.currentPlayer;
      if(this.board.every(row => row.every(cell => cell !== ''))){
        this.gameInfo.update((res: Gameinfo) => ({
         ...res,
          draw: res.draw + 1,
        }));
        this.popupMessage.set({message:"Opps it's a draw ", color:'black'});
      }
      if (this.checkWinner(row, col)) {
        this.winAudio.play().catch((error:string)=> console.error('Error playing win sound:', error));
        this.winner = this.currentPlayer;
        if (this.currentPlayer === 'X') {
          this.gameInfo.update((res: Gameinfo) => ({
            ...res,
            playerXWin: res.playerXWin + 1,
          }));
          this.popupMessage.set({message:'Player X won!', color:'red'});
        }
        if (this.currentPlayer === 'O') {
          this.gameInfo.update((res: Gameinfo) => ({
            ...res,
            playerOWin: res.playerOWin + 1,
          }));
          this.popupMessage.set({message:'Player O won!', color:'blue'});
        }
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }else{
      this.cancelAudio.play().catch((error:string)=> console.error('Error playing win sound:', error));
      this.resetGame()
    }
   
  }

  private checkWinner(row: number, col: number): boolean {
    // Check row
    if (this.board[row].every(cell => cell === this.currentPlayer)) return true;

    // Check column
    if (this.board.every(row => row[col] === this.currentPlayer)) return true;

    // Check diagonals  
    if (row === col && this.board.every((_, index) => this.board[index][index] === this.currentPlayer)) return true;
    if (row + col === 2 && this.board.every((_, index) => this.board[index][2 - index] === this.currentPlayer)) return true;

    return false;
  }



  makeMoveBotMode(row: number, col: number, botModeEnabled: boolean) {
    if (botModeEnabled) {
      // Handle player's move
      this.makeMove(row, col);

      // If the game is still going, make a move for the bot
      if (!this.winner) {
        setTimeout(() => {
          this.makeBotMove();
        }, 500);
      }
    } else {
      // Handle moves as before
      this.makeMove(row, col);
    }
  }

  private makeBotMove() {
    const emptyCells: { row: number, col: number }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.board[r][c] === '') {
          emptyCells.push({ row: r, col: c });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      this.currentPlayer = 'O'; // Bot is always 'O'
      this.makeMove(row, col);

      // If the bot wins, update the popup message
      if (this.winner === 'O') {
        this.popupMessage.set({message:'Computer won!', color:'blue'});
      }
    }
  }
}
  

