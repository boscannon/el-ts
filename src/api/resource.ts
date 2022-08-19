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
  store<T, U>(resource: T): Promise<U> {
    return new Promise((resolve) => {
      return request({
        url: '/' + this.uri,
        method: 'post',
        data: resource,
      }).then(({ data }) => resolve(data))
    });    
  }
  show<U>(id: any): Promise<U> {
    return new Promise((resolve) => {
      return request({
        url: '/' + this.uri + '/' + id,
        method: 'get',
      }).then(({ data }) => resolve(data))
    });    
  }
  update<T, U>(id: any, resource: T): Promise<U> {
    return new Promise((resolve) => {
      return request({
        url: '/' + this.uri + '/' + id,
        method: 'put',
        data: resource,
      }).then(({ data }) => resolve(data))
    });      
  }
  delete<U>(id: any): Promise<U> {
    return new Promise((resolve) => {
      return request({
        url: '/' + this.uri + '/' + id,
        method: 'delete',
      }).then(({ data }) => resolve(data))
    });     
  }  
}

export { Resource as default };
