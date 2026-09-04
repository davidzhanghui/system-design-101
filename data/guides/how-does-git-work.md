---
title: How Git Works
description: Understanding the inner workings of Git and its storage locations.
image: 'https://assets.bytebytego.com/diagrams/0202-git-commands.png'
createdAt: '2024-03-14'
draft: false
categories:
  - devtools-productivity
tags:
  - git
  - version control
titleZh: Git 底层是如何工作的？四层工作区与版本存储机制
---

![](https://assets.bytebytego.com/diagrams/0202-git-commands.png)

要真正精通 Git，首先必须清晰了解代码在物理和逻辑上到底存放在哪里。

很多人潜意识里认为 Git 只有两处位置：远程服务端（如 GitHub）和本地电脑。但实际上，Git 在本地划分了三个不同的管理区域。这意味着，我们的代码在整个版本控制生命周期中其实分布在 **四个主要位置**：

1. **工作区 (Working Directory)：** 我们在编辑器中实时修改、编写代码的本地物理目录。
2. **暂存区 (Staging Area / Index)：** 一个临时预备区，存放即将写入下一次提交的快照清单（通过 `git add` 收集）。
3. **本地仓库 (Local Repository)：** 存放在 `.git/` 目录中的本地版本数据库，包含了已提交（`git commit`）的历史记录和完整对象树。
4. **远程仓库 (Remote Repository)：** 位于中央服务器（如 GitHub、GitLab）的协作中心，用于团队间同步与分发代码。

绝大多数高频 Git 命令（如 `add`、`commit`、`push`、`fetch`、`checkout`、`reset`）本质上就是在这一组四层存储区域之间流转与比对文件的状态快照。

