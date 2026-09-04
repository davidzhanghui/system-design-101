---
title: Cookies vs Sessions vs JWT vs PASETO
description: 'Explore cookies, sessions, JWT, and PASETO for modern authentication.'
image: >-
  https://assets.bytebytego.com/diagrams/0155-cookies-vs-sessions-vs-jwt-vs-paseto.png
createdAt: '2024-03-04'
draft: false
categories:
  - security
tags:
  - Authentication
  - Security
titleZh: 现代身份验证方案选型：Cookie vs Session vs JWT vs PASETO
---

![](https://assets.bytebytego.com/diagrams/0155-cookies-vs-sessions-vs-jwt-vs-paseto.png)

身份验证（Authentication，简称 AuthN）是系统安全的第一道大门，用以解决“你是谁？”的核心身份确认问题。

在现代 Web 与分布式系统架构中，主要存在以下四种认证载体与方案：

## 1. Cookie 与 Session（服务端有状态会话）
- **机制：** 用户登录成功后，服务端在内存或分布式缓存（如 Redis）中生成并保存 Session 数据，同时向浏览器写回一个含有 `session_id` 的 HTTP-only Cookie。后续请求浏览器自动携带该 Cookie，服务端查表验证用户状态。
- **优缺点：** 服务端具备强控制力（可随时踢掉用户、吊销会话）；缺点是占用服务端存储，在无共享缓存的分布式集群中需要做会话黏性（Session Sticky）或集中存储。

## 2. JWT（JSON Web Token，无状态自包含令牌）
- **机制：** 由 Header、Payload 和 Signature 三部分由 `.` 连接组成的 Base64 编码字符串。用户信息直接明文存放在 Payload 中，服务端通过私钥对其签名。
- **优缺点：** 服务端完全无状态，易于水平横向扩展和跨域单点登录；但一旦颁发，在到期前服务端难以主动吊销，且 Token 泄露后风险较高，建议设置较短有效期并搭配 Refresh Token 使用。

## 3. PASETO（平台无关安全令牌 Platform-Agnostic Security Tokens）
- **定位：** 旨在成为 JWT 的现代化安全替代方案。
- **优势：** 针对 JWT 历史上出现的诸多加密算法漏洞（如将 `alg` 篡改为 `none` 进行绕过攻击、错误使用弱加密套件等），PASETO 从协议规范上锁死了安全的强加密默认值，避免了因开发者错误配置带来的严重安全隐患。

