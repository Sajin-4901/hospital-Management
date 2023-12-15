import { Component } from '@angular/core';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  value = 'ljkkakjkjk';
  ngOnInit() {
    const regex = /aa/
    console.log('vall:', regex.test(this.value));
  }
}
