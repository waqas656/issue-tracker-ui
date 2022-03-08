import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    /* we’re using 800px as our breakpoint. This means if it matches,
     we’ve to switch to the over mode for our sidebar and close it. 
     And vice versa, if it doesn’t match. */
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    /*
    manual way of telling angular to detect changes, 
    otherwise error(ExpressionChangedAfterItHasBeenCheckedError) 
    will be generated because loading state of app changed after it 
    has been initialized.
    This error happens because a value(in this case sidenav.mode) is modified
    after change detection is finished and this error occurs only in development
    environment because in development environment angular runs an additional check
    to detect changes that can cause an erratic UI behaviour*/
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }

}
