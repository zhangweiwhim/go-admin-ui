import request from '@/utils/request'

// 查询TbSub列表
export function listTbSub(query) {
  return request({
    url: '/api/v1/tb-sub',
    method: 'get',
    params: query
  })
}

// 查询TbSub详细
export function getTbSub(id) {
  return request({
    url: '/api/v1/tb-sub/' + id,
    method: 'get'
  })
}

// 新增TbSub
export function addTbSub(data) {
  return request({
    url: '/api/v1/tb-sub',
    method: 'post',
    data: data
  })
}

// 修改TbSub
export function updateTbSub(data) {
  return request({
    url: '/api/v1/tb-sub/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbSub
export function delTbSub(data) {
  return request({
    url: '/api/v1/tb-sub',
    method: 'delete',
    data: data
  })
}

