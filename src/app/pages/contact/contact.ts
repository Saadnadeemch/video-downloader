import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';

interface ContactInfo {
  icon: string;
  title: string;
  description: string;
  detail: string;
}
@Component({
  selector: 'app-contact',
  imports: [CommonModule , FormsModule , Navbar, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      title: 'Email Us',
      description: 'support@videoflow.com',
      detail: 'We respond within 24 hours',
    },
    {
      icon: 'message-square',
      title: 'Live Chat',
      description: 'Available 24/7',
      detail: 'Get instant help from our team',
    },
    {
      icon: 'map-pin',
      title: 'Location',
      description: 'Global Service',
      detail: 'Serving users worldwide',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;
    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.contactForm.reset();
    }, 1500);
  }

  resetForm() {
    this.isSubmitted = false;
  }
}
