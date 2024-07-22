import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss'
})
export class ToastrComponent {


  @Input() title: string;
  @Input() message: string;

  constructor(private toastrService: ToastrService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.toastrService.clear();
    }, 3000); // Automatically disappear after 3 seconds
  }

  close() {
    this.toastrService.clear();
  }


}
