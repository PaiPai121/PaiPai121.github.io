<!-- 在页面头部注入KaTeX和Mermaid支持 -->
<% if(page.math || (theme.math && theme.math.enable !== false)){
    // 如果页面需要数学公式支持
%>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<% } %>

<% if(page.mermaid || (theme.mermaid && theme.mermaid.enable !== false)){
    // 如果页面需要Mermaid支持
%>
<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ 
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit'
    });
</script>
<% } %>

<% if(page.math || (theme.math && theme.math.enable !== false)){
    // 初始化KaTeX渲染
%>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option']
    });
});
</script>
<% } %>