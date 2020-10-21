import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ng-modal-content',
  templateUrl: './ng-modal-content.component.html',
  styleUrls: ['./ng-modal-content.component.css']
})
export class NgModalContentComponent implements OnInit {
  @Input() winOrLose;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
