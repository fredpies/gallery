<template lang="pug">

    .gallery
        .empty
        .empty
        .gallery-wrapper
            img.picture#i-1-1(src="./assets/GALLERY - 1.png", @click.stop="showSwiper")
            img.picture#i-1-2(src="./assets/GALLERY - 2.png", @click.stop="showSwiper")
            img.picture#i-1-3(src="./assets/GALLERY - 3.png", @click.stop="showSwiper")
            img.picture#i-2-1(src="./assets/GALLERY - 4.png", @click.stop="showSwiper")
            img.picture#i-2-2(src="./assets/GALLERY - 5.png", @click.stop="showSwiper")
            img.picture#i-2-3(src="./assets/GALLERY - 6.png", @click.stop="showSwiper")
            img.picture#i-3-1(src="./assets/GALLERY - 7.png", @click.stop="showSwiper")
            img.picture#i-3-2(src="./assets/GALLERY - 8.png", @click.stop="showSwiper")
            img.picture#i-3-3(src="./assets/GALLERY - 9.png", @click.stop="showSwiper")
        .empty

        .zoom-overlay

        .swiper-wrapper(ref="swiperWrapper", @click="closeSwiper")
            .swiper
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 1.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 2.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 3.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 4.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 5.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 6.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 7.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 8.png")
                .img-wrapper
                    img.picture(src="./assets/GALLERY - 9.png")

        img.nav-left(v-show="isNavVisible", src="./assets/ICON - LEFT.svg", @click="switchSlide('prev')")
        img.nav-right(v-show="isNavVisible", src="./assets/ICON - RIGHT.svg", @click="switchSlide('next')")

        button.close(v-show="isNavVisible", @click.stop="closeSwiper")
            | <svg xmlns="http://www.w3.org/2000/svg" width="21.115" height="16.92" viewBox="0 0 21.115 16.92">
            |   <path d="M21.115,16.92,12.727,8.46,21.115,0H16.52L10.563,6.008,4.595,0H0L8.387,8.46,0,16.92H4.595l5.969-6.008L16.52,16.92Z" fill="#eee" fill-rule="evenodd"></path>
            | </svg>


</template>

<script>


  export default {
    name: 'app',
    computed: {

      numberOfSlides() {
        return $( '.img-wrapper' ).length;
      },

      swiperWrapper() {
        return $( '.swiper-wrapper' )
      },

      zoomOverlay() {
        return $( '.zoom-overlay' )
      }


    },
    methods: {

      setPicturesHeight() {

        let $galleryImages = $( '.gallery-wrapper img' );
        $galleryImages.css( 'height', ( $galleryImages.width() / 0.75 ) + 'px' );

      },

      setSwiper() {
        this.swiperWrapper.css( 'style', '' ).width( window.innerWidth * 9 );

      },

      positionSwiper() {
        this.swiperWrapper
          .css( 'left', `-${window.innerWidth * this.currentSlideIdx}px` );
      },

      showSwiper( ev ) {

        $( 'body' ).css( 'overflow', 'hidden' ); // Disable scroll
        this.zoomOverlay.toggle();
        gsap.to( this.zoomOverlay, 0.2, { alpha: 1 } );

        let { top, left, width, height } = ev.target.getBoundingClientRect();

        let $clone = $( ev.target ).clone().css('filter', 'brightness(1)');

        $clone.css( {
          position: 'absolute',
          top: top.toFixed( 2 ) + 'px',
          left: left.toFixed( 2 ) + 'px',
          width: width.toFixed( 2 ) + 'px',
          height: height.toFixed( 2 ) + 'px'
        } ).appendTo( this.zoomOverlay[0] );


        let newWidth = window.innerHeight * 0.75;

        gsap.to( $clone, 0.6, {

          top: 0,
          left: ( window.innerWidth / 2 ) - ( newWidth / 2 ),
          width: newWidth,
          height: '100%',
          callBackScope: this,

          onComplete: () => {

            this.currentSlideIdx = $( '.gallery-wrapper img' ).index( ev.target );

            this.setSwiper();
            this.positionSwiper();
            this.zoomOverlay.toggle();
            this.swiperWrapper.toggle();
            $clone.remove();
            this.isNavVisible = true;


          }
        },


      );



      },

      closeSwiper( ev ) {
        if ( ev.target.tagName !== 'IMG' ) {
          this.swiperWrapper.toggle();
          $( 'body' ).css( 'overflow', 'scroll' ); // Enable scroll

          this.isNavVisible = false;
        }

      },

      switchSlide( direction ) {

        if ( !direction ) throw new Error( 'Direction must be provided.' );

        if ( direction === 'next' && ( this.currentSlideIdx + 1 < this.numberOfSlides ) ) {
          gsap.to( this.swiperWrapper, 0.5, { left: `-=${window.innerWidth}` } );
          this.currentSlideIdx++;
        }

        if ( direction === 'prev' && ( this.currentSlideIdx - 1 >= 0 ) ) {
          gsap.to( this.swiperWrapper, 0.5, { left: `+=${window.innerWidth}` } );
          this.currentSlideIdx--;
        }


      },

    },

    data() {

      return {

        // SWIPER

        isNavVisible: false,
        currentSlideIdx: undefined

      }

    },


    mounted() {


      let t1_1 = gsap.to( '#i-1-1', 1, { top: '-10.5%' } );
      let t1_2 = gsap.to( '#i-1-2', 1, { top: '-14%' } );
      let t1_3 = gsap.to( '#i-1-3', 1, { top: '-11%' } );

      let t2_1 = gsap.to( '#i-2-1', 1, { top: '-32%' } );
      let t2_2 = gsap.to( '#i-2-2', 1, { top: '-34%' } );
      let t2_3 = gsap.to( '#i-2-3', 1, { top: '-30%' } );

      let t3_1 = gsap.to( '#i-3-1', 1, { top: '-50%' } );
      let t3_2 = gsap.to( '#i-3-2', 1, { top: '-46%' } );
      let t3_3 = gsap.to( '#i-3-3', 1, { top: '-48%' } );

      const scenes = {

        '#i-1-1': t1_1,
        '#i-1-2': t1_2,
        '#i-1-3': t1_3,

        '#i-2-1': t2_1,
        '#i-2-2': t2_2,
        '#i-2-3': t2_3,

        '#i-3-1': t3_1,
        '#i-3-2': t3_2,
        '#i-3-3': t3_3

      };

      let controller = new ScrollMagic.Controller();

      for ( let element in scenes ) {
        if ( scenes.hasOwnProperty( element ) ) {

          new ScrollMagic.Scene( {
            triggerElement: element,
            duration: '150%',
            triggerHook: 1
          } )
            .setTween( scenes[element] )
            // .addIndicators()
            .addTo( controller );

        }
      }

      for ( let element in scenes ) {
        if ( scenes.hasOwnProperty( element ) ) {

          new ScrollMagic.Scene( {
            triggerElement: element,
            duration: '75%',
            triggerHook: 0.95
          } )
            .setTween( gsap.to( element,
              {
                webkitFilter: 'brightness(1)',
                duration: 0.01
              }
            ) )
            // .addIndicators()
            .addTo( controller );

          new ScrollMagic.Scene( {
            triggerElement: element,
            duration: '75%',
            triggerHook: 0.2
          } )
            .setTween( gsap.to( element,
              {
                webkitFilter: 'brightness(0)',
                duration: 0.01
              }
            ) )
            // .addIndicators()
            .addTo( controller );

        }
      }

      let vm = this;
      this.setPicturesHeight();
      $( window ).on( 'resize', () => {
        vm.setPicturesHeight();
        vm.setSwiper();
        vm.positionSwiper();

      } );


    }


  }
</script>

<style lang="scss">

    .empty {
        height: 50vh;
    }

    .gallery {

        background: black;

        .gallery-wrapper {

            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            height: 100vh;
            margin: 0 auto;

            @media (min-width: 600px) {
                max-width: 75vw;
            }

            @media (min-width: 900px) {
                max-width: 60vw;
            }

            @media (min-width: 900px) and (orientation: portrait) {
                max-width: 60vw;
            }

            @media (min-width: 1200px) {
                max-width: 55vw;
            }

            .picture {
                width: 28%;
                background: #555555;
                margin: 0.5rem;

                @media (orientation: portrait) {
                    &#i-1-3, &#i-2-3, &#i-3-3 {
                        display: none;
                    }
                }

                @media (min-width: 600px) and (orientation: portrait) {
                    width: 42%;
                }

                @media (min-width: 900px) and (orientation: portrait) {
                    width: 45%;
                }


                &[id*="i"] {
                    position: relative;
                    filter: brightness(0);
                }

                &#i-1-1 {
                    top: -4%;
                }

                &#i-1-2 {
                    left: 1.5%;
                }

                &#i-1-3 {
                    left: 2.15%;
                    top: -5.5%;
                }

                &#i-2-1 {
                    left: 12%;
                    top: 5%;

                    @media (min-width: 600px) and (orientation: portrait) {
                        top: 12%;
                    }

                    @media (min-width: 900px) and (orientation: portrait) {
                        top: 13%;
                    }

                }


                &#i-2-2 {
                    left: 13%;
                    top: 3%;

                    @media (min-width: 600px) and (orientation: portrait) {
                        top: 5%;
                    }

                    @media (min-width: 900px) and (orientation: portrait) {
                        top: 7%;
                    }


                }

                &#i-2-3 {
                    left: 14.5%;
                    top: 4%;
                }

                &#i-3-1 {
                    left: 4%;
                    top: -3%;


                    @media (min-width: 600px) and (orientation: portrait) {
                        top: 0;
                    }

                    @media (min-width: 900px) and (orientation: portrait) {
                        top: -8%;
                    }

                }

                &#i-3-2 {
                    left: 6%;
                    top: -8%;

                    @media (min-width: 600px) and (orientation: portrait) {
                        top: -3%;
                    }

                    @media (min-width: 900px) and (orientation: portrait) {
                        top: -10%;
                    }


                }

                &#i-3-3 {
                    left: 8%;
                    top: -4%;
                }


            }

        }
    }

    button.close {
        position: fixed;
        background: transparent;
        border: none;
        top: 10px;
        right: 25px;
        z-index: 2000;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:focus {
            background: transparent;
        }

        &:hover {
            cursor: pointer;
        }

    }

    img[class*="nav"] {

        position: fixed;
        z-index: 2000;
        top: 50%;
        cursor: pointer;

    }

    .nav-left {
        left: 35px;
    }

    .nav-right {
        right: 35px;
    }

    .zoom-overlay {
        display: none;
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: black;
    }

    .swiper-wrapper {

        position: fixed;
        overflow: hidden;
        display: none;
        top: 0;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        background: black;

        .swiper {

            display: flex;
            height: 100vh;

            .img-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100vw;

                .picture {
                    height: 100vh;
                }

            }
        }


    }


</style>
