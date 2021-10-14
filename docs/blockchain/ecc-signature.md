## 区块链的基石 - ECDSA 签名、验签

### 前言

ECDSA 全称 Elliptic Curve Digital Signature Algorith，是基于 ECC 的数字签名算法，在比特币、以太坊等区块链网络中大量使用。每一笔交易执行之前都必须进行权限校验，以确保该交易是由账户对应的私钥签发。256 位的 ECDSA 签名可以达到 3072 位 RSA 签名的安全性。

上一篇文章[《区块链的基石 - ECC 椭圆曲线密码学》](./ecc-encrypt-decrpyt.md)中，我们知道了在预先定义的 secp256k1 椭圆曲线上，私钥为从起始点执行 dot 函数的次数，公钥为结束点的坐标值。假设起始点为 G(eneratorPoint)，随机数为 r(andom)，公钥为 P(ublicKey)。
公式可以表示为：
```
P = G * r
```

其中 secp256k1 椭圆曲线对应的 256 位随机数最大值为
```
n = 115792089237316195423570985008687907852837564279074904382605163141518161494337
```

### 生成签名

假如现在 Alice 想要给 Bob 转账 100，交易明文为：
```
message = 
{
  "from":"Alice",
  "to":"Bob",
  "amount":"100"
}
```

那么区块链节点如何辨别这个交易的真伪，目前所有区块链网络都是由账户私钥进行签名，节点使用公钥对签名进行验证，只有验证通过才会执行转账。

1) Alice 随机生成一个私钥 privKey ，并计算公钥 pubKey = privKey * G

2) Alice 使用 hash 算法如 SHA256 对交易明文进行 hash：h = sha256(message)

3) Alice 生成一个随机数 k，计算点 R = k * G, 取点 R 的 x 轴值: r = R.x

4) 计算签名：s = k^-1(mod n) * (h + r * privKey)
  * k^-1 (mod n) 为随机数 k 的模逆元，即 k 与 k^-1 互为模 n 的乘法逆元，(k * k^-1) (mod n) = 1 (mod n)
  * [关于乘法逆元](https://mp.weixin.qq.com/s/CHnTENZl2lqCNryuJ18b0A)

5) 返回签名 {r, s}   

6) 将交易明文和签名发送给区块链节点
```
{
  message:{
    "from":"Alice",
    "to":"Bob",
    "amount":"100"
  },
  signature:{
    r:r,
    s:s
  }
}
```

### 验证签名

1) Bob 使用同样的 hash 算法对交易明文进行 hash，h = sha256(message)

2) Bob 计算签名的模逆元：s1 = s^-1 (mod n)

3) Bob 计算签名生成过程中的随机数对应的点，R' = (h * s1) * G + (r * s1) * pubKey

4) 取点 R' 的 x 轴值：r' = R'.x

5) 对比 r' 是否等于签名中的 r，如果相等则验证通过


具体的换算过程如下所示：
```
R' = (h * s1) * G + (r * s1) * pubKey
   = (h * s1) * G + (r * s1) * privKey * G
   = h * s1 * G + r * s1 * privKey * G
   = (h + r * privKey) * s1 * G


s1 = s^-1 (mod n)   
   = (k^-1 * (h + r * privKey))^-1 (mod n)
   = k * ((h + r * privKey))^-1 (mod n)
```

将 s1 替换进 R'中，继续换算
```
R' = (h + r * privKey) * s1 * G
   = (h + r * privKey) * k * ((h + r * privKey))^-1 (mod n) * G
   = ((h + r * privKey) * (h + r * privKey)^-1) (mod n)) * k * G
   = (1 (mod n)) * k * G
   = k * G
```

因为 n 已经设置为 256 位随机数的最大值，所以 1 (mod n) = 1。

R' 的最终运算结果为签名过程中 R 点的值，因此如果 R'.x = R.x，则验证通过，该签名由 PubKey 对应的私钥 PrivKey 签发。


参考资料:

[ECDSA: Elliptic Curve Signatures](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages)