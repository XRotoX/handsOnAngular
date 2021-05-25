import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products;

  constructor(
    public catalogueService: CatalogueService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        let { url } = value;
        console.log(url);
        let { p1 } = this.route.snapshot.params;
        if (p1) {
          this.getProducts("/products/search/selectedProducts");
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/categories/' + idCat + '/products');
        }
      }
    });
    let { p1 } = this.route.snapshot.params;
    if (p1) {
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url) {
    this.catalogueService.getRessource(url)
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      })
  }
}
