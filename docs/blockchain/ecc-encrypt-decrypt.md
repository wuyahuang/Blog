## 区块链的基石 - ECC 椭圆曲线加解密


### 前言

上一篇文章[《区块链的基石 - ECC 椭圆曲线密码学》](./ecc-encrypt-decrpyt.md)中，我们知道了在预先定义的 secp256k1 椭圆曲线上，私钥为从起始点执行 dot 函数的次数，公钥为结束点的坐标值。假设起始点为 G(eneratorPoint)，随机数为 r(andom)，公钥为 P(ublicKey)。
公式可以表示为：
```
P = G * r
```

### 简单的加解密模式

假如现在 Bob 想要给 Alice 传输机密信息，经过对比以后，选定 ECC secp256k1 进行加解密处理。

1）Alice 随机生成一个私钥 r1 ，并计算公钥 P = r1 * G

2）Alice 将椭圆曲线 secp256k1 、基点 G 和公钥 P 发送给 Bob

3）Bob 接收到信息后，将待传输的明文数据编码到椭圆曲线 secp256k1 上的一个点 M，并产生一个随机数 r2

4）Bob 计算点 C1 = M + r2 * P, C2 = r2 * G

5）Bob 将 C1、C2 传给 Alice

6）Alice 接收到 C1 和 C2 后，利用自己的私钥 r1 计算 C1 - r1 * C2 可得 M，具体为：
```
C1 - r1 * C2 = M + r2 * P - r1 * (r2 * G)
             = M + r2 * P - r2 * (r1 * G)
             = M + r2 * P - r2 * P 
             = M
```

7）Alice 对点 M 进行解码即可获得明文

通信过程中，Alice 向 Bob 公开传输的信息为椭圆曲线 secp256k1、基点 G 和公钥 P，通过 G 和 P 求解私钥 r1 是几乎不可能的。而 Bob 向 Alice 公开传输的信息为密文 C1 和 C2，求解 r2 或者 M 也是几乎不可能的。



### 混合型加解密模式

由于 ECC 加解密效率很低，不适合大量数据的场景，我们可以设计一个 非对称加密 + 对称加密 的混合型加解密方案。

加密过程如下图所示：

![avatar](../../assets/ecc/ecc_6.png)

解密过程如下图所示：

![avatar](../../assets/ecc/ecc_7.png)

对称加解密算法效率高，但是在公开传输过程中，明文传输的安全性极低。非对称加解密效率低，但是在公开传输过程中安全性极高。结合两个算法的优势，该混合型加解密方案堪称完美。
如图所示，我们使用同一个对称密钥对文件进行加解密，同时对 对称密钥 进行加密，在公开传输过程中，只有加密后的文件和对称密钥，是无法进行破解的。

假如现在 Bob 又要给 Alice 传输机密信息，不过现在是一个文件，简单的 ECC 加解密模式效率低。经过对比以后，选定 混合型加解密模式 进行加解密处理。

1）Alice 随机生成一个私钥 r1 ，并计算公钥 P1 = r1 * G

2）Alice 将椭圆曲线 secp256k1 、基点 G 和公钥 P1 发送给 Bob

3) Bob 随机生成一个私钥 r2，并计算公钥 P2 = r2 * G

4) Bob 计算对称密钥 s = P1 * r2 = (r1 * G) * r2 = r1 * r2 * G

5) Bob 使用 s 对文件进行加密，并将加密后的文件、公钥 P2 发送给 Alice

6) Alice 计算对称密钥 s = P2 * r1 = (r2 * G) * r1 = r1 * r2 * G

7) Alice 使用对称密钥 s 解密文件


Alice 和 Bob 在计算对称密钥过程中，实际上使用的是同一个计算式，因此结果也是一致的。
```
s = P1 * r2 = P2 * r1 = r1 * r2 * G
```

该混合型加解密模式实际上也符合 ECDH 规范。

```
ECDH 全称是椭圆曲线迪菲-赫尔曼秘钥交换(Elliptic Curve Diffie–Hellman key Exchange)，
主要是用来在一个不安全的通道中建立起安全的共有加密资料，
一般来说交换的都是私钥，这个密钥一般作为“对称加密”的密钥而被双方在后续数据传输中使用。
```

参考资料:

[ECC Encryption / Decryption](https://cryptobook.nakov.com/asymmetric-key-ciphers/ecc-encryption-decryption)

[Lumino仪式技术解析（一）——椭圆曲线](https://mp.weixin.qq.com/s/yqBeu8XqjBrQk9HYHP55-A)
