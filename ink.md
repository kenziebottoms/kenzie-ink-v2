---
layout: gallery
---
<div class="feature-wrapper art">
    {% for post in site.categories.art limit:1 %}
        <div class="feature art" style="background-image:url({{ post.imgsrc }})">
        </div>
        <p><span>{{ post.date | date: "%b %-d, %Y" }}</span> {{ post.title }}</p>
    {% endfor %}
</div>
<div class="art ribbon">
    {% for post in site.categories.art %}
        <a class="post-link" href="#" date="{{ post.date | date: "%b %-d, %Y" }}" title="{{ post.title }}">
            <div class="thumb" style="background-image: url({{ post.imgsrc }})">
            </div>
        </a>
    {% endfor %}
    <div class="clearfix"></div>
</div>