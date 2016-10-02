# SuiNav
同步实现水平导航、垂直导航、侧滑导航，无限树形；   
详细文档链接：[http://docs.suibinc.com/SuiNav](http://docs.suibinc.com/SuiNav)  

```javascript
<script type="text/javascript">
    var navbar = $('#sui_nav').SuiNav({
        toggleName: '.MenuToggle', // 控制菜单开关类
        direction: 'left', // 菜单切换方向
        trigger: 'click', // 展开方式，单击展示下层或是悬浮展示
        openingSpeed: 400, // 打开菜单动画时间
        closingSpeed: 400, // 关闭菜单动画时间
        closingCascade: true, // 级联关闭所有菜单，仅对垂直导航菜单有效
        destroy: true // 切换菜单时是否释放控件占用资源
    });
    // 可以使用3种显示/隐藏方法
    // show();
    // hide();
    // toggle();
</script>
```
```html
<div id="sui_nav" class="sui-nav horizontal">
    <div class="sui-nav-wrapper nav-border nav-line">
        <!-- 在这里通过 ul_li 实现无限的树导航 -->
        <ul></ul>
    </div>
</div>
```
通过创建一个菜单，可以同步创建垂直导航或水平导航，垂直导航或水平导航在一定的分辨率下自动转为侧滑导航；  
` .sui-nav` 默认为垂直导航，为 `.sui-nav` 添加 `.horizontal` 后转为水平导航；  
垂直导航、水平导航在分辨率<=768px时自动隐藏，转为侧滑导航;  
`.hide-in-horizontal` 仅在垂直导航中显示，包括侧滑导航;  
`.show-in-horizontal` 仅在水平导航中显示;  
`.hide-in-mobile` 仅在>768px的屏幕显示;  
`.show-in-mobile` 仅在<=768px的屏幕显示;  
