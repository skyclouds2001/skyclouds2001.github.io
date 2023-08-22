---
title: markdown
date: 2022-12-14 21:20:59
tags:
- Frontend
categories:
- [Frontend, Other]
thumbnail: https://tse3-mm.cn.bing.net/th/id/OIP-C.dX0BoWdOGYkaSunaRkTXTgHaEj
---

# 标题

```markdown

    # 一级标题
    
    ## 二级标题
    
    ### 三级标题
    
    #### 四级标题
    
    ##### 五级标题
    
    ###### 六级标题

```

使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推



# 段落

Markdown 段落没有特殊的格式，直接编写文字就好，段落的换行是使用两个以上空格加上回车

当然也可以在段落后面使用一个空行来表示重新开始一个段落



# 粗体斜体



```markdown

    *斜体*
    
    _斜体_
    
    **粗体**
    
    __粗体__
    
    ***斜粗体***
    
    ___斜粗体___

```



# 分割线删除线



```markdown

    ---------------------------------------------------------
    
    ---
    
    -----
    
    ___
    
    ---
    
    ---

```

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西


```markdown
    
    ~~删除线~~

```

如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线~~即可


```markdown
    
    <u>下划线</u>

```

下划线可以通过 HTML 的 `<u>` 标签来实现


# 脚注


```markdown
    
    脚注[^脚注类似这样]

```

脚注是对文本的补充说明


```markdown
    
    [^脚注类似这样]: 对对对

```


# 列表

```markdown
    
    * 无序列表
    * and

```

或者

```markdown

    + s
    + d

```

或者

```markdown

    - s
    - d

```

无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容

```markdown

    1. d
    2. e
    3. r

```

有序列表使用数字并加上 . 号来表示



列表嵌套只需在子列表中的选项前面添加四个空格即可

```markdown

    1. 1
        - ss
        - ss
        - e
    2.  w

```

# 引用

```markdown

    > def
    >
    > end
    >
    > > d
    > >
    > > e
    > >
    > > > get
    > > >
    > > > end

```

Markdown 区块引用是在段落开头使用 > 符号 ，然后后面紧跟一个空格符号

区块是可以嵌套的，一个 > 符号是最外层，两个 > 符号是第一层嵌套，以此类推



区块中使用列表，正常使用即可

列表中使用区块，需要在 > 前添加四个空格的缩进


```markdown


    * 第一项
    
      > d
      > 菜鸟教程
      > 学的不仅是技术更是梦想
    
    * 第二项
    
    * >
    
    
    * > d
      >
      > dd
    
    * d

```

# 代码

段落上的一个函数或片段的代码可以用反引号把它包起来

```markdown

    `printf()`

```

代码区块使用 ``` 包裹一段代码，并指定一种语言（也可以不指定）符

```markdown

    ```javascript
    document.getElementByTagName("video")[0].click()
    ```

```

# 链接

```markdown

    [链接](https://www.runoob.com)
    
    <https://www.runoob.com>
    
    [1]:https://www.runoob.com

```

可以通过变量来设置一个链接，变量赋值在文档末尾进行`[IT][1]`

# 图片

```markdown

    ![Oh](https://pics6.baidu.com/feed/72f082025aafa40f99cb5d63e6222f4679f019ca.jpeg?token=6d0ab25f666cf492c9ff83d037cb74e0)

```

# 表格

```markdown

    | b1   | b2   | b3   | b4   |
    | ---- | ---- | ---- | ---- |
    | d1   | d2   | d3   | d4   |
    
    | b1   | b2   | b3   | b4   |
    | :---- | ----: | :----: | ---- |
    | d1   | d2   | d3   | d4   |

```


