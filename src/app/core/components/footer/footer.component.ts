import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faInstagramSquare, faSnapchatSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faInstragramSquare = faInstagramSquare;
  faSnapChatSquare = faSnapchatSquare;
  faTwitterSquare = faTwitterSquare;
  faFaceBookSquare = faFacebookSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
