import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  imageURL: string;
  uploadForm: FormGroup;
  constructor(public fb: FormBuilder) {
    // Reactive Form
    this.uploadForm = this.fb.group({
      image: [null]
    })
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      console.log(this.imageURL);
      
    }
    reader.readAsDataURL(file)
  }

  ngOnInit(): void {
  }

}
