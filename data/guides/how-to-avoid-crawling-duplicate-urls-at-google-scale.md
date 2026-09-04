---
title: How to Avoid Crawling Duplicate URLs at Google Scale?
description: Learn how to avoid crawling duplicate URLs at Google scale.
image: 'https://assets.bytebytego.com/diagrams/0089-bloomfilter.png'
createdAt: '2024-02-27'
draft: false
categories:
  - software-development
tags:
  - Bloom Filter
  - Web Crawling
titleZh: 如何在 Google 规模的海量网页爬取中避免重复 URL？布隆过滤器应用
---

![](https://assets.bytebytego.com/diagrams/0089-bloomfilter.png)

在像 Google 这样拥有数十万亿级别网页的海量搜索引擎爬虫系统中，如何快速判断一个新发现的 URL 是否已经被抓取过，是系统设计的经典高并发高容量难题。

## 三种排重方案的权衡

* **方案 1：纯内存哈希集合（Hash Set）**
  查询时间复杂度为 $O(1)$，极其高效，但由于每个 URL 字符串占用大量字节，面对千亿量级 URL，内存消耗将达到数 TB 到数十 TB，成本极其高昂且单机无法承受。
* **方案 2：直接持久化落库检索（Database）**
  将 URL 存入数据库或 NoSQL。每次抓取前先查询数据库，但百亿级爬取的高并发写与高频点查会使底层数据库不堪重负，带来严重的磁盘 I/O 瓶颈。
* **方案 3：布隆过滤器（Bloom Filter —— 工业界最佳方案）**
  布隆过滤器由 Burton Howard Bloom 于 1970 年提出，是一种以极小空间开销判定集合元素归属的**概率型数据结构（Probabilistic Data Structure）**。

## 布隆过滤器的判定特征

* **判定为“否”（False）：** 该元素**绝对不在**集合中（100% 准确，绝无假阴性 False Negative）。
* **判定为“是”（True）：** 该元素**可能存在**于集合中（存在微小的假阳性 False Positive / 误报率）。

## 算法运作机制

布隆过滤器的核心是一个很长的二进制位向量（Bit Array / Bit Vector）和一组独立的哈希函数（$H_1, H_2, \dots, H_k$）：

1. **添加元素：** 将待加入的 URL 依次输入 $k$ 个独立的哈希函数，计算出 $k$ 个数组下标，将位向量中对应位置的 Bit 均置为 `1`。
2. **查询排重：** 当检索某个 URL 是否已存在时，使用同样的 $k$ 个哈希函数计算哈希位。**只要有任意一个 Bit 为 `0`，则该 URL 必定未被抓取过**；若所有对应的 Bit 全为 `1`，说明大概率已经抓取过，可以直接跳过或结合备用存储进一步精细校验。

哈希函数的选择极其关键，需要计算迅速且分布均匀（业界常用 MurmurHash、CityHash、xxHash 等）。RedisBloom、HBase、Apache Spark 和 InfluxDB 等底层系统均广泛使用布隆过滤器来规避无效磁盘 I/O。

