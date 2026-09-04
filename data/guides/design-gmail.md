---
title: Design Gmail
description: 'Explore the design of Gmail: from sending to receiving emails.'
image: 'https://assets.bytebytego.com/diagrams/0184-email.jpg'
createdAt: '2024-03-01'
draft: false
categories:
  - how-it-works
tags:
  - Email
  - System Design
titleZh: 系统设计：从发送到接收全流程剖析 Gmail 邮件系统设计
---

![](https://assets.bytebytego.com/diagrams/0184-email.jpg)

一图胜千言。在本篇指南中，我们将系统解析当 Alice（发件人）向 Bob（收件人）发送一封电子邮件时，底层邮件系统的端到端流转过程。

## 邮件收发分步剖析（Step-by-Step）

1. **邮件撰写与发送：** Alice 登录其邮件客户端（如 Outlook），撰写邮件并点击“发送”。客户端通过 **SMTP 协议（Simple Mail Transfer Protocol）**将邮件传输至发件方所属的 Outlook 邮件服务器。
2. **DNS 路由与 MX 记录检索：** Outlook 邮件服务器解析收件人邮箱后缀（`@gmail.com`），向 DNS 发起 MX（Mail Exchange）记录查询，获取接收方（Gmail）的 SMTP 邮件服务器公网 IP 地址。
3. **跨服务商邮件中继：** Outlook 邮件服务器通过 SMTP 协议与 Gmail 邮件服务器建立安全通信，将邮件报文投递给 Gmail 服务器。
4. **邮件存储与持久化：** Gmail 邮件服务器完成反垃圾与安全扫描后，将邮件持久化存储在分布式存储系统中，等待接收方拉取。
5. **客户端邮件读取：** 当 Bob 登录 Gmail 客户端时，客户端通过 **IMAP 协议（支持多端双向同步）**或 **POP3 协议**连接邮件服务器，获取并展示最新收件箱邮件。

