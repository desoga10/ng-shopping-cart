import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList!: any[];
  products: any[] = [];
  selectedProduct!: any;
  subTotal!: any;
  constructor(
    private product_service: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        //response
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        // handle error
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });

    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
    console.log(this.products);
  }

  // Add product to cart
  addToCart(product: any) {
    if (!this.product_service.productInCart(product)) {
      product.quantity = 1;
      this.product_service.addToCart(product);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = product.price;
    }
  }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.product_service.removeProduct(product);
    this.products = this.product_service.getProduct();

    console.log(this.products);
  }

  // Calculate total
  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  //Change Sub Total Amount
  changeSubtotal(product: any, index: any) {
    const qty = product.quantity;
    const amt = product.price;
    this.subTotal = amt * qty;

    this.product_service.saveCart();
  }

  checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.router.navigate(['/payment']);
  }
}
