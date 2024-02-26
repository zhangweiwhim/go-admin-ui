import request from '@/utils/request'

// 查询TbTerm列表
export function listTbTerm(query) {
  return request({
    url: '/api/v1/tb-term',
    method: 'get',
    params: query
  })
}

// 查询TbTerm详细
export function getTbTerm(id) {
  return request({
    url: '/api/v1/tb-term/' + id,
    method: 'get'
  })
}

// 新增TbTerm
export function addTbTerm(data) {
  return request({
    url: '/api/v1/tb-term',
    method: 'post',
    data: data
  })
}

// 修改TbTerm
export function updateTbTerm(data) {
  return request({
    url: '/api/v1/tb-term/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbTerm
export function delTbTerm(data) {
  return request({
    url: '/api/v1/tb-term',
    method: 'delete',
    data: data
  })
}

