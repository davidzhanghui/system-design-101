---
title: How Redis Architecture Evolved
description: 'Explore the evolution of Redis architecture, from standalone to cluster.'
image: 'https://assets.bytebytego.com/diagrams/0223-how-redis-architecture-evolve.png'
createdAt: '2024-03-04'
draft: false
categories:
  - caching-performance
tags:
  - Redis
  - Architecture
titleZh: Redis 架构演化史：从单机到主从、哨兵再到分布式集群
---

![Redis 架构演进图谱](https://assets.bytebytego.com/diagrams/0223-how-redis-architecture-evolve.png)

Redis 是一款广泛应用于高性能缓存与内存数据库的工业级组件。它从最初单机版演进至现代超大规模高可用分布式集群，经历了多个标志性的里程碑阶段：

## 1. 2010年 —— 单机版 Redis (Standalone)
Redis 1.0 发布时架构非常纯粹，通常作为业务应用层与后端关系型数据库之间的前置只读/写入缓存。但纯内存存储存在严重缺陷：一旦节点异常崩溃或重启，内存数据全部丢失，海量高并发流量将瞬间直接穿透击垮底层数据库。

## 2. 2013年 —— 持久化机制 (Persistence)
为解决内存易失性问题，Redis 引入了两种核心持久化机制：
- **RDB（内存快照）：** 周期性 fork 子进程，将当前全量内存数据生成二进制快照文件；
- **AOF（追加日志）：** 将收到的每一条写命令追加写入 AOF 文件中，重启时通过回放命令恢复数据。

## 3. 2013年 —— 主从复制 (Replication)
Redis 引入了主从复制架构（Master-Replica）以提升读取性能和数据冗余备份。主节点负责处理实时的读写请求，从节点异步复制主节点的数据流并分担大量只读流量。

## 4. 2013年 —— 哨兵集群机制 (Sentinel)
为解决主节点单点宕机时需要人工手动切换的痛点，Redis 推出了 Sentinel 哨兵系统。哨兵集群负责执行四大核心任务：**持续监控（Monitoring）、告警通知（Notification）、自动故障转移（Automatic Failover）与配置中心（Configuration Provider）**，实现了主从高可用的无人值守自动运维。

## 5. 2015年 —— 分布式分片集群 (Redis Cluster)
Redis 3.0 正式发布了官方分布式集群方案。采用去中心化哈希槽（Hash Slot）机制，将整个键空间逻辑切分为 16,384 个槽位，分布在集群中不同的主节点上，支持海量数据的水平横向扩容（Sharding）与自动故障转移。

## 6. 后续演进与现代化突破
- **Redis 5.0 (2017)：** 引入全新的 Stream 数据类型，提供了持久化消息队列与消费组能力；
- **Redis 6.0 (2020)：** 引入网络 I/O 多线程模型，将网络数据读写协议解析交由多线程处理，而核心命令执行依然保持严谨的单线程循环，进一步突破单机网络带宽瓶颈。

