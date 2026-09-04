---
title: DeepSeek 1-Pager
description: Explore DeepSeek's cost-effective AI model and its innovative R1 release.
image: 'https://assets.bytebytego.com/diagrams/0164-deepseek.png'
createdAt: '2024-03-11'
draft: false
categories:
  - ai-machine-learning
tags:
  - AI Models
  - DeepSeek
titleZh: 一页纸读懂 DeepSeek：低成本 MoE 与 R1 推理大模型架构
---

![DeepSeek 架构图解](https://assets.bytebytego.com/diagrams/0164-deepseek.png)

DeepSeek 以极高的成本效率震惊了全球人工智能领域，其最终训练成本仅约 600 万美元。在 2025 年 1 月，DeepSeek 发布了专注于复杂逻辑推理的大语言模型 **DeepSeek-R1**。

该模型的发布迅速引发全球关注，登顶苹果 App Store 免费榜首位。

## 核心算法突破：GRPO 强化学习

大多数传统的大语言模型高度依赖于有监督微调（Supervised Fine-Tuning, SFT），即通过拟合大规模人工标注的数据集进行学习，这种方式成本高昂且上限明显。

DeepSeek-R1 通过引入**群组相对策略优化（Group Relative Policy Optimization, GRPO）**突破了上述瓶颈。GRPO 是一种无价值模型（Critic-free）的强化学习技术，通过在同一提示词上下文中对比生成的多个候选答案并计算相对优势，大幅降低了推理探索的算力开销并显著提升了自发思考链（CoT）推理能力。

## DeepSeek-R1 架构亮点一览：

- **MoE（混合专家模型）稀疏激活：** DeepSeek-R1 拥有高达 6710 亿（671B）的总参数量，但在每次推理任务中仅稀疏激活约 370 亿（37B）参数，兼顾了大模型的容量上限与极致的吞吐性能。
- **硬件资源利用极致优化：** 研发团队在软硬件协同层面（如 MLA 多头潜在注意力机制、DualPipe 双向流水线并行）进行了深度定制。
- **超大规模预训练基底：** 在跨越 52 种语言的 14.8 万亿（14.8T）Tokens 上进行了扎实的高质量预训练。
- **超高能效比算力投入：** 训练全程仅耗费约 2000 块英伟达 GPU。相比之下，主流闭源模型（如 GPT-4 阶段）往往动用数万张 GPU 持续数月。
- **性价比优势显著：** 推理 API 定价与算力成本比竞品低 85% ~ 90% 以上。
- **全面开源与生态共享：** 模型权重和架构采用宽松的 MIT 许可证开源，极大地推动了全球开源 AI 生态的繁荣。
