import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inner-card',
  standalone: true,
  imports: [],
  templateUrl: './inner-card.component.html',
  styleUrl: './inner-card.component.scss'
})
export class InnerCardComponent {

  @Input() productName:string;
  @Input() productPrice:number;

  clicked()
  {
    console.log('Clicked');
    
  }

}
