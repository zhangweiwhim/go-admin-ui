import request from '@/utils/request'

// 查询TbChengji列表
export function listTbChengji(query) {
  return request({
    url: '/api/v1/tb-chengji',
    method: 'get',
    params: query
  })
}

// 查询TbChengji详细
export function getTbChengji(id) {
  return request({
    url: '/api/v1/tb-chengji/' + id,
    method: 'get'
  })
}

// 新增TbChengji
export function addTbChengji(data) {
  return request({
    url: '/api/v1/tb-chengji',
    method: 'post',
    data: data
  })
}

// 修改TbChengji
export function updateTbChengji(data) {
  return request({
    url: '/api/v1/tb-chengji/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbChengji
export function delTbChengji(data) {
  return request({
    url: '/api/v1/tb-chengji',
    method: 'delete',
    data: data
  })
}

