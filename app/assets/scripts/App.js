import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';
import Minesweeper from './modules/MineSweeperBoard';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
var stickyHeader = new StickyHeader();
var modal = new Modal();
var minesweeper =  new Minesweeper();