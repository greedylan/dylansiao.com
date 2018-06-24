var $ = require('jquery');
var WheelIndicator = require('wheel-indicator');
require('jquery-touchswipe');
import {loadAll, loadPreviousProject, loadNextProject} from './loadCell.js';
import {loadNextTitle, loadPreviousTitle} from './title.js';

var carousel = $('.carousel');
var duration = 300, //million seconds
durationStop = duration + 1,
timing = ".25, 1, .25, 1"; //cubic-bezier
var scrollPosition = 0;


// contructor function for moving cell up and down
function MoveCell(cellHeight, cellWidth){
  this.cellUp = function(){
    carousel.css({
       'transform' : 'translateY(' + -(cellHeight) + 'px)',
       'transition' : '' + duration + 'ms cubic-bezier(' + timing + ')',
    });
    setTimeout(function(){
      carousel.css({
        'transform' : 'translateY(0px)',
        'transition' : 'none',
      });
    }, duration);

    setTimeout(function(){
      carousel.removeAttr('style');
    }, durationStop);
  };
  this.cellDown = function(){
    carousel.css({
      'transform' : 'translateY(' + (cellHeight) + 'px)',
      'transition' : '' + duration + 'ms cubic-bezier(' + timing + ')',
    });
    setTimeout(function(){
      carousel.css({
        'transform' : 'translateY(0px)',
        'transition' : 'none',
      });
    }, duration);
    setTimeout(function(){
      carousel.removeAttr('style');
    }, durationStop);
  };
  this.cellLeft = function(){
    carousel.css({
      'transform' : 'translateX(' + -(cellWidth) + 'px)',
      'transition' : '' + duration + 'ms cubic-bezier(' + timing + ')',
    });
    setTimeout(function(){
      carousel.css({
        'transform' : 'translateX(0px)',
        'transition' : 'none',
      });
    }, duration);

    setTimeout(function(){
      carousel.removeAttr('style');
    }, durationStop);
  };
  this.cellRight = function(){
    carousel.css({
      'transform' : 'translateX(' + (cellWidth) + 'px)',
      'transition' : '' + duration + 'ms cubic-bezier(' + timing + ')',
    });
    setTimeout(function(){
      carousel.css({
        'transform' : 'translateX(0px)',
        'transition' : 'none',
      });
    }, duration);

    setTimeout(function(){
      carousel.removeAttr('style');
    }, durationStop);
  };
}


export function scrollMoveCell(){
  var cellHeight = $('.carousel__cell').height();
  var scroll = new MoveCell(cellHeight, '');
  var indicator = new WheelIndicator({

    elem: document.querySelector('.carousel'),
    callback: function(e){
      // console.log(e.direction);
      // down or up
      var winWidth = $(window).width();
      if(e.direction === "down" && winWidth >= '1024'){
        scroll.cellUp();
        loadNextTitle();
      }
      else if(e.direction === "up" && winWidth >= '1024'){
        scroll.cellDown();
        loadPreviousTitle();
      }
    }
  });
}

export function scrollLoadCell(){
  var indicator2 = new WheelIndicator({
    elem: document.querySelector('.carousel'),
    callback: function(e){
      var winWidth = $(window).width();
      if(e.direction === "down" && winWidth >= '1024'){
        setTimeout(function(){
            loadNextProject();
        }, duration);
      }
      else if(e.direction === "up" && winWidth >= '1024'){
        setTimeout(function(){
          loadPreviousProject();
        }, duration);
      }
    }
  });
}

export function swipeMoveCell(){
  var winWidth = $(window).width();
  var cellWidth = $('.carousel__cell').width();
  var swipe = new MoveCell('', cellWidth);

  $('.home').swipe({
    // Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      // console.log(direction, distance, fingerCount);

      if( direction == 'left' && winWidth < '1024'){
        swipe.cellLeft();
        loadNextTitle();
        console.log('swiping left');
        setTimeout(function(){
          loadNextProject();
        }, 300);
      }
      else if( direction == 'right' && winWidth < '1024'){
        swipe.cellRight();
        loadPreviousTitle();
        console.log('swiping right');
        setTimeout(function(){
          loadPreviousProject();
        }, 300);
      }
    }
  });
}
