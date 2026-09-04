---
title: Why PostgreSQL is the Most Loved Database
description: Explore why PostgreSQL was voted the most loved database in the 2022 survey.
image: 'https://assets.bytebytego.com/diagrams/0303-postgres.png'
createdAt: '2024-02-25'
draft: false
categories:
  - database-and-storage
tags:
  - PostgreSQL
  - Database
titleZh: 为什么 PostgreSQL 连续多年被评为开发者最喜爱的数据库？
---

![](https://assets.bytebytego.com/diagrams/0303-postgres.png)

如上图所示，PostgreSQL 之所以长期高居 Stack Overflow 全球开发者调查最受喜爱数据库榜首，核心在于其**极其强大的多范式通用性与极致的生态扩展能力（Extensions）**—— 一款数据库几乎涵盖了现代软件工程所需的绝大多数核心应用场景：

* **OLTP 在线事务处理：** 强一致性、完全兼容 ACID、支持高并发高可靠事务与 JSONB 半结构化文档存储。
* **OLAP 在线分析处理：** 基于 HTAP（混合事务与分析处理）架构优化，支持并行查询与丰富聚合计算。
* **FDW 外部数据包装器（Foreign Data Wrapper）：** 允许直接在 PostgreSQL 实例中跨库、跨源查询异构数据库（如 MySQL、Mongo、Oracle）或远程文件系统。
* **GIS 地理空间数据（PostGIS 插件）：** 业界无可争议的地理信息系统黄金标准扩展，支持海量几何/地理对象空间索引与测距运算。
* **时序数据（TimescaleDB 插件）：** 将 Postgres 增强为高性能分布式时序数据库，轻松应对物联网与金融高频行情流数据。
* **分布式水平扩展（Citus 插件）：** 通过分片与分布式协调器将单机 Postgres 扩展为 PB 级高吞吐分布式数仓与集群。
* **AI 向量检索（pgvector 插件）：** 原生集成大模型 Embedding 向量相似度搜索，构建现代 RAG（检索增强生成）系统的首选基建。

