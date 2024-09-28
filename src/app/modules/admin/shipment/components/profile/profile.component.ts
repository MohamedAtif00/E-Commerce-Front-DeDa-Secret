import { Component, OnInit } from '@angular/core';
import { BostaAuthentication } from '../../service/bosta-auth.service';
import { UserData } from '../../model/shipment.user-data.model';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  data: UserData;

  constructor(private Auth: BostaAuthentication) {}

  ngOnInit(): void {
    this.Auth.GetUserData().subscribe((data) => {
      console.log('userdata', data);
      this.data = data.data;
    });
    this.data = this.Auth.userData;
  }
}
