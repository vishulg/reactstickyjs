# ReactStickyJS

ReactStickyJS is a JS library for making an element sticky with respect to window during page scroll and it also provide the break stickiness of the element when we want it to, in case other more prioritise element touches it. 

## Why we need this module

We have sticky property in CSS to manage sticky but its deprecated for IE and Edge browsers, also it doesn't provide us the feature of breaking stickiness when other element touches it.

## Installation

```bash
npm install --save reactstickyjs
```

## Usage

```js
import ReactStickyJS from 'ReactStickyJS';

<ReactStickyJS 
  refDiv='containerRef'
  top='100'
>
 Hi,I am a container which is placed at 100px from top and will get stick to the top of window on scroll. 
</ReactStickyJS>
```

## Props

```js
  children: PropTypes.node.isRequired,
  refDiv: PropTypes.string.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  isBreakSticky: PropTypes.bool,
  breakRefDiv: PropTypes.string,
  activeMobile: PropTypes.bool,
  activeTablet: PropTypes.bool,
  mobileTop: PropTypes.number,
  tabletTop: PropTypes.number,
  extraTop: PropTypes.number,
  extraMobileTop: PropTypes.number,
  extraTabletTop: PropTypes.number,
  initialPosition: PropTypes.string,
  mobileBreakpoint: PropTypes.number,
  tabletBreakpoint: PropTypes.number,
```

## DefaultProps

```js
  className: '',
  top: 0,
  isBreakSticky: false,
  breakRefDiv: '',
  activeMobile: false,
  activeTablet: false,
  mobileTop: 0,
  tabletTop: 0,
  extraTop: 0,
  extraMobileTop: 0,
  extraTabletTop: 0,
  initialPosition: 'fixed',
  mobileBreakpoint: 767.5,
  tabletBreakpoint: 991.5,
```

## Props Explanation

```js
  children: This contains all the elements reside inside the wrapper.

  refDiv: Its a reference id for the sticky wrapper.

  className: Pass a dynamic class which will apply the css to the wrapper.

  top: This is the initial position of your refDiv from the top of window.

  isBreakSticky: Set true if you want to break the stickiness of your main refDiv when other div like footer, etc, touches it.

  breakRefDiv: Its a reference id for the element which breaks the stickiness of main refDiv on touching it.

  activeMobile: Set true to activate sticky behaviour on mobile.

  activeTablet: Set true to activate sticky behaviour on mobile.

  mobileTop: This is the initial position of your refDiv from the top of window on mobile.

  tabletTop: This is the initial position of your refDiv from the top of window on mobile.

  extraTop: This is the distance from top where you want to stick the refDiv.

  extraMobileTop: This is the distance from top where you want to stick the refDiv on mobile.

  extraTabletTop: This is the distance from top where you want to stick the refDiv on tablet.

  initialPosition:  Set the initial css property for position here if you do not want it fixed.

  mobileBreakpoint: Breakpoint where viewport changes to mobile.

  tabletBreakpoint: Breakpoint where viewport changes to tablet.
```

## License

ISC
