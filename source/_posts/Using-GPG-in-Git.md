---
title: 在 Git 中使用 GPG 密钥
date: 2024-04-28 14:37:49
tags:
  - Frontend
  - Other
categories:
  - Frontend
  - Other
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2024-04-28 06:37:49/Using GPG in Git.html'
mathJax: false
---

## 生成及查看 GPG 密钥

1. 下载并安装 GPG 命令行工具（需根据操作系统来选择适合的版本下载）
2. 运行如下命令生成 GPG 密钥对

    ```Bash
    gpg --full-generate-key
    ```

3. 在生成时，会依次提示选择要生成的密钥类型、密钥大小、密钥有效时长及确认选择，以上均选择默认值即可；随后需输入用户 ID 信息，需保证信息与 Github 保存的信息一致；接着需输入一个安全密码；最后完成生成过程
4. 完成生成后，可以运行如下命令查看已生成的 GPG 密钥

    ```Bash
    gpg --list-secret-keys --keyid-format=long
    ```
   
5. 从已生成的 GPG 密钥中选择一个，并复制密钥 ID；例如，如下示例的密钥 ID 为 `3AA5C34371567BD2`

    ```Plain Text
    /Users/hubot/.gnupg/secring.gpg
    ------------------------------------
    sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
    uid                          Hubot <hubot@example.com>
    ssb   4096R/4BB6D45482678BE3 2016-03-10
    ```

6. 运行如下命令生成 GPG 密钥的公钥文本，需将 `<GPG-ID>` 替换为对应的 GPG 密钥 ID

    ```Bash
    gpg --armor --export <GPG-ID>
    ```

7. 复制生成结果，即以 `-----BEGIN PGP PUBLIC KEY BLOCK-----` 开头，以 `-----END PGP PUBLIC KEY BLOCK-----` 结尾的部分

## 添加 GPG 密钥至 Github

1. 前往 <https://github.com/settings/keys> 页面，或通过*个人资料照片-设置-SSH 和 GPG 密钥*前往对应页面
2. 点击*新建 GPG 密钥*，在标题字段输入 GPG 密钥的名称，在密钥字段中输入复制的生成的 GPG 密钥的公钥文本，最后点击*添加 GPG 密钥*
3. 完成后续身份验证等步骤以完成操作

## 添加 GPG 密钥至 Git

1. 运行如下命令以在 Git 中设置 GPG 签名主键

    ```Bash
    git config --global user.signingkey <GPG-ID>
    ```

2. 运行如下命令指定安装的 GPG 命令行工具的路径

    ```Bash
    git config --global gpg.program <path/to/gpg>
    ```

3. 可以运行如下命令以配置默认对所有提交使用 GPG 签名

    ```Bash
    git config --global commit.gpgsign true
    ```

## 参见

* [生成新 GPG 密钥 - GitHub 文档](https://docs.github.com/zh/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
* [将 GPG 密钥添加到 GitHub 帐户 - GitHub 文档](https://docs.github.com/zh/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
* [将您的签名密钥告知 Git](https://docs.github.com/zh/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)
* [GnuPG 工具](https://www.gnupg.org/index.html)
