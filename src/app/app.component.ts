import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Material-Side-Navbar-In-Angular';

  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;
  @ViewChild('snav') sideNav!: MatSidenav;
  sideNavDefaultOpened = true;
  showFullMenu = true;
  isExpanded = true;
  closedWidth = 75;
  openedWidth = 250;
  isMobile!: boolean;
  sideNavMode: 'side' | 'over' = 'side';
  toolBarHeight = 64;
  private readonly mediaWatcher: Subscription;
  isDarkTheme: boolean = false;
  constructor(media: MediaObserver) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {

      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        if (this.sideNavDefaultOpened) {
          this.sideNavDefaultOpened = false;
          this.isExpanded = false;
        }
        this.isMobile = true;
        this.showFullMenu = true;
      } else {
        this.isMobile = false;
        this.sideNavDefaultOpened = true;
        this.sideNavMode = 'side';
      }

      if (change.mqAlias === 'xs') {
        this.toolBarHeight = 56;
      } else {
        this.toolBarHeight = 64;
      }

    });
  }
  ngAfterViewInit(): void {
    this.sidenavContainer.scrollable.elementScrolled().subscribe((a: any) => {

    });
  }
  ngOnInit() { }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  onToolbarMenuToggle() {
    if (this.isMobile) {
      if (!this.isExpanded) {
        setTimeout(() => {
          this.sideNav.toggle();
        }, 150);
      } else {
        this.sideNav.toggle();
      }

    } else {
      if (!this.isExpanded) {
        setTimeout(() => {
          this.showFullMenu = true;
        }, 150);
      } else {
        this.showFullMenu = false;
      }
    }
    this.isExpanded = !this.isExpanded;
  }
}
