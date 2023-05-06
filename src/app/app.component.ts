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
  closedWidth = 90;
  openedWidth = 250;
  isMobile!: boolean;
  sideNavMode: 'side' | 'over' = 'side';
  hasBackdrop: boolean = false;
  toolBarHeight = 64;
  private readonly mediaWatcher: Subscription;
  isDarkTheme: boolean = false;
  constructor(media: MediaObserver) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {

      // if in mobile view
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        // if side nav is already opened in mobile view
        if (this.sideNavDefaultOpened) {
          // close side nav in mobile view 
          this.sideNavDefaultOpened = false;
          this.isExpanded = false;
        }
        this.isMobile = true;
        this.showFullMenu = true;
        this.sideNavMode = 'over';
        this.hasBackdrop = true;
      } else { // if not in mobile view
        this.isMobile = false;
        // open side nav
        this.sideNavDefaultOpened = true;
        this.sideNavMode = 'side';
        this.hasBackdrop = false;
      }

      // change tool bar height in mobile view
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
        this.sideNav.toggle();
    } else {
      if (!this.isExpanded) {
          this.showFullMenu = true;
      } else {
        this.showFullMenu = false;
      }
    }
    this.isExpanded = !this.isExpanded;
  }
}
