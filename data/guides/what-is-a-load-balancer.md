---
title: What is a Load Balancer?
description: Distributes network traffic across multiple servers to optimize resources.
image: 'https://assets.bytebytego.com/diagrams/0261-what-is-a-load-balancer.png'
createdAt: '2024-02-28'
draft: false
categories:
  - api-web-development
tags:
  - Load Balancing
  - Networking
titleZh: 什么是负载均衡器（Load Balancer）？
---

![](https://assets.bytebytego.com/diagrams/0261-what-is-a-load-balancer.png)

负载均衡器（Load Balancer）是现代高可用分布式系统架构中至关重要的网络或软件组件，其主要职责是将客户端的并发流量科学、均匀地分发给后端的多个服务器节点。

## 负载均衡器的核心价值

* **流量均衡分发：** 避免单机过载，实现集群计算资源的充分利用。
* **高可用与容灾自愈：** 配合周期性健康检查（Health Check），自动剔除宕机或亚健康实例，保证服务不中断。
* **横向弹性扩展：** 支持后端集群按需无缝增加或减少实例，轻松应对业务流量波峰波谷。
* **安全防护与卸载：** 可集中处理 SSL/TLS 卸载、DDoS 基础流量清洗与请求限流。

## 常见分类与工作层次

* **四层负载均衡（Layer 4）：** 工作在传输层（TCP/UDP），基于 IP 地址与端口号进行报文转发（如 LVS、F5 硬件设备、AWS NLB），转发效率极高、吞吐量巨大。
* **七层负载均衡（Layer 7）：** 工作在应用层（HTTP/HTTPS/gRPC），具备内容感知能力，可根据 URL 路径、请求头 Headers、Cookie 或主机名进行灵活的内容路由与重写（如 Nginx、HAProxy、AWS ALB、Envoy）。
* **全局负载均衡（GSLB）：** 跨地域/多机房部署，结合智能 DNS 或任播（Anycast）技术，将用户就近接入最近的可用数据中心。

