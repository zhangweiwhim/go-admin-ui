import request from '@/utils/request'

// 查询TbClass列表
export function listTbClass(query) {
  return request({
    url: '/api/v1/tb-class',
    method: 'get',
    params: query
  })
}

// 查询TbClass详细
export function getTbClass(id) {
  return request({
    url: '/api/v1/tb-class/' + id,
    method: 'get'
  })
}

// 新增TbClass
export function addTbClass(data) {
  return request({
    url: '/api/v1/tb-class',
    method: 'post',
    data: data
  })
}

// 修改TbClass
export function updateTbClass(data) {
  return request({
    url: '/api/v1/tb-class/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbClass
export function delTbClass(data) {
  return request({
    url: '/api/v1/tb-class',
    method: 'delete',
    data: data
  })
}

