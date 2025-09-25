---
layout: resource-sharepoint
permalink: /resources/sharepoint/
title: SharePoint Resources
order: 0
---

## Useful SharePoint Resources

A curated collection of trusted resources for end users, admins, and developers.

### Browse by role

{% assign pages_list = site.pages | where_exp:"item","item.path contains 'pages/resources/sharepoint/' and item.order != 0" | sort: 'order' %}
{% for my_page in pages_list %}
- [{{ my_page.title }}]({{ my_page.permalink }}): {{ my_page.subtitle}}{% endfor %}

### Contribute

Improve this list with a [GitHub issue](https://github.com/alirobe/alirobe.github.io/issues), or [contact me](/) to suggest changes.

I hope you find this useful :)