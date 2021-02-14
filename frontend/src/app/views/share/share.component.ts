import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  post: Post = {
    name: '',
    url: '',
    caption: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
