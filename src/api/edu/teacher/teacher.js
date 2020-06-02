import request from '@/utils/request'

export function getTeacherList(page, size, queryCondition) {
  return request({
    url: `/eduservice/teacher/pageTeacherCondition/${page}/${size}`,
    method: 'post',
    data: queryCondition
  })
}