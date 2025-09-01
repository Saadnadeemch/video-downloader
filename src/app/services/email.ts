import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_0eew8gx';   
  private templateId = 'template_2v3o1j6'; 
  private publicKey = 'x-eGcUogh6W3HRDax';   

  constructor() {}

  sendEmail(formData: { name: string; email: string; subject: string; message: string }) {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey)
      .then((result: EmailJSResponseStatus) => {
        console.log('✅ Email sent:', result.text);
        return result;
      })
      .catch((error) => {
        console.error('❌ Failed to send email:', error);
        throw error;
      });
  }
}
