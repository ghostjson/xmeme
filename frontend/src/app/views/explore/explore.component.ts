import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  is_comment_visible: Boolean = true;
  current_comment_id: number = -1;

  memes: Promise<Post[]>;
  contentMode: boolean = true;

  constructor(
    private memeService: MemeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // meme filter
    this.route.params.subscribe((params) => {
      let filter: string = params['filter'];

      this.contentMode = false;

      switch (filter) {
        case 'latest':
          this.memes = this.memeService.getLatestMemes();
          break;
        case 'likes':
          this.memes = this.memeService.getMostLikedMemes();
          break;
        case 'oldest':
          this.memes = this.memeService.getOldestMemes();
          break;
        case 'least-liked':
          this.memes = this.memeService.getLeastLikedMemes();
          break;
      }

      setTimeout(() => (this.contentMode = true), 100);
    });
  }
}
