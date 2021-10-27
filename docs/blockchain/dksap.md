## 区块链隐私交易之 DKSAP 协议

### 为什么需要隐私交易

假如 Bob 需要接收 Alice 支付的 1 BTC，通过比特币钱包生成账户，将账户公钥发送给 Alice。那么明文交易数据如下所示：
```
message = 
{
  "from":"16ftSEQ4ctQFDtVZiUBusQUjRrGhM3JYwe", // Alice
  "to":"3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r",	 // Bob
  "amount":"1 BTC"
}
```

由于区块链的不可逆性，该数据会永久的保存在区块中，一旦 Bob 的公钥 3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r 被泄漏，那么可以通过查询区块的交易数据，找出 Bob 的所有交易记录，交易时间、交易方、交易金额被查的清清楚楚明明白白。

你可能会问 Bob 的公钥是怎么泄漏的？其实有很多途径。

* Bob 是普通用户，使用某钱包 APP 发送交易，该 APP 会将 Bob 公钥、手机信息或手机号上传至服务器。
* Bob 是程序员，使用区块链 SDK，将交易发送至区块链节点，该节点会记录当前交易发起方的 IP 地址。
* Bob 是交易所用户，使用交易所平台进行交易，该交易所会记录 Bob 邮箱地址、手机号、 KYC 信息。
* Bob 在微信群聊中误操作发送了自己的公钥，被群成员通过区块链浏览器找到所有交易记录。


### DKSAP 协议

为了解决上述问题，2014 年 rynomster/sdcoin 发明了一种新的隐私交易协议 DKSAP。DKSAP 全称 Dual-Key Stealth Address Protocol，自公布以来，已经在众多区块链项目中落地(Monero)。它的特点在于账户需要生成两组公私钥对，分别为 "scan key pair"、"spend key pair"
，每笔交易的接收方都是加密的，无法关联到某个区块链账户。

我们还是以 Alice 向 Bob 支付 BTC为例，具体细节如下：

1) Bob 生成两组公私钥对，分别为 scan key pair = (s, S = G * s )，spend key pair = (b, B = G * b)，对外公布公钥 S 和 B

2) Alice 生成一组临时的公私钥对 (r, R = G * r)，将公钥 R 与交易明文数据一起发送至区块链节点

3) 通过 ECDH 算法，Alice 和 Bob 可以分别计算出同一个共享密钥 c = Hash(r * S) = Hash(r * G * s) = Hash(s * r * G) = Hash(r * R)

4) Alice 计算 P = c * G + B = c * G + b * G = (c + b) * G，其中公钥 P 为 BTC 接收方，将公钥 P 与交易明文数据一起发送至区块链节点

5) Bob 实时检查区块链节点的交易数据，获取每一笔隐私交易的 R，计算出共享密钥 c，再叠加 scan key 计算出 P'，只要该公钥 P' 与交易数据中的 P 相等，说明该交易的接收方为 Bob 本人。因为 P = (c + b) * G，所以公钥 P 对应的私钥为 c + b

6) 只有 Bob 拥有私钥 b，同时也可以计算出共享密钥 c，所以只有 Bob 为该 BTC 的所有人


如果 Bob 觉得检查区块链数据麻烦，可以将 s(scan private key)  和 B(spend public key) 共享给第三方服务商，由该服务商负责执行步骤 5) 检查隐私交易，在有新的接收方为 Bob 的交易时触发通知。与此同时，由于服务商不知道 Bob 的私钥 b(spend private key)，也无法私下把 BTC 转走。


参考资料:

[Blockchain Privacy-Enhancing Technology Series](https://hackernoon.com/blockchain-privacy-enhancing-technology-series-stealth-address-i-c8a3eb4e4e43)
