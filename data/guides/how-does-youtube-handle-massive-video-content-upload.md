---
title: How YouTube Handles Massive Video Uploads
description: Explore YouTube's architecture for handling massive video uploads.
image: 'https://assets.bytebytego.com/diagrams/0425-yt-massive-upload.png'
createdAt: '2024-02-23'
draft: false
categories:
  - real-world-case-studies
tags:
  - Architecture
  - Scalability
titleZh: YouTube 如何高效处理每分钟 500+ 小时的海量视频上传？
---

![](https://assets.bytebytego.com/diagrams/0425-yt-massive-upload.png)

YouTube 平均每分钟需要承载并处理超过 500 小时的海量视频上传。它究竟是如何在保证极高画质的同时实现快速转码交付的？

上图展示了 YouTube 在 2021 年公开的定制硬件视频编码架构创新。

## 1. 传统软件编码的瓶颈

YouTube 的核心任务是将创作者上传的原始无损或各种格式的高码率视频，转码成数十种不同分辨率与压缩比率的流媒体格式（从手机端 480p/720p、笔记本电脑 1080p 到高分辨率 4K/8K 电视），以便自适应各种网络和终端设备播放。

随着全球用户上传量的几何级激增（尤其是居家隔离期间），纯依靠通用 CPU 服务器进行软件转码变得极度缓慢且计算电力成本极其高昂。这意味着业界迫切需要一种专门针对视频编解码定制的“专用计算大脑”。

## 2. YouTube 的专属转码芯片 —— VCU

正如深度学习领域采用 GPU/TPU 取代传统 CPU 计算一样，YouTube 针对数据中心超大规模视频处理研发了专属硬件加速芯片：**VCU（Video transCoding Unit，视频转码单元）**。

在架构层面：
- 每一个专用计算集群由海量配有 VCU 加速卡的定制服务器组成；
- 每台服务器搭载多个加速托架（Accelerator Trays），每个托架插入多块 VCU 加速卡；
- 芯片内部硬化了业界先进的高效编码器（Encoder）、解码器（Decoder）和缩放引擎；
- VCU 集群以极低功耗高效并发输出各档位分辨率的流媒体文件，并持久化写入分布式云存储系统。

这项硬件芯片级自研架构相比之前已经深度优化的通用系统，带来了 **20 到 33 倍的计算效能跃升**。

