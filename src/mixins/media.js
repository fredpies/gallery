import { isMobile, isBrowser, deviceDetect } from 'mobile-device-detect';
import { MobileOrientation }  from 'mobile-orientation';

export default {

  data() {
    return {
      orientation: new MobileOrientation()
    }
  },

  methods: {
    deviceDetect
  },

  computed: {

    isPortrait() {
      return o9n.orientation.type === 'portrait-primary'
    },

    isLandscape() {
      return o9n.orientation.type === 'landscape-primary'
    },

    isDesktop() {
      return this.isDesktopSmall || this.isDesktopMedium || this.isDesktopBig
    },

    isDesktopBig() {
      return screen.width > 1600 && isBrowser
    },

    isDesktopMedium() {
      return screen.width >= 1400 && isBrowser
    },

    isDesktopSmall() {
      return screen.width >= 1200 && isBrowser
    },

    isTablet() {
      return this.isTabletBig || this.isTabletMedium || this.isTabletSmall
    },

    isTabletSmall() {
      return this.isTabletSmallPortrait || this.isTabletSmallLandscape
    },
    isTabletSmallLandscape() {
      return screen.width >= 900 && isMobile && this.isLandscape
    },
    isTabletSmallPortrait() {
      return screen.width >= 600 && isMobile && this.isPortrait
    },

    isTabletMedium() {
      return this.isTabletMediumPortrait || this.isTabletMediumLandscape
    },

    isTabletMediumLandscape() {
      return screen.width >= 1100 && isMobile && this.isLandscape
    },

    isTabletMediumPortrait() {
      return screen.width >= 800 && isMobile && this.isPortrait
    },

    isTabletBig() {
      return this.isTabletBigPortrait || this.isTabletBigLandscape
    },
    isTabletBigPortrait() {
      return screen.width >= 900 && isMobile && this.isPortrait
    },
    isTabletBigLandscape() {
      return screen.width >= 1200 && isMobile && this.isLandscape
    },
    isPhone() {
      return screen.width < 600 && isMobile && this.isPortrait
    }

  },

}