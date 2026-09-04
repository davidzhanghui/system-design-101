---
title: Consistent Hashing Explained
description: 'Explore consistent hashing: its benefits, and real-world applications.'
image: 'https://assets.bytebytego.com/diagrams/0151-consistent-hashing.png'
createdAt: '2024-03-07'
draft: false
categories:
  - database-and-storage
tags:
  - Consistent Hashing
  - Distributed Systems
titleZh: 一致性哈希（Consistent Hashing）算法原理解析
---

![](https://assets.bytebytego.com/diagrams/0151-consistent-hashing.png)

Amazon DynamoDB、Apache Cassandra、Discord 消息存储以及 Akamai CDN 它们背后有一个共同的架构核心技术：**一致性哈希（Consistent Hashing）**。

## 传统取模哈希（Simple Hashing）的问题

在海量分布式存储和缓存集群中，单台服务器无法容纳全部数据，需要通过水平扩展分摊负载。最朴素的分片方式是取模：
`serverIndex = hash(key) % N`（N 为集群节点数）。

当集群节点数 N 恒定且负载均匀时，取模工作良好。然而一旦**节点宕机下线**或**集群扩容新增节点**，N 的变化会导致几乎所有缓存或数据映射关系失效，触发灾难性的缓存雪崩与全量数据大迁移。

## 一致性哈希的核心思想

一致性哈希的设计目标：**当集群节点数量发生动态增减时，仅有极小比例（约 1/N）的数据需要重新迁移分配，绝大多数数据依然保留在原节点**。

1. **哈希环结构（Hash Ring）：** 将哈希算法的输出空间映射为一个首尾相连的圆环（例如通常范围为 $0 \sim 2^{32}-1$）。
2. **节点映射：** 使用相同的哈希函数，将各服务器节点的 IP 或主机名映射到哈希环的对应位置。
3. **数据寻址定位：** 对数据的 Key 计算哈希值映射到环上，随后顺时针沿环前行，遇到的第一个节点即为该数据负责存储或处理的目标服务器。
4. **虚拟节点（Virtual Nodes）：** 为避免节点较少时发生数据倾斜（Hotspotting），引入虚拟节点机制，每台物理机对应环上的多个虚拟节点，极大增强了数据分布的均匀性。

## 工业界真实落地场景

* **Amazon DynamoDB 与 Apache Cassandra：** 在分区水平扩缩容时最小化数据迁移范围。
* **Akamai CDN 与反向代理网关：** 将边缘请求精准分发至各边缘机房，降低源站回源率。
* **Google Network Load Balancer：** 在保证长连接健康持久化的同时实现后端服务器的平滑扩缩容。

