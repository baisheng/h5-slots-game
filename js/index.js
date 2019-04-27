global.config = require('./config');
global.util = require('./libs/util');
global.scroll = require('./libs/Scroll');
const createGame = require('./Pages/GameClass');
global.View = {};
global.Popup = {};

$(function () {
  if (config.debug && util.getOption('debug')) {
    config.debug = true;
  } else {
    config.debug = false;
  }

  init(config.userInfo);
})
// Object.assign兼容性
const _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};


//页面初始化函数
let initUI = function () {
  View.play = new createGame('.play.page');
  // View.loading = new Loading('.loading');
}


//入口函数
function init (userInfo) {
  initUI();

  $('.main').show();
  View.play.show()
}

//页面全屏
$(function () {
  $('html, body, .main, .popup, .page').css({height: window.innerHeight, width: window.innerWidth});
  var overscroll = function (els) {
    for (var i = 0; i < els.length; ++i) {
      var el = els[i];
      el.addEventListener('touchstart', function () {
        var top = this.scrollTop
          , totalScroll = this.scrollHeight
          , currentScroll = top + this.offsetHeight;
        //this prevents the scroll from "passing through" to
        //the body.
        if (top === 0) {
          this.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
          this.scrollTop = top - 1;
        }
      });
      el.addEventListener('touchmove', function (evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if (this.offsetHeight < this.scrollHeight)
          evt._isScroller = true;
      });
    }
  };

  //禁止body的滚动事件
  document.body.addEventListener('touchmove', function (evt) {
    //In this case, the default behavior is scrolling the body, which
    //would result in an overflow.  Since we don't want that, we preventDefault.
    if (!evt._isScroller) {
      evt.preventDefault();
    }
  });

  //给class为.scroll的元素加上自定义的滚动事件
  overscroll(document.querySelectorAll('.scroll'));
});
