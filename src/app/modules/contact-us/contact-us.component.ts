import { Component } from '@angular/core';
import { Contact } from '../../shared/model/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  contact: Contact = {
    email: '',
    name: '',
    subject: '',
    body: '',
  };

  constructor(
    private contactService: ContactService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  sendMessage() {
    if (
      this.contact.email &&
      this.contact.name &&
      this.contact.subject &&
      this.contact.body
    ) {
      console.log('Message Sent:', this.contact);
      this.contactService.SendContact(this.contact).subscribe((data) => {
        console.log('sent');
        this.toasterService.success(
          'Sales will connect with shortly',
          'sent successfully',
          {
            positionClass: 'toast-center-center',
          }
        );
        this.router.navigate(['']);
      });
      // You can implement the actual email sending logic here using a service
      // Example: this.emailService.sendEmail(this.contact).subscribe(...);
    } else {
      console.error('Form is invalid');
    }
  }
}
