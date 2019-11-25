import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StickyWrapper = styled.div`
    transition: transform 0.5s;
    position: ${props => (props.activeMobile ? 'fixed' : '')};
    top: ${props => props.mobileTop}px;

    @media (min-width: 767.5px) {
      position: ${props => (props.activeTablet ? 'fixed' : '')};
      top: ${props => props.tabletTop}px;
    }

    @media (min-width: 991.5px) {
        position: ${props => props.initialPosition};
        top: ${props => props.top}px;
    }
`;

export default class ReactStickyJS extends React.Component {
  constructor(props) {
    super(props);
    const { initialPosition } = this.props;
    this.state = {
      initialPosition,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  handleScroll() {
    const {
      top, refDiv, isBreakSticky, activeMobile, activeTablet, mobileTop, tabletTop,
      extraTop,
      //  extraTabletBottom, Version 2.0
      extraTabletTop, extraMobileTop, mobileBreakpoint,
      tabletBreakpoint, breakRefDiv
    } = this.props;  // Inherited the props
    const stickyRef = document.getElementById(refDiv); // Fetched the element of ref Div
    const scrolledDistance = window.scrollY || window.pageYOffset; // Getting the window scroll
    let stickedAtTop =  extraTop; // assinged the extraTop which is distance from top where refDiv has to stick
    const windowSize = window.innerWidth; // fecting window size from viewport
    if (stickyRef) { // Error handling to check if we are able to find refDiv in document
      let stickyOffset = top; // stickyOffeset is current offset of the refDiv which is the top param 
      let deviceVar = false; // deviceVar declare to check if we need active sticky on mobile or tablet
      if (windowSize < mobileBreakpoint && activeMobile) { // condition check for mobile device
        stickyOffset = mobileTop; // stickyOffset is set to mobileTop param
        deviceVar = true; // deviceVar set to true to verify sticky is active on mobile
        stickedAtTop = extraMobileTop; // stickedAtTop set to extraMobileTop which is the distance from top where we have to stick refDiv on mobile
      } else if (windowSize >= mobileBreakpoint && windowSize < tabletBreakpoint && activeTablet) { // condition check for tablet device
        stickyOffset = tabletTop; // stickyOffset is set to tabletTop param
        deviceVar = true; // deviceVar set to true to verify sticky is active on tablet
        stickedAtTop = extraTabletTop; // stickedAtTop set to extraTabletTop which is the distance from top where we have to stick refDiv on tablet
      }
      let topVar = stickyOffset - scrolledDistance; // calc. topVar to set the current position of refDiv
      const maxScroll = stickyOffset - stickedAtTop; // calc. maximum scroll of page till which refDiv has to change its position
      if (topVar < stickedAtTop || scrolledDistance > maxScroll) { // condtion to check that we can further scroll the refDiv to top
        topVar = stickedAtTop; // fixed the refDiv top to the position where we want refDiv to be sticky
      }
      if (isBreakSticky && breakRefDiv) { // to break sticky at some point where your wrapper touches other element like footer, etc.
        const breakDivRef = document.getElementById(breakRefDiv).getBoundingClientRect().top; // Calculation top of break ref div
        let bottom = stickyRef.getBoundingClientRect().height + stickedAtTop; // Calculated the height of sticked elements including refering div and extra top
        // Version 2.0
        // if (extraTabletBottom && windowSize < tabletBreakpoint && windowSize > mobileBreakpoint) {
        //   const extraBottom = document.getElementsByClassName(extraTabletBottom)[0]
        //     .getBoundingClientRect().height;
        //   bottom += extraBottom;
        // }
        if (breakDivRef < bottom) { // checking if breaking ref div meets height of main sticky ref
          topVar -= (bottom - breakDivRef); // setting top var in accroding to movement of all var to break stickyness
        }
      }
      if (windowSize > tabletBreakpoint || deviceVar) {
        stickyRef.style.top = `${topVar}px`;  // setting top of ref div using JS
        this.setState({
          initialPosition: 'fixed',
        });
      }
    }
  }

  render() {
    const { initialPosition } = this.state;
    const {
      children, className, top, refDiv, activeMobile, mobileTop, activeTablet, tabletTop,
    } = this.props;
    return (
      <StickyWrapper
        id={refDiv}
        top={top}
        activeMobile={activeMobile}
        mobileTop={mobileTop}
        activeTablet={activeTablet}
        tabletTop={tabletTop}
        className={className}
        initialPosition={initialPosition}
      >
        {children}
      </StickyWrapper>
    );
  }
}

ReactStickyJS.propTypes = {
  children: PropTypes.node.isRequired, // Children data come within the tags
  refDiv: PropTypes.string.isRequired, // Its an reference id for the sticky wrapper
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
  // extraTabletBottom: PropTypes.string,
  initialPosition: PropTypes.string,
  mobileBreakpoint: PropTypes.number,
  tabletBreakpoint: PropTypes.number,
};

ReactStickyJS.defaultProps = {
  className: '',
  top: 0, // Position from the top for desktop
  isBreakSticky: false, // Used when we have to break sticky nature when footer or breaking element touches the ref div
  breakRefDiv: '', // It an id of element which is going to break sticky nature of main div when it touches it
  activeMobile: false, // Activate Sticky on Mobile
  activeTablet: false, // Activate Sticky on Table
  mobileTop: 0, // Position from the top for mobile
  tabletTop: 0, // Position from the top for Tab
  extraTop: 0, // Initially our sticky is getting sticked to the height of header but when we need some extra space than header we give extra top
  extraMobileTop: 0, // Initially our sticky is getting sticked to the height of header but when we need some extra space than header we give extra top in mobile
  extraTabletTop: 0, // Initially our sticky is getting sticked to the height of header but when we need some extra space than header we give extra top in tablet
  // extraTabletBottom: '', // Initially our sticky compnonent break stickyness while it touch to the footer to add another components we give the reference of extra bottom for tablet
  initialPosition: 'fixed', // This param is used to set inital position of ref if you don't want it to be fixed
  mobileBreakpoint: 767.5, // Breakpoint where viewport changes to mobile
  tabletBreakpoint: 991.5, // Breakpoint where viewport changes to tablet
};
