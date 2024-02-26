import request from '@/utils/request'

// 查询TbTeachAll列表
export function listTbTeachAll(query) {
  return request({
    url: '/api/v1/tb-teach-all',
    method: 'get',
    params: query
  })
}

// 查询TbTeachAll详细
export function getTbTeachAll(id) {
  return request({
    url: '/api/v1/tb-teach-all/' + id,
    method: 'get'
  })
}

// 新增TbTeachAll
export function addTbTeachAll(data) {
  return request({
    url: '/api/v1/tb-teach-all',
    method: 'post',
    data: data
  })
}

// 修改TbTeachAll
export function updateTbTeachAll(data) {
  return request({
    url: '/api/v1/tb-teach-all/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbTeachAll
export function delTbTeachAll(data) {
  return request({
    url: '/api/v1/tb-teach-all',
    method: 'delete',
    data: data
  })
}

