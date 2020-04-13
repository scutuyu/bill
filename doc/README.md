# redis 伪分布式集群搭建脚本使用说明

## 安装redis

确保已经下载了redis(wget http://download.redis.io/releases/redis-5.0.7.tar.gz)

确保环境中linux环境已经正确安装了tcl8.6.1及以上版本(yum update tcl or wget http://downloads.sourceforge.net/tcl/tcl8.6.1-src.tar.gz;tar -zxvf tcl8.6.1-src.tar.gz;cd tcl8.6.1/unix;./configure/make && make install)

当前的目录结构如下：

```
.
├── install.sh
├── redis-5.0.7.tar.gz
├── start-cluster.sh
└── stop-cluster.sh
```
1. ./install.sh(安装完redis集群，就自动启动了，默认启动本机6个redis实例，端口分别是6379、6380、6381、6382、6383、6384)
2. ./stop-cluster.sh
3. ./start-cluster.sh
