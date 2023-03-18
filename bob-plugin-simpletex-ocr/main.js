function supportLanguages() {
  return ['auto'];
}

function ocr(query, completion) {
  const image = query.image;
  const postUrl = 'https://server.simpletex.cn/api/latex_ocr/v1';
  const headers = { 'token': $option.token };
  const files = [{ // 请求文件
    data: image,
    name: "file",
    filename: "bob.png",
    'content-type': "image/png"
  }];
  let res = $http.post({
    url: postUrl,
    header: headers,
    files: files
  });
  res
    .then((resp) => completion({
      result: {
        texts: [{ text: resp?.data?.res?.latex }],
      }
    }))
    .catch((error) => {
      $log.error(JSON.stringify(error));
      completion({
        error: {
          type: 'api',
          message: '插件出错',
          detail: error,
        }
      });
    });
}

exports.supportLanguages = supportLanguages;
exports.ocr = ocr;
