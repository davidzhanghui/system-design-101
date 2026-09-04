---
title: 8 Key Concepts in Domain-Driven Design
description: Explore 8 key concepts in Domain-Driven Design for better software.
image: 'https://assets.bytebytego.com/diagrams/0011-8-key-concepts-in-ddd.png'
createdAt: '2024-03-06'
draft: false
categories:
  - software-architecture
tags:
  - DDD
  - Software Design
titleZh: 领域驱动设计（DDD）的 8 大核心概念剖析
---

![](https://assets.bytebytego.com/diagrams/0011-8-key-concepts-in-ddd.png)

领域驱动设计（Domain-Driven Design, DDD）主张通过深入的业务领域建模来驱动软件架构与编码落地，是治理复杂微服务系统与业务边界的核心方法论。

上图解析了 DDD 中的 8 大核心基石概念：

## 1. 统一语言 (Ubiquitous Language)
在产品业务团队与技术研发团队之间建立严谨、一致且无歧义的词汇表，并在代码、文档、需求评审中统一使用。

## 2. 实体 (Entities)
具有全局唯一标识（ID）的业务对象。即使其实体属性发生变化，其身份标识在整个生命周期中保持恒定不变（如 `User`、`Order`）。

## 3. 值对象 (Value Objects)
没有唯一标识，纯粹由其属性值定义的对象（只读、不可变）。当两个值对象的属性值完全一致时，它们被视为同一个对象（如 `Address`、`Money`）。

## 4. 聚合与聚合根 (Aggregate & Aggregate Root)
一组紧密关联的实体与值对象的内聚集合，被视为数据修改的最小事务一致性单元。外部只能通过聚合根（Aggregate Root）作为唯一入口来访问和修改聚合内的数据，确保业务规则约束（Invariants）不被破坏。

## 5. 界限上下文与模型边界 (Bounded Context)
明确模型起作用的显式边界。同一个现实名词在不同上下文中可能代表完全不同的概念模型（例如在“电商下单”上下文与“物流配送”上下文中，`Product` 关注的属性完全不同）。

## 6. 领域服务与操作建模 (Domain Services)
当某些业务行为和计算无法合理归属于某一个单一实体或值对象时，将其提炼为无状态的领域服务。

## 7. 领域事件 (Domain Events)
记录业务领域中已经发生的重要事实（如 `OrderPlaced`、`PaymentReceived`），通常用于实现跨界限上下文的最终一致性与事件驱动异步解耦。

## 8. 分层架构 (Layered Architecture)
采用经典的四层架构或六边形/洋葱圈架构（用户接口层 -> 应用层 -> 领域层 -> 基础设施层），使核心业务领域逻辑彻底独立于外部数据库、框架和协议。

