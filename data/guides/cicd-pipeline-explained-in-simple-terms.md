---
title: CI/CD Pipeline Explained in Simple Terms
description: 'Learn about CI/CD pipelines, their stages, and benefits in software delivery.'
image: 'https://assets.bytebytego.com/diagrams/0140-ci-cd-pipeline.png'
createdAt: '2024-03-16'
draft: false
categories:
  - devops-cicd
tags:
  - CI/CD
  - DevOps
titleZh: 用通俗语言解释持续集成与持续交付（CI/CD）流水线
---

![CI/CD 流水线示意图](https://assets.bytebytego.com/diagrams/0140-ci-cd-pipeline.png)

## 融入 CI/CD 的现代软件开发生命周期 (SDLC)

软件开发生命周期（SDLC）通常由多个核心阶段构成：需求、研发、测试、发布与运维维护。CI/CD 的引入旨在通过高度自动化串联这些阶段，实现更加高频、可靠的软件交付。

当工程师将代码推送到 Git 仓库时，自动化流水线立即被触发并执行编译、代码规范检查与端到端自动化测试。若测试全绿通过，制品被自动部署到预发布（Staging）或生产（Production）环境；若遇到错误，流水线即时打断并通知开发者快速修复，极大降低了生产事故风险。

## 持续集成 (CI) 与 持续交付/部署 (CD) 的区别

* **持续集成（CI - Continuous Integration）：** 侧重于代码提交后的自动化构建、单元测试与集成测试，鼓励高频次小步提交，及早暴露并修复接口冲突。
* **持续交付（CD - Continuous Delivery）：** 侧重于自动化发布就绪流程，确保任意时刻代码库都处于可随时发布状态，通常包含自动化打包部署到预发布环境与自动化冒烟测试。
* **持续部署（CD - Continuous Deployment）：** 在持续交付的基础上更进一步，任何通过全部自动化测试门禁的代码变更都直接自动上线到生产环境，无需人工点击审批。

## 经典 CI/CD 流水线阶段拆解

1. **代码提交 (Commit)：** 开发者向代码仓库发起分支合并请求（PR/MR）；
2. **触发构建 (Build)：** CI 触发器捕获事件，拉取最新代码并拉起构建容器；
3. **测试验证 (Test)：** 并发执行代码静态分析（Linter）、单元测试（Unit Test）与集成测试（Integration Test）；
4. **制品打包 (Package)：** 构建标准化的 Docker 镜像或二进制包并推送到私有镜像仓库；
5. **预发部署 (Staging)：** 部署至预发/测试环境并运行自动化端到端测试（E2E）；
6. **生产上线 (Production Deploy)：** 采用蓝绿发布（Blue-Green）或金丝雀灰度发布（Canary）策略无感上线生产。

