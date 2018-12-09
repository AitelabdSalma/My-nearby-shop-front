import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // constructor(private route: ActivatedRoute , private router: Router) {     this.id = this.route.snapshot.paramMap.get('id'); }

  title = 'my-nearby-shop-front';
}
