---
title: How does HTTPS work?
description: Learn how HTTPS encrypts data for secure communication over the internet.
image: 'https://assets.bytebytego.com/diagrams/0220-how-does-https-work.png'
createdAt: '2024-03-13'
draft: false
categories:
  - security
tags:
  - HTTPS
  - Encryption
titleZh: HTTPS 是如何工作的？从握手、证书到混合加密全流程
---

![](https://assets.bytebytego.com/diagrams/0220-how-does-https-work.png)

超文本传输安全协议（HTTPS）是 HTTP 协议的安全扩展版本。HTTPS 借助传输层安全性协议（TLS/SSL）对数据进行加密传输。即便黑客在公网中截获了通信报文，也只能得到无法破解的二进制密文。

## 数据是如何加密与解密的？

* **第 1 步：** 客户端（浏览器）与服务端建立基础的 TCP 连接（三次握手）。
* **第 2 步：** 客户端发送 `Client Hello`，包含客户端支持的加密套件列表（Cipher Suites）及最高的 TLS 版本号。服务端回复 `Server Hello` 选定双方兼容的加密算法和协议版本。随后服务端向客户端发送数字证书（SSL Certificate），证书中包含公钥、域名、颁发机构（CA）及有效期等信息。客户端在本地通过根证书链校验该证书的合法性。
* **第 3 步：** 验证证书合法后，客户端生成一个临时的对称密钥（会话密钥 Session Key），并使用证书中的公钥对其加密后发送给服务端。服务端使用服务器私钥解密，安全获取该会话密钥。
* **第 4 步：** 此时客户端与服务端均持有相同的会话密钥（对称加密）。后续所有的业务请求和响应数据均使用该会话密钥在安全的双向通信隧道中高速加解密传输。

## 为什么 HTTPS 在后续数据传输时切换为对称加密？

主要基于以下两大现实考量：

1. **安全性（双向通信需求）：** 非对称加密通常只能单向加密（用公钥加密只有私钥能解）。如果服务端向客户端回传数据时也用公钥/私钥体系，公钥是公开的，任何中间人都能解密。
2. **计算资源开销与性能：** 非对称加密涉及大数模幂运算，CPU 计算开销大，延迟高。而对称加密（如 AES-GCM、ChaCha20）性能极高且有硬件加速指令集支持，非常适合海量长会话的数据高速流转。

