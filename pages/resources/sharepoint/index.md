---
layout: resource-sharepoint
permalink: /resources/sharepoint/
title: SharePoint Resources
order: 0
---

## Useful SharePoint Resources

A curated collection of trusted resources for end users, admins, and developers.

### Browse by role

<ul>
{% assign pages_list = site.pages
   | where_exp: "item", "item.layout contains 'resource-sharepoint'"
   | where_exp: "item", "item.link != nil"
   | sort: 'order'
%}
{% for my_page in pages_list %}
<li>
    <a href="{{ my_page.permalink }}">{{ my_page.title }}</a>
    <span>- {{ my_page.subtitle }}</span>
</li>
{% endfor %}
</ul>

### Contribute

Improve this list with a [GitHub issue](https://github.com/alirobe/alirobe.github.io/issues), or [contact me](/) to suggest changes.

I hope you find this useful :)