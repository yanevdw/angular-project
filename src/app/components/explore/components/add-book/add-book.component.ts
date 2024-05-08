import { Component, Input } from '@angular/core';
import { VolumeInfo } from '../../../../models/states';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NzButtonComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  @Input() book: VolumeInfo | undefined;
}
