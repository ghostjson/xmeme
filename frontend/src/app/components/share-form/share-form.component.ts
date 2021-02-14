import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.scss'],
})
export class ShareFormComponent implements OnInit {
  is_valid_url: boolean = true;

  @Input()
  public post: Post;

  constructor(private memeService: MemeService, private router: Router) {}

  ngOnInit(): void {
    // if name exists feed it
    if (localStorage.getItem('name') !== null) {
      this.post.name = localStorage.getItem('name');
    }
  }

  // submit meme
  public async submit(e): Promise<void> {
    e.preventDefault();
    if (await this.checkImage(this.post.url)) {
      this.memeService
        .saveMeme(this.post)
        .then(() => this.router.navigate(['/explore/latest']));
    } else {
      this.is_valid_url = false;
    }
  }

  public urlInputChange(): void {
    this.is_valid_url = true;
  }

  // check if the image exists
  private checkImage(url: string): Promise<boolean> {
    let img = document.createElement('img');
    img.src = url;

    return new Promise((resolve, reject) => {
      try {
        img.onerror = function () {
          return resolve(false);
        };
        img.onload = function () {
          return resolve(true);
        };
      } catch (e) {
        return reject(false);
      }
    });
  }
}
