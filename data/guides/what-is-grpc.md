---
title: What is gRPC?
description: 'Learn about gRPC, a high-performance RPC framework by Google.'
image: 'https://assets.bytebytego.com/diagrams/0054-what-is-grpc.png'
createdAt: '2024-03-08'
draft: false
categories:
  - api-web-development
tags:
  - gRPC
  - Microservices
titleZh: 什么是 gRPC？高性能 RPC 框架入门
---

![](https://assets.bytebytego.com/diagrams/0054-what-is-grpc.png)

gRPC 是由 Google 最初发起并开源的高性能、跨语言通用 RPC（远程过程调用）框架。它广泛应用于微服务架构中各服务间的高速内网通信，具备极高的吞吐与极低的网络延迟。

## gRPC 核心技术特性：

* **基于 Protocol Buffers（Protobuf）序列化：** 默认采用二进制 Protobuf 作为接口定义语言（IDL）与数据传输格式。相比冗长文本格式（如 JSON/XML），Protobuf 序列化后的数据体积缩小数倍，CPU 编解码速度提升数量级。
* **基于 HTTP/2 传输协议：** 原生跑在 HTTP/2 之上，天然具备多路复用（Multiplexing，单 TCP 连接并发多请求）、二进制分帧、头部压缩（HPACK）等现代协议优势。
* **原生全双工流式通信（Streaming）：** 支持四种通信模式：一问一答（Unary）、服务端流式（Server Streaming）、客户端流式（Client Streaming）以及双向流式通信（Bi-directional Streaming），非常适合实时日志、音视频消息及大吞吐批量推送。
* **多语言强类型代码自动生成：** 编写一次 `.proto` 文件，即可自动编译生成 Go、Java、Python、C++、Node.js、Rust 等主流语言的客户端 Stub 与服务端接口骨架代码。

