# Angular 4+ Tabs Component

Developing a Tabs Component with Angular5 App. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Features

This project framework provides the following features:

* Angular4/Angular5
* Node.js
* Express
* HTML5/CSS3
* SCSS

## Getting Started

### Prerequisites

Node.js with npm

### Installation

``` bash
git clone https://github.com/irfanfarhan/Angular5-Tabs-Component.git
cd Angular5-Tabs-Component
npm install
ng serve
```

### Quickstart

[How to develop a tabs component in Angular4+ first](https://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html). The API of the tabs component looks as follows:

``` bash
<tabs>
  <tab tabTitle="Tab 1">Tab 1 Content</tab>
  <tab tabTitle="Tab 2">Tab 2 Content</tab>
</tabs>
```

Whenever a user clicks on the tab header, the `<tabs>` component takes care of setting that specific tab to be visible and to hide all others. That’s why we need to establish a communication between the parent `<tabs>` and its children `<tab>`.

For establishing a communication between the two components, the thoughtram article uses Angular’s powerful dependency injection which allows us to simply ask for an instance of a parent component. In the `<tab`> child component it simply asked for its parent `<tabs>` and registered itself on that parent component, using the addTab function:

``` bash
class Tab {
  constructor(tabs: Tabs) {
    tabs.addTab(this)
  }
}
```

`Angular is so awesome that there is not just one way how to do things!
We can take a totally different approach how to implement our simple tabs ( which isn’t so easily possible in Angular 1 ), leveraging special Angular @ContentChildren property decorator with QueryList type and AfterContentInit life cycle interface.`

### The alternative approach

This article is just about continuing thoughtram’s example, but without using the dependency injection approach. So basically, rather than getting a reference to our parent component Tabs in the child component `Tab (child => parent)`, we’re doing it the other way round: we’ll get a reference to all of the Tab child components from the parent `Tabs (parent => child)`.

If you open the Tabs component, you can see that the child `<tab>` components are projected into it’s template via the [content projection](https://juristr.com/blog/2016/01/ng2-multi-content-projection/) mechanism using `<ng-content>`.

``` bash
...
@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#"></a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs {
    ...
}
```

What we want, is to get a reference to all of the `<tab>` children that get projected into that section, so that we can act on their corresponding API (i.e. hiding/showing them).

## @ContentChildren and QueryList

We can do exactly this using the @ContentChildren decorator. You have to pass the decorator the type you want to get a reference to. In our example it would look like `@ContentChildren(Tab`). As a result we will get a list of instances in the form of a `QueryList<Tab>`.

`[Minko Gechev](https://twitter.com/mgechev) posted an awesome article explaining the [difference between @ContentChildren and @ViewChildren](http://blog.mgechev.com/2016/01/23/angular2-viewchildren-contentchildren-difference-viewproviders/) on his blog`

A `QueryList<T>` is simply “an unmodifiable list of items that Angular keeps up to date when the state of the application changes”.

Hence, as a first step, we’re going to import the new constructs in our Tabs component.

``` bash
import { ContentChildren, QueryList } from '@angular/core';
```

Then, inside our class we can use it like

``` bash
import { Tab } from './tab';
...
export class Tabs {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
}
```

## ngAfterContentInit lifecycle hook

To access the list of Tab instances, we need to wait for them to be projected into our `Tabs` component. There’s a dedicated component lifecycle hook for that: ngAfterContentInit. This hook is called after the component content is initialized [(more on the official docs)](https://angular.io/guide/lifecycle-hooks).

``` bash
import { AfterContentInit } from '@angular/core';

@Component({
  selector: 'tabs',
  ...
})
export class Tabs implements AfterContentInit {
  
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  
  // contentChildren are set
  ngAfterContentInit() {
    ...
  }

  ...
}
```

Also note the `AfterContentInit` interface we’re importing. This is really just for better type checking with TypeScript. It doesn’t have any other effect, as TypeScript interfaces do not alter the transpiled JavaScript code, they disappear once you transpile.

Within the `ngAfterContentInit` function we can now fetch all of our tabs and activate the first one if none is already set to be the active one.

``` bash
// contentChildren are set
ngAfterContentInit() {
  // get all active tabs
  let activeTabs = this.tabs.filter((tab)=>tab.active);
  
  // if there is no active tab set, activate the first
  if(activeTabs.length === 0) {
    this.selectTab(this.tabs.first);
  }
}
```

Similarly, whenever someone clicks on a tab header, we call the `selectTab(tab: Tab)` function which gets all of the tabs and deactivates all of them to finally set the clicked tab to active and thus visible.

``` bash
selectTab(tab: Tab){
  // deactivate all tabs
  this.tabs.toArray().forEach(tab => tab.active = false);
  
  // activate the tab the user has clicked on.
  tab.active = true;
}
```

## The finally Deno here

[click Here](https://irfanfarhan.github.io/Angular5-Tabs-Component)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
