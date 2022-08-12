import request from '@/utils/request';

/**
 * Simple RESTful resource class
 */
class Resource {
  uri: string
  constructor(uri: string) {
    this.uri = uri;
  }
  list<T, U>(query: T): Promise<U> {
    return new Promise((resolve) => {
      request({
        url: '/' + this.uri,
        method: 'get',
        params: query,
      }).then(({ data }) => resolve(data))
    });
  }
  store<T>(resource: T) {
    return request({
      url: '/' + this.uri,
      method: 'post',
      data: resource,
    });
  }
  show(id: any) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'get',
    });
  }
  update<T>(id: any, resource: T) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'put',
      data: resource,
    });
  }
  delete(id: any) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'delete',
    });
  }  
}

export { Resource as default };
