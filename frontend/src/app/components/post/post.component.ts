import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input()
  public post: Post;

  // is this post already liked
  liked: boolean = false;

  // is the option opened
  is_option: boolean = false;

  // is this post already reported
  reported: boolean = false;

  constructor(private memeService: MemeService, private router: Router) {}

  ngOnInit(): void {
    this.liked = this.memeService.isAlreadyLiked(this.post.id);

    this.reported = this.memeService.isAlreadyReported(this.post.id);
  }

  // like post
  like(): void {
    if (!this.liked) {
      this.memeService.likeMeme(this.post.id).then(() => {
        this.post.likes++;
        this.liked = true;
      });
    }
  }

  // open option if it is open and vice-versa
  option() {
    this.is_option = !this.is_option;
  }

  // close option
  openLeave() {
    this.is_option = false;
  }

  // go to edit page
  edit() {
    this.router.navigate([`/edit/${this.post.id}`]);
    this.openLeave();
  }

  // report meme
  report() {
    if (!this.reported) {
      this.memeService.reportMeme(this.post.id);
      this.reported = true;
    }
    this.openLeave();
  }
}
