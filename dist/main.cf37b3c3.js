// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hasMap = xObject || [{
  logo: "C",
  url: "http://chenxblog.com"
}];

var simpleUrl = function simpleUrl(url) {
  return url.replace("http://", "").replace("https://", "").replace("www", "").replace(/\/.*/, "");
}; //要返回，要不的话后面调用simpleUrl不起作用，使得没有修改后的url


var render = function render() {
  $siteList.find(".newAdd").remove();
  hasMap.forEach(function (node, index) {
    //forEach中有对象的index参数
    var $li = $("<li class='newAdd'>\n              <div class=\"site\">\n                <div class=\"logo\">\n                ".concat(simpleUrl(node.url)[0].toUpperCase(), "\n                </div>\n                <div class=\"link\">").concat(simpleUrl(node.url), "</div>\n                <div class=\"close\">\n                  <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-close\"></use>\n                  </svg>\n                </div>\n              </div>\n          </li>")).insertBefore($lastLi);
    $li.on("click", function (e) {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //点击阻止冒泡，防止在点击close触发site的点击事件

      hasMap.splice(index, 1);
      render(); //删除以后需要再调用新的rede函数，就是将新的hasMap调入页面中
    });
  });
};

render();
$(".addLink").on("click", function () {
  var url = window.prompt("小宝贝你需要添加什么网址啊！！！");

  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }

  console.log(url);
  hasMap.push({
    logo: simpleUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hasMap);
  localStorage.setItem("x", string);
}; //手机版整体思路，
//一、先建立hsaMap写入必需的站点，当没有新增网站时就只有初识写入的站点
//二、当点击新增网站时将站点增入hasMap，此时调用render删除HTML中的站点，将hasMap重新写入html
//键盘事件


$(document).on("keypress", function (e) {
  var key = e.key; //得到触发键盘的指定键的值

  for (var i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
var essential = [{
  logo: "w",
  url: "https://weibo.com/"
}, {
  logo: "b",
  url: "http://index.baidu.com/v2/index.html#/"
}, {
  logo: "s",
  url: "http://seo.chinaz.com/"
}, {
  logo: "z",
  url: "https://weibo.com/"
}];
$(document).on("keypress", function (e) {
  var key = e.key; //得到触发键盘的指定键的值

  for (var i = 0; i < essential.length; i++) {
    if (essential[i].logo.toLowerCase() === key) {
      window.open(essential[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cf37b3c3.js.map