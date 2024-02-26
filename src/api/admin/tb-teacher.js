import request from '@/utils/request'

// 查询TbTeacher列表
export function listTbTeacher(query) {
  return request({
    url: '/api/v1/tb-teacher',
    method: 'get',
    params: query
  })
}

// 查询TbTeacher详细
export function getTbTeacher(id) {
  return request({
    url: '/api/v1/tb-teacher/' + id,
    method: 'get'
  })
}

// 新增TbTeacher
export function addTbTeacher(data) {
  return request({
    url: '/api/v1/tb-teacher',
    method: 'post',
    data: data
  })
}

// 修改TbTeacher
export function updateTbTeacher(data) {
  return request({
    url: '/api/v1/tb-teacher/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbTeacher
export function delTbTeacher(data) {
  return request({
    url: '/api/v1/tb-teacher',
    method: 'delete',
    data: data
  })
}

