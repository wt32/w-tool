```json
{
    url: 'https://www.bilibili.com/video/BV1nJ411V7dU',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    },
    body: [
        {
        type: 'json',
        data: {
            'aid': 'aid',
            'bvid': 'bvid',
            'cid': 'cid',
            'jsonp': 'jsonp',
            'page': 'page',
            'platform': 'platform',
            'preload': 'preload',
            't': 't',
            'type': 'type'
        }
    },
    {
        type: 'formData',
        data: {
            'aid': 'aid',
            'bvid': 'bvid',
            'cid': 'cid',
            'jsonp': 'jsonp',
            'page': 'page',
            'platform': 'platform',
            'preload': 'preload',
            't': 't',
            'type': 'type'
        }
    }
    ],
    query: {
        'access_key': 'access_key',
        'appkey': 'appkey',
        'build': 'build',
        'mobi_app': 'mobi_app',
        'platform': 'platform',
        'ts': 'ts',
        'sign': 'sign'
    },
}
```


使用`fetch`API进行POST请求时，可以指定不同的`Content-Type`来发送不同类型的数据。以下是一些常用的传输类型和格式，以及如何使用`fetch`进行示例说明：

### 1. application/x-www-form-urlencoded

```javascript
fetch('https://example.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'key1=value1&key2=value2'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 2. multipart/form-data

对于`multipart/form-data`，你需要构建一个`FormData`对象，并使用`fetch`发送它。`FormData`对象会自动设置正确的`Content-Type`和边界。

```javascript
const formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');
formData.append('file', fileInput.files[0]);

fetch('https://example.com/api/data', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 3. application/json

```javascript
fetch('https://example.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key1: 'value1', key2: 'value2' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 4. text/plain

```javascript
fetch('https://example.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: 'This is plain text data.'
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 注意事项

- 当使用`fetch`发送请求时，`headers`中的`Content-Type`需要根据你发送的数据类型进行设置。
- 对于`multipart/form-data`，不需要手动设置`Content-Type`，因为`FormData`对象会自动处理。
- `body`参数是你要发送的数据，对于`application/x-www-form-urlencoded`和`application/json`，你需要将数据转换为字符串。
- `fetch`返回的`Promise`会解析服务器的响应。如果响应是JSON，使用`.json()`方法；如果是文本，使用`.text()`方法。

这些示例展示了如何使用`fetch`API发送不同格式的数据。根据你的具体需求，选择合适的传输类型和格式。


```json
{
  "pages": [
    {
      "pageId": "page1",
      "pageTitle": "用户信息页面",
      "requests": [
        {
          "requestId": "req1",
          "requestName": "获取用户列表",
          "method": "GET",
          "url": "/api/users",
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer {token}"
          },
          "params": {
            "limit": 10,
            "offset": 0
          },
          "body": null,
          "response": {
            "successStatus": 200,
            "successMessage": "用户列表获取成功",
            "errorStatus": 500,
            "errorMessage": "服务器错误"
          }
        },
        {
          "requestId": "req2",
          "requestName": "创建新用户",
          "method": "POST",
          "url": "/api/users",
          "headers": {
            "Content-Type": "application/json"
          },
          "params": {},
          "body": {
            "username": "newuser",
            "email": "newuser@example.com"
          },
          "response": {
            "successStatus": 201,
            "successMessage": "用户创建成功",
            "errorStatus": 400,
            "errorMessage": "请求参数错误"
          }
        }
      ]
    },
    {
      "pageId": "page2",
      "pageTitle": "订单管理页面",
      "requests": [
        {
          "requestId": "req3",
          "requestName": "获取订单列表",
          "method": "GET",
          "url": "/api/orders",
          "headers": {
            "Content-Type": "application/json"
          },
          "params": {
            "status": "pending"
          },
          "body": null,
          "response": {
            "successStatus": 200,
            "successMessage": "订单列表获取成功",
            "errorStatus": 404,
            "errorMessage": "订单未找到"
          }
        }
      ]
    }
  ]
}
```