const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
console.log(x);
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'G', url: 'https://www.google.com' }
];
//删除前缀的函数
const simplifyUrl = (url) => {
        return url.replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/.*/, '')
    }
    //渲染哈希表
const render = () => {
    $siteList.find('li:not(.lastLi').remove(); //删除原有的元素
    hashMap.forEach((node, index) => {
        console.log(index);
        // onclick="window.open('${node.url}','_self')"
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-baseline-close-px"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url, '_self');
        })
        $li.on('click', '.close', (e) => {
            console.log('冒泡');
            e.stopPropagation();
            e.cancelBubble = true;
            //删除功能的实现
            hashMap.splice(index, 1);
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
        let url = window.prompt('请输入要添加的网址：')
        if (url.indexOf('http') != 0) { //不是以http开头的
            url = 'https://' + url;
        }
        console.log(url);
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        });
        render()
    })
    //页面关闭前触发
window.onbeforeunload = () => {
    //页面关闭前保存字符串形式的hashMap
    const string = JSON.stringify(hashMap) //对象=>字符串
    localStorage.setItem('x', string) //(key,value) value保存到对应的key里面
}

//键盘监听
$(document).on('keypress', (e) => {
    console.log(e);
})