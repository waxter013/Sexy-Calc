/**
 * Animation methods
 */
import { TweenMax, Back } from 'gsap';

export const showError = (error: Element) => TweenMax.to(error, 0.5, {top: '1rem', ease: Back.easeOut.config(2), display: 'block'});
export const hideError = (error: Element) => TweenMax.to(error, 0.3, {top: '-50%', ease: Back.easeIn.config(2), display: 'none'});
export const scrollToCalculator = (delay: number = 0) => TweenMax.to(window, 0.3, {delay, scrollTo: window.innerHeight});
