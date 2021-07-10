declare module 'react-sparkle' {
  import type { Component } from 'react';
  type SparklesProps = {
    /**
     * The color of the sparkles. Can be a color, an array of colors,
     * or 'random' (which will randomly pick from all hex colors).
     *
     * Default '#FFF'
     */
    color?: string | string[] | 'random';
    /**
     * The number of sparkles to render. A large number could slow
     * down the page.
     *
     * Default 50
     */
    count?: number;
    /**
     * The minimum diameter of sparkles, in pixels.
     *
     * Default 5
     */
    minSize?: number;
    /**
     * The maximum diameter of sparkles, in pixels.
     *
     * Default 8
     */
    maxSize?: number;
    /**
     * The number of pixels the sparkles should extend beyond the
     * bounds of the parent element.
     *
     * Default 20
     */
    overflowPx?: number;
    /**
     * How quickly sparkles disappear; in other words, how quickly
     * new sparkles are created. Should be between 0 and 1000,
     * with 0 never fading sparkles out and 1000 immediately
     * removing sparkles. Most meaningful speeds are between
     * 0 and 150.
     *
     * Default 50
     */
    fadeOutSpeed?: number;
    /**
     * Whether we should create an entirely new sparkle when one
     * fades out. If false, we'll just reset the opacity, keeping
     * all other attributes of the sparkle the same.
     *
     * Default true
     */
    newSparkleOnFadeOut?: boolean;
    /**
     * Whether sparkles should have a "flickering" effect.
     *
     * Default true
     */
    flicker?: boolean;
    /**
     * How quickly the "flickering" should happen.
     * One of: slowest, slower, slow, normal, fast, faster, fastest
     *
     * Default 'normal'
     */
    flickerSpeed?: 'slowest' | 'slower' | 'slow' | 'normal' | 'fast' | 'faster' | 'fastest';
  };
  /**
   * Adds a sparkle effect to the parent element.
   *
   * **Important**: the parent element must have either `relative` or `absolute` positioning.
   *
   * {@link SparklesProps}
   *
   * @see {@link https://github.com/kmjennison/react-sparkle#react-sparkle}
   */
  class Sparkles extends Component<SparklesProps> {}

  export default Sparkles;
}
