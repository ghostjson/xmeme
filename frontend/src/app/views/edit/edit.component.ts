import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  post: Post = {
    name: '',
    caption: '',
    url: '',
  };

  is_valid_url: boolean = true;

  constructor(
    private memeService: MemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Get meme
    this.route.params.subscribe((params) => {
      this.memeService.getMeme(params['id']).then((meme) => (this.post = meme));
    });
  }

  ngOnInit(): void {}

  // submit edits
  public async submit(e): Promise<void> {
    e.preventDefault();

    if (await this.checkImage(this.post.url)) {
      this.memeService
        .editMeme(this.post)
        .then(() => this.router.navigate(['/explore/latest']));
    } else {
      this.is_valid_url = false;
    }
  }

  public urlInputChange(): void {
    this.is_valid_url = true;
  }

  // check given URL is an image
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
