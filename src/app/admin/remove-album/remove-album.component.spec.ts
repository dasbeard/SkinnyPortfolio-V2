import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAlbumComponent } from './remove-album.component';

describe('RemoveAlbumComponent', () => {
  let component: RemoveAlbumComponent;
  let fixture: ComponentFixture<RemoveAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
