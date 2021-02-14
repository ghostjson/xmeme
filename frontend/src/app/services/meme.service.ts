import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

/**
 * Meme Service
 * **/

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  // base API URL
  base_url: string;

  // Liked memes
  liked: number[] = [];

  // Reported memes
  reported: number[] = [];

  constructor() {
    this.base_url = environment.base_url;

    this.loadLikedMemes();
    this.loadReportedMemes();
  }

  // Get latest 100 memes
  public async getLatestMemes(): Promise<Post[]> {
    let response = await fetch(this.base_url + '/memes');
    return response.json();
  }

  // Get a meme by ID
  public async getMeme(id: number): Promise<Post> {
    let response = await fetch(this.base_url + `/memes/${id}`);
    return response.json();
  }

  // Save a meme to database
  public async saveMeme(meme: Post): Promise<Response> {
    localStorage.setItem('name', meme.name);

    return await fetch(this.base_url + '/memes', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meme),
    });
  }

  // Edit a perticular meme
  public async editMeme(meme: Post): Promise<Response> {
    return await fetch(this.base_url + `/memes/${meme.id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meme),
    });
  }

  // Report a meme
  public async reportMeme(id: number): Promise<Response> {
    this.reported.push(id);

    localStorage.setItem('reported', JSON.stringify(this.reported));

    return await fetch(this.base_url + `/memes/report/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // check if given meme already reported by the user or not
  public isAlreadyReported(id: number): boolean {
    return this.reported.includes(id);
  }

  // get oldest 100 memes
  public async getOldestMemes(): Promise<Post[]> {
    let response = await fetch(this.base_url + '/memes/oldest');
    return response.json();
  }

  // get most liked 100 memes
  public async getMostLikedMemes(): Promise<Post[]> {
    let response = await fetch(this.base_url + '/memes/likes');
    return response.json();
  }

  // get least liked memes
  public async getLeastLikedMemes(): Promise<Post[]> {
    let response = await fetch(this.base_url + '/memes/least-likes');
    return response.json();
  }

  // like a meme
  public async likeMeme(id: number): Promise<Response> {
    this.liked.push(id);

    localStorage.setItem('liked', JSON.stringify(this.liked));

    return await fetch(this.base_url + `/memes/like/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // check the user already liked a given meme
  public isAlreadyLiked(id: number): boolean {
    return this.liked.includes(id);
  }

  // load all liked memes of the user
  private loadLikedMemes(): void {
    if (localStorage.getItem('liked') !== null) {
      this.liked = JSON.parse(localStorage.getItem('liked'));
    }
  }

  // load reported memes of the user
  private loadReportedMemes(): void {
    if (localStorage.getItem('reported') !== null) {
      console.log(localStorage.getItem('reported'));

      this.reported = JSON.parse(localStorage.getItem('reported'));
    }
  }
}
