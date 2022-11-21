import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

Fancybox.bind('[data-fancybox="gallery"]', {
  animated: false,
  showClass: false,
  hideClass: false,

  dragToClose: false,

  closeButton: "top",

  Thumbs: false,
  Toolbar: false,

  // Disable touch guestures
  Carousel: {
    Panzoom: {
      touch: false,
    },
  },

  Image: {
    zoom: false,
    wheel: false,
    click: "close",
    fit: "contain-w",
  },

  on: {
    ready: (fancybox, slide) => {
      fancybox.clientY =
        (fancybox.options.event && fancybox.options.event.clientY) || 0;

      fancybox.$container.addEventListener("mousemove", (e) => {
        fancybox.clientY = e.clientY;

        fancybox.trigger("mousemove");
      });
    },
    "done Carousel.change": (fancybox) => {
      fancybox.trigger("mousemove");
    },
    mousemove: (fancybox) => {
      const slide = fancybox.getSlide();

      if (!slide || !slide.$image || slide.state !== "done") {
        return;
      }

      const $el = slide.$el;

      const imageHeight = slide.$image.clientHeight;

      const style = window.getComputedStyle($el);

      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);

      const viewportHeight = $el.clientHeight - paddingTop - paddingBottom;
      const pointerY = fancybox.clientY - paddingTop;

      $el.scrollTop =
        (pointerY * (imageHeight - viewportHeight)) / viewportHeight;
    },
  },
});