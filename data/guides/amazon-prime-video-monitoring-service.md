---
title: Amazon Prime Video Monitoring Service
description: 'Learn how Amazon Prime Video monitoring saved 90% cost by moving to monolith.'
image: 'https://assets.bytebytego.com/diagrams/0328-serverless-to-monolithic.jpeg'
createdAt: '2024-02-23'
draft: false
categories:
  - software-architecture
tags:
  - Microservices
  - System Design
titleZh: 架构反思：Amazon Prime Video 监控服务为何从 Serverless 转回单体并降低 90% 成本？
---

![](https://assets.bytebytego.com/diagrams/0328-serverless-to-monolithic.jpeg)

为什么亚马逊 Prime Video 的视频监控服务会**从 Serverless/分布式微服务回退到单体架构（Monolith）**？它为什么反而能降低 90% 的计算与带宽成本？

上图展示了这一经典架构迁移前后的技术全貌对比。

## 业务背景：Prime Video 音视频质检服务

Prime Video 需要实时监控成千上万路直播流的播放质量。监控系统需自动分析视频流并在秒级识别出画面花屏（Block corruption）、视频卡顿假死（Video freeze）及音画不同步等质量缺陷。

该服务的处理链路由三大步骤构成：媒体转码解析（Media Converter）、缺陷检测算法（Defect Detector）以及实时事件告警（Notification）。

## 旧架构（Serverless）的致命成本瓶颈

旧架构完全建立在 AWS Lambda 和 AWS Step Functions 之上。在项目孵化初期，这种 Serverless 方案可以极快上线。然而当业务流量指数级暴涨时，它遭遇了极其昂贵的开销陷阱：

1. **工作流编排计费昂贵：** AWS Step Functions 按照状态转移次数收费，而海量视频流切片监控每秒产生数千次状态转移，费用极其高昂；
2. **分布式节点间的大量跨网络传输与 S3 存储开销：** 各个独立的 Lambda 函数之间需要通过 Amazon S3 暂存并传递巨额的中间切片视频数据。下载与网络传输在流量巨大时变成了吞金兽。

## 迁移到单体：降低 90% 成本的秘密

Prime Video 团队重新设计了架构，将媒体格式转换与缺陷检测两个核心计算密集型组件打包部署在**同一个 EC2 物理进程（同一个单体服务内存中）**：
- 节点间的数据传递直接在本地进程内存中完成，无需再经由网络上传下载 S3；
- 去除了按次计费的 Step Functions 分布式状态编排；
- 最终实现了惊人的 **90% 基础设施成本削减**。

## 亚马逊技术领袖的反思与启示

* **Amazon CTO Werner Vogels：** “构建可演进的软件系统是一种工程策略，而不是一门盲目的宗教。始终以开放的心态重新审视你的系统架构是每个工程师的必修课。”
* **前亚马逊副总裁 Adrian Cockcroft：** “我提倡‘优先尝试 Serverless（Serverless First）’，但我绝不主张‘唯 Serverless 论（Serverless Only）’。”

微服务与分布式架构固然强大，但也必然伴随着网络延迟、分布式一致性、网络带宽开销以及运维复杂性等高昂成本。根据业务负载与数据传输特征，理性在单体（Monolith）与微服务（Microservices）之间取得平衡，才是系统设计的最高境界。

