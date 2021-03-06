import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { matExpansionAnimations, MatExpansionPanelState } from '@angular/material';
import { Subscription } from 'rxjs';

/**
 *
 */
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    matExpansionAnimations.bodyExpansion,
    matExpansionAnimations.indicatorRotate,
  ],
})
export class MenuComponent implements OnInit
{
  /**
   *
   */
  @Input()
  public sidenav: any;

  /**
   *
   */
  @Output()
  public onToogle: EventEmitter<any> = new EventEmitter();

  /**
   *
   */
  public menuGroups: any[] = [];

  /**
   *
   */
  private userSubscription: Subscription;

  /**
   *
   */
  constructor() { }

  /**
   *
   */
  ngOnInit()
  {
    this.createMenu();
  }

  /**
   *
   */
  ngOnChanges()
  {
    this.createMenu();
  }

  /**
   *
   */
  public createMenu()
  {
    this.menuGroups = [
        {
          label: "Cadastros Básicos",
          menuList: [
            { icon: 'event', label: 'Eventos', routerlink: 'eventos'},
            { icon: 'account_circle', label: 'Usuários', routerlink: 'usuario/cadastrar'},
            { icon: 'people', label: 'Funcionários', routerlink: 'funcionarios/cadastrar'},
            { icon: 'directions_bus', label: 'Transportes', routerlink: 'transporte/cadastrar' }
          ],
          open: false
        },
        {
          label: "Lista",
          menuList: [
            { icon: 'event', label: 'Eventos', routerlink: 'eventos' },
            { icon: 'people', label: 'Funcionarios', routerlink: 'funcionarios'},
            { icon: 'directions_bus', label: 'Transporte', routerlink: 'transporte'},
            { icon: 'account_circle', label: 'Usuários', routerlink: 'usuario'}
          ],
          open: false
        }
      ]

    this.removeEmptyItens();
  }

  /**
   *
   */
  removeEmptyItens()
  {
    this.menuGroups = this.menuGroups.filter((menuItem) => menuItem != null);
    this.menuGroups.forEach((menuItem) => menuItem.menuList = menuItem.menuList.filter((menuListItem) => menuListItem != null));
  }

  /**
   *
   */
  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  /** Gets the expanded state string. */
  getExpandedState(menuGroup): MatExpansionPanelState {
    return menuGroup.open ? 'expanded' : 'collapsed';
  }
}
