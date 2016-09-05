---
layout: gallery
---
<div class="feature-wrapper">
    {% for post in site.categories.art limit:1 %}
        <div class="feature" style="background-image:url({{ post.imgsrc }})">
        </div>
    {% endfor %}
</div>
<div class="ribbon">
    {% for post in site.categories.art %}
         <a class="post-link" href="{{ post.url | prepend: site.baseurl }}" date="{{ post.date | date: "%b %-d, %Y" }}" title="{{ post.title }}">
            <img src="{{ post.imgsrc }}"/>
        </a>
    {% endfor %}
</div>