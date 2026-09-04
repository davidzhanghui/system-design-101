---
title: '缓存与系统性能优化'
titleEn: 'Caching & Performance'
description: '通过直观的图解指南，学习如何利用数据缓存与性能优化技术提升系统吞吐与响应速度。'
image: 'https://github.com/ByteByteGoHq/system-design-101/raw/main/images/oAuth2.jpg'
icon: '/icons/order.png'
sort: 150
---

缓存是一种将计算结果或资源副本存储在更快介质中以便随时读取的技术。例如当 Web 服务器渲染网页时，可将渲染结果存入缓存，下次请求该页面时，直接返回缓存结果而无需重新计算。这一过程显著缩短了响应时间，并大幅减轻了后端和数据库的压力。
