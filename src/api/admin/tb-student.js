import request from '@/utils/request'

// 查询TbStudent列表
export function listTbStudent(query) {
  return request({
    url: '/api/v1/tb-student',
    method: 'get',
    params: query
  })
}

// 查询TbStudent详细
export function getTbStudent(id) {
  return request({
    url: '/api/v1/tb-student/' + id,
    method: 'get'
  })
}

// 新增TbStudent
export function addTbStudent(data) {
  return request({
    url: '/api/v1/tb-student',
    method: 'post',
    data: data
  })
}

// 修改TbStudent
export function updateTbStudent(data) {
  return request({
    url: '/api/v1/tb-student/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbStudent
export function delTbStudent(data) {
  return request({
    url: '/api/v1/tb-student',
    method: 'delete',
    data: data
  })
}

