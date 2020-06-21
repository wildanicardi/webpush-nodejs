module.exports = {
  mongoURI: 'mongodb://localhost:27017/pushNode',
  privateKey: 'v7dubS1VyA_AgDM_6Zhf2cUwLjjq2kKrGsOC767gTBk' || process.env.VAPID_PRIVATE_KEY,
  publicKey: 'BDNncBVemGi3qzTYfRXW9_kUVRbvnCo5KKkq-6Lj1_QfiuAKW4cqAbBAvft7c7d8W2ob1rC-tLbVnoZsrvQf0bo' || process.env.VAPID_PUBLIC_KEY
}