# bill-front

这是一个基于vue的前端项目，主要实现了账单的添加、查询、统计功能。
![home][img_home]
![statistics_1][img_statistics_1]
![statistics_2][img_statistics_2]
![statistics_3][img_statistics_3]
![statistics_4][img_statistics_4]


## 技术栈

- axios ^0.18.0
- echarts ^4.2.0-rc.2
- element-ui ^2.4.11
- vue ^2.5.17
- vue-router ^3.0.2
- vuex ^3.0.1

## to do list

- 适配手机web浏览器
  - 分3个tap页，【首页】、【列表】、【统计】
  - 手机端的【列表】只显示4列，日期-显示月、日，金额，支付方式，账单类型
  - 去掉编辑、删除按钮，点击行弹出编辑模态框，按住行左滑显示删除按钮
  - 分页改外滑动刷新
  - 列表上面显示此次查询的总的花销
  - 统计页面貌似不能同时发送多个ajax请求，不知道为什么会失败，做并发请求的测试
  - 账单名称、账单类型、支付方式的排序方式需要优化，第一个选项是上一个账单的记录，后面的数据以访问次数由多到少排列

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Changelog
[Learn about the latest improvements][link_changelog].

[link_changelog]: https://github.com/scutuyu/bill/blob/master/CHANGELOG.md

[img_home]: https://github.com/scutuyu/bill/raw/master/images/home.png
[img_statistics_1]: https://github.com/scutuyu/bill/raw/master/images/statistics_1.png
[img_statistics_2]: https://github.com/scutuyu/bill/raw/master/images/statistics_2.png
[img_statistics_3]: https://github.com/scutuyu/bill/raw/master/images/statistics_3.png
[img_statistics_4]: https://github.com/scutuyu/bill/raw/master/images/statistics_4.png