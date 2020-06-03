import request from '@/utils/request'

export function getTeacherList(page, size, queryCondition) {
  return request({
    url: `/eduservice/teacher/pageTeacherCondition/${page}/${size}`,
    method: 'post',
    data: queryCondition
  })
}

export function deleteById(id) {
  return request({
    url: `/eduservice/teacher/${id}`,
    method: 'delete'
  })
}

export function addTeacher(teacher) {
  return request({
    url: `/eduservice/teacher/addTeacher`,
    method: 'post',
    data: teacher
  })
}

export function getTeacherInfo(id) {
  return request({
    url: `/eduservice/teacher/getTeacher/${id}`,
    method: 'get'
  })
}

export function editTeacher(teacher) {
  return request({
    url: `/eduservice/teacher/updateTeacher`,
    method: 'post',
    data: teacher
  })
}
