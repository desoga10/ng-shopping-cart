import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit(): void {}

  goBackToHome() {
    this.product_service.clearProducts();
    this.router.navigate(['/']);
  }
}
