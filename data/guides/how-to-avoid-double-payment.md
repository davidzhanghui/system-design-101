---
title: How to Avoid Double Payment
description: Learn how to prevent double payments in your payment system.
image: 'https://assets.bytebytego.com/diagrams/0178-double-charge.jpg'
createdAt: '2024-03-11'
draft: false
categories:
  - payment-and-fintech
tags:
  - Payment Systems
  - Idempotency
titleZh: 支付系统如何防止重复扣款？幂等性设计与分布式锁实战
---

![](https://assets.bytebytego.com/diagrams/0178-double-charge.jpg)

支付系统中最严重的灾难性故障之一就是向客户**重复扣款（Double Charge）**。在设计支付系统时，首要目标就是保证支付订单执行的**精确一次（Exactly-Once）**。

乍看之下，高并发与网络异常环境下的精确一次非常具有挑战性，但如果我们把问题拆分为两个维度，就会清晰许多：

* **至少执行一次（At-least-once）：** 通过超时与失败重试机制保证。
* **至多执行一次（At-most-once）：** 通过幂等性检查（Idempotency Check）保证。

数学上，当且仅当一个操作既被“至少执行一次”又被“至多执行一次”时，即达成了“精确一次”。

## 1. 重试机制（Retry）

由于网络抖动、DNS 异常或网关超时，客户端有时需要对支付请求进行重试。重试提供了“至少执行一次”的交付保证。例如，客户端发起一笔 10 美元的支付，前几次因弱网环境失败，在网络恢复后，第四次重试成功。

## 2. 幂等性保障（Idempotency）

从 API 角度而言，**幂等性**意味着客户端对同一接口发起多次重复请求，所产生的副作用和业务结果均与单次请求完全一致。

在客户端（Web/移动端）与后端服务器通信时，客户端每次发起支付都会生成全局唯一的**幂等键（Idempotency Key）**。通常推荐使用 UUID 作为幂等键（例如 Stripe 和 PayPal 的业界标准规范）。

在 HTTP 请求中，客户端将该值放置在请求头传递：
`<idempotency-key: unique_uuid_value>`

服务端接收到请求后，利用 Redis/分布式锁或数据库唯一键对该幂等键做原子排重：已处理过的请求直接返回之前记录的支付状态，避免重复扣款。

