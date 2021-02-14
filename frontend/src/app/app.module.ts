import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExploreComponent } from './views/explore/explore.component';
import { ShareComponent } from './views/share/share.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { ShareFormComponent } from './components/share-form/share-form.component';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { EditComponent } from './views/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExploreComponent,
    ShareComponent,
    SidebarComponent,
    PostsComponent,
    PostComponent,
    ShareFormComponent,
    DateAgoPipe,
    EditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
