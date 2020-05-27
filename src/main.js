const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [{ logo: "C", url: "http://chenxblog.com" }];
const simpleUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www", "")
    .replace(/\/.*/, "");
}; //要返回，要不的话后面调用simpleUrl不起作用，使得没有修改后的url
const render = () => {
  $siteList.find(".newAdd").remove();
  hasMap.forEach((node, index) => {
    //forEach中有对象的index参数
    const $li = $(
      `<li class='newAdd'>
              <div class="site">
                <div class="logo">
                ${simpleUrl(node.url)[0].toUpperCase()}
                </div>
                <div class="link">${simpleUrl(node.url)}</div>
                <div class="close">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                  </svg>
                </div>
              </div>
          </li>`
    ).insertBefore($lastLi);
    $li.on("click", (e) => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      //点击阻止冒泡，防止在点击close触发site的点击事件
      hasMap.splice(index, 1);
      render(); //删除以后需要再调用新的rede函数，就是将新的hasMap调入页面中
    });
  });
};
render();
$(".addLink").on("click", () => {
  let url = window.prompt("小宝贝你需要添加什么网址啊！！！");
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }
  console.log(url);
  hasMap.push({
    logo: simpleUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap);
  localStorage.setItem("x", string);
};
//手机版整体思路，
//一、先建立hsaMap写入必需的站点，当没有新增网站时就只有初识写入的站点
//二、当点击新增网站时将站点增入hasMap，此时调用render删除HTML中的站点，将hasMap重新写入html

//键盘事件
$(document).on("keypress", (e) => {
  const key = e.key; //得到触发键盘的指定键的值
  for (let i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});

const essential = [
  { logo: "w", url: "https://weibo.com/" },
  { logo: "b", url: "http://index.baidu.com/v2/index.html#/" },
  { logo: "s", url: "http://seo.chinaz.com/" },
  { logo: "z", url: "https://weibo.com/" },
];
$(document).on("keypress", (e) => {
  const key = e.key; //得到触发键盘的指定键的值
  for (let i = 0; i < essential.length; i++) {
    if (essential[i].logo.toLowerCase() === key) {
      window.open(essential[i].url);
    }
  }
});
