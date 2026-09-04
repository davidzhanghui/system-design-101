---
title: Why is Kafka Fast?
description: Explore the key design choices behind Kafka's high performance.
image: 'https://assets.bytebytego.com/diagrams/0424-why-is-kafka-fast.jpg'
createdAt: '2024-02-05'
draft: false
categories:
  - database-and-storage
tags:
  - Kafka
  - Performance
titleZh: Kafka 为什么吞吐量如此之高？底层高并发原理剖析
---

![Kafka 零拷贝与高性能机制图解](https://assets.bytebytego.com/diagrams/0424-why-is-kafka-fast.jpg)

Apache Kafka 在高吞吐、海量消息流处理领域几乎是工业界的事实标准。它之所以能够做到单机每秒数十万甚至数百万消息的极致吞吐，核心在于底层做出了两项关键的架构抉择：

## 1. 磁盘顺序 I/O（Sequential I/O）

很多人认为磁盘读写必定慢于内存，但实际上：**磁盘顺序追加写（Sequential Write）的速度远超普通磁盘随机写，甚至可以与内存随机读写相媲美**。
Kafka 放弃了复杂的 B 树或随机更新逻辑，将消息组织为严格只追加（Append-Only）的日志文件（Commit Log），最大化利用了磁盘的顺序读写性能以及操作系统 PageCache 的预读优化。

## 2. 操作系统内核零拷贝技术（Zero-Copy）

在传统的网络消息消费过程中，数据在磁盘与网卡之间的流转需要经历多次在**用户空间（User Space）**与**内核空间（Kernel Space）**之间的来回拷贝与 CPU 上下文切换：
- 传统流程（4次拷贝 + 4次上下文切换）：磁盘 -> 内核 PageCache -> JVM 用户内存缓冲区 -> Socket 缓冲区 -> 网卡硬件。

而 Kafka 充分运用了 Linux 的 `sendfile()` 系统调用，实现了彻底的**零拷贝（Zero-Copy）**：
- 数据由 DMA 控制器从磁盘读取到 OS PageCache 内核缓冲区；
- 操作系统通过 `sendfile()` 直接将内核缓冲区中的文件描述符及数据通过 DMA 引擎直传给网卡硬件缓冲，送往消费者；
- **全流程无需经过 JVM 用户空间内存，彻底消除了 CPU 拷贝与内存上下文切换开销**，最大限度榨干了网卡与服务器的硬件吞吐极限。

