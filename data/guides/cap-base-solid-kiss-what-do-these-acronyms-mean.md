---
title: 'CAP, BASE, SOLID, KISS, What do these acronyms mean?'
description: 'Understanding common acronyms in system design: CAP, BASE, SOLID, and KISS.'
image: 'https://assets.bytebytego.com/diagrams/0350-cap-base-solid-kiss.png'
createdAt: '2024-03-09'
draft: false
categories:
  - cloud-distributed-systems
tags:
  - System Design
  - Software Engineering
titleZh: CAP、BASE、SOLID、KISS：这些架构缩写到底代表什么？
---

![常见架构原则与缩写](https://assets.bytebytego.com/diagrams/0350-cap-base-solid-kiss.png)

在分布式系统与软件工程中，充斥着各种耳熟能详的缩写与架构哲学。上图系统解析了四大基石理论：

## 1. CAP（分布式系统理论基石）
- **C (Consistency 一致性)：** 每次读取都能获得最新写入的数据或直接报错；
- **A (Availability 可用性)：** 每一个请求都能获得非错误的响应（但不保证数据最新）；
- **P (Partition Tolerance 分区容错性)：** 网络发生故障/丢包时系统依然继续运转。
> 注：分布式物理网络中网络分区必然存在，系统本质上是在发生网络分区时，权衡保障 CP（牺牲可用换强一致）还是 AP（牺牲强一致换高可用）。

## 2. BASE（分布式最终一致性哲学）
关系型数据库严格遵循 ACID 原则，但在超大规模互联网分布式场景下往往带来性能掣肘。NoSQL 数据库提出了 BASE 模型：
- **BA (Basically Available 基本可用)：** 核心功能可用，允许损失部分响应时间或降级次要功能；
- **S (Soft State 软状态)：** 允许系统数据存在中间过渡状态，状态流转存在时滞；
- **E (Eventually Consistent 最终一致性)：** 经过一段时间后，所有副本数据最终达成一致。

## 3. SOLID（面向对象设计五大准则）
- **S (单一职责原则 SRP)：** 一个类应该仅有一个引起它变化的原因；
- **O (开闭原则 OCP)：** 对扩展开放，对修改关闭；
- **L (里氏替换原则 LSP)：** 子类对象必须能够无缝替换任何父类对象；
- **I (接口隔离原则 ISP)：** 建立最小内聚的专用接口，不强迫客户端依赖它不需要的方法；
- **D (依赖倒置原则 DIP)：** 高层模块不应依赖低层模块，两者都应依赖于抽象接口。

## 4. KISS（极简设计哲学）
- **"Keep It Simple, Stupid!"**（保持简单，保持纯粹）：源自工程实践的黄金法则。越简单的系统往往具备越高的可靠性、越低的维护成本和更少隐蔽的边缘 Bug。

