import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Meta, Title } from '@angular/platform-browser';
import { EmailService } from '../../services/email';
import { FastForward } from 'lucide-angular';

interface ContactInfo {
  icon: string;
  title: string;
  description: string;
  detail: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage = false;
  emailService = inject(EmailService);

  contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      title: 'Email Us',
      description: 'prodownloaderonline@gmail.com',
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

  constructor(private fb: FormBuilder, private title: Title, private meta: Meta) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Contact to VideoSaverOnline if you face any issue');
    this.meta.updateTag({
      name: 'description',
      content:
        'If you face any issue in downloading the video from videosaver.online then contact .',
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;
    this.isSubmitting = true;

    try {
      await this.emailService.sendEmail(this.contactForm.value);
      this.isSubmitted = true;
      this.contactForm.reset();
      console.log('✅ Email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      this.errorMessage = true
    } finally {
      this.isSubmitting = false;
      this.errorMessage = false
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.contactForm.reset();
  }
}
