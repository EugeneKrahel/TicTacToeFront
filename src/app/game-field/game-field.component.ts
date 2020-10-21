import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {PayloadDto} from '../dto/payload.dto';
import {StateContent} from '../models/stateContent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgModalContentComponent} from '../ng-modal-content/ng-modal-content.component';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {

  private socket;
  private isCross: boolean;
  private payload: PayloadDto = new PayloadDto();
  private Cross = 'X';
  private Zero = 'O';
  private isTurnEnabled: boolean;
  boxValue: string[] = new Array(9);

  constructor(private modalService: NgbModal) {
    this.socket = socketIo('http://localhost:3000');
  }

  ngOnInit(): void {
    this.socket.on('playroom_out', (data: PayloadDto) => this.handleMessage(data));
    const stateContent: StateContent = history.state.data;
    this.payload.gameName = stateContent.name;
    this.isCross = stateContent.isHost;
    this.isTurnEnabled = stateContent.isHost;
    this.socket.emit('playroom', this.payload);
  }

  onClick(boxNum: number): void {
    if (this.boxValue[boxNum] || !this.isTurnEnabled) {
      return;
    }
    this.isTurnEnabled = false;
    this.payload.lineMove = Math.trunc(boxNum / 3);
    this.payload.columnMove = boxNum % 3;
    this.socket.emit('playroom', this.payload);
    if (this.isCross) {
      this.boxValue[boxNum] = this.Cross;
    } else {
      this.boxValue[boxNum] = this.Zero;
    }
    if (this.isWin()) {
      this.open('You Win!');
    } else if (!this.isWin() && this.isDraw()){
      this.open('Draw');
    }
  }

  handleMessage(data: PayloadDto): void {
    const boxNum = data.lineMove * 3 + data.columnMove;
    if (!isNaN(boxNum) && !this.boxValue[boxNum]) {
      this.isTurnEnabled = true;
      this.boxValue[boxNum] = this.isCross ? this.Zero : this.Cross;
      if (this.isWin()) {
        this.open('You Lose!');
      } else if (!this.isWin() && this.isDraw()){
        this.open('Draw');
      }
    }
  }

  isWin(): boolean {
    if ((this.boxValue[0] === this.boxValue[3] && this.boxValue[3] === this.boxValue[6] && this.boxValue[6] !== undefined) ||
      (this.boxValue[1] === this.boxValue[4] && this.boxValue[4] === this.boxValue[7] && this.boxValue[7] !== undefined) ||
      (this.boxValue[2] === this.boxValue[5] && this.boxValue[5] === this.boxValue[8] && this.boxValue[8] !== undefined) ||
      (this.boxValue[0] === this.boxValue[1] && this.boxValue[1] === this.boxValue[2] && this.boxValue[2] !== undefined) ||
      (this.boxValue[3] === this.boxValue[4] && this.boxValue[4] === this.boxValue[5] && this.boxValue[5] !== undefined) ||
      (this.boxValue[6] === this.boxValue[7] && this.boxValue[7] === this.boxValue[8] && this.boxValue[8] !== undefined) ||
      (this.boxValue[0] === this.boxValue[4] && this.boxValue[4] === this.boxValue[8] && this.boxValue[8] !== undefined) ||
      (this.boxValue[2] === this.boxValue[4] && this.boxValue[4] === this.boxValue[6] && this.boxValue[6] !== undefined))
    {
     return true;
    }
  }

  isDraw(): boolean {
    if (this.boxValue[0] !== undefined && this.boxValue[1] !== undefined && this.boxValue[2] !== undefined &&
      this.boxValue[3] !== undefined && this.boxValue[4] !== undefined && this.boxValue[5] !== undefined &&
      this.boxValue[6] !== undefined && this.boxValue[7] !== undefined && this.boxValue[8] !== undefined) {
      return true;
    }
  }

  open(winOrLose: string): void {
    const modalRef = this.modalService.open(NgModalContentComponent);
    modalRef.componentInstance.winOrLose = winOrLose;
  }
}

