import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input()
  postsPromise: Promise<Post[]>;

  public posts: Post[];

  filter: string;

  // true if no post
  no_post: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.filter = params['filter'];
    });
  }

  ngOnInit(): void {
    this.postsPromise.then((res) => {
      this.posts = res;

      if (this.posts.length === 0) {
        this.no_post = true;
      }
    });
  }

  // change post listing filter
  public changeFilter() {
    this.router.navigate([`/explore/${this.filter}`]);
  }
}
