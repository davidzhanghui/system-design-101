---
title: REST API Cheatsheet
description: 'A concise guide to REST API principles, components, and best practices.'
image: 'https://assets.bytebytego.com/diagrams/0040-rest-api-cheatsheet.png'
createdAt: '2024-03-13'
draft: false
categories:
  - api-web-development
tags:
  - API
  - REST
titleZh: RESTful API 设计速查表
---

![](https://assets.bytebytego.com/diagrams/0040-rest-api-cheatsheet.png)

REST（Representational State Transfer，表现层状态转换）是现代 Web 服务与微服务通信中最通用的 API 架构风格。

上图为 RESTful API 设计核心要点速查清单：

## 1. REST 六大核心架构原则
- **客户端-服务端解耦 (Client-Server)：** 前端关注用户交互，后端关注数据存储与业务规则，彼此独立演进。
- **无状态性 (Stateless)：** 每一个客户端请求必须包含服务端理解该请求所需的全部上下文信息，服务端不维护跨请求会话状态。
- **可缓存性 (Cacheable)：** 响应数据必须明确标注是否支持缓存，充分利用 HTTP 缓存机制提升吞吐量。
- **分层系统 (Layered System)：** 客户端无需知道直接与之通信的是终端服务器还是中间代理、负载均衡器或安全网关。
- **统一接口 (Uniform Interface)：** 遵循标准 HTTP 方法（GET、POST、PUT、PATCH、DELETE）、统一资源标识符（URI）以及标准 HTTP 状态码。
- **按需代码 (Code on Demand - 可选)：** 允许通过向客户端传输可执行脚本（如 JS）来临时扩展其功能。

## 2. 常见 HTTP 状态码最佳实践
- `200 OK`：标准成功返回；
- `201 Created`：新资源创建成功（POST）；
- `204 No Content`：删除或操作成功但无需返回响应体（DELETE/PUT）；
- `400 Bad Request`：客户端入参校验失败；
- `401 Unauthorized`：未登录认证或 Token 无效；
- `403 Forbidden`：已登录但无权访问该资源；
- `404 Not Found`：所请求的资源路径不存在；
- `429 Too Many Requests`：触发接口限流频率上限；
- `500 Internal Server Error`：服务端未捕获异常崩溃。

