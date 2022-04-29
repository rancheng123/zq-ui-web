import * as qiniu from "qiniu-js";
import request from "./request";
export async function upload(prifix,file, fname, key, onSuccess, uploadError, next) {
  const data = await request({
    url: prifix + "system/storage/upload-storage-token",
    method: "post",
    data: undefined,
  });
  if (data.code !== 0) {
    uploadError();
    return;
  }
  let token = data.data;
  const putExtra = {
    fname: fname,
  };
  const config = {};
  const observable = qiniu.upload(file, key, token, putExtra, config);
  observable.subscribe({
    next: next,
    error: uploadError,
    complete: onSuccess,
  });
}


