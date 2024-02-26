import request from '@/utils/request'

// 查询TbExam列表
export function listTbExam(query) {
  return request({
    url: '/api/v1/tb-exam',
    method: 'get',
    params: query
  })
}

// 查询TbExam详细
export function getTbExam(id) {
  return request({
    url: '/api/v1/tb-exam/' + id,
    method: 'get'
  })
}

// 新增TbExam
export function addTbExam(data) {
  return request({
    url: '/api/v1/tb-exam',
    method: 'post',
    data: data
  })
}

// 修改TbExam
export function updateTbExam(data) {
  return request({
    url: '/api/v1/tb-exam/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TbExam
export function delTbExam(data) {
  return request({
    url: '/api/v1/tb-exam',
    method: 'delete',
    data: data
  })
}

