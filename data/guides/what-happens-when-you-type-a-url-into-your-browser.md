---
title: What Happens When You Type a URL Into Your Browser?
description: Explore the journey of a URL from browser input to webpage display.
image: 'https://assets.bytebytego.com/diagrams/0393-type-a-url-into-your-browser.png'
createdAt: '2024-03-13'
draft: false
categories:
  - technical-interviews
tags:
  - Networking
  - Browsers
titleZh: 在浏览器地址栏输入 URL 回车后，到底发生了什么？经典面试题全解
---

![](https://assets.bytebytego.com/diagrams/0393-type-a-url-into-your-browser.png)

The diagram above illustrates the steps.

- Bob enters a URL into the browser and hits Enter. In this example, the URL is composed of 4 parts:
  - **scheme** - *http://*. This tells the browser to send a connection to the server using HTTP.
  - **domain** - *example.com*. This is the domain name of the site.
  - **path** - *product/electric*. It is the path on the server to the requested resource: phone.
  - **resource** - *phone*. It is the name of the resource Bob wants to visit.

- The browser looks up the IP address for the domain with a domain name system (DNS) lookup. To make the lookup process fast, data is cached at different layers: browser cache, OS cache, local network cache, and ISP cache. 
  - If the IP address cannot be found at any of the caches, the browser goes to DNS servers to do a recursive DNS lookup until the IP address is found (this will be covered in another post).

- Now that we have the IP address of the server, the browser establishes a TCP connection with the server.

- The browser sends an HTTP request to the server. The request looks like this:

  ```
  𝘎𝘌𝘛 /𝘱𝘩𝘰𝘯𝘦 𝘏𝘛𝘛𝘗/1.1
  𝘏𝘰𝘴𝘵: 𝘦𝘹𝘢𝘮𝘱𝘭𝘦.𝘤𝘰𝘮
  ```

- The server processes the request and sends back the response. For a successful response (the status code is 200). The HTML response might look like this:

  ```
  𝘏𝘛𝘛𝘗/1.1 200 𝘖𝘒
  𝘋𝘢𝘵𝘦: 𝘚𝘶𝘯, 30 𝘑𝘢𝘯 2022 00:01:01 𝘎𝘔𝘛
  𝘚𝘦𝘳𝘷𝘦𝘳: 𝘈𝘱𝘢𝘤𝘩𝘦
  𝘊𝘰𝘯𝘵𝘦𝘯𝘵-𝘛𝘺𝘱𝘦: 𝘵𝘦𝘹𝘵/𝘩𝘵𝘮𝘭; 𝘤𝘩𝘢𝘳𝘴𝘦𝘵=𝘶𝘵𝘧-8
  
  <**!𝘋𝘖𝘊𝘛𝘠𝘗𝘌** 𝘩𝘵𝘮𝘭>
  <**𝘩𝘵𝘮𝘭** 𝘭𝘢𝘯𝘨="𝘦𝘯">
  𝘏𝘦𝘭𝘭𝘰 𝘸𝘰𝘳𝘭𝘥
  </**𝘩𝘵𝘮𝘭**\>
  ```

- The browser renders the HTML content.

---

## 中文核心解析

上图清晰拆解了从用户输入 URL 到最终屏幕渲染展示的端到端全流程：

1. **URL 解析与协议规范**：浏览器解析协议（HTTP/HTTPS）、主机域名（Domain）、访问路径与资源定位。
2. **DNS 多级缓存与递归查询**：依次检索浏览器缓存 -> 操作系统缓存/Hosts -> 路由器/局域网缓存 -> 运营商 Local DNS 递归查询，获取服务器真实公网 IP。
3. **TCP 三次握手与 TLS 协商**：建立可靠传输层会话；若为 HTTPS 则完成数字证书校验与对称会话密钥协商。
4. **发起 HTTP 请求**：构造 GET/POST 等标准报文（含请求行、头部 Headers、请求体 Body）并发送。
5. **服务器处理与返回响应**：网关或后端服务完成路由与业务计算，返回 HTTP 状态码（如 200 OK）与响应数据（HTML/JSON）。
6. **浏览器关键渲染路径（CRP）**：解析 DOM 树与 CSSOM 树 -> 构造渲染树（Render Tree） -> 布局（Layout/Reflow） -> 绘制（Paint）与图层合成（Composite）。

