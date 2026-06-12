# Deepseek 查询平台 - base华为watch3

<p align="center">
  <img src="https://img.shields.io/badge/平台-HarmonyOS%20Wearable-blue" alt="平台">
  <img src="https://img.shields.io/badge/语言-JavaScript%20(FA%20模式)-yellow" alt="语言">
  <img src="https://img.shields.io/badge/UI-%E6%B7%B1%E8%89%B2%20UI-purple" alt="UI风格">
  <img src="https://img.shields.io/badge/协议-MIT-green" alt="协议">
</p>

一款运行在华为 Watch 3 上的 DeepSeek 余额查询应用，抬腕即可查看账户余额。

## 功能特性

- **余额查询** - 在手表上实时查看 DeepSeek API 账户余额及币种
- **状态指示** - 三色圆点显示账户状态（绿色可用 / 橙色加载中 / 红色异常）
- **一键刷新** - 点击按钮手动获取最新余额数据
- **左右分栏** - 左侧蓝色鲸鱼 Logo + 右侧信息卡片的布局
- **深色主题** - 深蓝渐变背景，适配 AMOLED 屏幕，省电护眼
- **CSS Logo** - 鲸鱼图标纯 CSS 绘制，无需额外图片资源

## 截图

<p align="center">
  <img src="screenshots/watch-demo.png" alt="华为手表实机演示" width="300">
</p>

## 环境准备

| 依赖项 | 要求 |
|--------|------|
| IDE | [DevEco Studio](https://developer.huawei.com/consumer/cn/deveco-ide/) |
| SDK | HarmonyOS SDK，compileSdkVersion 8 及以上 |
| 设备 | 华为 Watch 3 或其他 HarmonyOS 可穿戴设备 |
| API Key | DeepSeek API Key（[点此获取](https://platform.deepseek.com/)） |

## 快速开始

### 第一步：克隆仓库

```bash
git clone https://github.com/hongyanmo/ds_detect.git
cd ds_detect
```

### 第二步：配置 API Key

> **重要提示：** 请勿将你的真实 API Key 提交到公开仓库。

打开以下文件：

```
entry/src/main/js/MainAbility/pages/index/index.js
```

找到第 36 行，将占位符替换为你自己的 DeepSeek API Key：

```javascript
// 修改前
'Authorization': 'Bearer YOUR_API_KEY_HERE'

// 修改后（替换为你的真实 Key）
'Authorization': 'Bearer sk-xxxxxxxxxxxxxxxxxxxxxxxx'
```

### 第三步：申请签名（必要）

华为 Watch 3 安装应用需要签名，否则无法部署到手表。有两种方式：

**方式一：DevEco Studio 自动签名（推荐）**

1. 用 DevEco Studio 打开项目
2. 菜单栏 → **File → Project Structure → Signing Configs**
3. 勾选 **Automatically generate signature**
4. 点击 **OK**，IDE 会自动为你生成调试签名

**方式二：华为云开发者网站申请**

1. 登录 [华为开发者联盟](https://developer.huawei.com/)
2. 进入 **管理中心 → 应用服务 → 应用分发**
3. 创建应用并申请签名证书
4. 下载签名文件，配置到项目的 `build-profile.json5` 中

> **注意：** 本仓库的 `build-profile.json5` 已被 `.gitignore` 忽略，不会泄露签名信息。请勿将签名文件提交到公开仓库。

### 第四步：编译并部署到手表

#### 方式一：使用 DevEco Studio（推荐）

1. 用 DevEco Studio 打开项目根目录
2. 通过 USB 数据线或无线调试连接你的华为 Watch 3
3. 点击顶部工具栏的 **Run** 按钮
4. 等待编译完成，应用将自动安装到手表上

#### 方式二：命令行编译

```bash
hvigor assembleHap
```

编译产物位于：

```
entry/build/default/outputs/default/entry-default-signed.hap
```

通过 `hdc` 工具手动安装到手表：

```bash
hdc install entry/build/default/outputs/default/entry-default-signed.hap
```

### 第五步：使用应用

1. 在手表应用列表中找到并打开「Deepseek 查询平台」
2. 应用启动后自动查询并显示余额
3. 点击「刷新」按钮可手动更新数据

## 项目结构

```
.
├── entry/src/main/
│   ├── config.json                    # 应用配置清单（权限、设备类型）
│   └── js/MainAbility/
│       ├── app.js                     # 应用生命周期
│       ├── i18n/                      # 国际化语言文件
│       │   ├── en-US.json
│       │   └── zh-CN.json
│       └── pages/index/
│           ├── index.js               # 核心逻辑（API 请求、数据解析）
│           ├── index.hml              # 页面模板（左右布局 + CSS 鲸鱼）
│           └── index.css              # 深色 UI 样式
├── build-profile.json5                # 构建与签名配置
├── package.json                       # 项目依赖
└── LICENSE                            # MIT 开源协议
```

## 技术栈

| 模块 | 技术 |
|------|------|
| UI 框架 | HarmonyOS HML + CSS + JS（FA 模式） |
| 构建工具 | hvigor 2.4.2 |
| 目标设备 | 华为 Watch 3（466x466 AMOLED 圆形屏幕） |
| 网络请求 | HarmonyOS `systemplugin.fetch` API |
| 后端接口 | DeepSeek `/user/balance` |
| Logo 实现 | 纯 CSS 绘制（无外部图片依赖） |

## UI 设计说明

本项目采用深色 UI 设计：

| 设计元素 | 实现方式 |
|----------|----------|
| 背景 | 深蓝到纯黑的纵向渐变 |
| 卡片 | 半透明毛玻璃质感 + 极细白色描边 |
| 配色 | 蓝 #0A84FF + 绿 #30D158 |
| 排版 | 标题细体 + 数据粗体的层次对比 |
| 状态指示 | 彩色圆点（绿/橙/红）+ 文字 |
| 按钮 | 胶囊形毛玻璃按钮 |
| 鲸鱼 Logo | 纯 CSS 定位绘制，蓝色身体 + 白色眼睛 |

## API 接口说明

本应用使用 DeepSeek 的余额查询接口：

```
GET https://api.deepseek.com/user/balance
```

**请求头：**

```
Authorization: Bearer <你的 API Key>
```

**返回示例：**

```json
{
  "balance_infos": [
    {
      "total_balance": 128.50,
      "currency": "CNY"
    }
  ],
  "is_available": true
}
```

| 字段 | 说明 |
|------|------|
| `total_balance` | 账户总余额 |
| `currency` | 货币类型（默认 CNY） |
| `is_available` | 账户是否可用 |

## 权限说明

| 权限 | 用途 |
|------|------|
| `ohos.permission.INTERNET` | 允许应用访问网络，向 DeepSeek API 发送请求 |

仅申请网络权限，不涉及其他敏感权限。

## 隐私与安全

- **API Key 安全：** 源码中仅保留占位符 `YOUR_API_KEY_HERE`，你的真实 Key 不会出现在代码仓库中。**请务必不要将 API Key 提交到公开仓库。**
- **无数据采集：** 本应用不会收集、存储或上传任何个人信息。
- **无本地存储：** 余额数据仅在屏幕上临时显示，不会写入本地文件。
- **无第三方服务：** 除 DeepSeek API 外，不连接任何第三方服务器。

## 常见问题

**Q: 应用显示「请求失败」怎么办？**

A: 请检查手表是否已连接网络，API Key 是否正确配置。

**Q: 应用显示「无网络模块」怎么办？**

A: 请确保手表系统为最新版本，低版本可能不支持 `systemplugin.fetch` API。

**Q: 余额显示为 `---` 是什么意思？**

A: 表示 API 返回数据中无余额信息，请确认 DeepSeek 账户状态。

**Q: 如何更换 API Key？**

A: 修改 `index.js` 中的 Key 后重新编译安装即可。

## 开发指南

### 修改鲸鱼样式

鲸鱼 Logo 由纯 CSS 绘制，编辑 `index.css` 中的 `.whale-*` 相关类即可调整：

```css
/* 修改鲸鱼颜色 */
.whale-body {
    background-color: #0A84FF;  /* 改为你喜欢的颜色 */
}
```

### 修改界面配色

```css
/* 修改余额颜色 */
.amount-integer {
    color: #30D158;  /* 系统绿 */
}

/* 修改背景渐变 */
.container {
    background: linear-gradient(180deg, #1a1a2e 0%, #0a0a0f 50%, #000000 100%);
}
```

### 修改标题文字

编辑 `index.hml` 中的标题区域：

```html
<text class="title-line1">Deepseek</text>
<text class="title-line2">查询平台</text>
```

## 协议

本项目基于 [MIT 协议](LICENSE) 开源。

## 致谢

- [DeepSeek](https://www.deepseek.com/) - 提供 AI API 服务
- [华为开发者文档](https://developer.huawei.com/consumer/cn/doc/) - HarmonyOS 可穿戴开发指南
